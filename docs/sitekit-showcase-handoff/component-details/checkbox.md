# Checkbox

Category: Forms. Public: HTML/CSS source contract. Status: `native`. Primitive: True.

## Purpose and selection

Capture a native boolean choice with a wrapping label.

Avoid: A radio group or custom tri-state widget.

## Source and consumption

- schema: `components/checkbox/checkbox.schema.json`
- template: `components/checkbox/checkbox.html`
- css: `components/checkbox/checkbox.css`
- documentation: `components/checkbox/checkbox.md`
- examples: `components/checkbox/examples.json`

Load `dist/sitekit.css`; root selector `.sk-checkbox`. No component JavaScript export.

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
| default | source template | components/checkbox/checkbox.html |
| focus | CSS selector; may target descendants | components/checkbox/checkbox.css |
| checked | CSS selector; may target descendants | components/checkbox/checkbox.css |

## Interaction and accessibility

Browser-native control/navigation behavior for the source elements; no SiteKit-specific callback or controller. Native checked state is styled; indeterminate and disabled visual treatments are not authored here.

STRONG: Preserve the template native semantics and visible text. Consumer content and composition need page-level verification.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css
.sk-checkbox input[type="checkbox"] { appearance: none; display: inline-grid; place-items: center; inline-size: var(--sk-size-control-sm); block-size: var(--sk-size-control-sm); padding: 0; flex: 0 0 auto; cursor: pointer; }
.sk-checkbox input[type="checkbox"]::before { content: ""; inline-size: var(--sk-space-3); block-size: var(--sk-space-3); background: transparent; }
```

## Motion

```css
.sk-checkbox label, .sk-checkbox legend, .sk-checkbox__label { color: var(--sk-text-muted); font-family: var(--sk-font-mono); font-size: var(--sk-type-size-xs); line-height: var(--sk-type-line-tight); text-transform: uppercase; }
.sk-checkbox label { display: flex; align-items: center; gap: var(--sk-space-3); color: var(--sk-text-primary); font-family: inherit; font-size: inherit; text-transform: none; cursor: pointer; }
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<div class="sk-checkbox"><label><input type="checkbox" checked> Receive release notes</label></div>
```

## Composition and dependencies

Nested SiteKit components: []. External runtime libraries: none.

Related: [].

Actual CSS variables: `--sk-action-primary`, `--sk-border-1`, `--sk-border-default`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-font-mono`, `--sk-radius-0`, `--sk-size-control-sm`, `--sk-space-2`, `--sk-space-3`, `--sk-surface-card`, `--sk-text-muted`, `--sk-text-primary`, `--sk-type-line-tight`, `--sk-type-size-xs`.

## Caveats and documentation

- Native checked state is styled; indeterminate and disabled visual treatments are not authored here.

MINIMAL: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: []. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {"checked": {"type": "boolean", "property": "checked", "target": "native input", "confidence": "PROPOSED browser-property adapter"}}, "matrix": true}
