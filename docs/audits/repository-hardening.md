# SiteKit repository hardening — 2026-09-25

## Repository

- Repository: `kujolang/site-kit`, SiteKit 1.0.0; branch `main`.
- Starting SHA: `fd6a9d5c8cfdadbb6f73c670f45fde1459cce8f9`; initially clean.
- Ending implementation SHA: `562ab4cde6ef87d44982e36c7aa850d17db5937b`. The subsequent audit-publication commit contains this report and evidence; locate its exact SHA with `git log -1 -- docs/audits/repository-hardening.md`.
- Purpose: 86 source-authored semantic HTML/CSS components, tokens, recipes, layouts and optional browser enhancements, shipped as a private source-vendored `dist/` artifact.
- Public interfaces: `SiteKit.enhance`, `dispose`, `prefixIds`, `serializeEditor`; CSS/classes/data hooks, component metadata, package subpath exports, bundled fonts and icons. No public server, provider, MCP service or model workflow.
- Dependencies/integrations: no runtime npm dependencies; pinned Playwright 1.62.1 and axe Playwright 4.12.1 for development. Existing CI pins Kujo and ShipCheck revisions. Known vendored consumers include sitekit.kujolang.ai and sitekit-docs-template; consumer instructions were inspected read-only.
- The [previous audit](repository-hardening-2026-09-22.md) is preserved as historical evidence. This pass independently inspected current implementation and did not claim its prior improvements as new work.

## Baseline

`npm test` started before edits, including static validation, distribution build, tooling, release and full Chromium/Firefox/WebKit checks. Baseline result: exit 0, all static gates and 585 browser cases passed, 72 expected skips, zero failures (9.4 minutes for the browser matrix). Browser cases use the original distribution throughout this run; source edits were not rebuilt until it finished. The additional defect probes ran against the same unchanged bundle using a separate configuration without global setup.

New native-state regression baseline: 34 assertion failures and five passes across 39 cases (4.8 minutes). Three failures exhausted the existing five-second assertion deadline while waiting for a readonly popup to stay closed; there were no test-level timeouts. The five passing cases include three native first-legend controls and two engine-specific fieldset/keyboard paths. The new archive tooling regression failed against the original script because `LICENSE` was read twice. The repaired script passed its isolated test before other changes were built.

`npm audit --json` reports zero known advisories; `npm ls --depth=0` matches both pins. This is not a vulnerability-free certification. Lockfile integrity, the optional macOS fsevents install script, private package boundary, third-party licenses and pinned CI actions were inspected. No dependency upgrade was needed for these changes.

Five generator samples used the existing `tests/bench/generation.cjs`. Baseline: 547 reads of 547 distinct source files, maximum one read per source, 719,453 bytes. Median 634.390003 ms; browser contention means these timings are descriptive, not a reliable comparison. Node v26.7.0, macOS; exact Node 20 and remote Linux CI were not run here.

## Findings

| ID | Priority | Area | Finding | Evidence | Action | Status |
| --- | --- | --- | --- | --- | --- | --- |
| SK-10 | P1 | Native state/correctness | Combobox commits and blur could overwrite readonly/disabled inputs and associated hidden values; readonly arrows opened options. | New browser regressions exercise click, keyboard, blur, disabled input, readonly and disabled fieldset. | Validate effective native editability at interaction boundaries, close pending interactions, preserve locked values and event silence. | Fixed; full matrix passed |
| SK-11 | P1 | Native state/correctness | Stepper checked the `disabled` property, missing inherited fieldset disability when controls remain outside the fieldset. | Initial and dynamic fieldset regression cases. | Reuse `:disabled` plus readonly predicate, including native first-legend exception. | Fixed; full matrix passed |
| SK-12 | P2 | I/O/integrity | Release payload read twice, separately for manifest hashing and tar content. | Instrumented 24 reads, 459,486 bytes; regression failed on second LICENSE read. | Read each payload once; hash and archive identical invocation-local buffers. | Verified with identical archive bytes |
| SK-13 | P2 | Cleanup/resources | Smoke script retained a separate synchronous HTTP file server and closed it only on success. | `tests/browser/smoke.mjs` server and fetch loop. | Reuse tested streaming fixture server; consume responses; close in finally. | Targeted smoke passed |

## Changes implemented

