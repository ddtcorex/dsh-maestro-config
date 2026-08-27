# Contributing to dsh-maestro-config

Thank you for contributing to **dsh-maestro-config** (`@ddtcorex/dsh-maestro-config`) — the optional Cordis layer over the shared Maestro settings store (`~/.dsh/maestro/settings.json`, chmod 600). The embedded lib (`@ddtcorex/dsh-maestro-config-lib`) is the always-present foundation; this plugin adds the `maestroConfig` service, loopback RPC channel `/dsh-maestro-config`, and schema-driven Settings card.

## Getting Started

1. **Fork and clone** `github.com/ddtcorex/dsh-maestro-config`.
2. Install dependencies (requires Node.js 20+, pnpm 10+):

   ```bash
   pnpm install
   ```

3. Build the Host + Client plugin (TypeScript → `lib/`):

   ```bash
   pnpm build        # tsc -p tsconfig.json && tsc -p tsconfig.client.json && node scripts/build-client.mjs
   ```

4. Open the project in your editor. Key layout:

   ```
   src/host/service.ts   # pure createMaestroConfigService({ dshHome? }), TDD target
   src/host/index.ts     # Cordis apply(): provides maestroConfig, loopback RPC /dsh-maestro-config
   src/client/index.tsx  # Settings card: settings.section id maestro-config, data-driven via RPC
   scripts/build-client.mjs  # wraps tsc CommonJS emit into DSH browser loader (lib/client.js)
   tests/service.spec.ts # service contract against tmpdir homes
   cordis.patch.yml      # Host+Client row: maestro-config
   ```

## Workflow

This repository follows the workspace Superpowers workflow described in `AGENTS.md` for any non-trivial change:

1. **brainstorming** — explore intent, requirements, and design before writing code.
2. **writing-plans** — turn the approved design into a task-by-task plan with exact test and implementation sketches. Plans are transient — delete them once the batch ships.
3. **executing-plans** — implement task by task with strict **TDD**: write a failing test first, verify RED, implement, verify GREEN, then commit that task before starting the next. Do not commit while tests are red.

For small single-file fixes, a focused PR with tests still applies. Describe durable outcomes in the PR body.

## Branch Naming

Never commit directly to `master`. Start a feature branch per work session:

- `fix/<topic>` — bug fixes
- `feat/<topic>` — new features (new domain, Settings card, RPC method)
- `docs/<topic>` — documentation-only changes

Rebase (not merge) when the base moves: `git fetch origin && git rebase origin/master`.

## Conventional Commits

All commit subjects **must** follow [Conventional Commits](https://www.conventionalcommits.org/) in imperative mood:

```
<type>(<scope>): <subject>

<body — why, not what>

Refs: #<issue>
```

- **Types (closed list):** `feat` `fix` `docs` `chore` `refactor` `perf` `test` `build` `ci` `revert`
- **Scope:** optional, without the `dsh-maestro-` prefix — e.g. `feat(config):`, `fix(rpc):`, `docs(readme):`
- **Subject:** imperative, lowercase first word, ≤ 72 chars, no trailing period
- **Body:** explain *why* and trade-offs when non-trivial
- **Breaking changes:** `feat!: <subject>` plus a `BREAKING CHANGE:` footer

One TDD task = one commit while executing a plan; squash at merge time if the history reads better squashed.

## Validation

Run these before opening a PR (match depth to risk):

```bash
pnpm verify      # typecheck — tsc --noEmit host + client
pnpm test        # vitest run
pnpm build       # tsc host + client && node scripts/build-client.mjs -> lib/
```

Additional checks when relevant:

```bash
# Verify the client bundle was rebuilt
test -f lib/index.js && test -f lib/client.js && echo "build OK" || echo "FAIL"

# Full workspace verify (13 packages)
pnpm --dir ../../maestro-workspace -r verify
```

Do not claim verified/done/clean without having actually run the checks — be ready to paste exact command output in the PR.

## Pull Requests

1. Push your branch and open a PR into `master`.
2. Fill out `.github/PULL_REQUEST_TEMPLATE.md` (Summary, Why, Changes, Validation, Linked Issues).
3. Link the PR to the plan that produced it when the Superpowers workflow was used.
4. Ensure CI (`pnpm verify` / `pnpm test` / `pnpm build` via `dsh-maestro-ci`) is green.

## Package Visibility

This package is public (`"private": false` — field omitted would also default to public, but we set it explicitly). Never set `"private": true` in `package.json`. Publishing uses `pnpm publish --access public` only — never `npm publish` (would leave `workspace:` in the tarball).

Verify before publish:

```bash
grep '"private": false' package.json
pnpm publish --dry-run 2>&1 | grep -q "workspace:" && echo "FAIL workspace left" || echo "OK"
```

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you agree to its terms.

## Questions or Security Reports

- General questions: open a GitHub Discussion or issue.
- Contact maintainer: [kaido4492@gmail.com](mailto:kaido4492@gmail.com)
- Security vulnerabilities: use GitHub's private advisory reporting at `https://github.com/ddtcorex/dsh-maestro-config/security/advisories` — do not file a public issue.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](./LICENSE).
