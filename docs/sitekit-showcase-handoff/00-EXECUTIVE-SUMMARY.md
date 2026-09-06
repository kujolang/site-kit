# SiteKit showcase implementation dossier

Audit date: 2026-09-06. Source baseline: `c0d199e06bc926e29de87b7cd983ee3d54db9cda`, branch `main`, package version 1.0.0. Target: `https://sitekit.kujolang.ai`. This assignment produces documentation and audit metadata only. No website, infrastructure, deployment, or library rewrite is included.

## Product model

**SiteKit is a source-vendored, semantic HTML/CSS design system with structured component contracts, four themes, page compositions, and a small optional browser enhancement layer.**

A developer receives local styles, font assets, copyable semantic templates, JSON design contracts and examples. They can build documentation, marketing, publishing, commerce presentations and operational dashboards without a required client framework. The supported deployment unit is `dist/`, kept intact with its sibling `fonts/` directory.

Technically it is one private CommonJS build package, not a React package or application framework. Node scripts flatten tokens, concatenate layered CSS, copy a browser IIFE and fonts, and generate documentation and a distribution checksum manifest. Component schemas do not render HTML or bind props. Consumers write their own template substitution, markup, events, routing and application state. There is no per-component module export.

As a design system it favors square geometry, thin high-contrast borders, monochrome technical typography, explicit hierarchy and sparse motion. The core `font.sans` token is actually a system monospace stack; `font.mono` adds bundled Departure Mono. Shadows named `hard` and `hardSm` both resolve to `none`. These details matter more than conventional design-system expectations.

Within Kujo, SiteKit is the interface vocabulary used alongside static generation and project tooling, rather than a Kujo language runtime. The local `kujolang.ai-work` and `docs.kujolang.ai` sources demonstrate Kujo SSG consumption. The showcase should use the same HTML-first approach and make SiteKit's actual contracts legible to both humans and agents.

## Snapshot and maturity

| Measure | Audited result |
| --- | --- |
| Meaningful schema-backed components | 85, all publicly reusable as source/HTML/CSS |
| Primitive subset | 15, explicitly defined by this audit; not a separate library package |
| Layout documents | 6: app-shell, blog, changelog, docs, ecommerce, landing |
| Recipes | 8 composition manifests |
| CSS utility concepts | 6; separate from component count |
| Tokens | 120: 78 core and 42 semantic; four override themes |
| Shipped behavioral components | 5: dropdown-menu, popover, tooltip, modal, drawer; theme controls are an additional system |
| Runtime public API | `window.SiteKit.enhance()` only |
| Per-component docs artifacts | 85/85 have Markdown, schema, template, CSS, examples.json |
| Documentation quality | Broad presence, mostly minimal boilerplate; several schemas contradict templates or CSS |
| Tests | Static contracts, generated snapshot, distribution smoke/package gates, 135 configured Playwright cases; see executed results in evidence |

Version 1.0.0 declares a stable distribution contract, but completeness is uneven. The library is strong at static presentation and a bounded set of native/progressive interactions. It is not a mature all-purpose headless widget toolkit. A calendar-looking template is not a functioning date-picker; a tabs schema is not a keyboard controller. Treat this distinction as the organizing principle for documentation, not a footnote.

## Strongest capabilities

1. Portable local distribution: no production third-party runtime dependencies; fonts and licenses travel with the CSS.
2. Consistent Kujo visual language across a broad set of primitives, content sections and commerce compositions.
3. Real semantic building blocks: native forms/disclosures/dialogs, captioned tables, definition lists and navigation landmarks.
4. Inspectable JSON tokens and themes that map predictably to CSS custom properties.
5. Lightweight shipped menu, popover, tooltip, drawer, modal and theme enhancement with regression tests.
6. Useful operational dashboard example showing table, metadata, filters and overlays together.
7. Deterministic generation and release checks, including distribution hashes and clean copied consumers.
8. Existing component lab, six examples and eight recipes provide substantial presentation material to adapt.

## Biggest gaps

1. Schema properties and variants are largely descriptive, not bound implementations. Required fields and template placeholders diverge in several important components.
2. Tabs, combobox, calendar, stepper, segmented controls and toast behavior are absent from the shipped script; some lab-only clicks can conceal this.
3. Isolated probes found six components with axe violations; Drawer remains rendered while hidden, and primary Button/Icon composition produces an invisible black-on-black symbol. Calendar/editor/progress semantics also need repair.
4. Drawers do not supply full modality, background inertness, fixed positioning or scroll locking; dashboard CSS adds its own positioning.
5. Root-targeting container queries require an outer container, whereas schemas imply broad intrinsic responsiveness. Small isolated previews need explicit checks.
6. Component docs mostly repeat generic rules; defaults, concrete bindings, composition examples and tested behavioral boundaries are missing.
7. Existing browser coverage tests representative pages, not the full 85-component/state/theme matrix; the schema snapshot is not pixel regression coverage.
8. No search index, command palette, documentation sidebar, syntax highlighter, Markdown renderer or automatic example renderer exists in the package.

## Recommended showcase

Build a static, route-based documentation and catalog site using a pinned SiteKit distribution, authored content and small browser modules. Prefer the existing Kujo SSG ecosystem; generate normalized metadata before rendering rather than building a schema-to-component compiler. Every component gets a stable page with real markup, explicit support status, synchronized copyable code, API evidence and limitations. Larger examples prove composition. Search and structured JSON expose the same knowledge model to people and agents.

V1 interaction should focus on four-theme switching, component/category search, audited attribute controls, copy/reset, real focus/keyboard exercises, selected state matrices, container/viewport previews, token inspection and four local-data example compositions. Do not offer arbitrary JavaScript execution, speculative variant controls or a full code IDE.

## Reading order and boundary

Read architecture, gaps and implementation plan first; then use the component manifest and per-component records directly while building. `audit-notes.json` holds authored judgments; `generate-audit.py` reproduces source extractions. The manifests preserve **declared** APIs separately from **verified** bindings. Null means unknown, not false or unsupported.

- A: SiteKit today is described in 01–07, 16, the records and manifests.
- B: Recommended SiteKit changes are prioritized in 08.
- C: Proposed website work is specified in 09–13 and the routes manifest.

Confidence labels: VERIFIED = source; OBSERVED = executed test or inspected example with scope; INFERRED = architectural deduction; PROPOSED = future work; UNKNOWN = unestablished. Accessibility guidance is not WCAG certification. The second agent should not repeat a broad repository audit, but must validate individual adapters and new compositions as implementation proceeds.

**Readiness: READY WITH CAVEATS.** There is enough evidence and specification to begin building. Library gaps must remain visibly qualified; framework integration, DNS ownership and live deployment settings are not pre-established. Existing tests passed 135/135; isolated probes deliberately exposed unresolved source defects. See 14 and the final verification record.
