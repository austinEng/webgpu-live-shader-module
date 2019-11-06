import { GPUDeviceWithShaderModuleDescriptorTransform, GPUShaderModuleDescriptorWithTransform, GPUShaderSource } from 'webgpu-shader-module-transform';
declare type ClientFunctions = {
    createShaderModule: GPUDeviceWithShaderModuleDescriptorTransform["createShaderModule"];
    createRenderPipeline: GPUDevice["createRenderPipeline"];
    createComputePipeline: GPUDevice["createComputePipeline"];
    setRenderPipeline: GPURenderPassEncoder["setPipeline"];
    setComputePipeline: GPUComputePassEncoder["setPipeline"];
};
export declare type OnShaderRegisteredCallback = (source: GPUShaderSource, updateCallback: (updatedSource: GPUShaderSource) => void) => void;
export default class Client {
    _fn: ClientFunctions;
    _registrationGeneration: number;
    _shaderModuleUpdates: Map<string, GPUShaderSource>;
    _onShaderRegistered?: OnShaderRegisteredCallback;
    constructor(fn: ClientFunctions, onShaderRegistered?: OnShaderRegisteredCallback);
    createShaderModule(device: GPUDeviceWithShaderModuleDescriptorTransform, descriptor: GPUShaderModuleDescriptorWithTransform): GPUShaderModule;
    createRenderPipeline(device: GPUDevice, descriptor: GPURenderPipelineDescriptor): GPURenderPipeline;
    createComputePipeline(device: GPUDevice, descriptor: GPUComputePipelineDescriptor): GPUComputePipeline;
    private registerShaderStage;
    private registerRenderPipelineShaders;
    private registerComputePipelineShaders;
    private updateShaderStage;
    private updatePipeline;
    setRenderPipeline(encoder: GPURenderPassEncoder, pipeline: GPURenderPipeline): void;
    setComputePipeline(encoder: GPUComputePassEncoder, pipeline: GPUComputePipeline): void;
}
export {};
