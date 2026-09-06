# SiteKit library gap-closure mission

Copy everything below the divider into the implementation agent's task. This is an implementation assignment for the **SiteKit library**, to be completed before the separate showcase website build.

---

You are the implementation, testing and documentation agent for `kujolang/site-kit`.

Close the major gaps identified by the repository audit so that SiteKit can serve as the reliable foundation for `https://sitekit.kujolang.ai`. Implement the library updates, prove them in real browsers, reconcile the public contracts, and leave a current implementation handoff for the agent that will later build and launch the website.

**Do not build or deploy the showcase website in this task.** Do not create its infrastructure, change DNS, publish a release, tag a version or publish an npm package. Do not stop at another audit, roadmap, scaffold, renamed status label or list of recommendations. The deliverable is working, verified library improvements with accurate documentation.

## 1. Mission boundaries and authorization

You are authorized to edit SiteKit's component source, tokens when needed, schemas, browser behavior, examples, layouts, recipes, generators, tests, CI and documentation to close the gaps below. Generate distribution artifacts through existing tooling. Use small meaningful commits and push the completed changes; leave the working tree clean. Preserve unrelated user changes.

Make ordinary implementation choices independently. Ask only when a genuinely breaking product decision cannot be resolved compatibly, external authority is required, or progress is blocked. An unavailable environment is not a reason to claim a test passed.

Preserve the source-vendored HTML/CSS product model:

- Keep `private: true`, the supported `dist/` artifact, and the sibling `dist/fonts/` relationship.
- Keep existing CSS/script/font exports and the zero-required-framework consumption model.
- Preserve `window.SiteKit.enhance()` and existing documented hooks. Add compatible capabilities rather than silently redefining them.
- Use semantic HTML, native browser controls where appropriate, current SiteKit tokens, square geometry and the existing Kujo visual language.
- Do not introduce React, a UI framework, a hosted component service, a general-purpose schema renderer or an arbitrary-code playground.
- Do not hide a reusable source defect with example-only CSS. Fix source, then update all affected consumers.
- Keep existing valid behavior and documented compatibility unless a versioned migration is explicitly approved.

## 2. Read the existing evidence before implementing

Start in the SiteKit repository, commonly `/Users/robertdevore/2026/Kujolang/kujo-repos/site-kit`. Read local instructions, `DESIGN.md`, `package.json`, and these dossier files:

1. `docs/sitekit-showcase-handoff/00-EXECUTIVE-SUMMARY.md`
2. `01-ARCHITECTURE.md`
3. `06-ACCESSIBILITY-RESPONSIVE-MOTION.md`
4. `07-DOCUMENTATION-GAPS.md`
5. `08-SITEKIT-GAPS.md`
6. `15-MANIFEST-CONTRACT.md`
7. `16-TESTING-AND-QUALITY.md`
8. `component-manifest.json`, `token-manifest.json`, and the relevant `component-details/<slug>.md` records.
9. `evidence/api-discrepancies.json`, `evidence/component-probes.json`, `evidence/focused-findings.json`, and their reproduction scripts.

The paths after item 1 are relative to `docs/sitekit-showcase-handoff/`.

Audited source baseline: `c0d199e06bc926e29de87b7cd983ee3d54db9cda`. The original dossier was committed in `1859a34` and `b4f2bad`. Inspect the current checkout and changes since that baseline; do not assume the repository is frozen or redo the entire archaeological pass.

The baseline contains 85 schema-backed components, a 15-component audit-classified primitive subset, 120 core/semantic tokens, four themes, six layouts and eight recipes. These are baseline counts, not limits on justified additions. There is no per-component JavaScript module API or automatic prop binding.

Baseline verification: all 135 existing Playwright cases passed, but 170 isolated Chromium samples found axe violations in six components. Additional probes demonstrated invisible Button/Icon composition and container-dependent layout failures. Passing the old tests alone will not complete this assignment.

## 3. Establish an implementation ledger

Create `docs/sitekit-gap-closure/` with a concise work ledger. Give each issue a stable ID, affected source, baseline evidence, chosen contract, implementation status, regression-test reference and completion evidence.

Track these required workstreams separately:

- G1: public API/schema/template/variant consistency;
- G2: confirmed accessibility and visual defects;
- G3: complete bounded advanced-widget behavior;
- G4: promote and harden lab-only interactions;
- G5: responsive layout, containment and motion;
- G6: browser enhancement lifecycle;
- G7: useful form/media/documentation compositions;
- G8: source-derived metadata, documentation and drift checks;
- G9: isolated browser coverage and release verification;
- G10: refreshed showcase readiness handoff.

