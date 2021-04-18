declare type SourceObserver = (source: string) => void;
export interface LiveShaderSource extends String {
    new (source: string): LiveShaderSource;
    watch(observer: SourceObserver): void;
    unwatch(observer: SourceObserver): void;
    source: string;
}
export declare const LiveShaderSource: LiveShaderSource;
export {};
