# SiteKit browser performance hardening

## Repository

- SiteKit 1.2.0 on `main`, starting at `74cff7b73f2f21d658fc0219ac7f4d44f7f93efd` with a clean working tree.
- Verified implementation `009ae247e51032b5b9bca984eebd26791fa6b973`. This report is in a separate commit.
- Scope covers the optional browser controller for the source-vendored design system, including initialization, interaction, DOM writes and asset integrity. Playwright and axe are development dependencies. Kujo, ShipCheck and Workcell are CI integrations.
- [Earlier repository audit](repository-hardening.md) records prior work on generation and release efficiency.

## Baseline and findings

The static portion of `npm test` passed on the original revision. Playwright launch failed because the pinned engines were absent. The default install hit the host's disk limit, so the pinned headless engines were installed into a temporary RAM-backed volume. The original bundle was also saved before edits for the paired benchmark and browser regression probes.

| ID | Priority | Area | Finding and evidence | Action | Status |
| --- | --- | --- | --- | --- | --- |
| SK-PERF-01 | P1 | Tabs | Pairing scanned all panels per tab, reading the control ID at each comparison. Refresh and automatic keyboard activation each paired the same DOM twice, and a single selection rewrote all association and selection attributes. | Index current local panels once per pass, share pairs within a command, skip unrelated keys and write only state that changes. | Fixed |
| SK-PERF-02 | P2 | Combobox | Each arrow interaction queried options four times across filtering, result detection, navigation and the active marker. Filtering also reassigned every option's visibility even when it matched the current state. | Use one current option list per arrow interaction, detect empty results during filtering and update visibility only when needed. | Fixed |

## Changes and compatibility

- The [browser controller](../../scripts/sitekit-behavior.js) still resolves authored IDs within the widget, generates missing IDs and supports order-based fallback, nested panel ownership, disabled tabs and dynamic refresh. Tabs retain their focus, keyboard and `sk:change` contracts.
- Combobox matching stays locale-aware and continues to read current labels and disabled state. Filtering, the empty-results status, locked inputs, hidden form values and the commit event all retain their existing behavior.
- The [browser regressions](../../tests/browser/hardening.spec.mjs) assert observable mutations and user-facing outcomes across both paths. The [lifecycle documentation](../sitekit-gap-closure/API-AND-MIGRATION.md) describes current DOM resolution.
- The generator rebuilt `dist/sitekit.js` and the two manifests that hash it. The CSS and font bytes, dependency pins, package exports, CLI behavior, schemas, config, and environment inputs are unchanged. Vendored consumers can obtain the improvement by copying a verified distribution as a unit.

## Performance

The benchmark uses connected generated widgets and dispatches real DOM events in pinned headless Chromium 151.0.7922.34 on Intel macOS 26.6.2 with Node 26.12.1. Each sample checks visible and selected state. Results are medians and ranges of seven measured samples per bundle. Bundle order alternates with a warm-up sample for each. The fixture excludes app CSS, network and page loading. Sample variability reflects host contention and browser layout work.

| Interaction batch | Baseline median, ms (range) | Updated median, ms (range) |
| --- | ---: | ---: |
| 12 tabs, 100 arrow presses | 136.8 (100.5–224.2) | 90.4 (42.3–254.4) |
| 200 tabs, 100 arrow presses | 2,190.1 (1,911.0–3,019.7) | 269.7 (154.6–414.2) |
| 50 options, 32 filter-and-navigate cycles | 82.3 (56.8–237.3) | 75.9 (28.1–207.0) |
| 1,000 options, 32 filter-and-navigate cycles | 1,063.2 (868.3–1,738.5) | 887.5 (550.6–1,047.5) |

Each combobox cycle types one query and presses Down twice. The 200-tab batch took 88% less time. Enhancement for that fixture also fell from 15.8 ms to 2.1 ms. The 1,000-option batch median fell 17% with overlapping ranges. Timing for small fixtures overlapped substantially. Stable DOM checks observed nine attribute writes for an unrelated key in the baseline Tabs fixture and zero with the fix. An arrow over unchanged Combobox results went from one redundant visibility write to zero.

