# Table

Category: Data Display. Public: HTML/CSS source contract. Status: `html-css`. Primitive: False.

## Purpose and selection

Display captioned tabular data with scoped headers and overflow wrapper.

Avoid: A sortable, filterable, virtualized data grid.

## Source and consumption

- schema: `components/table/table.schema.json`
- template: `components/table/table.html`
- css: `components/table/table.css`
- documentation: `components/table/table.md`
- examples: `components/table/examples.json`

Load `dist/sitekit.css`; root selector `.sk-table`. No component JavaScript export.

## Declared API versus binding

| Field | Declared type | Required | Default | Verified binding / uncertainty |
| --- | --- | --- | --- | --- |
| label | string optional | False | null | UNKNOWN: no automatic binding established; consumer authors markup. |
| variant | string optional | False | null | UNKNOWN: no automatic binding established; consumer authors markup. |

Required fields: [].

Template placeholders: []. Declared slots: ["label", "content", "actions"].

Allowed children (declared only): ["label", "content", "actions"].

Callbacks/custom events: none exported. DOM/native state and consumer event handlers; no framework controlled/uncontrolled prop runtime.

## Variants, sizes and states

Declared variants: default, compact.

Verified component data-variant selectors: none. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: none established; sizing follows CSS/native dimensions.

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/table/table.html |
| focus | CSS selector; may target descendants | components/table/table.css |

## Interaction and accessibility

No component-specific shipped JavaScript; links and native descendants retain browser behavior.

STRONG: Caption plus scope=col and scope=row are present. The scroll wrapper lacks explicit focusability; test keyboard access with very wide data.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css
.sk-table { overflow-x: auto; }
.sk-table table { inline-size: 100%; border-collapse: collapse; border: var(--sk-border-1) solid var(--sk-border-default); background: var(--sk-surface-card); }
```

## Motion

```css
/* No component animation/transition found. */
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<div class="sk-table"><table><caption>Release QA queue</caption><thead><tr><th scope="col">Area</th><th scope="col">Owner</th><th scope="col">Status</th><th scope="col">Due</th></tr></thead><tbody><tr><th scope="row">Checkout flow</th><td>Design Systems</td><td>In review</td><td>Jul 12</td></tr><tr><th scope="row">Account drawer</th><td>Frontend</td><td>Ready</td><td>Jul 14</td></tr><tr><th scope="row">Email capture</th><td>Growth</td><td>Needs copy</td><td>Jul 15</td></tr></tbody></table></div>
```

## Composition and dependencies

Nested SiteKit components: []. External runtime libraries: none.

Related: ["badge", "metadata-panel"].

Actual CSS variables: `--sk-border-1`, `--sk-border-default`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-font-mono`, `--sk-space-3`, `--sk-surface-card`.

## Caveats and documentation

- No sorting or row selection API; horizontal scrolling relies on content overflow and wrapper keyboard reachability needs testing.

MINIMAL: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: ["examples/component-lab/index.html", "examples/consumer-dashboard/index.html"]. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {}, "matrix": false}
