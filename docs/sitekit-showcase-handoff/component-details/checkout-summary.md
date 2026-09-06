# Checkout Summary

Category: Commerce. Public: HTML/CSS source contract. Status: `html-css`. Primitive: False.

## Purpose and selection

Display items and a definition list of totals with checkout actions.

Avoid: Payment processing or automatic totals computation.

## Source and consumption

- schema: `components/checkout-summary/checkout-summary.schema.json`
- template: `components/checkout-summary/checkout-summary.html`
- css: `components/checkout-summary/checkout-summary.css`
- documentation: `components/checkout-summary/checkout-summary.md`
- examples: `components/checkout-summary/examples.json`

Load `dist/sitekit.css`; root selector `.sk-checkout-summary`. No component JavaScript export.

## Declared API versus binding

| Field | Declared type | Required | Default | Verified binding / uncertainty |
| --- | --- | --- | --- | --- |
| items | array | True | null | UNKNOWN: no automatic binding established; consumer authors markup. |
| subtotal | string | False | null | UNKNOWN: no automatic binding established; consumer authors markup. |
| total | string | False | null | UNKNOWN: no automatic binding established; consumer authors markup. |

Required fields: ["items", "totals"].

Template placeholders: []. Declared slots: ["items", "totals", "actions"].

Allowed children (declared only): ["items", "totals", "actions"].

Callbacks/custom events: none exported. DOM/native state and consumer event handlers; no framework controlled/uncontrolled prop runtime.

## Variants, sizes and states

Declared variants: default, compact, sticky.

Verified component data-variant selectors: none. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: none established; sizing follows CSS/native dimensions.

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/checkout-summary/checkout-summary.html |
| focus | CSS selector; may target descendants | components/checkout-summary/checkout-summary.css |
| busy | CSS selector; may target descendants | components/checkout-summary/checkout-summary.css |
| error | CSS selector; may target descendants | components/checkout-summary/checkout-summary.css |

## Interaction and accessibility

No component-specific shipped JavaScript; links and native descendants retain browser behavior.

ACCEPTABLE: Preserve the template native semantics and visible text. Consumer content and composition need page-level verification.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css
.sk-checkout-summary { position: relative; border: var(--sk-border-1) solid var(--sk-border-default); border-radius: var(--sk-radius-0); background: var(--sk-surface-card); color: var(--sk-text-primary); padding: var(--sk-component-card-padding); box-shadow: var(--sk-shadow-none); container-type: inline-size; }
.sk-checkout-summary::before, .sk-checkout-summary::after { content: ""; position: absolute; inline-size: var(--sk-space-4); block-size: var(--sk-space-4); border-color: var(--sk-border-default); pointer-events: none; }
```

## Motion

```css
/* No component animation/transition found. */
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<section class="sk-checkout-summary" aria-labelledby="checkout-summary-title"><h2 id="checkout-summary-title">Order summary</h2><ul class="sk-checkout-summary__items"><li><span>SiteKit Pro license</span><strong>$99</strong></li><li><span>Priority support</span><strong>$29</strong></li></ul><dl><div><dt>Subtotal</dt><dd>$128</dd></div><div><dt>Tax</dt><dd>$8</dd></div><div data-total><dt>Total</dt><dd>$136</dd></div></dl><div class="sk-checkout-summary__actions"><button class="sk-button" type="button">Checkout</button><button class="sk-button" type="button" data-variant="secondary">Edit cart</button></div></section>
```

## Composition and dependencies

Nested SiteKit components: ["button"]. External runtime libraries: none.

Related: [].

Actual CSS variables: `--sk-border-1`, `--sk-border-2`, `--sk-border-default`, `--sk-border-subtle`, `--sk-component-card-gap`, `--sk-component-card-padding`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-font-mono`, `--sk-radius-0`, `--sk-shadow-none`, `--sk-space-2`, `--sk-space-3`, `--sk-space-4`, `--sk-state-danger`, `--sk-surface-card`, `--sk-text-primary`, `--sk-text-secondary`, `--sk-type-weight-bold`.

## Caveats and documentation

- requiredFields includes totals but props expose subtotal/total. Sticky has no CSS implementation. Values are static fixture data.
- Required fields absent from props: totals

CONTRADICTS IMPLEMENTATION: requiredFields includes totals but props expose subtotal/total. Sticky has no CSS implementation. Values are static fixture data.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: ["examples/component-lab/index.html"]. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {}, "matrix": false}
