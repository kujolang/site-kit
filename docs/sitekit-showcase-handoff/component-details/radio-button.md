# Radio Button

Category: Forms. Public: HTML/CSS source contract. Status: `native`. Primitive: True.

## Purpose and selection

Capture one native choice within a labeled radio group.

Avoid: Independent multiple choices or an ARIA-only custom radio widget.

## Source and consumption

- schema: `components/radio-button/radio-button.schema.json`
- template: `components/radio-button/radio-button.html`
- css: `components/radio-button/radio-button.css`
- documentation: `components/radio-button/radio-button.md`
- examples: `components/radio-button/examples.json`

Load `dist/sitekit.css`; root selector `.sk-radio-button`. No component JavaScript export.

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
| default | source template | components/radio-button/radio-button.html |
| focus | CSS selector; may target descendants | components/radio-button/radio-button.css |
| checked | CSS selector; may target descendants | components/radio-button/radio-button.css |

## Interaction and accessibility

Browser-native control/navigation behavior for the source elements; no SiteKit-specific callback or controller. Native same-name controls supply keyboard selection; appearance is squared despite radio semantics.

STRONG: Preserve the template native semantics and visible text. Consumer content and composition need page-level verification.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css
.sk-radio-button input[type="radio"] { appearance: none; display: inline-grid; place-items: center; inline-size: var(--sk-size-control-sm); block-size: var(--sk-size-control-sm); padding: 0; flex: 0 0 auto; }
.sk-radio-button input[type="radio"]::before { content: ""; inline-size: var(--sk-space-3); block-size: var(--sk-space-3); background: transparent; }
```

## Motion

```css
.sk-radio-button label, .sk-radio-button legend, .sk-radio-button__label { color: var(--sk-text-muted); font-family: var(--sk-font-mono); font-size: var(--sk-type-size-xs); line-height: var(--sk-type-line-tight); text-transform: uppercase; }
.sk-radio-button label { display: flex; align-items: center; gap: var(--sk-space-3); color: var(--sk-text-primary); font-family: inherit; font-size: inherit; text-transform: none; cursor: pointer; }
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<fieldset class="sk-radio-button"><legend>Plan</legend><label><input type="radio" name="plan" checked> Starter</label><label><input type="radio" name="plan"> Pro</label></fieldset>
```

## Composition and dependencies

Nested SiteKit components: []. External runtime libraries: none.

Related: [].

Actual CSS variables: `--sk-action-primary`, `--sk-border-1`, `--sk-border-default`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-font-mono`, `--sk-radius-0`, `--sk-size-control-sm`, `--sk-space-3`, `--sk-space-4`, `--sk-surface-card`, `--sk-text-muted`, `--sk-text-primary`, `--sk-type-line-tight`, `--sk-type-size-xs`.

## Caveats and documentation

- Native same-name controls supply keyboard selection; appearance is squared despite radio semantics.

MINIMAL: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: []. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {"checked": {"type": "boolean", "property": "checked", "target": "native input", "confidence": "PROPOSED browser-property adapter"}}, "matrix": true}
