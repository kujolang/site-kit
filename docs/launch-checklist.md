# Launch Checklist

Current launch scope: `locally verified technical preview`. SiteKit's source and local browser smoke gates pass, but release-candidate scope still requires Workcell proof and broader representative visual/accessibility evidence.

## Local Gates

- [x] Build checked with `npm run build`.
- [x] Lint checked with `npm run lint`.
- [x] Component validation checked with `npm run validate`.
- [x] Snapshot generation checked with `npm run snapshot`.
- [x] Browser smoke checked with `npm run smoke`.
- [x] Formatting checked with `git diff --check`.
- [ ] Workcell proof checked with `workcell run --file docs/workcell-launch-gate.json --repo .`.
- [ ] Lens/browser matrix captured for representative consuming pages.

## Current External Blocker

Workcell proof is blocked by the local Docker image build/pull path, not by SiteKit source behavior. The Workcell base image could not be fetched from Docker Hub because `auth.docker.io` timed out.

Closest equivalent proof: native Node build, lint, validate, snapshot, and browser smoke gates.

Safe resume command:

```bash
cd /Users/robertdevore/2026/Kujolang/kujo-repos/workcell
DOCKER_HOST=unix:///Users/robertdevore/.colima/kujo-workcell/docker.sock docker build --tag kujolang/workcell-base:local docker/
cd /Users/robertdevore/2026/Kujolang/kujo-repos/site-kit
workcell run --file docs/workcell-launch-gate.json --repo .
```

## Forbidden Launch Actions

Do not publish npm packages, deploy hosted docs, create public releases, push final release tags, use live credentials, alter branch protection, or claim production/enterprise readiness from local component proof alone.