Use statuses such as not-started, implemented, verified and blocked. A source change is not verified until its relevant tests pass. “Documented limitation” is not an automatic substitute for closing a required defect.

## 4. G1 — Reconcile the public API across all components

Review all 85 records against current source. Normalize concepts useful to consumers, not file counts.

Resolve at minimum:

- Button: label, href/anchor usage, native type/disabled, loading and icon composition.
- Card: schema `title` versus template `heading`, body/actions and supported states.
- Tabs: required `panels` missing from props; singular template `panel`; tab/panel relationships and selection.
- Form Field: required `control` missing from props and a fixed text input masquerading as a configurable control.
- Checkout Summary: required `totals` versus subtotal/total fields.
- Ecosystem Map: nodes/relationships versus items/label placeholders; no imaginary radial graph engine.
- Alert: schema neutral/compact versus implemented danger/warning/success/neutral.
- Hero and grid families: `data-layout` and `data-density` versus generic variant names.
- Icon: size, boxed, inline/sprite and decorative/meaningful bindings.
- All generic example records whose props do not satisfy their component's declared requirements.

For each meaningful public field, document its type, required status, default where defined, exact HTML/CSS/JS binding, allowed values, state owner and example. Specify array item structures and slot contracts where consumers need them. Native attributes must be distinguished from SiteKit enhancements.

For every declared variant, provide one of these truthful contracts:

1. A genuinely implemented visual/behavioral variant with a distinct example and test.
2. An explicit, compatible alias of an existing base style, clearly labeled as such.
3. A documented composition recipe with concrete markup and dependencies, not a pretend attribute switch.

Do not delete awkward public names to make validation green. Preserve compatibility through aliases or a documented migration. Do not invent cosmetic differences merely to make every legacy word look like a variant. Any name that requires a new product subsystem, such as a graph engine, must be explicitly distinguished from the supported current composition; record that bounded decision.

Strengthen schema validation to detect contradictory required fields, malformed property/variant metadata, invalid examples and broken references. Add only the validation structure needed for these contracts. A regex finding a filename or a required JSON key is insufficient.

## 5. G2 — Fix confirmed accessibility and visual defects first

Implement source-level fixes and regressions for:

- **Drawer hidden state:** `.sk-drawer { display: grid }` overrides native `hidden`. A closed source drawer must be visually absent, absent from accessibility navigation and unfocusable. Test open, close, Escape, scrim, multiple instances and focus return without dashboard overrides.
- **Primary Button/Icon visibility:** Icon resets color to text.primary, producing black stroke on black Button background. Define context-safe color inheritance or an equally explicit contract. Verify primary/secondary/ghost/danger, hover, focus and disabled states in all four themes.
- **Avatar semantics:** replace the prohibited generic-span label pattern with correct meaningful/decorative image semantics and a documented initials composition.
- **Progress Bar:** expose an accessible name and value through native progress or valid progressbar semantics; keep the visual fill synchronized with bounded values. Define indeterminate behavior only if implemented.
- **Date Picker grid semantics:** valid structure, names, selected/current distinction and keyboard behavior; see G3.
- **Rich Text Editor:** name the editable textbox and give toolbar controls meaningful names; see G3.
- **Code Block:** make overflowing code reachable and usable by keyboard without a needless tab stop when it does not scroll; preserve readable semantics.
- **Skip links:** use a revealing Skip Link pattern in layouts/examples instead of permanently clipped navigation. Verify target focus and visibility.
- **Tooltip:** allow pointer travel to and hovering over the tooltip while preserving focus/hover persistence and Escape dismissal. Preserve existing description ID references. Never make essential content depend on a tooltip.
- **Disabled controls:** native disabled must prevent activation; document and correctly handle enhanced aria-disabled actions where supported. Do not disable navigation through opacity alone.
- **Multi-instance relationships:** eliminate repeated literal IDs in reusable emitted examples through a documented instance-prefix mechanism or explicit parameters, including for/id, ARIA IDREFs, fragment links and opener hooks.

Review each fix with actual interaction and accessibility-tree/axe evidence. Do not claim formal WCAG certification.

## 6. G3 — Complete the existing advanced widgets to bounded, useful contracts

Implement the following in the optional behavior layer or a documented opt-in distribution extension. Consumers must receive the actual functionality, not just lab clicks. Keep the feature scope below; a complete editor framework or scheduling product is unnecessary.

### Tabs

