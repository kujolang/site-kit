# Form Field

Category: Forms. Public: HTML/CSS source contract. Status: `native`. Primitive: False.

## Purpose and selection

Associate a label, native control and help description.

Avoid: Automatic validation or rendering a control prop.

## Source and consumption

- schema: `components/form-field/form-field.schema.json`
- template: `components/form-field/form-field.html`
- css: `components/form-field/form-field.css`
- documentation: `components/form-field/form-field.md`
- examples: `components/form-field/examples.json`

Load `dist/sitekit.css`; root selector `.sk-form-field`. No component JavaScript export.

## Declared API versus binding

| Field | Declared type | Required | Default | Verified binding / uncertainty |
| --- | --- | --- | --- | --- |
| id | string | False | null | Template {{id}} placeholder only; consumer must safely render it. |
| label | string | True | null | Template {{label}} placeholder only; consumer must safely render it. |
| type | text\|email\|password\|search\|tel\|url | False | null | UNKNOWN: no automatic binding established; consumer authors markup. |
| required | boolean | False | null | UNKNOWN: no automatic binding established; consumer authors markup. |
| autocomplete | string optional | False | null | UNKNOWN: no automatic binding established; consumer authors markup. |
| error | string optional | False | null | UNKNOWN: no automatic binding established; consumer authors markup. |

Required fields: ["label", "control"].

Template placeholders: ["help", "id", "label", "name"]. Declared slots: ["label", "control", "help", "error"].

Allowed children (declared only): ["label", "control", "help", "error"].

Callbacks/custom events: none exported. DOM/native state and consumer event handlers; no framework controlled/uncontrolled prop runtime.

## Variants, sizes and states

Declared variants: text, select, textarea, checkbox.

Verified component data-variant selectors: none. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: none established; sizing follows CSS/native dimensions.

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/form-field/form-field.html |
| focus | CSS selector; may target descendants | components/form-field/form-field.css |

## Interaction and accessibility

Browser-native control/navigation behavior for the source elements; no SiteKit-specific callback or controller. requiredFields includes control absent from props; fixed text input uses id/name/label/help placeholders and autocomplete=name.

STRONG: Explicit for/id and aria-describedby help association are implemented. Error association is not generated.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css
.sk-form-field input, .sk-form-field textarea, .sk-form-field select { inline-size: 100%; min-block-size: var(--sk-size-control-md); border: var(--sk-border-1) solid var(--sk-border-default); border-radius: var(--sk-radius-0); background: var(--sk-surface-raised); color: var(--sk-text-primary); padding: var(--sk-space-2) var(--sk-space-3); }
```

## Motion

```css
/* No component animation/transition found. */
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<div class="sk-form-field"><label for="demo-form-field">Associate a label, native control and help description.</label><input id="demo-form-field" name="project" type="text" autocomplete="name" aria-describedby="demo-form-field-help"><p class="sk-form-field__help" id="demo-form-field-help">Use a short project name.</p></div>
```

## Composition and dependencies

Nested SiteKit components: []. External runtime libraries: none.

Related: ["label", "text-input", "form"].

Actual CSS variables: `--sk-border-1`, `--sk-border-default`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-radius-0`, `--sk-size-control-md`, `--sk-space-2`, `--sk-space-3`, `--sk-surface-raised`, `--sk-text-muted`, `--sk-text-primary`, `--sk-type-size-sm`, `--sk-type-weight-bold`.

## Caveats and documentation

- requiredFields includes control absent from props; fixed text input uses id/name/label/help placeholders and autocomplete=name.
- Required fields absent from props: control

CONTRADICTS IMPLEMENTATION: requiredFields includes control absent from props; fixed text input uses id/name/label/help placeholders and autocomplete=name.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: []. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {}, "matrix": false}
