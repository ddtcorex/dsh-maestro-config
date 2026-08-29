export interface MaestroConfigService {
    /** Union of schema-registered domains and domains present in the store file. */
    listDomains(): Promise<string[]>;
    get(domain: string): Promise<unknown>;
    /** Deep-merges the patch into the domain (same semantics as the lib). */
    set(domain: string, patch: object): Promise<void>;
    onChange(cb: (domain: string) => void): () => void;
}
/**
 * Thin facade over @ddtcorex/dsh-maestro-config-lib. `dshHome` defaults to the
 * lib's resolution (explicit > DSH_HOME env > ~/.dsh); tests inject a tmpdir.
 */
export declare function createMaestroConfigService(opts?: {
    dshHome?: string;
}): MaestroConfigService;
//# sourceMappingURL=service.d.ts.map