Support labeled tablists with associated panels, unique IDs, initial selection, one selected tab, hidden inactive panels and roving tabindex. Support Arrow keys, Home/End and activation behavior consistent with a documented automatic/manual policy. If orientation is advertised, implement its key mapping. Preserve focus appropriately and keep repeated enhancement safe. Test multiple tab sets and dynamic insertion.

### Combobox

Provide a bounded single-select text autocomplete over supplied local options: input/filtering, open/close, active option, selection, empty results, Escape, appropriate ARIA relationships, keyboard movement and committed value. Distinguish active versus selected option. Document disabled options, empty input and focus behavior. Async remote loading and multi-select are outside scope. A native Select remains a separate simpler component; replacing the Combobox with Select does not close this workstream.

### Date Picker

Provide a functional single-date calendar: real month lengths and leap years, previous/next month, keyboard date movement, selected date versus today, accessible date names, current view announcement, a documented value format, and min/max or disabled-date handling if exposed. Supply a native Date Input integration/fallback. Avoid timezone shifts in date-only values. Ranges, bookings and localization infrastructure beyond a clearly stated locale/week-start contract are outside scope.

### Tree View

Decide and document the existing component's semantic model. Nested navigation/disclosure is acceptable if it is explicitly a navigation tree, with working expansion, state synchronization and accessible branch buttons. If advertising an ARIA tree widget, implement the corresponding focus and arrow-key model fully. Do not add role=tree to an ordinary list without its behavior. No virtualization or remote tree loading is required.

### Rich Text Editor

Complete a small basic editor contract: named editable area, working bold/italic/link controls, safe link schemes, predictable selection/focus handling, accurate toolbar state and a documented output representation. Address paste handling and HTML serialization so executable or unsafe markup is not retained or reinserted. Test hostile pasted/link content and keyboard toolbar access. Do not leave decorative toolbar buttons enabled. Tables, media embeds, collaborative editing and plugin ecosystems are outside scope.

Research current authoritative accessibility/browser guidance when needed. Ground behavior in tests and actual browser support rather than relying on ARIA attributes alone. If a bounded feature cannot be completed safely, leave a specific blocker; do not mark G3 complete by changing its description to “mockup.”

## 7. G4 — Promote useful lab behavior into supported reusable behavior

Implement and document opt-in hooks for:

- Code Block copy: exact code text, success feedback only after successful copy, useful failure fallback, accessible announcement and no unexpected focus loss.
- Stepper: native min/max/step semantics, bounded increment/decrement, meaningful button names, disabled endpoints and consistent input/change events. Handle empty/invalid/fractional values deliberately.
- Segmented Control: exclusive selection, synchronized pressed states and documented keyboard/focus behavior; no incomplete tab semantics.
- Toast: explicit dismissal and a usable live-region pattern. If adding timeout, pause appropriately and keep duration configurable; a global notification service is not required.
- Carousel: working previous/next controls, keyboard-reachable scroll content, documented boundaries and appropriate announcements, reduced-motion-safe scrolling and no forced autoplay.
- Promo Banner dismissal when advertised, with a labeled control and explicit persistence policy; default need not persist.

Remove duplicate competing handlers from the lab and adapt it to exercise the shipped behavior. Do not load both old delegated lab clicks and new library handlers on the same controls. Keep application actions such as checkout, file deletion and backend submission explicitly consumer-owned.

## 8. G5 — Repair responsive, containment and motion behavior

Reproduce the existing cases before changing CSS:

- Uncontained Bento Grid at 390px remains four columns and overflows to 434px; an outer container produces a single column.
- Content Section, Generator Panel, Newsletter Signup and Product Showcase only split when an outer container exists.
- Slider produces 392px document width in a 390px isolated sample.

Choose a consistent reusable containment architecture. Prefer an explicit outer-root/inner-layout contract where queries cannot apply to their own size container. If a required wrapper is part of the solution, include it in the canonical template and every copyable example; do not leave it as an undocumented consumer obligation. Preserve old markup where practical and explain compatibility.

Verify 320/390/768/1440 viewport widths and independent component-container widths, long content, 200 percent text, nested cards and RTL where directional behavior exists. Test Table scrolling, Pricing Table wrapping, Header/Footer navigation wrapping, form controls, drawers, popovers and tooltips near viewport edges.

Define Drawer as a nonmodal secondary panel by default or preserve its existing explicit model. If providing a modal sheet mode, implement actual modality, background inertness, scroll behavior, focus containment and restoration, and semantics consistent with that mode. Do not trap focus in a nominally nonmodal panel without an intentional documented interaction model. Keep styling for inline panel versus positioned sheet explicit.

