!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.beta=t():e.beta=t()}("undefined"!=typeof self?self:this,(function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=1)}([function(e,t,r){"undefined"!=typeof self&&self,e.exports=function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";r.r(t),r.d(t,"default",(function(){return a}));var n=void 0;navigator.gpu&&(n=GPUDevice.prototype.createShaderModule);var o={code:void 0,label:void 0};function i(e){return e.transform&&e.source?o.code=e.transform(e.source):o.code=e.code,n.call(this,o)}function a(){navigator.gpu&&n!==i&&(GPUDevice.prototype.createShaderModule=i)}}])},function(e,t,r){"use strict";r.r(t);var n=function(e){return e&&{module:e.module,entryPoint:e.entryPoint}},o=function(e){return e&&{frontFace:e.frontFace,cullMode:e.cullMode,depthBias:e.depthBias,depthBiasSlopeScale:e.depthBiasSlopeScale,depthBiasClamp:e.depthBiasClamp}},i=function(e){return e&&{format:e.format,alphaBlend:e.alphaBlend,colorBlend:e.colorBlend,writeMask:e.writeMask}},a=function(e){return e&&{compare:e.compare,failOp:e.failOp,depthFailOp:e.depthFailOp,passOp:e.passOp}},u=function(e){return e&&{format:e.format,depthWriteEnabled:e.depthWriteEnabled,depthCompare:e.depthCompare,stencilFront:a(e.stencilFront),stencilBack:a(e.stencilBack),stencilReadMask:e.stencilReadMask,stencilWriteMask:e.stencilWriteMask}},s=function(e){return e&&{offset:e.offset,format:e.format,shaderLocation:e.shaderLocation}},p=function(e){if(e){if(!e.attributeSet)throw new Error("Missing attributeSet");if("function"!=typeof e.attributeSet[Symbol.iterator])throw new Error("attributeSet is not iterable");return{stride:e.stride,stepMode:e.stepMode,attributeSet:Array.from(e.attributeSet,s)}}},c=function(e){if(e){if(e.vertexBuffers&&"function"!=typeof e.vertexBuffers[Symbol.iterator])throw new Error("vertexBuffers is not iterable");return{indexFormat:e.indexFormat,vertexBuffers:e.vertexBuffers&&Array.from(e.vertexBuffers,p)}}},d="__WEBGPU_LIVE_SHADER_INFO__",l=function(){return Math.random().toString(36).substring(2,15)};function f(e,t,r){if(d in r)return r[d];var n={device:e,descriptor:t,id:l(),generation:0};return r[d]=n,n}function g(e){return e[d]}function m(e){return e[d]}var h=function(){function e(e,t){this._registrationGeneration=1,this._shaderModuleUpdates=new Map,this._fn=e,this._onShaderRegistered=t}return e.prototype.createShaderModule=function(e,t){t=function(e){return e&&{code:e.code,source:e.source,transform:e.transform}}(t);var r=this._fn.createShaderModule.call(e,t);return f(e,t,r),r},e.prototype.createRenderPipeline=function(e,t){t=function(e){if(e){if(!e.colorStates)throw new Error("Missing colorStates");if("function"!=typeof e.colorStates[Symbol.iterator])throw new Error("colorStates is not iterable");return{layout:e.layout,vertexStage:n(e.vertexStage),fragmentStage:n(e.fragmentStage),primitiveTopology:e.primitiveTopology,rasterizationState:o(e.rasterizationState),colorStates:Array.from(e.colorStates,i),depthStencilState:u(e.depthStencilState),vertexInput:c(e.vertexInput),sampleCount:e.sampleCount,sampleMask:e.sampleMask,alphaToCoverageEnabled:e.alphaToCoverageEnabled}}}(t);var r=this._fn.createRenderPipeline.call(e,t);return function(e,t,r){if(d in r)return r[d];var n={device:e,descriptor:t,registrationGeneration:0,vertexStageGeneration:0,fragmentStageGeneration:0,computeStageGeneration:0};r[d]=n}(e,t,r),r},e.prototype.createComputePipeline=function(e,t){t=function(e){return e&&{layout:e.layout,computeStage:n(e.computeStage)}}(t);var r=this._fn.createComputePipeline.call(e,t);return function(e,t,r){if(d in r)return r[d];var n={device:e,descriptor:t,registrationGeneration:0,vertexStageGeneration:0,fragmentStageGeneration:0,computeStageGeneration:0};r[d]=n}(e,t,r),r},e.prototype.registerShaderStage=function(e){var t=this;if(e&&e.module){var r=g(e.module);this._onShaderRegistered&&r.descriptor.source&&r.descriptor.transform&&this._onShaderRegistered(r.descriptor.source,(function(e){t._shaderModuleUpdates.set(r.id,e)}))}},e.prototype.registerRenderPipelineShaders=function(e){var t=m(e);if(t.registrationGeneration!==this._registrationGeneration){t.registrationGeneration=this._registrationGeneration;var r=t.descriptor;this.registerShaderStage(r.vertexStage),this.registerShaderStage(r.fragmentStage)}},e.prototype.registerComputePipelineShaders=function(e){var t=m(e);if(t.registrationGeneration!==this._registrationGeneration){t.registrationGeneration=this._registrationGeneration;var r=t.descriptor;this.registerShaderStage(r.computeStage)}},e.prototype.updateShaderStage=function(e){if(e&&e.module){var t=g(e.module);if(this._shaderModuleUpdates.has(t.id)){var r=this._shaderModuleUpdates.get(t.id);t.descriptor.source=r,this._shaderModuleUpdates.delete(t.id);try{var n=this._fn.createShaderModule.call(t.device,t.descriptor);f(t.device,t.descriptor,n),Object.assign(g(n),t),t.replacement=n,t.generation+=1}catch(e){console.error(e)}}return t.generation}},e.prototype.updatePipeline=function(e){if(0!==this._shaderModuleUpdates.size){var t=m(e),r=t.descriptor,n=void 0,o=void 0,i=void 0;"vertexStage"in r&&(n=this.updateShaderStage(r.vertexStage)),"fragmentStage"in r&&(o=this.updateShaderStage(r.fragmentStage)),"computeStage"in r&&(i=this.updateShaderStage(r.computeStage));var a=void 0!==n&&n!==t.vertexStageGeneration,u=void 0!==o&&o!==t.fragmentStageGeneration,s=void 0!==i&&i!==t.computeStageGeneration;(a||u||s)&&(a&&(r.vertexStage.module=g(r.vertexStage.module).replacement),u&&(r.fragmentStage.module=g(r.fragmentStage.module).replacement),s&&(r.computeStage.module=g(r.computeStage.module).replacement),a||u?t.replacement=this._fn.createRenderPipeline.call(t.device,r):s&&(t.replacement=this._fn.createComputePipeline.call(t.device,r)))}},e.prototype.setRenderPipeline=function(e,t){return this.registerRenderPipelineShaders(t),this.updatePipeline(t),t=m(t).replacement||t,this._fn.setRenderPipeline.call(e,t)},e.prototype.setComputePipeline=function(e,t){return this.registerComputePipelineShaders(t),this.updatePipeline(t),t=m(t).replacement||t,this._fn.setComputePipeline.call(e,t)},e}(),S=r(0),v=r.n(S);function y(e){if(navigator.gpu){v()();var t=new h({createShaderModule:GPUDevice.prototype.createShaderModule,createRenderPipeline:GPUDevice.prototype.createRenderPipeline,createComputePipeline:GPUDevice.prototype.createComputePipeline,setRenderPipeline:GPURenderPassEncoder.prototype.setPipeline,setComputePipeline:GPUComputePassEncoder.prototype.setPipeline},e);Object.assign(GPUDevice.prototype,{createShaderModule:function(e){return t.createShaderModule(this,e)},createRenderPipeline:function(e){return t.createRenderPipeline(this,e)},createComputePipeline:function(e){return t.createComputePipeline(this,e)}}),Object.assign(GPURenderPassEncoder.prototype,{setPipeline:function(e){return t.setRenderPipeline(this,e)}}),Object.assign(GPUComputePassEncoder.prototype,{setPipeline:function(e){return t.setComputePipeline(this,e)}})}}r.d(t,"default",(function(){return y}))}])}));
//# sourceMappingURL=index.js.map