# Launch Checklist

Current launch scope: `locally verified technical preview`. SiteKit's source, local browser smoke, Lens check, and Workcell proof gates pass locally. Release-candidate scope still requires broader representative visual/accessibility evidence.

## Local Gates

- [x] Build checked with `npm run build`.
- [x] Lint checked with `npm run lint`.
- [x] Component validation checked with `npm run validate`.
- [x] Snapshot generation checked with `npm run snapshot`.
- [x] Browser smoke checked with `npm run smoke`.
- [x] Formatting checked with `git diff --check`.
- [x] Workcell proof checked with `workcell run --file docs/workcell-launch-gate.json --repo . --no-pull`.
- [ ] Lens/browser matrix captured for representative consuming pages.

## Workcell Proof Notes

Workcell proof passed after building `kujolang/workcell-base:local` with `DOCKER_BUILDKIT=0`, using the Colima Workcell Docker host, and setting `TMPDIR` to a path under `/Users/robertdevore/2026/Kujolang/kujo-repos/.workcell-host-tmp` so the disposable worktree mount was visible inside the Colima VM.

Resume command:

```bash
export DOCKER_HOST=unix:///Users/robertdevore/.colima/kujo-workcell/docker.sock
export DOCKER_CONFIG=/tmp/kujo-next-batch-docker-config
export TMPDIR=/Users/robertdevore/2026/Kujolang/kujo-repos/.workcell-host-tmp
workcell run --file docs/workcell-launch-gate.json --repo . --no-pull
workcell verify --run .workcell/runs/<run-id> --json
```

## Forbidden Launch Actions

Do not publish npm packages, deploy hosted docs, create public releases, push final release tags, use live credentials, alter branch protection, or claim production/enterprise readiness from local component proof alone.
