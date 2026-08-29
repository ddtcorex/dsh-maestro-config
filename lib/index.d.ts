import type { Context } from '@deepseek-ai/cordis';
type RpcResult<T> = {
    ok: true;
    value: T;
} | {
    ok: false;
    error: {
        code: string;
        message: string;
        details: object;
    };
};
import { type MaestroConfigService } from './service.ts';
export declare const name = "maestro-config";
export declare const inject: string[];
declare module '@deepseek-ai/cordis' {
    interface Context {
        maestroConfig: MaestroConfigService;
        connection: {
            rpc: {
                handle: (channel: string, handler: (endpoint: string, payload: unknown) => Promise<RpcResult<unknown>>, opts?: unknown) => () => void;
            };
        };
    }
}
/**
 * Publish maestroConfig over the shared store + loopback RPC for clients.
 * Exposes guard/guardBlacklist/supervisor/notifier domains (Task 1 validators)
 * via generic get/set — validation is delegated to the lib's domain validators.
 * Host also handles '/dsh-maestro-config/get' and '/dsh-maestro-config/set'
 * style calls through the single channel with endpoint dispatch.
 */
export declare function apply(ctx: Context): void;
export {};
//# sourceMappingURL=index.d.ts.map