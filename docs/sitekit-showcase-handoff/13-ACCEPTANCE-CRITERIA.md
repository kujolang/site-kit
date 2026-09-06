# Objective showcase acceptance criteria

PROPOSED. Mark completion only with recorded evidence against the built website. These checks are implementation work, not claims that this audit built the site.

## Truth and coverage

- Exactly the 85 audited component slugs have canonical, reachable reference pages; additions require an updated audited source snapshot. All 15 primitive flags are consistent with the manifest.
- All 120 source tokens resolve and appear in the inspector, including all four theme outcomes. Show 78 core/42 semantic rather than counting overrides as extra tokens.
- Six layouts and eight recipes have distinct reference records; four example compositions are runnable with local data.
- Every component page states native/dist/consumer ownership, use/avoid, source version/path, declared API versus actual binding, slots/default uncertainty, a concrete example, accessibility and responsive limits.
- No unimplemented schema variant is shown as a working selector. No npm install or React import is presented as the v1 distribution contract.

## Preview and copy correctness

- Every preview uses the actual pinned CSS; all five supported behavior families use the actual dist script.
- Every emitted example has no unresolved placeholders, duplicate IDs or broken label/ARIA/hook references. Tests instantiate at least two copies for common multi-instance components.
- Copy output reproduces the current authored state when pasted into a clean consumer with documented dependencies. Include site-owned controllers explicitly; no lab-only code silently assumed.
- Copy success follows actual clipboard success; failure provides selectable code. Reset restores controls and preview/code. Deep links round-trip every allowed control and reject malformed or oversized values safely.
- No network submission, payment, account mutation or file upload occurs in examples. Demo state is explicitly local.

## Accessibility and responsive checks

- Page reading and navigation remain usable with JavaScript disabled; hidden interactive previews have textual alternatives and standalone code.
- All pages have one primary h1, coherent heading order, language, landmarks, visible Skip Link, accessible controls and unique IDs.
- All 85 source-based previews get an isolated semantic/axe check; existing source limitations are addressed in the published specimen or clearly presented as noninteractive limitations, never silently ignored.
- Keyboard: menus arrows/Home/End/Escape; native form controls; dialogs entry/Tab/Escape/return; search Tab/Enter; all controls usable without pointer. Additional consumer widget behavior gets appropriate keyboard tests.
- Check all four themes for critical state contrast. Maintain a documented manual screen-reader review of complex previews; no automated WCAG certification claim.
- At 320/390/768/1440 widths and 200 percent text, ordinary content reflows without page-level horizontal overflow; intended code/data scroll regions remain keyboard accessible and labeled.
- Container demos verify both explicit containment and stand-alone boundaries. No root self-query assumption.
- Reduced-motion mode removes continuous decorative activity and explicit smooth scrolling. Focus rings and focus restoration remain visible and correct across preview iframe boundaries.

## Search and agent data

- Exact component names/slugs, aliases, prop names and CSS variables return relevant canonical routes. Unknown queries produce useful empty state and no script error.
- Search query and component state survive reload through validated URL parameters; no injected markup executes.
- llms.txt, sitemap, robots and API JSON load directly, contain stable canonical links and match the component count/version. JSON schema/version fields and null uncertainty semantics are documented.
- Component pages are indexable HTML with useful text outside iframes. Query permutations do not create duplicate canonical pages.

## Build, performance and release

- Build is deterministic from pinned dependencies and source hashes; generated changes can be reproduced, and no source generation overwrites authored notes.
- Link, route, manifest and source-reference checks pass. Test 404 HTTP behavior, deep routes, font MIME/path loading and no missing assets.
- Browser checks cover Chromium, Firefox and WebKit with a recorded report; manual representative visual review includes mobile and desktop.
- Performance budgets in 12 are measured with explicit configuration; exceptions need evidence and rationale. Static docs do not bootstrap the entire maintainer manifest.
- CSP disallows arbitrary execution; postMessage validates sender and shape; no secrets in client bundles, unsafe HTML rendering or code eval.
- Deployment artifact has commit/checksum, hostname, preview verification and rollback information; production availability is verified only after an authorized deployment.

Completion is not established by a green build alone or by the current library's 135 page tests. The built showcase must meet these route, interaction, truthfulness and consumer-copy contracts.
