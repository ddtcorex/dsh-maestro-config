# Changelog

All notable changes to this project are documented in this file. Format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/); this project uses
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] - 2026-09-02

### Added

- **Row-based mappings editor** — replace placeholder JSON editor with row-based mappings UI for better UX.

### Fixed

- **Maestro Access redesign + mobile friendly** (#33).

### Changed

- Refresh client type map for mappings editor.


## [0.1.1] - 2026-08-28

Supervisor model support on the Settings card.

### Added

- **Supervisor LLM model picker** in the Settings UI — domain `supervisor` exposes
  `supervisorModel` (e.g. `google/gemini-2.5-pro`, `anthropic/claude-4-sonnet`)
  with a model-aware `reasoningEffort` filter so only capabilities supported by
  the selected model are offered.

### Fixed

- **Reasoning effort options filtered per model capability** — `reasoningEffort`
  choices are now gated by the selected model's supported set, preventing an
  invalid effort/model combination from being persisted.
- **Config-lib dependency made publishable** — switched from `workspace:^` lock
  artifact to `^0.1.1` for releases and re-added the sibling `pnpm-workspace.yaml`
  entry so local installs still resolve the sibling; enforces `pnpm publish`
  rewriting to a real semver range.

### Changed

- CI / release unified through the reusable `ddtcorex/dsh-maestro-ci` workflows
  (`node-plugin.yml` for verify, `node-release.yml` for tag releases);
  community files and `private: false` added per public checklist.

## [0.1.0] - 2026-08-26

Initial release of `@ddtcorex/dsh-maestro-config`, the optional Cordis layer
over the shared Maestro settings store (`~/.dsh/maestro/settings.json`, chmod 600).
The embedded lib (`@ddtcorex/dsh-maestro-config-lib`) is the always-present
foundation; this plugin adds the service/RPC surface and schema-driven Settings card.

### Added

- **Service `maestroConfig`** — `listDomains()`, `get(domain)`, `set(domain, patch)`,
  `onChange(cb)` thin facade over `@ddtcorex/dsh-maestro-config-lib` (load/deep-merge
  with atomic file lock, domain validators via `defineDomain`, unknown domains/keys
  survive round-trips; `dshHome` injectable for tests).
- **Loopback RPC channel `/dsh-maestro-config`** — endpoints `list | get | set`
  registered inside `ctx.effect` with `RpcResult` `ok/fail` helpers (synthetic
  `bad-request` details mirroring harness validation).
- **Settings card (client)** — `settings.section` id `maestro-config` (legacy
  Maestro card port) data-driven over domains via RPC; registers the Maestro
  glyph in the settings nav (audio-lines icon) and ships as `lib/client.js`
  via `scripts/build-client.mjs` (tsc + esbuild DSH ModuleLoader wrapper).
- **Cordis row `maestro-config`** via `cordis.patch.yml` and `lib/` flat emit
  (`tsconfig.json` `rootDir: src/host` → `lib/index.js`, `allowBuilds.esbuild: true`).

[0.1.1]: https://github.com/ddtcorex/dsh-maestro-config/releases/tag/v0.1.1
[0.1.0]: https://github.com/ddtcorex/dsh-maestro-config/releases/tag/v0.1.0