The optional JS bundle grew from 40,504 to 41,442 bytes, or from 10,007 to 10,225 bytes using Node's default gzip settings. The [benchmark](../../tests/bench/widgets.mjs) accepts baseline and updated bundle paths. There is no timing budget to adjust when workload size changes. The browser gate checks unnecessary writes directly.

## Checklist coverage

| Phase | Evidence or scope |
| --- | --- |
| 0–1 · Repository and baseline | Read the controller, generated distribution, lifecycle, component schemas, fixture and CI entry points. Captured the baseline bundle and ran the original static gates. |
| 2–4 · Complexity, runtime and resources | Traced duplicated DOM queries, repeated mutations and association lookup. The new map and option list live for a single call and do not require invalidation. The remainder of the inspected controller uses existing weak lifecycle state and owned listeners/observers. Heap and page-load timing were outside this interaction benchmark. |
| 5–6 · Context and output | SiteKit exposes an index, per-component schema and copyable example before detailed manifests. The browser runtime has no model prompts, tool registration, retries, replay, handoff or command output. Benchmark outputs retain raw samples and the browser gates retain traces on failure. |
| 7–10 · Failure, security, lifecycle and contracts | Checked native locked combobox paths, disabled navigation, dynamic refresh, scoped element resolution and release manifests. The edits add no new network, storage, HTML insertion, or executable input boundary. Existing editor serialization, theme storage, CLI staging/recovery and build exclusivity were outside implementation scope. This was a performance pass. |
| 11–13 · Dependencies, tests and CI | Runtime remains dependency-free. Existing CI automatically runs the mutation and accessibility regressions. The benchmark is repeatable and intentionally has no wall-clock threshold. |
| 14–16 · Documentation, agent experience and dead weight | Updated the affected lifecycle contract. Existing schemas, generated indexes, compatibility bundles, synthetic examples and distribution contents continue to be supported inputs. No assets or interfaces were removed. |
| 17–18 · Implementation and verification | See changes, performance measurements and verification receipt. |

## Cross-repository follow-ups and remaining work

No required changes in other repositories. No open product findings admitted at P0–P3 in the measured scope. Whole-page load and heap performance remain unmeasured. The local verification did not reproduce the pinned Linux Workcell job or the Node 22 and 24 CI variants.

## Verification receipt

Browser commands used the scratch volume configured below.

```sh
export TMPDIR=/Volumes/SiteKitBrowserScratch/tmp
export PLAYWRIGHT_BROWSERS_PATH=/Volumes/SiteKitBrowserScratch/browsers
```

| Command | Outcome |
| --- | --- |
| `npm ci` and `npm audit --json` | Passed with existing npm configuration/install-script warnings. No advisories reported. |
| `npm test` at the starting revision | Static checks passed. Browser launch reported missing pinned engines. The run was stopped after repeated launch failures. |
| `node node_modules/@playwright/test/cli.js install --only-shell chromium firefox webkit` | Passed on the scratch volume after the default installation hit ENOSPC. |
| `node node_modules/@playwright/test/cli.js test -c artifacts/audit/widgets-chrome.config.mjs hardening.spec.mjs --grep 'tabs resolve\|combobox reuses' --workers=1` | Current bundle passed both cases in local Chrome. The same cases run from a scratch fixture with the baseline JS failed their mutation assertions. |
| `node tests/bench/widgets.mjs artifacts/audit/sitekit-baseline.js dist/sitekit.js` | Passed selected-state checks for all workloads on both bundles. Baseline was extracted with `git show 74cff7b:dist/sitekit.js`. |
| `npm run test:static` | Passed formatting, build, tooling and CLI tests, lint, schema and distribution validation, snapshot, smoke and release packaging. |
| `npm run generated:check` | Passed two deterministic build and snapshot rounds against the implementation commit. |
| `npm run browser:test -- --workers=6 --output=/Volumes/SiteKitBrowserScratch/results` | Passed on pinned Chromium, Firefox and WebKit with 681 passes, 72 expected skips, zero failures and zero flakes. |
| `kujo run shipcheck.kujo gate --dir ../site-kit --format json` from the local ShipCheck checkout | Passed with two Kujo metadata warnings and zero failed errors. Used the local versions. |
| `git diff --check` and `bash .github/scripts/check-kujo-tool-artifacts.sh 74cff7b HEAD` | Passed. |
