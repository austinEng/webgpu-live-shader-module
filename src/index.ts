
/// <reference types="@webgpu/types" />

import { client, OnShaderRegisteredCallback } from './client';

export function setShaderRegisteredCallback(callback: OnShaderRegisteredCallback) {
  client.setOnShaderRegisteredCallback(callback);
}

if (navigator.gpu) {
  Object.assign(GPUDevice.prototype, {
    createShaderModule(
      this: GPUDevice,
      descriptor: GPUShaderModuleDescriptor
    ): GPUShaderModule {
      return client.createShaderModule(this, descriptor);
    },
    createRenderPipeline(
      this: GPUDevice,
      descriptor: GPURenderPipelineDescriptor
    ): GPURenderPipeline {
      return client.createRenderPipeline(this, descriptor);
    },
    createComputePipeline(
      this: GPUDevice,
      descriptor: GPUComputePipelineDescriptor
    ): GPUComputePipeline {
      return client.createComputePipeline(this, descriptor);
    },
  });

  Object.assign(GPURenderPassEncoder.prototype, {
    setPipeline(this: GPURenderPassEncoder, pipeline: GPURenderPipeline): void {
      return client.setRenderPipeline(this, pipeline);
    },
  });

  Object.assign(GPUComputePassEncoder.prototype, {
    setPipeline(
      this: GPUComputePassEncoder,
      pipeline: GPUComputePipeline
    ): void {
      return client.setComputePipeline(this, pipeline);
    },
  });
}

