# Combobox

Category: Forms. Public: HTML/CSS source contract. Status: `example-only-js`. Primitive: False.

## Purpose and selection

Show an input and styled option list for a consumer-owned autocomplete.

Avoid: A complete keyboard-accessible autocomplete out of the box.

## Source and consumption

- schema: `components/combobox/combobox.schema.json`
- template: `components/combobox/combobox.html`
- css: `components/combobox/combobox.css`
- documentation: `components/combobox/combobox.md`
- examples: `components/combobox/examples.json`

Load `dist/sitekit.css`; root selector `.sk-combobox`. No component JavaScript export.

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

Declared variants: autocomplete, compact.

Verified component data-variant selectors: none. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: none established; sizing follows CSS/native dimensions.

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/combobox/combobox.html |
| hover | CSS selector; may target descendants | components/combobox/combobox.css |
| focus | CSS selector; may target descendants | components/combobox/combobox.css |
| selected | CSS selector; may target descendants | components/combobox/combobox.css |

## Interaction and accessibility

No dist filtering, active-descendant, arrow navigation or selection handler. Lab has click selection only.

NEEDS IMPROVEMENT: No dist filtering, active-descendant, arrow navigation or selection handler. Lab has click selection only.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css
.sk-combobox input { inline-size: 100%; border: var(--sk-border-1) solid var(--sk-border-default); border-radius: var(--sk-radius-0); background: var(--sk-surface-card); color: var(--sk-text-primary); padding: var(--sk-space-3); font: inherit; }
```

## Motion

```css
.sk-combobox label, .sk-combobox legend, .sk-combobox__label { color: var(--sk-text-muted); font-family: var(--sk-font-mono); font-size: var(--sk-type-size-xs); line-height: var(--sk-type-line-tight); text-transform: uppercase; }
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<div class="sk-combobox"><label for="combobox-input">Component</label><input id="combobox-input" type="text" role="combobox" aria-controls="combobox-options" aria-expanded="true" value="Button" autocomplete="off"><ul id="combobox-options" role="listbox"><li role="option" aria-selected="true">Button</li><li role="option">Card</li><li role="option">Modal</li></ul></div>
```

## Composition and dependencies

Nested SiteKit components: []. External runtime libraries: none.

Related: ["search-input", "select"].

Actual CSS variables: `--sk-action-primary`, `--sk-action-primary-text`, `--sk-border-1`, `--sk-border-default`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-font-mono`, `--sk-radius-0`, `--sk-space-2`, `--sk-space-3`, `--sk-surface-card`, `--sk-text-muted`, `--sk-text-primary`, `--sk-type-line-tight`, `--sk-type-size-xs`.

## Caveats and documentation

- No dist filtering, active-descendant, arrow navigation or selection handler. Lab has click selection only.

MINIMAL: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: ["examples/component-lab/index.html"]. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {}, "matrix": false}
