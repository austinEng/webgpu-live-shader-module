/// <reference types="dist" />
declare type ClientFunctions = {
    createShaderModule: GPUDevice["createShaderModule"];
    createRenderPipeline: GPUDevice["createRenderPipeline"];
    createRenderPipelineAsync: GPUDevice["createRenderPipelineAsync"];
    createComputePipeline: GPUDevice["createComputePipeline"];
    createComputePipelineAsync: GPUDevice["createComputePipelineAsync"];
    setRenderPipeline: GPURenderPassEncoder["setPipeline"];
    setComputePipeline: GPUComputePassEncoder["setPipeline"];
};
declare class Client {
    _fn: ClientFunctions;
    _registrationGeneration: number;
    _shaderModuleUpdates: Map<string, any>;
    constructor(fn: ClientFunctions);
    createShaderModule(device: GPUDevice, descriptor: GPUShaderModuleDescriptor): GPUShaderModule;
    createRenderPipeline(device: GPUDevice, descriptor: GPURenderPipelineDescriptor): GPURenderPipeline;
    createRenderPipelineAsync(device: GPUDevice, descriptor: GPURenderPipelineDescriptor): Promise<GPURenderPipeline>;
    createComputePipeline(device: GPUDevice, descriptor: GPUComputePipelineDescriptor): GPUComputePipeline;
    createComputePipelineAsync(device: GPUDevice, descriptor: GPUComputePipelineDescriptor): Promise<GPUComputePipeline>;
    private registerShaderStage;
    private registerRenderPipelineShaders;
    private registerComputePipelineShaders;
    private updateShaderStage;
    private updatePipeline;
    setRenderPipeline(encoder: GPURenderPassEncoder, pipeline: GPURenderPipeline): void;
    setComputePipeline(encoder: GPUComputePassEncoder, pipeline: GPUComputePipeline): void;
}
export declare const client: Client;
export {};
