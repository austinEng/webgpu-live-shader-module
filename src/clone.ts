import { GPUShaderModuleDescriptorWithTransform } from 'webgpu-shader-module-transform';

export const cloneShaderModuleDescriptor = (descriptor?: GPUShaderModuleDescriptorWithTransform) => (descriptor && {
    code: descriptor.code,
    source: descriptor.source,
    transform: descriptor.transform,
} as GPUShaderModuleDescriptorWithTransform);

export const cloneProgrammableStageDescriptor = (descriptor?: GPUProgrammableStageDescriptor) => (descriptor && {
    module: descriptor.module,
    entryPoint: descriptor.entryPoint,
} as GPUProgrammableStageDescriptor);

export const cloneRasterizationStateDescriptor = (descriptor?: GPURasterizationStateDescriptor) => (descriptor && {
    frontFace: descriptor.frontFace,
    cullMode: descriptor.cullMode,
    depthBias: descriptor.depthBias,
    depthBiasSlopeScale: descriptor.depthBiasSlopeScale,
    depthBiasClamp: descriptor.depthBiasClamp,
} as GPURasterizationStateDescriptor);

export const cloneColorStateDescriptor = (descriptor?: GPUColorStateDescriptor) => (descriptor && {
    format: descriptor.format,
    alphaBlend: descriptor.alphaBlend,
    colorBlend: descriptor.colorBlend,
    writeMask: descriptor.writeMask,
} as GPUColorStateDescriptor);

export const cloneStencilStateFaceDescriptor = (descriptor?: GPUStencilStateFaceDescriptor) => (descriptor && {
    compare: descriptor.compare,
    failOp: descriptor.failOp,
    depthFailOp: descriptor.depthFailOp,
    passOp: descriptor.passOp,
} as GPUStencilStateFaceDescriptor);

export const cloneDepthStencilStateDescriptor = (descriptor?: GPUDepthStencilStateDescriptor) => (descriptor && {
    format: descriptor.format,
    depthWriteEnabled: descriptor.depthWriteEnabled,
    depthCompare: descriptor.depthCompare,
    stencilFront: cloneStencilStateFaceDescriptor(descriptor.stencilFront),
    stencilBack: cloneStencilStateFaceDescriptor(descriptor.stencilBack),
    stencilReadMask: descriptor.stencilReadMask,
    stencilWriteMask: descriptor.stencilWriteMask,
} as GPUDepthStencilStateDescriptor);

export const cloneVertexAttributeDescriptor = (descriptor?: GPUVertexAttributeDescriptor) => (descriptor && {
    offset: descriptor.offset,
    format: descriptor.format,
    shaderLocation: descriptor.shaderLocation,
} as GPUVertexAttributeDescriptor);

export const cloneVertexBufferDescriptor = (descriptor?: GPUVertexBufferLayoutDescriptor) => {
    if (!descriptor) {
        return undefined;
    }
    if (!descriptor.attributes) {
        throw new Error('Missing attributes');
    }
    if (typeof descriptor.attributes[Symbol.iterator] !== 'function') {
        throw new Error('attributes is not iterable');
    }
    return {
        arrayStride: descriptor.arrayStride,
        stepMode: descriptor.stepMode,
        attributes: Array.from(descriptor.attributes, cloneVertexAttributeDescriptor),
    } as GPUVertexBufferLayoutDescriptor;
}

export const cloneVertexStateDescriptor = (descriptor?: GPUVertexStateDescriptor) => {
    if (!descriptor) {
        return undefined;
    }
    if (descriptor.vertexBuffers && typeof descriptor.vertexBuffers[Symbol.iterator] !== 'function') {
        throw new Error('vertexBuffers is not iterable');
    }
    return {
        indexFormat: descriptor.indexFormat,
        vertexBuffers: descriptor.vertexBuffers && Array.from(descriptor.vertexBuffers, cloneVertexBufferDescriptor),
    } as GPUVertexStateDescriptor;
}

export const cloneRenderPipelineDescriptor = (descriptor?: GPURenderPipelineDescriptor) => {
    if (!descriptor) {
        return undefined;
    }
    if (!descriptor.colorStates) {
        throw new Error('Missing colorStates');
    }
    if (typeof descriptor.colorStates[Symbol.iterator] !== 'function') {
        throw new Error('colorStates is not iterable');
    }
    return {
        layout: descriptor.layout,
        vertexStage: cloneProgrammableStageDescriptor(descriptor.vertexStage),
        fragmentStage: cloneProgrammableStageDescriptor(descriptor.fragmentStage),
        primitiveTopology: descriptor.primitiveTopology,
        rasterizationState: cloneRasterizationStateDescriptor(descriptor.rasterizationState),
        colorStates: Array.from(descriptor.colorStates, cloneColorStateDescriptor),
        depthStencilState: cloneDepthStencilStateDescriptor(descriptor.depthStencilState),
        vertexState: cloneVertexStateDescriptor(descriptor.vertexState),
        sampleCount: descriptor.sampleCount,
        sampleMask: descriptor.sampleMask,
        alphaToCoverageEnabled: descriptor.alphaToCoverageEnabled,
    } as GPURenderPipelineDescriptor;
};

export const cloneComputePipelineDescriptor = (descriptor?: GPUComputePipelineDescriptor) => (descriptor && {
    layout: descriptor.layout,
    computeStage: cloneProgrammableStageDescriptor(descriptor.computeStage),
} as GPUComputePipelineDescriptor);
