# AGENTS.md — dsh-maestro-config

Part of the Maestro Harness suite. Optional Cordis layer over the shared Maestro
settings store; the embedded lib (`@ddtcorex/dsh-maestro-config-lib`) is the
always-present foundation, this plugin only adds service/RPC surface today and a
schema-driven Settings card later.

## Layout

- `src/host/service.ts` — pure `createMaestroConfigService({ dshHome? })`, TDD target.
- `src/host/index.ts` — Cordis apply(): provides `maestroConfig`, registers the `/dsh-maestro-config` RPC channel (`list|get|set`) inside `ctx.effect`; reachability is loopback because the browser dials the local host, not something registration requests — `rpc.handle` takes exactly `(channel, handler)`.
- `src/client/index.tsx` — Settings card: registers `settings.section` id `maestro-config`, data-driven over domains via the RPC channel.
- `scripts/build-client.mjs` — wraps tsc CommonJS emit into the DSH browser loader (`lib/client.js`).
- `tests/service.spec.ts` — service contract against tmpdir homes.

## Rules

- Default branch `master`; no direct commits — use `feat/<topic>` PRs.
- Always request approval before merge or release: no `git tag v*` / `pnpm publish` / `gh release` or PR merge without explicit human `APPROVED` (see workspace `AGENTS.md` Git Rules).
- Conventional commits, imperative mood. One TDD task = one commit; never commit red.
- RPC results must be `RpcResult` (`ok/fail` helpers); `fail()` mirrors harness's synthetic bad-request details.
- Domain schemas are registered by OWNER plugins via the lib's `defineDomain`; this plugin never hardcodes domain keys.

## Branding — Shared Logo (Settings UI)

Settings UI MUST reuse the Maestro mark declared in `src/client/components/BrandMark.tsx` — this file is the **workspace reference implementation** (it was copied from `dsh-maestro-dashboard`, which this plugin set no longer installs).

- **Mark**: `MAESTRO_MARK_PATH` = `M2 11 L5 4 L8 9 L11 4 L14 11`, `MAESTRO_MARK_STROKE_WIDTH` = `1.6`, `MAESTRO_MARK_VIEWBOX` = `0 0 16 16`, `stroke="currentColor"`.
- **Badge**: `BrandBadge({outer 28, size 16, radius 8})` `data-maestro-logo` `background:#0A84FF` `color:#fff` `border:1px solid rgba(0,0,0,0.08)` `boxShadow:0 0 0 1px var(--dsw-alias-border-l1)`. Its optional `style` prop merges over the tile so a call site can position the badge without copying its chrome. The Settings card header uses it; the settings-nav row uses `maestroMarkMaskUri()` — the same glyph as a `currentColor` mask. Never duplicate the path or use a different stroke width or background.
- **Other packages still inline their own copy, and must.** Each declares its own `dsh.client` entry and builds its own `lib/client.js`, so one plugin's client module cannot import another's; `dsh-maestro-remote`'s copy is a host-side HTML string. That duplication is structural — do not attempt a cross-plugin import.
- **Pinned** by `tests/brand-mark.spec.ts`: the constants here, and that neither `index.tsx` nor `MaestroSettings.tsx` holds a re-hardcoded literal.
- The `MaestroSettings.tsx` `<style>` block overriding `[data-maestro-logo]` with `!important` is deliberate — it beats shell styles on the badge. `#0A84FF` legitimately appears there in CSS form, which is why the pin asserts on the JS inline style, not the bare hex.
