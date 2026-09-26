# SiteKit repository hardening — 2026-09-22

## Repository and scope

- Repository: `kujolang/site-kit` (SiteKit 1.0.0); branch: `main`.
- Starting SHA: `9629c4cb2a42f62f80be6159c9d63a141ccbb696`; working tree initially clean.
- Ending audited implementation SHA: `789c5f32d6fb8e4d8ba3a299120ee908d0d58e86`. The following audit-publication commit changes documentation/evidence and the local audit-artifact ignore rule only; its own hash is available through `git log -1 -- docs/audits/repository-hardening.md`.
- Purpose: source-vendored semantic HTML/CSS design system, 86 components, optional browser enhancement. `dist/` is the public artifact; preserve sibling fonts and icons. No backend, authentication service, hosted renderer, model provider, or MCP server.
- Dependencies: no runtime npm dependencies; pinned development Playwright 1.62.1 and axe-core Playwright 4.12.1. Bundled Departure Mono and Tabler icons retain licenses. Kujo/ShipCheck are CI-only integrations. Known consumers include sitekit.kujolang.ai, sitekit-docs-template, docs.kujolang.ai, and other Kujo sites that vendor assets; no sibling repository was changed.

## Baseline

`npm test` passed static formatting, build, lint, schema/metadata/version/link/distribution validation, snapshot, smoke, and deterministic package-content checks. Browser launch then failed because pinned Chromium binaries were absent; that run was interrupted after repeated equivalent launch failures. `npm run browser:install` installed the exact package-pinned engines. The subsequent browser baseline used unchanged distribution bytes, with the hardened test server and byte-equivalent generator. It is therefore a runtime baseline, not an untouched-tooling rerun. Result: 529 passed, 56 existing skips, three aggregated-test timeouts (16.8 minutes). New defect regressions run against the original bundle failed in all 18 cases; two cases also exhausted their temporary runner’s 30-second deadline under concurrent load. Separate probes confirmed year remapping, disabled-input mutation, stale opener state, and the server crash.

Baseline measurements: `node artifacts/audit/measure-generation.cjs`, five runs through its benchmark wrapper, and SHA-256 capture of generated files. Reusable measurement code is now in `tests/bench/`. The standalone generator-only source measurement excluded scripts/module loads consistently. Full logs remain locally in `docs/audits/evidence/*.log` (ignored); small JSON receipts are versioned. Node v26.7.0, npm 11.19.0, macOS. Concurrent host/browser work affected wall-clock samples; no speedup or memory-saving claim is made.

`npm audit --json` returned zero known advisories. This is an advisory-database result, not proof that dependencies contain no vulnerabilities. Package lock integrity, pinned actions, archive allowlist, private package boundary and license copying were inspected. `npm outdated --json` found newer development releases (axe Playwright 4.13.0 and Playwright 1.63.0); current/wanted versions still match the exact pins. No advisory or required behavior justified changing browser engines and visual baselines in this pass.

## Findings