- `scripts/sitekit-behavior.js`: shared `editableInput()` uses native `:disabled` semantics and readonly. Combobox opening, input, keyboard, option commit and blur honor current input state. The stepper uses the same predicate for buttons and mutations; calendar delegates its existing equivalent check to it. No observer, polling, new cache or dependency. Changes to native attributes are checked at interaction time; attributes alone do not trigger a global rerender.
- `tests/browser/native-state.spec.mjs`: 13 cases per engine cover locked label/hidden-value preservation, event silence, closed popup state, re-enabling, initial/dynamic fieldsets and the first-legend exception. Existing date-picker, stepper, combobox and accessibility tests remain intact. CI already runs every browser spec, so these are regression gates without new workflow machinery.
- `scripts/release-archive`: a 12-entry invocation-local buffer map replaces duplicate reads. The buffers are released when the CLI exits. This guarantees each manifest hash describes its archived bytes; it does not promise a coherent multi-file snapshot under concurrent source mutation. Builds/releases still require exclusive checkout access.
- `tests/tooling/release-archive.test.cjs`: isolated fixture enforces one read per payload, extracts the archive and verifies every manifest hash and payload byte, then removes a required input and verifies a nonzero actionable failure without overwriting the previous archive/checksum. Existing release checks retain exact allowlists and deterministic double-build coverage. `tests/bench/release.cjs` preserves the repeatable measurement command. Intentional payload additions must update the archive allowlist, exact entries in `tests/release/package-content.mjs`, and the payload-count assertions in the tooling test together; the one-read rule and extracted-hash checks must remain intact.
- `tests/browser/smoke.mjs`: uses the existing shared server and actual repository resource URLs; always closes server and fully consumes fetched asset bodies. Existing server tests cover malformed requests, methods, hidden paths and symlink escapes.
- `docs/sitekit-gap-closure/API-AND-MIGRATION.md`: documents native locked-state behavior. Generated distribution and runtime hash are rebuilt from source, never manually patched. The historical gap-closure verification record now points readers to this current audit instead of implying that its old pinned revision verifies the latest bundle.

## Performance and efficiency

| Measurement | Before | After | Interpretation |
| --- | ---: | ---: | --- |
| Release payload reads | 24 | 12 | Same 12 payload files; exact instrumentation. |
| Release payload bytes read | 459,486 | 229,743 | Same source bytes in isolated archive-only comparison. |
| Archive size, identical inputs | 79,087 bytes | 79,087 bytes | SHA-256 `c0f55b31396b050f4fa811464a1f01684d94b46af3099157c3612aea7e7ab628`; `cmp` passed. |
| Contract generation reads | 547 | 547 | Retains prior one-read-per-source regression gate. |
| Shipped CSS | 127,533 bytes | 127,533 bytes | No visual changes intended. |
| Shipped JavaScript | 40,158 bytes | 40,406 bytes | Native-state guards are an intentional correctness cost. |
| Runtime dependencies | 0 | 0 | No added dependency. |

Generator after-median was 731.991355 ms with unchanged source reads/bytes; concurrent browser work makes a latency comparison inconclusive. No runtime speedup, RSS improvement, build-time improvement or token-saving claim. Archive payload buffering remains bounded by the small fixed release allowlist and trades brief buffer retention for fewer reads. Compression and tar construction remain synchronous because this is an offline build CLI, not a request path. Existing invocation-local generator caching has a correct invalidation lifetime; no cache redesign justified.

Agent/context review: AGENTS.md 1,394 bytes, DESIGN.md 11,111 bytes, component index 10,708 bytes, detailed manifest 546,909 bytes at baseline. Existing guidance already selects relevant schemas instead of loading all contracts. Preserve authoritative detailed artifacts and use the index for discovery. No prompts, model requests, MCP schemas, retry replay, or token budgets exist here. Byte counts are not token measurements. Logs retain full evidence locally; default gates already emit concise receipts and compact browser progress.

## Security, state and scope review

| Boundary | Evidence/review | Conclusion |
| --- | --- | --- |
| Browser authoring/input | Entire browser controller; editor serializer, URL protocol allowlist, paste/drop, native form state, ID prefixing and dynamic hooks. | New fixes preserve native state; no arbitrary HTML sanitizer or backend authorization guarantee claimed. Editor executable content/protocol restrictions remain tested. |
| Filesystem/HTTP | Shared fixture server, smoke and release callers; path/method/error/stream handling and tooling tests. | Loopback-only trusted checkout hosting; smoke now shares hardened handling. Concurrent malicious filesystem writers remain outside fixture-server contract. |
| Generated/release artifacts | CSS/design/contract generators, archive writer, validators and deterministic drift gate. | Trusted repository inputs, fixed outputs and payload allowlist, hash coverage. Nontransactional local generated outputs are rebuildable; do not publish during a build. |
| Resource lifetime | WeakMap/WeakSet ownership, listener/ResizeObserver disposal, short UI timers, clipboard failure handling, local storage denial. | No unbounded queues, retained network bodies, global polling or persistent runtime cache identified. Consumers must dispose detached components as documented. |
| Concurrency/retries | Single-process generators, browser event callbacks, CI jobs. | No application workers, database, retry orchestration or lock graph. No new synchronization/caching needed. |
| Dependencies/supply chain | package and lock, CI/release/artifact guard, licenses. | Exact dev pins retained; no runtime packages, new install hooks or mutable workflow references introduced. |
| Compatibility/integration | README, DESIGN, schemas, recipes, examples, exports, release and browser contracts; downstream source-vendoring instructions. | Existing public boundaries preserved; no ecosystem-wide migration needed. |

