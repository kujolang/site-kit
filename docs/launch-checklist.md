# SiteKit 1.0.0 release checklist

This checklist prepares one exact commit for human-approved tagging and a GitHub source/dist release. It never publishes npm, creates a tag, creates a GitHub release, deploys documentation, or changes repository policy.

## Stable distribution decision

- `private: true` remains intentional.
- `dist/` is the supported consumer artifact: required `sitekit.css`, optional `sitekit.js`, `fonts/`, distribution metadata, documentation, and licenses.
- The release archive is `sitekit-v1.0.0.tar.gz` with a SHA-256 checksum.
- npm registry publication, a hosted component service, universal framework support, arbitrary-composition accessibility certification, unsupported-browser parity, and behavior without documented hooks are outside v1.
- ShipCheck's Kennel-manifest and conventional-entry-point warnings are non-applicable: SiteKit is not a Kennel package or command-line/Node application, and its explicit CSS/script exports are documented.

## Exact pre-tag gate

1. Start from a clean checkout of the approved commit and use Node 20 or newer.
2. Run `npm ci` and `npm run browser:install`.
3. Run `npm run format:check`, `npm run build`, `npm run lint`, `npm run validate`, `npm run snapshot`, `npm run smoke`, and `npm test`.
4. Run `npm run generated:check`, then `git diff --check` and `git status --short`; tracked output must be unchanged.
5. Run the Chromium, Firefox, and WebKit matrix with `npm run browser:test`. Review `artifacts/browser/playwright-report/` and Lens reports under `.lens/runs/`.
6. Run `npm run release:check`. Inspect `npm pack --dry-run --json`, `artifacts/release/sitekit-v1.0.0.tar.gz`, and its `.sha256` file.
7. Confirm the clean external consumer works over `file://` and local HTTP with CSS, optional JavaScript, fonts, an inline icon, themes, semantics, and keyboard behavior.
8. Run Workcell proof and verify its receipt:

   ```bash
   ../workcell/bin/workcell run --file docs/workcell-launch-gate.json --repo . --no-pull
   ../workcell/bin/workcell verify --run .workcell/runs/<run-id> --json
   ```

9. Run ShipCheck from the sibling repository:

   ```bash
   cd ../shipcheck
   ../kujo/target/release/kujo run shipcheck.kujo gate --dir ../site-kit --format json
   ```

10. Push the candidate branch and require hosted `SiteKit CI` and `kujo-tool-artifacts-guard` evidence on the exact commit. Local proof does not replace hosted CI.

## Browser and accessibility evidence

The automated matrix covers the component lab, consumer dashboard, landing layout, documentation layout, and ecommerce layout in current Playwright Chromium, Firefox, and WebKit. Each page runs at 1440×900, 768×1024, and 390×844 in `kujo-light` and `kujo-dark`.

The matrix checks page load, local requests, automated WCAG A/AA findings, headings, landmarks, labels, tables, overflow, reduced motion, 200% text scaling, visible focus, CSS-only operation, theme state, menu/popover/drawer/dialog/tooltip Escape behavior, focus containment and restoration, and clean `file://`/HTTP consumption. Lens adds deterministic screenshots, DOM/network evidence, link checks, and axe-core reports. These checks cover SiteKit source, documented usage, and reference compositions; they are not accessibility certification for downstream pages.

Record for the exact candidate in the human handoff:

- commit SHA;
- page, browser, viewport, theme, command, and result;
- Playwright and Lens report/screenshot locations;
- known exceptions (or `none`);
- hosted workflow/run URLs and conclusions.

## Hosted CI incident procedure

If GitHub reports a job failure with no runner and no steps, inspect the check-run annotation. Record the workflow and run URL, empty step list, annotation, closest passing local evidence, and exact administrator action. For the current account-payment/spending-limit failure, an organization owner must resolve GitHub billing or increase the Actions spending limit, then rerun the failed jobs from the Actions UI or with:

```bash
gh run rerun <run-id> --repo kujolang/site-kit
```

Do not bypass organization controls or describe local results as hosted CI.

## Human-approved release and rollback

After every gate passes on the exact commit, a human may create annotated tag `v1.0.0`, push that tag, let the tag workflow rebuild and upload the archive/checksum, and create the GitHub release from those artifacts. Do not publish npm. After release, repeat the clean-consumer smoke from the downloaded archive.

If post-release verification fails, mark the GitHub release as affected, remove or replace the downloadable artifact according to repository policy, fix on a new commit and version, and publish a new tag. Do not move or force-push `v1.0.0`; preserve the failed artifact, checksum, and evidence for audit.
