# SiteKit roadmap inventory

As of October 10, 2026. This is the complete 82-item inventory from the original review, with its numbering preserved and project-specific details generalized. It is an incident and opportunity register, not 82 open bugs. Use [the roadmap](roadmap.md) for execution order, compatibility gates and release policy.

Requirements are generalized from consumer integration reviews. Private project identities, repository links and internal provenance are intentionally excluded. Historical fixes are not automatically current defects, and an upstream fix is not proof of downstream adoption.

## Completed initial tranche

Items 1–10 were completed to the bounded [1.1 checklist](releases/1.1-checklist.md), released as v1.1.0. Items 5–6 delivered an audit and provenance guidance, not an ecosystem-wide doctor; 9–10 delivered recipes, not automated CSS pruning or font subsetting. The separately versioned CLI subsequently implemented verified updates and recovery; registry publication is still a separate task.

- [x] **01. Hero CSS assumes the last child is an action row.**

  - **Current disposition:** Completed within the v1.1.0 release checklist; broader optional automation and downstream adoption require separate scope.

- [x] **02. Version 1.0.0 identifies substantially different implementations.**

  - **Current disposition:** Completed within the v1.1.0 release checklist; broader optional automation and downstream adoption require separate scope.

- [x] **03. Release notes are difficult to interpret.**

  - **Current disposition:** Completed within the v1.1.0 release checklist; broader optional automation and downstream adoption require separate scope.

- [x] **04. Theme retirement needs an explicit compatibility path.**

  - **Current disposition:** Completed within the v1.1.0 release checklist; broader optional automation and downstream adoption require separate scope.

- [x] **05. Receiving upstream fixes requires manual vendoring.**

  - **Current disposition:** Completed within the v1.1.0 release checklist; broader optional automation and downstream adoption require separate scope.

- [x] **06. Dependency provenance has drifted in real sites.**

  - **Current disposition:** Completed within the v1.1.0 release checklist; broader optional automation and downstream adoption require separate scope.

- [x] **07. Asset updates can produce mixed HTML/CSS/JS versions.**

  - **Current disposition:** Completed within the v1.1.0 release checklist; broader optional automation and downstream adoption require separate scope.

- [x] **08. Distribution guidance can still confuse asset layout.**

  - **Current disposition:** Completed within the v1.1.0 release checklist; broader optional automation and downstream adoption require separate scope.

- [x] **09. The complete foundation can be excessive for a small marketing page.**

  - **Current disposition:** Completed within the v1.1.0 release checklist; broader optional automation and downstream adoption require separate scope.

- [x] **10. Font delivery repeatedly needs bespoke optimization.**

  - **Current disposition:** Completed within the v1.1.0 release checklist; broader optional automation and downstream adoption require separate scope.

## Open SiteKit compositions and adoption work

All items 11–38 remain planning entries until their acceptance criteria and consumer fixtures are verified. Existing Mobile Menu, code controls, scrollbars and icons are reused rather than rebuilt.

- [ ] **11. Applying a different brand requires scattered overrides.**

  - **Track:** P1. **Acceptance / next step:** Provide an opt-in brand override example with typography, color roles and documented cascade precedence; validate a synthetic custom brand and default themes side by side.

- [ ] **12. Reading typography and interface typography get conflated.**

  - **Track:** P1. **Acceptance / next step:** Document body, heading, UI and code font roles; demonstrate Inter reading text with Departure Mono UI/code without changing defaults.

- [ ] **13. Square styling is not consistently carried through custom controls.**

  - **Track:** P1. **Acceptance / next step:** Add an opt-in square-shape recipe covering native and composed controls; verify focus rings and sizing in all three engines.

- [ ] **14. Mobile headers are repeatedly assembled by hand.**

  - **Track:** P1. **Acceptance / next step:** Provide mobile/desktop header compositions with brand, persistent search, theme control, menu and optional CTA; test ordering and narrow widths.

- [ ] **15. Full-screen mobile navigation was repeatedly reinvented.**

  - **Track:** P1. **Acceptance / next step:** Document migration from custom navigation to the existing Mobile Menu; verify focus return, Escape, link dismissal, scroll lock, resize and no-JS behavior.

