# Button

Category: Actions. Public: HTML/CSS source contract. Status: `native`. Primitive: True.

## Purpose and selection

Trigger an action using a native button, or style a navigation anchor.

Avoid: A div acting as a button or an aria-disabled anchor assumed inert.

## Source and consumption

- schema: `components/button/button.schema.json`
- template: `components/button/button.html`
- css: `components/button/button.css`
- documentation: `components/button/button.md`
- examples: `components/button/examples.json`

Load `dist/sitekit.css`; root selector `.sk-button`. No component JavaScript export.

## Declared API versus binding

| Field | Declared type | Required | Default | Verified binding / uncertainty |
| --- | --- | --- | --- | --- |
| label | string | True | null | Text content of button. |
| variant | primary\|secondary\|ghost\|danger | False | null | data-variant=primary\|secondary\|ghost\|danger; primary is base styling. |
| href | string optional | False | null | Consumer must choose an anchor and set href; source button does not bind it. |
| type | button\|submit\|reset | False | null | Native button type attribute; template default button. |
| disabled | boolean | False | null | Native button disabled attribute; aria-disabled styling alone does not block activation. |
| loading | boolean | False | null | UNKNOWN: no automatic binding established; consumer authors markup. |

Required fields: ["label"].

Template placeholders: ["label"]. Declared slots: ["label", "icon-start", "icon-end"].

Allowed children (declared only): ["label", "icon-start", "icon-end"].

Callbacks/custom events: none exported. DOM/native state and consumer event handlers; no framework controlled/uncontrolled prop runtime.

## Variants, sizes and states

Declared variants: primary, secondary, ghost, danger.

Verified component data-variant selectors: danger, ghost, secondary. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: none established; sizing follows CSS/native dimensions.

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/button/button.html |
| hover | CSS selector; may target descendants | components/button/button.css |
| focus | CSS selector; may target descendants | components/button/button.css |
| active | CSS selector; may target descendants | components/button/button.css |
| disabled | CSS selector; may target descendants | components/button/button.css |

## Interaction and accessibility

Browser-native control/navigation behavior for the source elements; no SiteKit-specific callback or controller. Loading and href exist in schema but are not rendered by the template. No size API; use native disabled. Primary is the base style.

ACCEPTABLE: Preserve the template native semantics and visible text. Consumer content and composition need page-level verification.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css

```

## Motion

```css
.sk-button { display: inline-flex; align-items: center; justify-content: center; gap: var(--sk-component-button-gap); min-block-size: var(--sk-component-button-height); padding-inline: var(--sk-space-4); border: var(--sk-border-1) solid var(--sk-border-strong); border-radius: var(--sk-radius-0); background: var(--sk-action-primary); color: var(--sk-action-primary-text); font-family: var(--sk-font-mono); font-size: var(--sk-type-size-sm); font-weight: var(--sk-type-weight-bold); line-height: var(--sk-type-line-tight); text-decoration: none; text-transform: uppercase; box-shadow: var(--sk-shadow-none); cursor: pointer; transition: background-color var(--sk-motion-fast) var(--sk-motion-ease), color var(--sk-motion-fast) var(--sk-motion-ease); }
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<button class="sk-button" type="button" data-variant="primary">Trigger an action using a native button, or style a navigation anchor.</button>
```

## Composition and dependencies

Nested SiteKit components: []. External runtime libraries: none.

Related: ["link", "icon", "spinner"].

Actual CSS variables: `--sk-action-danger`, `--sk-action-danger-text`, `--sk-action-primary`, `--sk-action-primary-text`, `--sk-action-secondary`, `--sk-action-secondary-text`, `--sk-border-1`, `--sk-border-strong`, `--sk-component-button-gap`, `--sk-component-button-height`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-font-mono`, `--sk-motion-ease`, `--sk-motion-fast`, `--sk-radius-0`, `--sk-shadow-none`, `--sk-space-4`, `--sk-text-primary`, `--sk-type-line-tight`, `--sk-type-size-sm`, `--sk-type-weight-bold`.

## Caveats and documentation

- Loading and href exist in schema but are not rendered by the template. No size API; use native disabled. Primary is the base style.

CONTRADICTS IMPLEMENTATION: Loading and href exist in schema but are not rendered by the template. No size API; use native disabled. Primary is the base style.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: ["examples/component-lab/index.html", "examples/consumer-dashboard/index.html", "examples/ecommerce-page/index.html"]. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {"variant": {"type": "select", "values": ["primary", "secondary", "ghost", "danger"], "attribute": "data-variant"}, "label": {"type": "text", "target": "textContent"}, "disabled": {"type": "boolean", "attribute": "disabled"}}, "matrix": true}
