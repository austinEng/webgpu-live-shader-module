import { GPUShaderModuleDescriptorWithTransform } from 'webgpu-shader-module-transform';
export declare const cloneShaderModuleDescriptor: (descriptor?: GPUShaderModuleDescriptorWithTransform | undefined) => GPUShaderModuleDescriptorWithTransform | undefined;
export declare const cloneProgrammableStageDescriptor: (descriptor?: GPUProgrammableStageDescriptor | undefined) => GPUProgrammableStageDescriptor | undefined;
export declare const cloneRasterizationStateDescriptor: (descriptor?: GPURasterizationStateDescriptor | undefined) => GPURasterizationStateDescriptor | undefined;
export declare const cloneColorStateDescriptor: (descriptor?: GPUColorStateDescriptor | undefined) => GPUColorStateDescriptor | undefined;
export declare const cloneStencilStateFaceDescriptor: (descriptor?: GPUStencilStateFaceDescriptor | undefined) => GPUStencilStateFaceDescriptor | undefined;
export declare const cloneDepthStencilStateDescriptor: (descriptor?: GPUDepthStencilStateDescriptor | undefined) => GPUDepthStencilStateDescriptor | undefined;
export declare const cloneVertexAttributeDescriptor: (descriptor?: GPUVertexAttributeDescriptor | undefined) => GPUVertexAttributeDescriptor | undefined;
export declare const cloneVertexBufferDescriptor: (descriptor?: GPUVertexBufferDescriptor | undefined) => GPUVertexBufferDescriptor | undefined;
export declare const cloneVertexInputDescriptor: (descriptor?: GPUVertexInputDescriptor | undefined) => GPUVertexInputDescriptor | undefined;
export declare const cloneRenderPipelineDescriptor: (descriptor?: GPURenderPipelineDescriptor | undefined) => GPURenderPipelineDescriptor | undefined;
export declare const cloneComputePipelineDescriptor: (descriptor?: GPUComputePipelineDescriptor | undefined) => GPUComputePipelineDescriptor | undefined;
