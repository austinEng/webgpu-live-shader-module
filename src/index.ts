
import { client } from './client';

type SourceObserver = (source: string) => void;
export interface LiveShaderSource extends String {
  new (source: string): LiveShaderSource;
  watch(observer: SourceObserver): void;
  unwatch(observer: SourceObserver): void;
  source: string;
}
interface LiveShaderSourceImpl {
  _source: string;
  _observers: Set<SourceObserver>;
}

export const LiveShaderSource = function(this: LiveShaderSourceImpl, source: string) {
  this._source = source;
  this._observers = new Set();
} as unknown as LiveShaderSource;

LiveShaderSource.prototype = new Object();

Object.defineProperties(LiveShaderSource.prototype, {
  _source: {
    configurable: false,
    enumerable: false,
    writable: true,
  },
  source: {
    configurable: false,
    enumerable: true,
    get: function(this: LiveShaderSourceImpl) {
      return this._source;
    },
    set: function(this: LiveShaderSourceImpl, source) {
      this._source = source;
      for (const observer of this._observers) {
        observer(source);
      }
    },
  },
  _observers: {
    configurable: false,
    enumerable: false,
    writable: true,
  },
  watch: {
    configurable: false,
    enumerable: false,
    value: function(this: LiveShaderSourceImpl, observer: SourceObserver) {
      this._observers.add(observer);
    },
  },
  unwatch: {
    configurable: false,
    enumerable: false,
    value: function(this: LiveShaderSourceImpl, observer: SourceObserver) {
      this._observers.delete(observer);
    },
  },
});

for (const prop of Object.getOwnPropertyNames(String.prototype)) {
  const desc = Object.getOwnPropertyDescriptor(String.prototype, prop)!;
  if (prop === 'constructor') {
    Object.defineProperty(LiveShaderSource.prototype, prop, {
      ...desc,
      value: LiveShaderSource,
    })
    continue;
  }
  if (prop === 'length') {
    Object.defineProperty(LiveShaderSource.prototype, prop, {
      configurable: false,
      enumerable: false,
      get: function(this: LiveShaderSourceImpl) {
        return this._source.length;
      },
    });
    continue;
  }
  Object.defineProperty(LiveShaderSource.prototype, prop, {
    ...desc,
    value: function(this: LiveShaderSourceImpl) {
      return desc.value.apply(this._source, arguments);
    },
  });
}

if (typeof GPUDevice !== 'undefined') {
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
    async createRenderPipelineAsync(
      this: GPUDevice,
      descriptor: GPURenderPipelineDescriptor
    ): Promise<GPURenderPipeline> {
      return client.createRenderPipelineAsync(this, descriptor);
    },
    createComputePipeline(
      this: GPUDevice,
      descriptor: GPUComputePipelineDescriptor
    ): GPUComputePipeline {
      return client.createComputePipeline(this, descriptor);
    },
    async createComputePipelineAsync(
      this: GPUDevice,
      descriptor: GPUComputePipelineDescriptor
    ): Promise<GPUComputePipeline> {
      return client.createComputePipelineAsync(this, descriptor);
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
