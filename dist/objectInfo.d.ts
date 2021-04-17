/// <reference types="@webgpu/types" />
declare const INFO = "__WEBGPU_LIVE_SHADER_INFO__";
import { OnShaderRegisteredCallback } from './client';
declare type GPUDeviceInfo = {
    onShaderRegisteredCallback?: OnShaderRegisteredCallback;
};
declare type GPUShaderModuleInfo = {
    device: GPUDevice;
    descriptor: GPUShaderModuleDescriptor;
    id: string;
    replacement?: GPUShaderModule;
    generation: number;
};
declare type GPUPipelineInfo = {
    device: GPUDevice;
    descriptor: GPURenderPipelineDescriptor | GPUComputePipelineDescriptor;
    replacement?: GPURenderPipeline | GPUComputePipeline;
    registrationGeneration: number;
    vertexStageGeneration: number;
    fragmentStageGeneration: number;
    computeStageGeneration: number;
};
interface GPUDeviceWithInfo extends GPUDevice {
    [INFO]: GPUDeviceInfo;
}
export declare function initializeDeviceInfo(obj: GPUDevice): GPUDeviceInfo;
export declare function initializeShaderModuleInfo(device: GPUDevice, descriptor: GPUShaderModuleDescriptor, obj: GPUShaderModule): GPUShaderModuleInfo;
export declare function initializeRenderPipelineInfo(device: GPUDevice, descriptor: GPURenderPipelineDescriptor, obj: GPURenderPipeline): GPUPipelineInfo;
export declare function initializeComputePipelineInfo(device: GPUDevice, descriptor: GPUComputePipelineDescriptor, obj: GPUComputePipeline): GPUPipelineInfo;
export declare function getDeviceInfo(obj: GPUDevice | GPUDeviceWithInfo): GPUDeviceInfo | undefined;
export declare function getShaderModuleInfo(obj: GPUShaderModule): GPUShaderModuleInfo;
export declare function getPipelineInfo(obj: GPURenderPipeline | GPUComputePipeline): GPUPipelineInfo;
export {};
