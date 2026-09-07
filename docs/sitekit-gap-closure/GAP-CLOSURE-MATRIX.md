# Gap-closure matrix

All 48 tracked subissues across G1–G10 are verified within the bounded contracts in [API and migration](API-AND-MIGRATION.md). [ledger.json](ledger.json) preserves baseline evidence, source, chosen contract and regression references. See [verification](VERIFICATION.md) for exact coverage and limitations.

| ID | Resolution / public contract | Source | Regression | Status |
| --- | --- | --- | --- | --- |
| G1-examples | 85 valid standalone authoring references and schema example records | `components/*/example.html; components/*/examples.json` | isolated component cases; copied examples IDREF test | verified |
| G1-fields | Required fields, title/control/panels/totals and native bindings | `components/*/*.schema.json; components/{card,form-field,tabs,ecosystem-map}/*.html` | scripts/generate-contracts; tests/contract/component-contracts.cjs | verified |
| G1-variants | Preserved legacy variants as explicit aliases or actual attribute selectors | `components/*/*.schema.json` | scripts/generate-contracts | verified |
| G2-avatar | Meaningful img alt instead of prohibited generic span label | `components/avatar` | isolated avatar | verified |
| G2-calendar | Named valid row/gridcell calendar structure | `components/date-picker; scripts/sitekit-behavior.js` | isolated date-picker; calendar leap year | verified |
| G2-code | Keyboard reachability only for scrollable code | `scripts/sitekit-behavior.js` | isolated code-block; promoted copy | verified |
| G2-disabled | Native disabled and enhanced aria-disabled action suppression | `scripts/sitekit-behavior.js` | disabled action and native progress | verified |
| G2-drawer | Hidden drawer absent; close, Escape, new opener, reinsertion and focus return | `components/drawer; scripts/sitekit-behavior.js` | drawer lifecycle and nonmodal focus | verified |
| G2-editor | Named editable textbox and toolbar actions | `components/rich-text-editor; scripts/sitekit-behavior.js` | isolated rich-text-editor; editor formatting paste serialization | verified |
| G2-icon | Context-safe color inheritance across button variants/themes | `components/icon/icon.css` | button icon inheritance; critical visual | verified |
| G2-ids | Explicit instance prefix API and synchronized IDREFs | `scripts/sitekit-behavior.js` | all copied examples unique IDs | verified |
| G2-progress | Labeled native bounded progress, synchronized fill | `components/progress-bar` | isolated progress-bar; disabled action and native progress | verified |
| G2-skip | Revealing skip links with focusable targets | `components/skip-link; layouts; examples` | reference forms search media and keyboard | verified |
| G2-tooltip | Hover persistence, Escape and preserved descriptions | `components/tooltip; scripts/sitekit-behavior.js` | tooltip preserves descriptions | verified |
| G3-combobox | Local single-select autocomplete with active/committed distinction | `scripts/sitekit-behavior.js; components/combobox` | combobox filters commits escapes | verified |
| G3-date | Single-date calendar with native input and date-only arithmetic | `scripts/sitekit-behavior.js; components/date-picker` | calendar leap year boundaries | verified |
| G3-editor | Selected-text bold/italic/safe links, plain paste and allowlisted serialization | `scripts/sitekit-behavior.js; components/rich-text-editor` | editor selected text formatting paste and safe serialization | verified |
| G3-tabs | Automatic/manual oriented tabs with panels and dynamic insertion | `scripts/sitekit-behavior.js; components/tabs` | tabs manual automatic vertical; dynamic tabs | verified |
| G3-tree | Bounded navigation/disclosure semantics | `scripts/sitekit-behavior.js; components/tree-view` | promoted tree; isolated tree-view | verified |
| G4-carousel | Controls, boundaries, native scrolling and reduced-motion-safe JS | `scripts/sitekit-behavior.js; components/carousel` | isolated carousel | verified |
| G4-copy | Exact clipboard text with truthful success/failure announcement | `scripts/sitekit-behavior.js` | promoted copy | verified |
| G4-lab | Generated examples replace duplicated catalog and competing handlers | `examples/component-lab; scripts/generate-contracts` | existing component lab browser matrix | verified |
| G4-promo | Labeled nonpersistent dismissal | `components/promo-banner; scripts/sitekit-behavior.js` | isolated promo-banner | verified |
| G4-segmented | Exclusive pressed buttons with normal Tab order | `scripts/sitekit-behavior.js` | promoted segmented | verified |
| G4-stepper | Native bounded number stepping and input/change events | `scripts/sitekit-behavior.js; components/stepper` | promoted stepper | verified |
| G4-toast | Explicit dismissal and live-region reference | `components/toast; scripts/sitekit-behavior.js` | promoted toast | verified |
| G5-container | Outer size container and inner component layout in canonical markup | `components/{bento-grid,content-section,generator-panel,newsletter-signup,product-showcase}; css/utilities.css` | containment viewport matrix; independent container text zoom RTL | verified |
| G5-drawer | Explicit nonmodal panel versus positioned sheet | `components/drawer; scripts/sitekit-behavior.js` | drawer lifecycle and nonmodal focus | verified |
| G5-floating | Viewport-clamped nonmodal floating panels with scroll/resize positioning | `scripts/sitekit-behavior.js` | floating panels stay within viewport edges | verified |
| G5-motion | Reduced motion retains CSS override; JS carousel honors preference; toggle logical position | `components/toggle; scripts/sitekit-behavior.js` | existing reduced-motion tests; independent container RTL | verified |
| G5-slider | Native input margin and minimum size prevent isolated overflow | `components/slider` | containment 320/390 | verified |
| G5-stack | Zero-minimum Stack grid track and nonshrinking code copy control | `css/utilities.css; components/code-block/code-block.css` | reference forms search media and keyboard; viewport assertion | verified |
| G5-text-stress | Heading emergency wrapping; shrinkable header navigation items; long-content stress across header/footer/table/pricing/form controls | `css/base.css; components/header/header.css` | navigation tables forms text stress 320/390/768/1440 | verified |
| G6-focus | Detached opener protection and hidden/inert focus filtering | `scripts/sitekit-behavior.js` | existing focus regressions; drawer lifecycle | verified |
| G6-scope | Subtree enhancement and disposal, no global observer | `scripts/sitekit-behavior.js` | drawer lifecycle; dynamic tabs | verified |
| G6-theme | Safe initial storage and synchronization across supported themes | `scripts/sitekit-behavior.js` | existing theme controls regressions | verified |
| G7-docs | Documentation navigation/TOC, anchors, code and tables | `examples/reference-compositions` | reference forms search media and keyboard | verified |
| G7-forms | Help/error/required/local validation and loading reference | `examples/reference-compositions` | reference forms search media and keyboard | verified |
| G7-media | Native image/video with local licensed fixture and captions | `examples/reference-compositions/assets; components/image; components/video` | reference forms search media and keyboard | verified |
| G7-search | Labeled fixture search with empty results and native link keyboard navigation | `examples/reference-compositions/reference.js` | reference forms search media and keyboard | verified |
| G8-docs | Guidance and current example pointers for every component | `components/*/*.md; README.md; CHANGELOG.md; scripts/sitekit.js` | validate:links | verified |
| G8-metadata | Source contracts, hashes, actual selectors/hooks and generated lab/search data | `scripts/generate-contracts; docs/sitekit-gap-closure/*manifest.json` | generated:check; component-contracts.cjs | verified |
| G9-interaction | New behavior tested in Chromium Firefox WebKit | `tests/browser/gap-closure.spec.mjs` | full browser suite | verified |
| G9-isolated | All canonical references render using real dist CSS/script/fonts | `tests/browser/gap-closure.spec.mjs` | isolated tests | verified |
| G9-manual | Keyboard/visual inspection; screen-reader coverage explicitly recorded | `docs/sitekit-gap-closure/VERIFICATION.md` | manual evidence | verified |
| G9-release | Full static and distribution gates plus byte/gzip report | `docs/sitekit-gap-closure/evidence` | VERIFICATION.md | verified |
| G9-visual | Critical states across all four themes with PNG baselines | `tests/browser/gap-closure.spec.mjs-snapshots` | critical visual tests | verified |
| G10-handoff | Current handoff, migration, readiness delta, and conspicuous historical pointer | `docs/sitekit-gap-closure; docs/sitekit-showcase-handoff/README.md` | validate:links; final review | verified |
