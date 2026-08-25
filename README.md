# @ddtcorex/dsh-maestro-config

Shared settings service for the `dsh-maestro-*` suite. One namespaced store at
`~/.dsh/maestro/settings.json` (chmod 600), owned per-domain by each plugin.
Embeds [`@ddtcorex/dsh-maestro-config-lib`](../dsh-maestro-config-lib).

- Service `maestroConfig`: `listDomains / get / set(patch-merge) / onChange`
- Loopback RPC channel `maestro.config`: `list | get | set`

Install: `dsh plugin --profile <name> add <path-or-git-url>` (bundle patch adds row `maestro-config`). Optional layer — plugins work standalone through the embedded lib alone.