| ID | Priority | Area | Finding and evidence | Action | Status |
| --- | --- | --- | --- | --- | --- |
| SK-01 | P1 | Correctness | Calendar year `0096` rendered dates in `1996`; multi-argument Date construction remaps years 0–99. Baseline probe and browser regressions reproduce it. | Use explicit full-year local-noon construction throughout month/day arithmetic; constrain navigation to documented years 0001–9999. | Fixed; verified |
| SK-02 | P1 | Native state | Calendar clicks changed disabled, readonly, and disabled-fieldset date inputs and emitted change events. | Guard selection/navigation against current native state; disable generated controls when rendering. | Fixed; verified |
| SK-03 | P2 | Accessibility | Dynamically inserted modal opener opened its dialog but had no `aria-expanded`; captured opener array became stale. | Resolve current targeting controls whenever state synchronizes; remove unused opener/close-control snapshots. | Fixed; verified |
| SK-04 | P2 | Security/reliability | Uncaught percent decoding on `GET /%` terminates the loopback fixture server (CWE-248, low severity). Lexical-only file containment also lacked symlink/hidden-path hardening. | Shared fixture server validates requests and real paths, rejects hidden/escaped/non-file targets, handles stream failures and disconnects; release test closes server in finally. | Fixed; verified |
| SK-05 | P2 | Efficiency | Contract generation made 1,099 reads of 548 distinct files; package.json was read 87 times; token manifest was written then immediately reparsed. | Invocation-local source/JSON reuse; build token document in memory; no cache survives a generation call. | Fixed; verified |
| SK-06 | P1 | Regression gates | `git diff` missed untracked and staged generated drift. Tagged workflow checked a narrower output list. | Check generated status against HEAD after two builds; reuse the full gate for tagged releases; isolated failure-path tests. | Fixed; verified |
| SK-07 | P2 | CI reproducibility | Kujo/ShipCheck checkouts followed mutable default branches. | Pin remote-verified current commits; Cargo --locked; document updates. | Fixed; verified |
| SK-08 | P2 | Verification | A 120-second test aggregated ten accessibility scans; the mobile-menu test aggregated nine viewport/theme scans under 60 seconds. Baseline timed out once in Chromium and twice in Firefox/WebKit. | Split both matrices into separately identifiable cases with unchanged engine/fixture/theme coverage and assertions. | Fixed; verified |
| SK-09 | P2 | Documentation | README implied automated GitHub Release availability; workflow prepares Actions artifacts only. | State that publication is a separate maintainer step. | Fixed; verified |

## Changes and compatibility

- `scripts/generate-contracts`: file contents and parsed JSON live only inside `generate()`. The first optimized generation produced byte-identical CSS, documentation, manifests, catalog and distribution. `tests/tooling/generation.test.cjs` compares output bytes, limits reads to one per source, observes changed version metadata in a second call, and rejects newly invalid JSON. Sources must remain stable during one build; this is not an atomic filesystem snapshot.
- `scripts/check-generated`, CI and release workflows: direct Node child processes replace four nested npm launches. Child failures remain fatal. Drift errors name files rather than printing full generated diffs. The gate intentionally rejects staged changes too; commit intentional generated updates before running it. Tooling tests cover clean output, unrelated changes, staged/untracked/ignored/modified output, nondeterminism and generator failure.
- `tests/helpers/static-server.mjs`, browser fixture and release-content test: shared asynchronous file resolution and streaming remove duplicate server logic. GET/HEAD are supported; malformed requests return 400, unsupported methods 405, missing/hidden/outside targets 404, unexpected read errors 500. Stream errors remain diagnostic and disconnected clients release streams. This is a trusted-checkout loopback fixture, not a production hardened web host or protection against a concurrent malicious filesystem writer.
- `scripts/sitekit-behavior.js`: preserves date-only local arithmetic, leap years, min/max and native input/change events; prevents mutations of unavailable native inputs and repairs dynamic opener state. Browser regressions cover years 0096/0100/2000, endpoint navigation, disabled/readonly/fieldset state, modal close/focus restoration. Shipped runtime and manifest hashes are regenerated from source, never edited manually.
- Browser reporting uses compact dots; HTML/JSON reports, failure traces and screenshots remain configured. Existing accessibility assertions are retained when split into independent tests.
- Public API signatures (`enhance`, `dispose`, `prefixIds`, `serializeEditor`), exports, CSS/classes, component schemas, file-format versions, consumer configuration and environment variables are unchanged. Date interaction and modal state changes fix bugs within existing contracts. No consumer migration or sibling change is required; vendored consumers receive fixes when they next copy the complete `dist/` artifact.

| Contract | Result |
| --- | --- |
| Public browser API and package exports | Unchanged signatures and paths. |
| CLI behavior | Additive `test:tooling`; generated check now rejects staged/untracked/ignored output drift. |
| Serialization/file formats and component schemas | No schema/version change; runtime hash updates are expected. |
| Consumer config/environment variables | Unchanged. |
| Development configuration | Compact Playwright reporter; stronger CI gates and pinned external revisions. |
| External consumers | No migration; copy the rebuilt distribution as a unit to receive fixes. |

## Performance and efficiency

