# Textarea

Category: Forms. Public: HTML/CSS source contract. Status: `native`. Primitive: True.

## Purpose and selection

Capture multiline native text with label and minimum height.

Avoid: Rich-text formatting or autoresize behavior.

## Source and consumption

- schema: `components/textarea/textarea.schema.json`
- template: `components/textarea/textarea.html`
- css: `components/textarea/textarea.css`
- documentation: `components/textarea/textarea.md`
- examples: `components/textarea/examples.json`

Load `dist/sitekit.css`; root selector `.sk-textarea`. No component JavaScript export.

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
| default | source template | components/textarea/textarea.html |
| focus | CSS selector; may target descendants | components/textarea/textarea.css |

## Interaction and accessibility

Browser-native control/navigation behavior for the source elements; no SiteKit-specific callback or controller. Nine-rem min height; no auto-resize controller. Native resize behavior varies by browser.

ACCEPTABLE: Preserve the template native semantics and visible text. Consumer content and composition need page-level verification.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css
.sk-textarea input, .sk-textarea select, .sk-textarea textarea { inline-size: 100%; border: var(--sk-border-1) solid var(--sk-border-default); border-radius: var(--sk-radius-0); background: var(--sk-surface-card); color: var(--sk-text-primary); padding: var(--sk-space-3); font: inherit; }
```

## Motion

```css
.sk-textarea label, .sk-textarea legend, .sk-textarea__label { color: var(--sk-text-muted); font-family: var(--sk-font-mono); font-size: var(--sk-type-size-xs); line-height: var(--sk-type-line-tight); text-transform: uppercase; }
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<div class="sk-textarea"><label for="textarea-control">Notes</label><textarea id="textarea-control">Document implementation details.</textarea></div>
```

## Composition and dependencies

Nested SiteKit components: []. External runtime libraries: none.

Related: [].

Actual CSS variables: `--sk-border-1`, `--sk-border-default`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-font-mono`, `--sk-radius-0`, `--sk-space-2`, `--sk-space-3`, `--sk-surface-card`, `--sk-text-muted`, `--sk-text-primary`, `--sk-type-line-tight`, `--sk-type-size-xs`.

## Caveats and documentation

- Nine-rem min height; no auto-resize controller. Native resize behavior varies by browser.

MINIMAL: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: []. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {"value": {"type": "native-value", "property": "value", "confidence": "PROPOSED browser-property adapter; not schema API"}}, "matrix": false}
