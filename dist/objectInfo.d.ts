import { GPUShaderModuleDescriptorWithTransform } from 'webgpu-shader-module-transform';
declare type GPUShaderModuleInfo = {
    device: GPUDevice;
    descriptor: GPUShaderModuleDescriptorWithTransform;
    id: string;
    replacement?: GPUShaderModule;
    generation: number;
};
declare type GPUPipelineInfo = {
    device: GPUDevice;
    descriptor: GPURenderPipelineDescriptor | GPUComputePipelineDescriptor;
    replacement?: GPURenderPipeline;
    registrationGeneration: number;
    vertexStageGeneration: number;
    fragmentStageGeneration: number;
    computeStageGeneration: number;
};
export declare function initializeShaderModuleInfo(device: GPUDevice, descriptor: GPUShaderModuleDescriptorWithTransform, obj: GPUShaderModule): GPUShaderModuleInfo;
export declare function initializeRenderPipelineInfo(device: GPUDevice, descriptor: GPURenderPipelineDescriptor, obj: GPURenderPipeline): GPUPipelineInfo;
export declare function initializeComputePipelineInfo(device: GPUDevice, descriptor: GPUComputePipelineDescriptor, obj: GPUComputePipeline): GPUPipelineInfo;
export declare function getShaderModuleInfo(obj: GPUShaderModule): GPUShaderModuleInfo;
export declare function getPipelineInfo(obj: GPURenderPipeline | GPUComputePipeline): GPUPipelineInfo;
export {};
