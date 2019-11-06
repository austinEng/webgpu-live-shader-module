# WebGPU Live Shader Module

## Overview

`webgpu-live-shader-module` uses [`webgpu-shader-module-transform`](https://github.com/austinEng/webgpu-shader-module-transform) to provide an API for realtime modifications to a [`GPUShaderModule`](https://gpuweb.github.io/gpuweb/#gpushadermodule).

```typescript
import installLiveShaderModule from 'webgpu-live-shader-module';

type UpdateSourceCallback = (updatedSource: GPUShaderSource) => void;

const onShaderRegistered = (source: GPUShaderSource, updateSource: UpdateSourceCallback) => {
    // Store `source`. It is the original source code.

    // Make edits to the source, then call `updateSource(...)` with
    // the updated source code.

    // The transform function passed to `createShaderModule` will be
    // reinvoked to produce the GPUShaderCode.
};

installLiveShaderModule(onShaderRegistered);

const glsl = 'void main() { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); }';
const shaderModule = device.createShaderModule({
    code: compileGLSL(glsl, 'fragment'),
    source: glsl,
    transform: source => compileGLSL(source, 'fragment'),
});
```

If a `GPUShaderModule` is created using the `source` and `transform` descriptor members provided by `webgpu-shader-module-transform`, the application will receive a callback when the `GPUShaderModule` is used in a WebGPU command encoder. Then, the application may call the `UpdateSourceCallback` to replace the `GPUShaderModule`. All pipelines the shader module is used in are recompiled, and the changes are visible on the next usage.
