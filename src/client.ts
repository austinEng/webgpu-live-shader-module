
import { GPUDeviceWithShaderModuleDescriptorTransform, GPUShaderModuleDescriptorWithTransform, GPUShaderSource } from 'webgpu-shader-module-transform';
import { cloneShaderModuleDescriptor, cloneRenderPipelineDescriptor, cloneComputePipelineDescriptor } from './clone';
import { initializeShaderModuleInfo, initializeRenderPipelineInfo, initializeComputePipelineInfo, getPipelineInfo, getShaderModuleInfo } from './objectInfo';

type ClientFunctions = {
    createShaderModule: GPUDeviceWithShaderModuleDescriptorTransform["createShaderModule"],
    createRenderPipeline: GPUDevice["createRenderPipeline"],
    createComputePipeline: GPUDevice["createComputePipeline"],
    setRenderPipeline: GPURenderPassEncoder["setPipeline"],
    setComputePipeline: GPUComputePassEncoder["setPipeline"]
}

export type OnShaderRegisteredCallback = (source: GPUShaderSource, updateCallback: (updatedSource: GPUShaderSource) => void) => void;

export default class Client {
    _fn: ClientFunctions;
    _registrationGeneration: number = 1;
    _shaderModuleUpdates: Map<string, GPUShaderSource> = new Map();
    _onShaderRegistered?: OnShaderRegisteredCallback;

    constructor(fn: ClientFunctions, onShaderRegistered?: OnShaderRegisteredCallback) {
        this._fn = fn;
        this._onShaderRegistered = onShaderRegistered;
    }

    createShaderModule(device: GPUDeviceWithShaderModuleDescriptorTransform, descriptor: GPUShaderModuleDescriptorWithTransform): GPUShaderModule {
        descriptor = cloneShaderModuleDescriptor(descriptor)!;

        const shaderModule = this._fn.createShaderModule.call(device, descriptor);
        initializeShaderModuleInfo(device, descriptor, shaderModule);

        return shaderModule;
    }

    createRenderPipeline(device: GPUDevice, descriptor: GPURenderPipelineDescriptor): GPURenderPipeline {
        descriptor = cloneRenderPipelineDescriptor(descriptor)!;

        const pipeline = this._fn.createRenderPipeline.call(device, descriptor);
        initializeRenderPipelineInfo(device, descriptor, pipeline);

        return pipeline;
    }

    createComputePipeline(device: GPUDevice, descriptor: GPUComputePipelineDescriptor): GPUComputePipeline {
        descriptor = cloneComputePipelineDescriptor(descriptor)!;

        const pipeline = this._fn.createComputePipeline.call(device, descriptor);
        initializeComputePipelineInfo(device, descriptor, pipeline);

        return pipeline;
    }

    private registerShaderStage(shaderStage?: GPUProgrammableStageDescriptor) {
        if (!shaderStage || !shaderStage.module) {
            return;
        }

        const shaderModule = shaderStage.module;
        const info = getShaderModuleInfo(shaderModule);

        if (this._onShaderRegistered && info.descriptor.source && info.descriptor.transform) {
            this._onShaderRegistered(info.descriptor.source, (updatedSource: GPUShaderSource) => {
                this._shaderModuleUpdates.set(info.id, updatedSource);
            });
        }
    }

    private registerRenderPipelineShaders(pipeline: GPURenderPipeline) {
        const info = getPipelineInfo(pipeline);
        if (info.registrationGeneration === this._registrationGeneration) {
            return;
        }
        info.registrationGeneration = this._registrationGeneration;

        const descriptor = info.descriptor as GPURenderPipelineDescriptor;
        this.registerShaderStage(descriptor.vertexStage);
        this.registerShaderStage(descriptor.fragmentStage);
    }

    private registerComputePipelineShaders(pipeline: GPUComputePipeline) {
        const info = getPipelineInfo(pipeline);
        if (info.registrationGeneration === this._registrationGeneration) {
            return;
        }
        info.registrationGeneration = this._registrationGeneration;

        const descriptor = info.descriptor as GPUComputePipelineDescriptor;
        this.registerShaderStage(descriptor.computeStage);
    }

