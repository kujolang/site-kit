# Documentation audit and hidden value

All 85 components have documentation files. This is file coverage, not usable API coverage. The master table and component records assign a quality rating to each component. Most are minimal: their use/avoid sections repeat the component name, props point to schema, and accessibility/responsive paragraphs are generic. No component is rated excellent.

## Concrete disagreements

| Feature | Declared / implied | Implementation truth |
| --- | --- | --- |
| Button | loading, href, icon slots | Template is one button with label; no loading runtime, no size API, anchor must be authored |
| Card | title prop, plain/interactive/dense | Template heading placeholder; no named variant selectors |
| Tabs | keyboard-navigable view switcher; required panels | No dist controller; panels absent from props; template uses panel singular |
| Checkout Summary | required totals | Props expose subtotal/total; sample hardcodes displayed values |
| Form Field | required control | No control prop; hardcoded input type=text |
| Alert | neutral/compact | CSS adds danger/warning/success; source sample is warning |
| Hero | split/centered/technical variants | data-layout, not data-variant; technical has no selector |
| Grid families | several named variants | data-density=dense exists; most names have no implementation switch |
| Icon | decorative behavior | CSS ARIA declaration is inert; actual attribute required |
| File Upload | dropzone/drag copy | Native chooser only, no drag/drop upload implementation |
| Image/Video | media component names | Captioned placeholder divs, not media-loading components |
| Promo Banner | dismissible | No close control or shipped dismissal |
| Code Block | copy/terminal/numbered | Lab copy only; no highlighter, numbering or variant rules |
| Testimonial Rail / Ecosystem Map | rail / radial names | Intrinsic grids, no rail/graph controller |

`evidence/api-discrepancies.json` contains every component's declared variants versus selector evidence, required-field inconsistencies and declared/direct token dependency differences. Direct token extraction is more useful for the inspector than repeated generic schema token lists. A missing selector is an evidence gap, not proof that an authored composition could never implement a named pattern.

## Documentation hazards

- Generic `examples.json` records often provide label and variant even when required fields are unrelated arrays. They are metadata, not ready-to-render cases.
- “Legacy source coverage” records point to `old-components/...`, absent from this checkout. Preserve them as historical attribution, not live source evidence.
- Generated DESIGN/index text inherits descriptions and cannot verify implementation. The existing index categorization places Accordion under Feedback and Stack under Content; keep canonical categories in manifests but allow useful navigation aliases.
- Most defaults are absent, slots lack item schemas, and required does not mean native required. No renderer interprets any of it.
- Source and lab samples differ. The lab's copy button copies its prepared preview (including modal presentation changes), not necessarily a production-ready source example.
- Current tests' “visual snapshot” is schema JSON; browser screenshots are failure artifacts and Lens is separate. Do not call the snapshot a pixel baseline.
- Layout skip-link markup uses sk-sr-only instead of sk-skip-link. Documentation compliance language is an aim with explicit downstream boundary, not proof of every source example.

## Hidden value worth exposing

| Existing material | Why it belongs in the site | Boundary |
| --- | --- | --- |
| Semantic/core/theme linkage | Explain exactly how a token changes a component | Compute actual references, not schema guesses |
| Distribution hash manifest and licenses | Reproducible vendoring guide and upgrade check | No hosted package service required |
| DOM enhancement idempotence and focus regressions | Practical integration/lifecycle guide | No destroy or scoped enhance API |
| Consumer dashboard CSS and markup | Best serious-interface reference | Positional drawer/sidebar rules are composition CSS |
| Native control templates | Low-JS forms and disclosure cookbook | Native constraints/state are consumer-authored |
| Lab clipboard and small state adapters | Source for proposed site modules | Harden keyboard, limits, error reporting and ownership first |
| Eight recipes and six page skeletons | Discover composition without reading every component | No page-building runtime |
| Two clipping helpers and Stack distinction | Avoid subtle misuse in layouts | Explain aliases without pretending equivalence |

## Source synchronization strategy (PROPOSED)

Use a hybrid model: deterministic extraction for source paths/hashes, props-as-declared, templates, direct CSS variables and token resolution; authored overrides for verified bindings, safe controls, examples, accessibility and intended composition. This dossier's generator illustrates that boundary without becoming a website compiler.

Pin the library commit/version and distribution hash. Regenerate facts in CI and fail when the expected source fingerprint changes. Require human/agent review of changed component contracts before accepting new controls or claims. Keep stable IDs and routes independent of display names. Do not scrape TypeScript metadata because none exists. Do not infer callbacks from schema names or execute JSON as templates. Website builders may implement this preprocessing in the existing Python/Kujo toolchain or a small Node tool; the contract, not language choice, is important.
