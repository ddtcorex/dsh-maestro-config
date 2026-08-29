type RpcCall = (endpoint: string, payload?: unknown, signal?: AbortSignal) => Promise<unknown>;
export declare function Settings({ configRpcCall }: {
    configRpcCall: RpcCall;
}): import("react").DetailedReactHTMLElement<{
    'data-maestro-guard-settings': string;
    style: {
        maxWidth: number;
    };
}, HTMLElement>;
export default Settings;
//# sourceMappingURL=Settings.d.ts.map