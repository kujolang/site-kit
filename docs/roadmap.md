# SiteKit improvement roadmap

Updated October 10, 2026. This roadmap turns the original 82-item website-friction review into an ordered backlog. The next work is optional brand/header compositions and stronger real-site examples, followed by documentation/code, application, and content/course compositions. Preserve existing consumers through explicit adoption, compatibility checks and separately versioned releases.

The [complete inventory](roadmap-inventory.md) preserves all original IDs, generalized requirements, current dispositions and acceptance criteria. The [1.1 checklist](releases/1.1-checklist.md) and [CLI checklist](releases/sitekit-cli-checklist.md) remain the records for those completed implementation tranches.

## Current state

| Scope | Disposition |
| --- | --- |
| Items 1–10 | Completed within the bounded SiteKit 1.1.0 release. CSS/font optimization items are recipes, not automatic tooling. |
| Items 11–38 | 28 open SiteKit recipe, composition, integration and adoption opportunities. Some underlying components already exist. |
| Items 39–73 | 35 historically addressed items retained as regression coverage, not 35 new implementation tasks. |
| Items 74–82 | 9 cross-project coordination items; revalidate current status with the owning tool/site before assigning fixes. |
| Standalone CLI | Implemented after 1.1.0 as `@kujolang/sitekit-cli` 0.1.0, including the optional Kujo adapter. npm publication is pending authentication; this is outside the original numbering. |

SiteKit's latest released assets are [v1.1.0](https://github.com/kujolang/site-kit/releases/tag/v1.1.0). The CLI has an independent version and release process. This roadmap sets proposed order and completion criteria; it does not schedule dates, reserve version numbers, authorize website deployments or begin implementation.

## P0 Establish the next delivery baseline

Owner: SiteKit maintainers; consumer maintainers approve adoption in their own projects.