| Measurement | Before | After | Interpretation |
| --- | ---: | ---: | --- |
| Contract generation file reads | 1,099 | 547 | Instrumented repository data reads; script/module loads excluded in both runs. |
| Maximum reads of one source | 87 | 1 | Stable CI regression gate. |
| Bytes read, identical-source optimization probe | 1,543,231 | 719,371 | Exact pre/post generator-only measurement; later package metadata edits change byte totals slightly. |
| Generated bytes after generator-only change | Baseline SHA-256 set | Identical | `baseline-hashes.json` and `generation-hashes-after.json`. |
| Nested npm launches in generated check | 4 | 0 | Direct Node preserves the same two build/snapshot rounds. |
| Runtime npm dependencies | 0 | 0 | No dependency added. |
| CSS distribution | 127,533 bytes | 127,533 bytes | No visual redesign intended. |
| JavaScript distribution | 39,818 bytes | 40,158 bytes | Correctness guards add a small amount of code; no runtime latency improvement claimed. |

Timing and peak RSS samples are retained in `baseline-generation.json` and `after-generation.json`. The source cache trades bounded build-lifetime memory for fewer reads; RSS samples do not establish a memory improvement. The entire release payload is small (baseline dist disk usage about 256 KiB); streaming archive generation or runtime caching would add complexity without measured need.

Agent/context review: AGENTS.md is 1,394 bytes; DESIGN.md 11,111 bytes; the detailed component manifest 546,909 bytes. Existing instructions direct readers to relevant schemas. Keep the manifest as detailed evidence and use the component index plus selected schema for normal work. There are no model prompts, tool schemas, retries or conversation replays to optimize. No tokenizer measurement or token-saving claim is made.

## Security and resource review

Independent baseline and architecture reviews covered the browser runtime, build/generation/release tools, schemas, local fixture server and CI boundaries. Parent review included browser tests, example scripts, metadata validators and source consumers. Canonical security evidence is local under `artifacts/security/sitekit-hardening-20260922/`, bound to the starting revision; the sealed finding is `csf_f2287d906327366947b09f20`. Its low severity reflects loopback-only developer tooling exposure. The baseline security bundle is not rewritten to erase the fixed finding.

Editor serialization reconstructs allowed HTML and safe absolute http/https/mailto links; plain-text paste and rejected drops remain covered. Theme persistence uses a fixed allowlist and tolerates storage denial. Clipboard writes remain user-triggered with failure guidance. Repository-owned HTML/templates are trusted build inputs; the generator's source checks are not an arbitrary HTML sanitizer. Downstream applications still own server-side validation and content insertion.

WeakMap/WeakSet lifecycle state and explicit dispose release listeners/ResizeObservers. There is no global polling, unbounded network retry, runtime cache, database, shared queue or backend persistence. Detached DOM must be disposed by the consumer as documented. Fixed build destinations and archive payload lists remain intact; builds assume exclusive checkout access. No architectural rewrite or extra runtime abstraction was justified.

Bulk non-executable assets were checked through schema, semantic, hash, source-validation and browser gates rather than claimed as individually security-audited code. No dead-code deletion beyond demonstrably unused control snapshots; ignored historical `old-components/` is outside shipped/generated inputs and was preserved.

## Cross-repository follow-ups and remaining work

No required cross-repository change. Kujo `cf785c0a7953717af16b657cda05b85d628144c5` and ShipCheck `111bfc83c832050877cb9d4fd82908aaf6d14749` matched remote main when inspected and the local gate was exercised. ShipCheck reports two non-blocking warnings for absent kennel metadata and a Kujo entry point; SiteKit is deliberately a private Node-built browser distribution, so adding fake Kujo metadata would be incorrect.

- P0/P1: none remain.
- P2/P3: no accepted unresolved product findings.
- Needs more evidence: browser/OS accessibility certification and hosted consumer security are outside repository tests; no such certification is claimed. Remote CI execution and exact Node 20 coverage are distinct from local Node 26 verification.
- Not worth changing: small in-memory deterministic tar payload, established source schemas and compatibility aliases, concise agent instructions, source-vendored dependency-free runtime.

