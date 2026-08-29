interface ClientCtx {
    get?(name: string): unknown;
    effect(fn: () => () => void, label?: string): unknown;
}
export declare const inject: readonly ["slots", "connection"];
export declare function apply(ctx: ClientCtx): void;
export {};
//# sourceMappingURL=index.d.ts.map