- [ ] **P0-A — Publish the independent CLI.** Restore npm authentication and verify organization publish access, review the package-install evidence, then publish using the [CLI guide](../packages/sitekit-cli/README.md). Verify a clean registry installation before advertising registry `npx` commands. Do not bump website assets solely to publish the CLI.
- [ ] **P0-B — Record consumer baselines.** Create synthetic fixtures for a custom-branded application, code lessons, documentation headers/terminals, content archives and course navigation. Record asset hashes, custom overrides, screenshots and relevant behavior before changing recipes. Do not import customer names, unrelated project identities, private links or proprietary content into fixtures.
- [ ] **P0-C — Create bounded implementation batches.** Start with P1 brand typography (#11–12), then header/menu/offset recipes (#14–16). Confirm each current reproduction or missing example, write a small checklist and required gates, and attach evidence to the inventory. Each batch can ship independently after its gates pass.

P0-B is required before changing behavior that could affect existing consumers. CLI publication is a parallel release task, not a prerequisite for writing or testing optional recipes.

## P1 Brand and navigation foundations

Owner: SiteKit. Priority: first implementation phase. Delivery: opt-in recipes and source-backed examples; preserve default styling. Use the existing Mobile Menu and icon sprite.

| Item | Deliverable |
| --- | --- |
| 11 | Complete custom-brand example with explicit token/override precedence. |
| 12 | Separate reading, heading, interface and code typography roles. |
| 13 | Square-shape profile covering native and composed controls. |
| 14 | Responsive header compositions with search, theme, menu and CTA ordering. |
| 15 | Adoption/migration recipe for the existing full-screen Mobile Menu. |
| 16 | Shared sticky-header and anchor-clearance recipe. |
| 24 | Optional labels, captions and decoration without empty spacing. |
| 37 | Discoverable icon catalog and accessible sprite/inline examples. |

**Exit criteria:** all eight inventory acceptance criteria pass in representative branded and default-theme fixtures. Verify narrow widths, enlarged text, keyboard focus, no-JS fallback where applicable, theme contrast and existing selector overrides. Menu adoption must cover resize dismissal and scroll-lock recovery as well as open/close behavior.

## P2 Developer documentation and overflow

Owner: SiteKit, with optional highlighter integration owned by the consuming site. Depends on P1 typography and consumer baselines; independent overflow fixtures can begin earlier.

| Item | Deliverable |
| --- | --- |
| 25 | Optional syntax-highlighting integration with escaped source and a plain-code fallback. |
| 26 | Stationary copy controls around horizontally scrolling code. |
| 27 | Stable copy-feedback geometry and source-only clipboard content. |
| 28 | Shared terminal/code composition for hero and lesson contexts. |
| 29 | Existing scrollbar-token adoption and code-surface override guidance. |
| 30 | Long command, URL and table fixtures at narrow widths and enlarged text. |

**Exit criteria:** Synthetic lesson and terminal fixtures demonstrate correct escaping, unchanged copied text, accessible success/failure states, stationary controls and keyboard-reachable overflow. Highlighting remains optional; forced colors and reduced motion remain usable.

## P3 Application and form compositions

Owner: SiteKit presentation layer; application teams retain authentication, data and workflow logic. Depends on P1 header/brand contracts.

| Item | Deliverable |
| --- | --- |
| 17 | Compact authenticated workspace header. |
| 18 | Consistent management-form family. |
| 19 | Explicit field spans and compact action rows. |
| 20 | Responsive primary-content and sidebar layout. |
| 21 | Bounded activity preview with full-history dialog. |
| 22 | Matching login and signup page compositions. |
| 23 | Compact/default density recipes for status and actions. |

**Exit criteria:** Synthetic application fixtures demonstrate clear reading order, consistent controls, long-text handling, bounded history, accessible dialogs and native disabled/readonly behavior. Compact density must not reduce accessible interaction targets. No business logic or authentication service moves into SiteKit.

## P4 Content, media and course compositions

Owner: SiteKit recipes; SSG, media and course tooling own the integration behavior identified below. Depends on P1; the course shell also depends on P2, and multi-stage dialogs should reuse P3 dialog patterns.

| Item | Deliverable |
| --- | --- |
| 31 | Flexible listing, archive, related-reading and course-catalog presets. |
| 32 | Explicit image aspect-ratio, crop and intrinsic-size contracts. |
| 33 | Responsive-image markup and optional asset-pipeline integration. |
| 34 | Stable-layout motion recipes with reduced-motion alternatives. |
| 35 | Multi-stage dialog flow covering loading, failure and focus handoff. |
| 36 | Course-shell presentation for navigation, search, progress and exercises. |
| 38 | Shared navigation-data example for desktop, mobile and footer. |

**Exit criteria:** archive/course/media fixtures hold their geometry across content lengths and image shapes, reserve media dimensions, preserve useful reduced-motion behavior and keep navigation destinations consistent. Course content, grading and persistence remain separate contracts.

## Historical regression track

Items 39–73 retain their original IDs in the inventory. Preserve existing tests and extend them when new compositions expose a real gap. Their historical status is not proof that an old copied distribution has received the fixes.

| Inventory IDs | Coverage to preserve |
| --- | --- |
| 39–47 | Useful previews, resolved placeholders, catalog completeness, real variants, schema/markup agreement and copied-consumer examples. |
| 48–57 | Progressive behavior, bounded widget promises, control geometry, state examples, composition spacing and native styling. |
| 58–59 | Theme contrast, icon inheritance, semantic accessibility, skip links and keyboard overflow. |
| 60–65 | Idempotent enhancement, instance IDs, disposal, dynamic openers, focus restoration, scrim isolation and theme synchronization. |
| 66–68 | Native locked state, early-year calendar arithmetic, containment, large text, RTL and reduced motion. |
| 69–73 | Real-consumer tests, generated integrity, reliable fixture servers, deterministic packaging and accurate publication documentation. |

Reopen a historical item only with a current failing reproduction and affected version. Do not mark a downstream site upgraded merely because the upstream component passes.

## Cross-project coordination

These are coordination tracks, not SiteKit core features. The inventory retains a concrete next step for each incident. Historical incidents may already be resolved in their owner repositories; verify before opening new work.

| Track | IDs | Primary owner and scope |
| --- | --- | --- |
| X1 | 74 | SSG/Markdown: code-block preservation and escaping. |
| X2 | 75 | SSG/runtime: measured build and iteration performance. |
| X3 | 76–77 | SSG/content/templates: routes, redirects, collections and page metadata. |
| X4 | 78–79 | Publishing/Howl and runtime/CDN respectively: OG cards and correct media delivery. |
| X5 | 80–81 | Hosting/site policy and deployment tooling: analytics/CSP choices and intended generated-output delivery. |
| X6 | 82 | Course application/content tooling: progress, assessment revisions, grading and review readiness. |

SiteKit can supply markup, tokens and integration examples. It should not absorb routing, HTTP range delivery, analytics policy, grading or publishing infrastructure. No cross-project changes are authorized by this roadmap alone.

## Completion and release gates

For each implementation batch:

1. Confirm the current gap and affected consumers; distinguish a missing recipe from a missing component or an already-fixed historical issue.
2. Define the optional API/markup/token contract and acceptance fixtures before implementation. Keep custom site overrides outside managed distribution files.
3. Use existing source components and tokens. Keep new recipes opt-in; retain compatibility aliases where practical and document intentional migrations.
4. Run appropriate static/schema/format/link checks and relevant component, browser, keyboard, responsive, theme and no-JS tests. Preserve regression assertions instead of refreshing baselines merely to accept a change.
5. Before an asset release, run the full browser matrix, generated-drift, deterministic archive, distribution integrity and clean copied-consumer gates. Review representative site fixtures for regressions.
6. Publish explicit changelog and upgrade notes, including changed contracts and compatibility actions. Choose patch/minor/major versions from the actual compatibility impact; no version/date is promised here.
7. Update the inventory with implementation evidence, verification and release version. Track each real site's later adoption separately; deployment requires its own scope and validation.

Do not claim universal regression freedom from library tests. The release gate is evidence for tested contracts and fixtures; consumers still need build, cache and integration checks.

## Evidence and maintenance

Planning baseline: SiteKit main `5ed4c77da0583ae56be1cb3efa2baf882ea57c85`; published asset tag v1.1.0. At roadmap creation the [CLI cross-platform run](https://github.com/kujolang/site-kit/actions/runs/38082360028) and [full repository CI](https://github.com/kujolang/site-kit/actions/runs/38082360017) both report success. This closes the earlier handoff's pending-CI status; it does not establish downstream adoption or npm publication.

The October 10 consumer-integration review supplies the original numbering. The public [inventory](roadmap-inventory.md) retains generalized requirements and dispositions; private project references and internal source identifiers stay outside this repository.

Maintain this document and the inventory together. New findings get new IDs after 82; never renumber the original review. Date every status change and link its evidence. Suggested order is P0 baseline → P1 → P2 → P3 → P4, with cross-project owner triage in parallel and regression coverage required throughout.