- [ ] **16. Sticky/translucent headers need coordinated offsets and contrast.**

  - **Track:** P1. **Acceptance / next step:** Define a shared sticky-header height and anchor-offset recipe; verify translucent surfaces, contrast and section clearance.

- [ ] **17. Authenticated headers become overcrowded.**

  - **Track:** P3. **Acceptance / next step:** Provide an authenticated workspace-header example with compact switching, account actions, accessible labels and overflow handling.

- [ ] **18. Form controls look inconsistent across screens.**

  - **Track:** P3. **Acceptance / next step:** Provide a management-form composition covering inputs, selects, uploads, focus states and a consistent 44px control-height recipe.

- [ ] **19. Form grids stretch actions or waste space.**

  - **Track:** P3. **Acceptance / next step:** Provide explicit field-span and action-row examples with compact actions, long fields and boolean controls at mobile/desktop widths.

- [ ] **20. Workflow pages need better information hierarchy.**

  - **Track:** P3. **Acceptance / next step:** Provide a responsive main-and-sidebar workflow layout with deliberate reading order, a dominant primary region and sensible stacking.

- [ ] **21. Activity feeds grow indefinitely.**

  - **Track:** P3. **Acceptance / next step:** Provide a bounded activity preview plus full-history dialog; test long history, scrolling, focus return and keyboard access.

- [ ] **22. Login and signup layouts need a coherent family.**

  - **Track:** P3. **Acceptance / next step:** Provide consistent login/signup compositions with responsive lockups and viewport filling; keep authentication logic application-owned.

- [ ] **23. Small status details need a consistent density system.**

  - **Track:** P3. **Acceptance / next step:** Define opt-in compact/default density recipes across badges, panels, forms and toolbars without shrinking accessible interaction targets.

- [ ] **24. Templates encourage excess labels and decoration.**

  - **Track:** P1. **Acceptance / next step:** Document optional eyebrow, caption, side-note and decorative slots; demonstrate sparse compositions without empty gaps.

- [ ] **25. Code blocks need a complete developer-documentation recipe.**

  - **Track:** P2. **Acceptance / next step:** Provide an optional syntax-highlighter integration using escaped source and a plain-code fallback; keep the runtime dependency optional.

- [ ] **26. Copy controls must remain stationary during horizontal scrolling.**

  - **Track:** P2. **Acceptance / next step:** Promote existing stationary copy-control markup and add a long-code consumer fixture proving controls do not scroll with pre content.

- [ ] **27. Copy feedback can disturb layout or copy the wrong content.**

  - **Track:** P2. **Acceptance / next step:** Provide stable-geometry copy controls for success, failure and unavailable states; copy source text only and announce state accessibly.

- [ ] **28. Hero terminals and lesson code drift visually.**

  - **Track:** P2. **Acceptance / next step:** Provide one reusable terminal/code composition for hero and lesson contexts, with consistent controls, overflow and styling.

- [ ] **29. Scrollbar styling gets reimplemented.**

  - **Track:** P2. **Acceptance / next step:** Document adoption of existing scrollbar tokens and code-surface overrides; preserve forced-color fallback.

- [ ] **30. Long commands, references, and tables expose layout weaknesses.**

  - **Track:** P2. **Acceptance / next step:** Add consumer stress fixtures for long commands, URLs and tables, including narrow widths, enlarged text and keyboard scrolling.

- [ ] **31. Listing layouts need useful presets.**

  - **Track:** P4. **Acceptance / next step:** Provide flexible card/list/archive/course-catalog recipes; verify metadata alignment and varying content counts and lengths.

- [ ] **32. Image dimensions can unexpectedly change card geometry.**

  - **Track:** P4. **Acceptance / next step:** Specify aspect ratio, intrinsic dimensions, crop and object-fit behavior; test portrait and landscape media inside cards.

- [ ] **33. Responsive media preparation is separate custom work.**

  - **Track:** P4. **Acceptance / next step:** Document responsive-image markup and an optional pipeline contract for srcset, sizes and intrinsic dimensions; keep generation outside CSS.