    private updateShaderStage(shaderStage?: GPUProgrammableStageDescriptor): number | undefined {
        if (!shaderStage || !shaderStage.module) {
            return undefined;
        }

        const shaderModule = shaderStage.module;
        const info = getShaderModuleInfo(shaderModule);

        if (this._shaderModuleUpdates.has(info.id)) {
            const shaderSource = this._shaderModuleUpdates.get(info.id);
            info.descriptor.source = shaderSource;

            this._shaderModuleUpdates.delete(info.id);

            try {
                const replacement = this._fn.createShaderModule.call(info.device, info.descriptor);
                initializeShaderModuleInfo(info.device, info.descriptor, replacement);
                Object.assign(getShaderModuleInfo(replacement), info);

                info.replacement = replacement;
                info.generation += 1;
            } catch (e) {
                console.error(e);
            }
        }

        return info.generation;
    }

    private updatePipeline(pipeline: GPURenderPipeline | GPUComputePipeline) {
        if (this._shaderModuleUpdates.size === 0) {
            return;
        }

        const info = getPipelineInfo(pipeline);
        const descriptor = info.descriptor;

        let vertexStageGeneration = undefined;
        let fragmentStageGeneration = undefined;
        let computeStageGeneration = undefined;

        if ('vertexStage' in descriptor) {
            vertexStageGeneration = this.updateShaderStage(descriptor.vertexStage);
        }
        if ('fragmentStage' in descriptor) {
            fragmentStageGeneration = this.updateShaderStage(descriptor.fragmentStage);
        }
        if ('computeStage' in descriptor) {
            computeStageGeneration = this.updateShaderStage(descriptor.computeStage);
        }

        const vertexStageUpdated = (vertexStageGeneration !== undefined && vertexStageGeneration !== info.vertexStageGeneration);
        const fragmentStageUpdated = (fragmentStageGeneration !== undefined && fragmentStageGeneration !== info.fragmentStageGeneration);
        const computeStageUpdated = (computeStageGeneration !== undefined && computeStageGeneration !== info.computeStageGeneration);

        if (!(vertexStageUpdated || fragmentStageUpdated || computeStageUpdated)) {
            return;
        }

        if (vertexStageUpdated) {
            // @ts-ignore
            descriptor.vertexStage.module = getShaderModuleInfo(descriptor.vertexStage.module).replacement;
        }

        if (fragmentStageUpdated) {
            // @ts-ignore
            descriptor.fragmentStage.module = getShaderModuleInfo(descriptor.fragmentStage.module).replacement;
        }

        if (computeStageUpdated) {
            // @ts-ignore
            descriptor.computeStage.module = getShaderModuleInfo(descriptor.computeStage.module).replacement;
        }

        if (vertexStageUpdated || fragmentStageUpdated) {
            info.replacement = this._fn.createRenderPipeline.call(info.device, descriptor as GPURenderPipelineDescriptor);
        } else if (computeStageUpdated) {
            info.replacement = this._fn.createComputePipeline.call(info.device, descriptor as GPUComputePipelineDescriptor);
        }
    }

    setRenderPipeline(encoder: GPURenderPassEncoder, pipeline: GPURenderPipeline): void {
        this.registerRenderPipelineShaders(pipeline);
        this.updatePipeline(pipeline);
        pipeline = getPipelineInfo(pipeline).replacement || pipeline;
        return this._fn.setRenderPipeline.call(encoder, pipeline);
    }

    setComputePipeline(encoder: GPUComputePassEncoder, pipeline: GPUComputePipeline): void {
        this.registerComputePipelineShaders(pipeline);
        this.updatePipeline(pipeline);
        pipeline = getPipelineInfo(pipeline).replacement || pipeline;
        return this._fn.setComputePipeline.call(encoder, pipeline);
    }
};