Review raw dimensions and motion values for meaningful token opportunities; do not mechanically replace every percentage/aspect ratio with a token. Keep token references accurate. Fix directional transforms such as Toggle's physical translateX where they break RTL.

Honor reduced motion in CSS and JavaScript, including explicit smooth scroll calls. Document the actual supported motion inventory. No decorative page animation system is required.

## 9. G6 — Make enhancement lifecycle reliable

Preserve no-argument `SiteKit.enhance()` and automatic initial enhancement. Add a documented compatible way to enhance a subtree and clean up/dispose behavior where dynamic consumers need it, or an equivalently tested lifecycle design.

Cover:

- New components inserted after load.
- New opener/closer controls targeting an already enhanced dialog or drawer.
- Repeated enhancement without duplicate handlers.
- Removal and reinsertion without stale document listeners or focus restoration to detached elements.
- Multiple components of the same kind without cross-instance interference.
- Unique generated IDs and complete IDREF synchronization.
- Focusable elements inside hidden/inert/disabled ancestors and empty-focus edge cases.
- Theme control synchronization, supported values and safe storage failures.

Document lifecycle API inputs, outputs, events, compatibility and ownership. Avoid a global MutationObserver unless it is justified. Explicit integration points are adequate; leaking document listeners is not.

## 10. G7 — Add the useful missing compositions needed for trustworthy reuse

Keep these as documented SiteKit recipes/examples unless a new reusable component is clearly warranted:

- Form help/error/success/required patterns with labels, descriptions, native validation and application-owned submission clearly separated.
- Loading Button composition with accessible status, aria-busy, disabled behavior where appropriate and stable layout.
- Responsive image and video examples using real native elements: alt, dimensions/aspect ratio, srcset/sizes where supplied, controls, captions/tracks and explicit media source ownership. No remote media service or upload backend.
- Documentation shell/sidebar/TOC composition with revealing skip links, heading anchors, active-navigation semantics, narrow-screen navigation and readable code/tables.
- Small local search composition over supplied fixture records with labeled input, useful results, empty state and keyboard navigation. Clearly distinguish a search recipe from a bundled search service.

These must be library reference compositions, not the actual sitekit.kujolang.ai website. Do not add a command palette, charting library, JSON viewer, authentication service, chat app, drag framework or virtualized data grid just to broaden a checklist.

## 11. G8 — Publish accurate metadata and documentation

Maintain one authoritative source model for contracts and generate facts from it. Use authored explanation for selection guidance, accessibility and composition. Do not duplicate component data manually in the lab.

Provide machine-readable metadata sufficient for a later site builder to generate navigation, API tables, verified controls, examples, tokens and search records. Include stable slug, name/category, source paths, actual selectors/hooks, implemented variants or explicit aliases, native attributes, slots, state ownership, example IDs, dependencies, accessibility/responsive notes and version.

Separate implemented, native and consumer-owned capabilities. Unknowns remain explicit. Check metadata against source/templates/tests rather than pretending a generated JSON file makes the API true.

For every component, update useful use/avoid guidance and at least one valid standalone example. Important interactive components require keyboard, lifecycle, state and multi-instance examples. Update recipes, generated indexes, DESIGN, distribution README where generated, source README and CHANGELOG through their intended sources/generators.

Replace dead legacy-source references as navigational guidance while preserving useful historical provenance. Verify icon licensing/source references and local font loading. Keep declarations, selectors, theme token graphs and actual dependencies synchronized.

Do not overwrite the original audit evidence to make it appear that the baseline never had defects. The old dossier generator intentionally refuses changed source at its pinned baseline. Do not disable that guard. Produce a new current-state metadata/evidence set under `docs/sitekit-gap-closure/` or another clearly identified maintained location, and link it as the newer implementation handoff.

## 12. G9 — Expand testing beyond the representative dashboard

Use the existing test/build stack unless a focused addition is justified. Retain all valid release and behavior tests. Fix their expectations only when the contract intentionally changes and the change is explained; do not weaken tests to accommodate broken behavior.

Required evidence:

1. Every component's canonical example renders in an isolated fixture with real dist CSS, script where needed, actual fonts and local assets.
2. Automated accessibility checks cover all components and relevant open/selected/error states. Critical foreground/background and icon states cover all four themes.
3. Chromium, Firefox and WebKit exercise each newly implemented interactive family. Use the full engine matrix for behavior, with an efficient representative visual matrix rather than redundant screenshots of every permutation.
4. Keyboard/focus regressions cover the concrete contracts above, including multiple instances and lifecycle changes.
5. Responsive tests distinguish viewport from container width and cover the reproduced failures, long content and text scaling.
6. Meaningful screenshot baselines cover changed visual states and important compositions. A JSON list of variant names is not a visual regression test.
7. Copied examples work in a clean consumer, with no unresolved placeholders, duplicate IDs, broken ARIA relationships, hidden-but-focusable content or missing dependencies.
8. CSS-only consumers remain readable; native controls retain behavior. Progressive widgets have explicit fallback/visibility policies.
9. Rich-text/link/paste handling and example rendering have targeted security tests; no eval, arbitrary script execution or unsafe URL handling.
10. Byte/gzip measurements compare the optional script and CSS before/after. Explain growth and keep unused heavy features out of basic consumers where feasible.

Run the repository's relevant full gates, including:

```sh
npm ci
npm run format:check
npm run build
npm run lint
npm run validate
npm run snapshot
npm run smoke
npm run browser:test
npm run generated:check
npm run release:check
```

Install supported browser engines when missing. Run any new gates you introduce and required repository-specific release checks. Preserve machine-readable summaries and concise failure evidence. Do not claim a suite ran when only its configuration was read.

Perform a manual keyboard and visual review of critical compositions; record screen-reader coverage actually performed and any remaining unverified behavior. Automated axe results do not certify WCAG compliance.

## 13. G10 — Leave a refreshed implementation handoff

Create these outputs in `docs/sitekit-gap-closure/`:

- `README.md`: current status, reading order, tested source/version, what the website builder should now trust.
- `GAP-CLOSURE-MATRIX.md`: every G1–G10 item and concrete subissue, resolution, paths and tests.
- `API-AND-MIGRATION.md`: final public API, compatible aliases, behavior changes, lifecycle usage, any migration needs.
- `VERIFICATION.md` plus structured result data: exact gates/results, browsers/themes/viewports, new regression evidence, measurements and limitations.
- `SHOWCASE-READINESS.md`: how the original showcase plan should change after library updates; which earlier caveats are resolved and which remain.
- Current component/token manifests and valid examples, or explicit links to the newly maintained canonical artifacts.

Keep the original audit baseline and evidence intact. Add a conspicuous pointer in its README to the newer gap-closure handoff so the site-building agent does not use stale caveats or adapters. The new current-state artifacts must identify the final implemented contracts; historical source snapshots remain historical.

The next agent should be able to build the site from the repository, original design/build dossier and this delta without another broad audit.

## 14. Completion standard

Do not report success until:

- Every required gap has a working implementation or a narrowly justified compatible contract resolution where this prompt explicitly allows it.
- Confirmed defects have regressions that fail on the old behavior and pass on the new behavior.
- Advanced-widget behavior is actually delivered within the defined bounds, not merely relabeled.
- Schema claims, examples, source, distribution and metadata agree.
- Existing valid tests and new relevant checks pass.
- Current documentation and the refreshed website handoff are complete.
- Changes are committed in reviewable units, pushed, and the working tree is clean.

Do not expand into optional product systems, and do not silently defer required work. If blocked, identify the exact unresolved item, evidence, attempted remedies and smallest missing decision; report partial completion honestly.

Follow the user's persistent Strata consolidation instructions: deduplicate, save the minimum durable implementation/handoff delta with provenance, and verify retrieval. Reuse existing SignalBox findings as context; do not create duplicate captures for already recorded issues or completed summaries. Do not change Signal dispositions or create downstream tasks without authorization.

Existing review pointers:

- Accessibility/source defects: `cap_79aaab36-345d-4478-8f6b-d5e7acf96c14` / `sig_44424d3b-04eb-46d4-a4ea-9d5b9a6c5a07`.
- API/behavior drift: `cap_e8a90cf8-e2c3-46fd-aade-ef8b553ed44e` / `sig_1bba7fff-669b-40cd-99c8-bf28f49b72a0`.
- Container ownership: `cap_a4a51f5b-932d-40c2-bdcf-469edf070f8b` / `sig_833e4e1c-810c-466a-8c6e-db45ee7db615`.

Final report: concise list of closed gaps, new public behavior, compatibility notes, verification results, commit IDs, refreshed handoff path and unresolved blockers. Finish with **READY FOR SHOWCASE BUILD** only when the required work is verified; otherwise **NOT READY**, followed by the exact remaining work. No website build or deployment occurs during this mission.