- [ ] **34. Motion can damage stability or performance.**

  - **Track:** P4. **Acceptance / next step:** Provide opt-in motion recipes with reserved geometry and reduced-motion alternatives; measure layout stability in representative compositions.

- [ ] **35. Multi-stage modal flows need an example.**

  - **Track:** P4. **Acceptance / next step:** Provide a multi-stage dialog example with loading/error states, safe dialog handoff and delayed copy enablement.

- [ ] **36. Course features are repeatedly custom-built.**

  - **Track:** P4. **Acceptance / next step:** Provide a course-shell presentation recipe for search, lesson navigation, progress and exercises; keep grading and persistence outside SiteKit.

- [ ] **37. Icon availability does not automatically produce consistent adoption.**

  - **Track:** P1. **Acceptance / next step:** Publish a discoverable bundled-icon catalog and accessible inline/sprite examples for static and server-rendered consumers.

- [ ] **38. Adding a page requires changes in several navigation locations.**

  - **Track:** P4. **Acceptance / next step:** Provide a shared navigation-data adapter example for desktop/mobile/footer, with active-state and link-consistency checks.

## Historical fixes to retain as regression coverage

Items 39–73 were recorded as addressed by the original review. These checked entries record that historical upstream disposition, not a new browser audit or proof that every site adopted them. Reopen only with a current reproduction. Sources: [gap closure](sitekit-gap-closure/GAP-CLOSURE-MATRIX.md), [API contracts](sitekit-gap-closure/API-AND-MIGRATION.md), [September 22 audit](audits/repository-hardening-2026-09-22.md), [September 25 audit](audits/repository-hardening.md).

- [x] **39. Preview buttons did not open useful working examples.**

  - **Current disposition:** Historical fix; preserve coverage in the relevant component, lifecycle, consumer or release regression tests. Reopen only on a reproduced failure.

- [x] **40. Preview output exposed `{{label}}` and other template placeholders, or literal `\n`.**

  - **Current disposition:** Historical fix; preserve coverage in the relevant component, lifecycle, consumer or release regression tests. Reopen only on a reproduced failure.

- [x] **41. Preview modals had inconsistent focus, sizing, alignment, and excessive tags/code.**

  - **Current disposition:** Historical fix; preserve coverage in the relevant component, lifecycle, consumer or release regression tests. Reopen only on a reproduced failure.

- [x] **42. Badge/Button previews showed one stretched item instead of meaningful variants.**

  - **Current disposition:** Historical fix; preserve coverage in the relevant component, lifecycle, consumer or release regression tests. Reopen only on a reproduced failure.

- [x] **43. Component migration was incomplete, then created duplicates.**

  - **Current disposition:** Historical fix; preserve coverage in the relevant component, lifecycle, consumer or release regression tests. Reopen only on a reproduced failure.

- [x] **44. Bento, feature, product, and ecosystem grids rendered as stacks or failed to fill their container.**

  - **Current disposition:** Historical fix; preserve coverage in the relevant component, lifecycle, consumer or release regression tests. Reopen only on a reproduced failure.

- [x] **45. Component names promised more than implementations supplied.**

  - **Current disposition:** Historical fix; preserve coverage in the relevant component, lifecycle, consumer or release regression tests. Reopen only on a reproduced failure.

- [x] **46. Schemas did not reliably describe working markup.**

  - **Current disposition:** Historical fix; preserve coverage in the relevant component, lifecycle, consumer or release regression tests. Reopen only on a reproduced failure.

- [x] **47. Components worked in the lab through private adapters but not as copied consumers.**

  - **Current disposition:** Historical fix; preserve coverage in the relevant component, lifecycle, consumer or release regression tests. Reopen only on a reproduced failure.

- [x] **48. Dropdowns, popovers, drawers, and tooltips appeared permanently expanded or lacked behavior.**

  - **Current disposition:** Historical fix; preserve coverage in the relevant component, lifecycle, consumer or release regression tests. Reopen only on a reproduced failure.

- [x] **49. Tabs changed their appearance without changing content.**

  - **Current disposition:** Historical fix; preserve coverage in the relevant component, lifecycle, consumer or release regression tests. Reopen only on a reproduced failure.

