# Ecosystem Map

Category: Data Display. Public: HTML/CSS source contract. Status: `html-css`. Primitive: False.

## Purpose and selection

Display ecosystem nodes as a responsive grid of authored cards.

Avoid: A force graph, radial layout engine or relationship visualization.

## Source and consumption

- schema: `components/ecosystem-map/ecosystem-map.schema.json`
- template: `components/ecosystem-map/ecosystem-map.html`
- css: `components/ecosystem-map/ecosystem-map.css`
- documentation: `components/ecosystem-map/ecosystem-map.md`
- examples: `components/ecosystem-map/examples.json`

Load `dist/sitekit.css`; root selector `.sk-ecosystem-map`. No component JavaScript export.

## Declared API versus binding

| Field | Declared type | Required | Default | Verified binding / uncertainty |
| --- | --- | --- | --- | --- |
| nodes | array | True | null | UNKNOWN: no automatic binding established; consumer authors markup. |
| relationships | array optional | False | null | UNKNOWN: no automatic binding established; consumer authors markup. |

Required fields: ["nodes"].

Template placeholders: ["items", "label"]. Declared slots: ["nodes", "relationships"].

Allowed children (declared only): ["nodes", "relationships"].

Callbacks/custom events: none exported. DOM/native state and consumer event handlers; no framework controlled/uncontrolled prop runtime.

## Variants, sizes and states

Declared variants: grid, radial, compact.

Verified component data-variant selectors: none. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: none established; sizing follows CSS/native dimensions.

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/ecosystem-map/ecosystem-map.html |
| focus | CSS selector; may target descendants | components/ecosystem-map/ecosystem-map.css |

## Interaction and accessibility

No component-specific shipped JavaScript; links and native descendants retain browser behavior.

ACCEPTABLE: Preserve the template native semantics and visible text. Consumer content and composition need page-level verification.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css
.sk-ecosystem-map { display: grid; gap: var(--sk-component-grid-gap); grid-template-columns: repeat(auto-fit, minmax(min(100%, 12rem), 1fr)); }
.sk-ecosystem-map[data-density="dense"] { grid-template-columns: repeat(auto-fit, minmax(min(100%, 10rem), 1fr)); }
```

## Motion

```css
/* No component animation/transition found. */
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<section class="sk-ecosystem-map" aria-label="Display ecosystem nodes as a responsive grid of authored cards."><article><h3>Source contracts</h3><p>Inspectable component metadata.</p></article></section>
```

## Composition and dependencies

Nested SiteKit components: []. External runtime libraries: none.

Related: [].

Actual CSS variables: `--sk-border-1`, `--sk-border-default`, `--sk-component-grid-gap`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-radius-0`, `--sk-space-5`, `--sk-surface-card`.

## Caveats and documentation

- Schema nodes/relationships differ from items/label placeholders; only dense grid selector exists, no radial renderer.

MINIMAL: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: []. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {"density": {"type": "select", "values": ["default", "dense"], "attribute": "data-density"}}, "matrix": false}
