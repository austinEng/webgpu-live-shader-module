/// <reference types="@webgpu/types" />
declare type ClientFunctions = {
    createShaderModule: GPUDevice["createShaderModule"];
    createRenderPipeline: GPUDevice["createRenderPipeline"];
    createComputePipeline: GPUDevice["createComputePipeline"];
    setRenderPipeline: GPURenderPassEncoder["setPipeline"];
    setComputePipeline: GPUComputePassEncoder["setPipeline"];
};
export declare type OnShaderRegisteredCallback = (source: any, updateCallback: (updatedSource: any) => void) => void;
declare class Client {
    _fn: ClientFunctions;
    _registrationGeneration: number;
    _shaderModuleUpdates: Map<string, any>;
    _onShaderRegistered?: OnShaderRegisteredCallback;
    constructor(fn: ClientFunctions, onShaderRegistered?: OnShaderRegisteredCallback);
    setOnShaderRegisteredCallback(callback: OnShaderRegisteredCallback): void;
    createShaderModule(device: GPUDevice, descriptor: GPUShaderModuleDescriptor): GPUShaderModule;
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
export declare const client: Client;
export {};