Complexity/dead-weight review found one worthwhile duplicate server to remove and one repeated release read to eliminate. Existing component abstractions, legacy aliases, source-vendored files, optional Lens fixtures and historical dossiers have documented consumers/verification roles; no speculative deletion. Bulk non-executable assets were covered by schema/hash/semantic/browser gates rather than described as individually audited executable code. No separate typed compiler or lint dependency is present; the repository's `lint` performs source validation.

## Compatibility

| Contract | Result |
| --- | --- |
| Public API/package exports | No signatures or paths changed. |
| Browser behavior | Bug fixes prevent mutations that contradict native disabled/readonly state; enabled commits, labels, hidden values and event contracts remain supported. |
| CLI/exit codes | Existing commands and success receipts unchanged; missing release inputs still fail with the established diagnostic. New benchmark/test files only. |
| Files/formats/schemas | Same archive allowlist and manifest versions; runtime hashes update normally. No component schema changes. |
| Configuration/environment | No new variables, flags or config requirements. |
| Consumers | Copy `dist/` as a unit to adopt fixes; existing consumers do not require source changes. |

## Cross-repository follow-ups and remaining work

No required cross-repository change and no sibling writes. ShipCheck scan/gate passed with two existing inapplicable warnings (no kennel manifest or Kujo entry point in this private Node/browser library). Local ShipCheck revision matches the CI pin `111bfc83c832050877cb9d4fd82908aaf6d14749`; the available Kujo checkout is `6798c10eb49a37b0a9da5b236bcf6d7cbc23c491`, so its prebuilt binary run does not establish execution with the exact CI-pinned compiler.

- P0/P1/P2/P3: no accepted unresolved product finding.
- Needs more evidence: exact Node 20/Linux CI and manual assistive-technology certification are not claimed. Host contention prevents useful latency/RSS conclusions.
- Not worth changing: dependency-free runtime, source-vendoring, current schema/compatibility aliases, small offline buffered archive and existing instruction hierarchy.
- SignalBox: no captures warranted; these findings are resolved within this repository.

## Verification receipt

Evidence lives in `docs/audits/evidence/2026-09-25/`. Verbose `.log` files are local and ignored; compact JSON receipts are committed. Browser HTML/JSON reports and retained failure evidence live under `artifacts/browser/`; baseline report is copied under `artifacts/audit/2026-09-25/` before final runs.

| Exact command | Result |
| --- | --- |
| `npm test` (baseline) | Passed; static gates and 585 browser cases, 72 expected skips. |
| `node node_modules/@playwright/test/cli.js test -c artifacts/audit/2026-09-25/regression.config.mjs` (unchanged bundle) | 34 assertion failures, five passes; establishes defects before rebuild. |
| `node --test tests/tooling/release-archive.test.cjs` (original/fixed) | Failed on duplicate read before; passed after. |
| `node tests/bench/release.cjs` (before/after archive-only edit) | 24 → 12 payload reads; equal SHA-256 and archive size. |
| `cmp artifacts/audit/2026-09-25/baseline.tar.gz artifacts/release/sitekit-v1.0.0.tar.gz` | Passed before runtime rebuild. |
| `node tests/bench/generation.cjs` (before/after) | Five samples each; 547 reads, 719,453 bytes, maximum one read per source throughout. |
| `npm audit --json` | Passed; zero advisories. |
| `npm ls --depth=0` | Both exact direct pins installed. |
| `node tests/browser/smoke.mjs` | Passed with shared server. |
| `npm test` (final) | Exit 0; all static gates, four tooling groups, 624 browser cases passed, 72 unchanged expected skips, zero failures/flakes (8.3 minutes). All 39 new native-state cases passed. |
| `npm run generated:check` | Passed; two builds/snapshots, no generated drift against HEAD; digest `1e8c671cbb2af44b40b3e814201bfbda33007cf5c9775687828b280286ce2925`. |
| `../kujo/target/release/kujo run shipcheck.kujo scan --dir /Users/robertdevore/2026/Kujolang/kujo-repos/site-kit --format json` (cwd `../shipcheck`) | Exit 0; 14/16 passed, two warnings. |
| `../kujo/target/release/kujo run shipcheck.kujo gate --dir /Users/robertdevore/2026/Kujolang/kujo-repos/site-kit --format json` (cwd `../shipcheck`) | Exit 0, gate passed, highest severity warning, zero failed errors. |
| `node --check <file>` for all tracked JS/MJS/CJS and Node scripts plus the three new test/benchmark files | 41 passed; file list retained in syntax.log. |
| `git diff --check` and `git diff --cached --check` | Passed. |

Final documentation/evidence updates also passed `npm run format:check` and `npm run validate:links`; the committed range passed `bash .github/scripts/check-kujo-tool-artifacts.sh fd6a9d5c8cfdadbb6f73c670f45fde1459cce8f9 HEAD`.

No skipped assertion, timeout increase, retry addition, visual snapshot refresh, security relaxation or hidden error was used to pass tests.
