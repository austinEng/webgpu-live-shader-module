# WebGPU Live Shader Module

## Overview

`webgpu-live-shader-module` provides an API for realtime modifications to a [`GPUShaderModule`](https://gpuweb.github.io/gpuweb/#gpushadermodule).

```typescript
import { setShaderRegisteredCallback } from 'webgpu-live-shader-module';

type GPUShaderSource = any;
type UpdateSourceCallback = (updatedSource: GPUShaderSource) => void;

setShaderRegisteredCallback((source: GPUShaderSource, updateSource: UpdateSourceCallback) => {
    // Store `source`. It is the original source code.

    // Make edits to the source, then call `updateSource(...)` with
    // the updated source code.

    // The transform function passed to `createShaderModule` will be
    // reinvoked to produce the GPUShaderCode.
});

const shaderModule = device.createShaderModule({
    code: `
      [[location 0]] var<out> outColor : vec4<f32>;
      fn frag_main() -> void {
        outColor = vec4<f32>(1.0, 0.0, 0.0, 1.0);
        return;
      }
      entry_point fragment as "main" = frag_main;
    `
});
```
