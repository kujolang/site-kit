# Interactive demo specification

PROPOSED. One small adapter registry should power component detail previews, matrices and the global playground. Do not interpret arbitrary schema props or turn templates into a general-purpose runtime.

## Adapter/data contract

Each adapter has a stable component slug, example ID, allowed state object, pure `renderMarkup(state, idPrefix)` and serializer, supported control definitions, and optional consumer behavior module. The library manifest's declared props are documentation; only authored bindings become controls. Return markup from reviewed templates with escaped text and allowlisted attributes. The same markup string supplies the initial preview and copy panel; mounted runtime mutations do not become the source of the copied example.

Use explicit ownership labels: native browser, SiteKit dist, showcase controller, illustrative-only. If a demo needs JS absent from dist, its code panel and download must include that module or clearly state the behavior isn't supplied. No unexplained fake functioning widgets.

| Component group | V1 controls |
| --- | --- |
| Button | primary/secondary/ghost/danger, text, native disabled; show loading as an explicitly authored composition only |
| Badge/Alert | only verified severity values; explain base aliases |
| Icon | sm/md/lg, boxed, decorative/meaningful markup examples; no icon-library picker |
| Native inputs | real native value/checked/disabled/readonly where applicable; label changes update association |
| Accordion | open/closed native details, content |
| Card | content, aria-busy and error border; no fictional dense switch |
| Hero | reviewed centered/split composition, theme and width |
| Feature/Product/Ecosystem grids | default/dense data-density and fixture item count |
| Modal/Popover/Menu/Tooltip | actual trigger controls and keyboard instructions; open via real hooks |
| Drawer | inline panel demonstration with clear layout/modality boundary |
| Other static components | approved content fixtures, theme, width; no automatic schema-variant dropdown |
| Incomplete complex widgets | static reference plus implementation-boundary notice; optional clearly labeled consumer example |

Generic controls: select one component/example, choose one of four themes, choose 390/768/1440 preview width or bounded custom width, copy HTML/dependencies, reset, open standalone preview, share configuration. Density/orientation/loading are exposed only where implemented. Do not simulate hover/focus by inventing classes in the production component.

## Preview isolation

Use a statically generated same-origin preview document per component/example, lazily mounted in a titled iframe. It loads the pinned dist and reviewed adapter script. A fresh document prevents repeated ID collisions, root theme inheritance surprises and accumulated enhancement listeners. Static example content remains readable when scripts are disabled. Put a named outer inline-size container around samples that need it; preserve an option to demonstrate the uncontained boundary on the layout foundation page.

The parent controls communicate only allowlisted bounded JSON state. Validate `event.origin`, `event.source`, channel version, component slug and payload size on both ends. Theme belongs on the preview document's html element; changing a nested wrapper alone can misrepresent root-defined semantic aliases. Document-wide theme persistence is isolated from exploratory theme state: preview code sets its requested root theme after initial enhancement and avoids persisted theme controls; the site-level preference alone writes sk-theme.

For trusted generated same-origin documents, an iframe without an untrusted-code execution claim is simplest. Its containment is visual/lifecycle isolation, not a security sandbox. Apply CSP, frame-src=self, no arbitrary user HTML or remote preview URLs. If future untrusted code execution is required, redesign onto an isolated origin; adding allow-scripts and allow-same-origin is not a security boundary. It is unnecessary for v1.

Preview resizing changes layout width rather than CSS transform scale. A desktop-width iframe can scroll within a narrow viewer, but provide a fit-to-current-width option and a standalone link. Height should be bounded for mobile, with an explicit open-full-preview route. Escape from native modal inside frame must not unexpectedly close unrelated parent UI; test focus return across the frame boundary.

## Serialization and deep links

Versioned query format: `?component=button&example=button-minimal&variant=danger&disabled=1&theme=kujo-dark&width=390`. Encode text fields; cap lengths and reject unknown enum values. Invalid state falls back to documented defaults with a small notice, never executes input. Use replaceState while editing to avoid history spam; share/copy URL is explicit. Canonical metadata points to the base component route, not every query permutation.

State changes update reviewed DOM attributes/properties and the code model together. Copy feedback occurs after clipboard success; on permission failure, select the text and provide instructions without falsely announcing Copied. Reset restores all controls, preview state and code. Form demos prevent network submission and never send local file contents anywhere. Data examples are local fixtures, not accounts or real transactions.

## Matrices

Use real specimens for default, disabled, checked, selected and error states. Hover and focus columns should give interactive targets/instructions; forced-state screenshots belong to test evidence, not a pretend public API. A matrix can have variant rows and theme/state columns, but render only a bounded visible set. V1 priority: Button, Badge/Alert, Icon sizing, Checkbox/Radio/Toggle and Card status. Do not build matrices of names that map to identical unsupported variants. Native input matrices must retain unique labels/IDs and distinguish disabled from readonly.

## Foundation visualizers and token inspector

- Colors: token name, role, raw reference, resolved value in each theme, copy CSS variable, and actual direct usage links. Include a small fixed foreground/background contrast comparison; label the tested pairing rather than issuing a theme-wide compliance badge.
- Typography: real font samples, full type scale, heading/body/metadata/code contexts and editable safe text. Explain system monospace versus Departure Mono and synthetic weights.
- Spacing/sizing: ruler bars in rem with token names; show control sizes separately from spacing values.
- Geometry: square versus available radius values, 1/2/3px borders, no-elevation surfaces. All three shadow tokens are none; do not fabricate an elevation ladder.
- Layout: container/viewport width controls, intrinsic grid track behavior, root-query dependency example and actual query thresholds beside token breakpoints.
- Motion: play/replay the seven existing component effects, display actual durations and reduced-motion differences; no extra decorative transitions.
- Icons: small reviewed local examples, inline versus sprite, meaningful/decorative and icon-only Button labeling.

A dedicated token inspector is justified by the small, explicit 120-token graph. Filter by name/layer/theme/family, show references and direct consumers, copy raw value/variable. Generate static tables for all data and enhance filtering locally. Transitive graph traversal can be build-time; a graph visualization/editor is P2. Do not allow arbitrary CSS injection in v1; themed comparisons and named overrides are enough.