- [x] **50. Combobox and date-picker previews looked unfinished or misleading.**

  - **Current disposition:** Historical fix; preserve coverage in the relevant component, lifecycle, consumer or release regression tests. Reopen only on a reproduced failure.

- [x] **51. Tree/editor components implied richer functionality than existed.**

  - **Current disposition:** Historical fix; preserve coverage in the relevant component, lifecycle, consumer or release regression tests. Reopen only on a reproduced failure.

- [x] **52. Stepper, segmented controls, carousel, copy, toast, and promo dismissal were inert or lab-only.**

  - **Current disposition:** Historical fix; preserve coverage in the relevant component, lifecycle, consumer or release regression tests. Reopen only on a reproduced failure.

- [x] **53. Native controls did not match the visual system.**

  - **Current disposition:** Historical fix; preserve coverage in the relevant component, lifecycle, consumer or release regression tests. Reopen only on a reproduced failure.

- [x] **54. Small controls had incorrect geometry.**

  - **Current disposition:** Historical fix; preserve coverage in the relevant component, lifecycle, consumer or release regression tests. Reopen only on a reproduced failure.

- [x] **55. State components did not communicate their state.**

  - **Current disposition:** Historical fix; preserve coverage in the relevant component, lifecycle, consumer or release regression tests. Reopen only on a reproduced failure.

- [x] **56. Marketing/commerce examples were visually unconvincing.**

  - **Current disposition:** Historical fix; preserve coverage in the relevant component, lifecycle, consumer or release regression tests. Reopen only on a reproduced failure.

- [x] **57. Shared spacing and alignment were inconsistent.**

  - **Current disposition:** Historical fix; preserve coverage in the relevant component, lifecycle, consumer or release regression tests. Reopen only on a reproduced failure.

- [x] **58. Buttons/icons became unreadable in some contexts.**

  - **Current disposition:** Historical fix; preserve coverage in the relevant component, lifecycle, consumer or release regression tests. Reopen only on a reproduced failure.

- [x] **59. Semantic accessibility was incomplete.**

  - **Current disposition:** Historical fix; preserve coverage in the relevant component, lifecycle, consumer or release regression tests. Reopen only on a reproduced failure.

- [x] **60. Repeated enhancement duplicated handlers.**

  - **Current disposition:** Historical fix; preserve coverage in the relevant component, lifecycle, consumer or release regression tests. Reopen only on a reproduced failure.

- [x] **61. Repeated component instances collided on IDs and relationships.**

  - **Current disposition:** Historical fix; preserve coverage in the relevant component, lifecycle, consumer or release regression tests. Reopen only on a reproduced failure.

- [x] **62. Focus handling included hidden elements or stale openers.**

  - **Current disposition:** Historical fix; preserve coverage in the relevant component, lifecycle, consumer or release regression tests. Reopen only on a reproduced failure.

- [x] **63. Drawer instances could affect the wrong scrim.**

  - **Current disposition:** Historical fix; preserve coverage in the relevant component, lifecycle, consumer or release regression tests. Reopen only on a reproduced failure.

- [x] **64. Themes failed to restore or controls became unsynchronized.**

  - **Current disposition:** Historical fix; preserve coverage in the relevant component, lifecycle, consumer or release regression tests. Reopen only on a reproduced failure.

- [x] **65. Dynamic modal openers had stale accessibility state.**

  - **Current disposition:** Historical fix; preserve coverage in the relevant component, lifecycle, consumer or release regression tests. Reopen only on a reproduced failure.

- [x] **66. Widgets changed disabled or read-only native inputs.**

  - **Current disposition:** Historical fix; preserve coverage in the relevant component, lifecycle, consumer or release regression tests. Reopen only on a reproduced failure.

- [x] **67. Calendar handling remapped years 0001–0099 incorrectly.**

  - **Current disposition:** Historical fix; preserve coverage in the relevant component, lifecycle, consumer or release regression tests. Reopen only on a reproduced failure.

- [x] **68. Narrow containers, large text, floating surfaces, RTL, or reduced motion broke assumptions.**

  - **Current disposition:** Historical fix; preserve coverage in the relevant component, lifecycle, consumer or release regression tests. Reopen only on a reproduced failure.

