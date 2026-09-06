# Select

Category: Forms. Public: HTML/CSS source contract. Status: `native`. Primitive: True.

## Purpose and selection

Capture a choice with a native select.

Avoid: An async combobox or custom select listbox.

## Source and consumption

- schema: `components/select/select.schema.json`
- template: `components/select/select.html`
- css: `components/select/select.css`
- documentation: `components/select/select.md`
- examples: `components/select/examples.json`

Load `dist/sitekit.css`; root selector `.sk-select`. No component JavaScript export.

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
| default | source template | components/select/select.html |
| focus | CSS selector; may target descendants | components/select/select.css |

## Interaction and accessibility

Browser-native control/navigation behavior for the source elements; no SiteKit-specific callback or controller. Template has only three themes and omits bzby; theme behavior requires data-sk-theme-select with explicit valid option values.

ACCEPTABLE: Preserve the template native semantics and visible text. Consumer content and composition need page-level verification.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css
.sk-select select { appearance: none; inline-size: 100%; min-block-size: var(--sk-size-control-lg); border: var(--sk-border-1) solid var(--sk-border-default); border-radius: var(--sk-radius-0); background: linear-gradient(45deg, transparent 50%, var(--sk-text-primary) 50%) calc(100% - var(--sk-space-4)) 50% / var(--sk-space-2) var(--sk-space-2) no-repeat, var(--sk-surface-card); color: var(--sk-text-primary); padding: var(--sk-space-3) var(--sk-space-8) var(--sk-space-3) var(--sk-space-3); font: inherit; }
```

## Motion

```css
.sk-select label, .sk-select legend, .sk-select__label { color: var(--sk-text-muted); font-family: var(--sk-font-mono); font-size: var(--sk-type-size-xs); line-height: var(--sk-type-line-tight); text-transform: uppercase; }
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<div class="sk-select"><label for="select-control">Theme</label><select id="select-control"><option>kujo-light</option><option>kujo-dark</option><option>personal-dark</option></select></div>
```

## Composition and dependencies

Nested SiteKit components: []. External runtime libraries: none.

Related: [].

Actual CSS variables: `--sk-border-1`, `--sk-border-default`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-font-mono`, `--sk-radius-0`, `--sk-size-control-lg`, `--sk-space-2`, `--sk-space-3`, `--sk-space-4`, `--sk-space-8`, `--sk-surface-card`, `--sk-text-muted`, `--sk-text-primary`, `--sk-type-line-tight`, `--sk-type-size-xs`.

## Caveats and documentation

- Template has only three themes and omits bzby; theme behavior requires data-sk-theme-select with explicit valid option values.

MINIMAL: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: ["examples/component-lab/index.html"]. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {"value": {"type": "native-value", "property": "value", "confidence": "PROPOSED browser-property adapter; not schema API"}}, "matrix": false}
