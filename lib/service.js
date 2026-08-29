import * as lib from '@ddtcorex/dsh-maestro-config-lib';
/**
 * Thin facade over @ddtcorex/dsh-maestro-config-lib. `dshHome` defaults to the
 * lib's resolution (explicit > DSH_HOME env > ~/.dsh); tests inject a tmpdir.
 */
export function createMaestroConfigService(opts) {
    const libOpts = opts?.dshHome ? { dshHome: opts.dshHome } : undefined;
    return {
        async listDomains() {
            const doc = await lib.load(libOpts);
            return [...new Set([...lib.definedDomains(), ...Object.keys(doc.domains)])];
        },
        async get(domain) {
            return lib.get(domain, libOpts);
        },
        async set(domain, patch) {
            await lib.set(domain, patch, libOpts);
        },
        onChange(cb) {
            return lib.onChange(cb);
        },
    };
}
//# sourceMappingURL=service.js.map