## Verification receipt

Commands below ran from SiteKit unless an alternate working directory is stated. Logs/receipts are in `docs/audits/evidence/`; large browser traces/screenshots are local under `artifacts/browser/` and preserved baseline copies under `artifacts/audit/`.

| Exact command | Result |
| --- | --- |
| `npm test` (starting checkout) | Static gates passed; browser launch failed for absent pinned binaries; interrupted equivalent launch failures. |
| `npm run browser:install` | Passed; installed pinned Chromium, Firefox and WebKit. |
| `node node_modules/@playwright/test/cli.js test --reporter=dot` | Baseline: 529 passed, 56 skipped, 3 timeouts; no assertion weakened to accommodate them. |
| `node node_modules/@playwright/test/cli.js test -c artifacts/audit/runtime.config.mjs` | Original bundle: 18 failed (including two timeout cases); rebuilt bundle: 18 passed in 21.2 seconds. |
| `node artifacts/audit/server-probe.cjs` | Reproduced baseline GET /% → exit 1 with URIError. Probe only changed original fixture port to an ephemeral port. |
| `node artifacts/audit/measure-generation.cjs` and `node artifacts/audit/benchmark-generation.cjs` | Baseline instrumented reads and five samples recorded. |
| `node tests/bench/generation.cjs` | Five after samples recorded; no timing threshold or speedup claimed. |
| `node artifacts/audit/baseline-hashes.cjs` and `diff -u docs/audits/evidence/baseline-hashes.json docs/audits/evidence/generation-hashes-after.json` | Generator-only output hashes identical. |
| `node artifacts/audit/runtime-probes.cjs` | Original 1996/null state changed to expected 0096/true. |
| `npm ci` | Passed with existing npm configuration/optional fsevents install-script warnings; no lockfile change. |
| `npm ls --depth=0` | Installed direct dependencies match pins. |
| `npm audit --json` | Passed; zero known advisories. |
| `npm outdated --json` | Exit 1 indicates the two newer dev versions recorded above, not a test failure. |
| `node --test tests/tooling/*.test.*` | Three groups passed: source cache/byte equivalence, generated failure/drift, fixture request boundaries. |
| `node --check <file>` for every tracked JS/MJS/CJS and Node-shebang script | All 38 files passed; receipt in syntax.txt. |
| `../kujo/target/release/kujo run shipcheck.kujo scan --dir /Users/robertdevore/2026/Kujolang/kujo-repos/site-kit --format json` (cwd `../shipcheck`) | Exit 0, 14/16 passed; two inapplicable metadata warnings. Bare `kujo` was absent from PATH, so the existing local binary was used. |
| `../kujo/target/release/kujo run shipcheck.kujo gate --dir /Users/robertdevore/2026/Kujolang/kujo-repos/site-kit --format json` (cwd `../shipcheck`) | Gate passed, exit 0, highest severity warning, zero failed errors. |
| `npm test` (final) | Passed, exit 0: all static gates plus 585 browser cases passed, 72 expected coverage skips, zero failures (14.1 minutes for browser matrix). |
| `npm run generated:check` | Passed: two deterministic build/snapshot rounds and clean generated outputs against HEAD; digest b844acf683df6ecd25b6aa2d741d69b91a28cde7606af473b9abf406a664af97. |
| `git diff --check` and `git diff --cached --check` | Passed for working and staged changes. |
| `bash .github/scripts/check-kujo-tool-artifacts.sh 9629c4cb2a42f62f80be6159c9d63a141ccbb696 HEAD` | Passed for the committed implementation range; no ignored tool evidence admitted to commits. |

No separate type checker or compiler gate exists for this untyped browser/Node JavaScript repository. Lens is an optional alternative evidence workflow; the repository's required Playwright matrix already runs the semantic, responsive, screenshot and axe assertions. No manual assistive-technology certification or remote CI success is claimed.

The three baseline aggregate-test timeouts are resolved by independently scheduled cases, with no increased timeout, added retry, removed assertion, or refreshed visual baseline. SignalBox: no captures warranted; fixed findings and routine dependency availability do not warrant open-action captures.
