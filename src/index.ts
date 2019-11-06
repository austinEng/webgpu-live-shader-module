import Client, { OnShaderRegisteredCallback } from './client';
import installShaderCompilerLoader, { GPUDeviceWithShaderModuleDescriptorTransform, GPUShaderModuleDescriptorWithTransform } from 'webgpu-shader-module-transform';

export default function install(onShaderRegistered?: OnShaderRegisteredCallback) {
    if (!navigator.gpu) return;

    installShaderCompilerLoader();

    const client = new Client({
        // @ts-ignore
        createShaderModule: GPUDevice.prototype.createShaderModule,
        // @ts-ignore
        createRenderPipeline: GPUDevice.prototype.createRenderPipeline,
        // @ts-ignore
        createComputePipeline: GPUDevice.prototype.createComputePipeline,
        // @ts-ignore
        setRenderPipeline: GPURenderPassEncoder.prototype.setPipeline,
        // @ts-ignore
        setComputePipeline: GPUComputePassEncoder.prototype.setPipeline,
    }, onShaderRegistered);

    // @ts-ignore
    Object.assign(GPUDevice.prototype, {
        createShaderModule(this: GPUDeviceWithShaderModuleDescriptorTransform, descriptor: GPUShaderModuleDescriptorWithTransform): GPUShaderModule {
            return client.createShaderModule(this, descriptor);
        },
        createRenderPipeline(this: GPUDevice, descriptor: GPURenderPipelineDescriptor): GPURenderPipeline {
            return client.createRenderPipeline(this, descriptor);
        },
        createComputePipeline(this: GPUDevice, descriptor: GPUComputePipelineDescriptor): GPUComputePipeline {
            return client.createComputePipeline(this, descriptor);
        }
    });

    // @ts-ignore
    Object.assign(GPURenderPassEncoder.prototype, {
        setPipeline: function setRenderPipeline(this: GPURenderPassEncoder, pipeline: GPURenderPipeline): void {
            return client.setRenderPipeline(this, pipeline);
        }
    });

    // @ts-ignore
    Object.assign(GPUComputePassEncoder.prototype, {
        setPipeline: function setComputePipeline(this: GPUComputePassEncoder, pipeline: GPUComputePipeline): void {
            return client.setComputePipeline(this, pipeline);
        }
    });
}

