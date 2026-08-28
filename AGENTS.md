# AGENTS.md — dsh-maestro-config

Part of the Maestro Harness suite. Optional Cordis layer over the shared Maestro
settings store; the embedded lib (`@ddtcorex/dsh-maestro-config-lib`) is the
always-present foundation, this plugin only adds service/RPC surface today and a
schema-driven Settings card later.

## Layout

- `src/host/service.ts` — pure `createMaestroConfigService({ dshHome? })`, TDD target.
- `src/host/index.ts` — Cordis apply(): provides `maestroConfig`, registers loopback RPC channel `/dsh-maestro-config` (`list|get|set`) inside `ctx.effect`.
- `src/client/index.tsx` — Settings card: registers `settings.section` id `maestro-config`, data-driven over domains via the RPC channel.
- `scripts/build-client.mjs` — wraps tsc CommonJS emit into the DSH browser loader (`lib/client.js`).
- `tests/service.spec.ts` — service contract against tmpdir homes.

## Rules

- Default branch `master`; no direct commits — use `feat/<topic>` PRs.
- Always request approval before merge or release: no `git tag v*` / `pnpm publish` / `gh release` or PR merge without explicit human `APPROVED` (see workspace `AGENTS.md` Git Rules).
- Conventional commits, imperative mood. One TDD task = one commit; never commit red.
- RPC results must be `RpcResult` (`ok/fail` helpers); `fail()` mirrors harness's synthetic bad-request details.
- Domain schemas are registered by OWNER plugins via the lib's `defineDomain`; this plugin never hardcodes domain keys.
