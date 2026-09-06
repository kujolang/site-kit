# Stepper

Category: Forms. Public: HTML/CSS source contract. Status: `example-only-js`. Primitive: False.

## Purpose and selection

Combine a native numeric input with decrement/increment buttons.

Avoid: A complete bounded quantity controller.

## Source and consumption

- schema: `components/stepper/stepper.schema.json`
- template: `components/stepper/stepper.html`
- css: `components/stepper/stepper.css`
- documentation: `components/stepper/stepper.md`
- examples: `components/stepper/examples.json`

Load `dist/sitekit.css`; root selector `.sk-stepper`. No component JavaScript export.

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

Declared variants: number, compact.

Verified component data-variant selectors: none. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: none established; sizing follows CSS/native dimensions.

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/stepper/stepper.html |
| hover | CSS selector; may target descendants | components/stepper/stepper.css |
| focus | CSS selector; may target descendants | components/stepper/stepper.css |

## Interaction and accessibility

Extra buttons are lab-only, ignore min/max and emit change. Browser number input remains native; plus/minus need clearer accessible names.

NEEDS IMPROVEMENT: Extra buttons are lab-only, ignore min/max and emit change. Browser number input remains native; plus/minus need clearer accessible names.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css
.sk-stepper button { inline-size: var(--sk-size-control-md); padding: 0; font-family: var(--sk-font-mono); cursor: pointer; }
.sk-stepper input { inline-size: var(--sk-size-control-lg); text-align: center; appearance: textfield; }
```

## Motion

```css
.sk-stepper label, .sk-stepper legend, .sk-stepper__label { color: var(--sk-text-muted); font-family: var(--sk-font-mono); font-size: var(--sk-type-size-xs); line-height: var(--sk-type-line-tight); text-transform: uppercase; }
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<div class="sk-stepper"><label for="stepper-control">Seats</label><div><button type="button">−</button><input id="stepper-control" type="number" value="3"><button type="button">+</button></div></div>
```

## Composition and dependencies

Nested SiteKit components: []. External runtime libraries: none.

Related: [].

Actual CSS variables: `--sk-action-primary`, `--sk-action-primary-text`, `--sk-border-1`, `--sk-border-default`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-font-mono`, `--sk-radius-0`, `--sk-size-control-lg`, `--sk-size-control-md`, `--sk-space-2`, `--sk-space-3`, `--sk-surface-card`, `--sk-text-muted`, `--sk-text-primary`, `--sk-type-line-tight`, `--sk-type-size-xs`.

## Caveats and documentation

- Extra buttons are lab-only, ignore min/max and emit change. Browser number input remains native; plus/minus need clearer accessible names.

MINIMAL: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: ["examples/component-lab/index.html"]. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {}, "matrix": false}