- [x] **69. Passing source checks did not prove real consumer usability.**

  - **Current disposition:** Historical fix; preserve coverage in the relevant component, lifecycle, consumer or release regression tests. Reopen only on a reproduced failure.

- [x] **70. Generated drift could escape release gates.**

  - **Current disposition:** Historical fix; preserve coverage in the relevant component, lifecycle, consumer or release regression tests. Reopen only on a reproduced failure.

- [x] **71. Test tooling itself caused crashes or flaky results.**

  - **Current disposition:** Historical fix; preserve coverage in the relevant component, lifecycle, consumer or release regression tests. Reopen only on a reproduced failure.

- [x] **72. Builds and releases reread the same files unnecessarily.**

  - **Current disposition:** Historical fix; preserve coverage in the relevant component, lifecycle, consumer or release regression tests. Reopen only on a reproduced failure.

- [x] **73. Documentation overstated release/publication status.**

  - **Current disposition:** Historical fix; preserve coverage in the relevant component, lifecycle, consumer or release regression tests. Reopen only on a reproduced failure.

## Cross-project coordination

These remain owner-triage items. Establish current status in the owning repository before treating a historical incident as a new bug. SiteKit owns presentation and integration examples, not rendering engines, hosting policies or course grading.

- [ ] **74. Lesson code was corrupted by prose Markdown processing.**

  - **Track:** X1. **Acceptance / next step:** SSG/Markdown owner: retain intact escaped code blocks through prose processing; use a representative lesson fixture. SiteKit consumes the resulting markup.

- [ ] **75. Course builds encountered impractical static-generation latency.**

  - **Track:** X2. **Acceptance / next step:** SSG/runtime owner: measure current full/incremental builds before proposing optimization or starter defaults; historical timings are not current benchmarks.

- [ ] **76. Root post URLs, `/course/` routing, taxonomy archives, redirects, and custom collections required extra work.**

  - **Track:** X3. **Acceptance / next step:** SSG/content owner: test permalink, course, taxonomy, redirects and collection contracts on a migration fixture.

- [ ] **77. Courses was initially marked as a blog post; other sites needed schema, canonical, and discovery corrections.**

  - **Track:** X3. **Acceptance / next step:** SSG/template owner: define explicit page types and verify canonical/schema/discovery output for course, archive and ordinary pages.

- [ ] **78. Route-specific OG images and Howl cards repeatedly needed a separate follow-up.**

  - **Track:** X4. **Acceptance / next step:** Publishing/Howl owner: specify route-specific OG-card generation and token handoff; verify representative pages and fallbacks.

- [ ] **79. Embedded video seeking failed because of runtime limits and cached range responses.**

  - **Track:** X4. **Acceptance / next step:** Runtime/CDN owner: validate byte-range seeking, cache headers and media limits; document serving requirements beside the media recipe.

- [ ] **80. Cloudflare-injected analytics conflicted with course CSP/privacy expectations.**

  - **Track:** X5. **Acceptance / next step:** Hosting/site owner: record per-site analytics/privacy choices and test the intended CSP; preserve each consumer's explicitly chosen analytics policy.

- [ ] **81. A site deployed through an unintended renderer instead of its generated-output workflow.**

  - **Track:** X5. **Acceptance / next step:** Deployment/SSG owner: verify the intended generated-output deployment path; keep a starter regression against unintended Jekyll processing.

- [ ] **82. Course progress, assessment revisions, grading, and content-review readiness required substantial custom work.**

  - **Track:** X6. **Acceptance / next step:** Course tooling owner: specify progress persistence, assessment/content revisions and grading separately from the SiteKit course-shell UI.

## Public implementation references

Use the SiteKit [API contracts](sitekit-gap-closure/API-AND-MIGRATION.md), [gap-closure record](sitekit-gap-closure/GAP-CLOSURE-MATRIX.md) and [release checklist](releases/1.1-checklist.md) for public implementation evidence. Reproduce future requirements with synthetic fixtures instead of importing unrelated project identities or customer material.
