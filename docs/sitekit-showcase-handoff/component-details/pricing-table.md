# Pricing Table

Category: Commerce. Public: HTML/CSS source contract. Status: `html-css`. Primitive: False.

## Purpose and selection

Compare plans in a captioned table with row and column headers.

Avoid: Billing logic, plan selection or cadence switching.

## Source and consumption

- schema: `components/pricing-table/pricing-table.schema.json`
- template: `components/pricing-table/pricing-table.html`
- css: `components/pricing-table/pricing-table.css`
- documentation: `components/pricing-table/pricing-table.md`
- examples: `components/pricing-table/examples.json`

Load `dist/sitekit.css`; root selector `.sk-pricing-table`. No component JavaScript export.

## Declared API versus binding

| Field | Declared type | Required | Default | Verified binding / uncertainty |
| --- | --- | --- | --- | --- |
| plans | array | True | null | UNKNOWN: no automatic binding established; consumer authors markup. |
| currency | string | False | null | UNKNOWN: no automatic binding established; consumer authors markup. |
| cadence | string | False | null | UNKNOWN: no automatic binding established; consumer authors markup. |

Required fields: ["plans"].

Template placeholders: []. Declared slots: ["plans", "feature-rows"].

Allowed children (declared only): ["plans", "feature-rows"].

Callbacks/custom events: none exported. DOM/native state and consumer event handlers; no framework controlled/uncontrolled prop runtime.

## Variants, sizes and states

Declared variants: monthly, annual, comparison.

Verified component data-variant selectors: none. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: none established; sizing follows CSS/native dimensions.

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/pricing-table/pricing-table.html |
| focus | CSS selector; may target descendants | components/pricing-table/pricing-table.css |

## Interaction and accessibility

No component-specific shipped JavaScript; links and native descendants retain browser behavior.

ACCEPTABLE: Preserve the template native semantics and visible text. Consumer content and composition need page-level verification.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css
.sk-pricing-table { overflow-x: visible; border: var(--sk-border-1) solid var(--sk-border-default); background: var(--sk-surface-raised); }
.sk-pricing-table table { inline-size: 100%; min-inline-size: 0; table-layout: fixed; border-collapse: collapse; border: 0; }
.sk-pricing-table th, .sk-pricing-table td { border-block-start: var(--sk-border-1) solid var(--sk-border-subtle); border-inline-start: var(--sk-border-1) solid var(--sk-border-subtle); padding: var(--sk-space-3); text-align: start; vertical-align: top; overflow-wrap: anywhere; }
```

## Motion

```css
.sk-pricing-table caption { padding: var(--sk-space-4); border-block-end: var(--sk-border-1) solid var(--sk-border-default); font-family: var(--sk-font-mono); font-size: var(--sk-type-size-sm); font-weight: var(--sk-type-weight-bold); text-align: start; text-transform: uppercase; }
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<div class="sk-pricing-table"><table><caption>Plan comparison</caption><thead><tr><th scope="col">Feature</th><th scope="col">Starter</th><th scope="col">Pro</th><th scope="col">Scale</th></tr></thead><tbody><tr><th scope="row">Monthly price</th><td data-price>$19</td><td data-price>$49</td><td data-price>$99</td></tr><tr><th scope="row">Projects</th><td>3</td><td>25</td><td>Unlimited</td></tr><tr><th scope="row">Components</th><td>Core</td><td>Core + commerce</td><td>Everything</td></tr><tr><th scope="row">Support</th><td>Email</td><td>Priority</td><td>Dedicated channel</td></tr></tbody></table></div>
```

## Composition and dependencies

Nested SiteKit components: []. External runtime libraries: none.

Related: [].

Actual CSS variables: `--sk-border-1`, `--sk-border-default`, `--sk-border-subtle`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-font-mono`, `--sk-space-3`, `--sk-space-4`, `--sk-surface-raised`, `--sk-surface-subtle`, `--sk-type-size-sm`, `--sk-type-size-xl`, `--sk-type-weight-bold`.

## Caveats and documentation

- Fixed layout wraps text anywhere rather than guaranteeing horizontal scroll; plans/currency/cadence are descriptive only.

MINIMAL: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: ["examples/component-lab/index.html"]. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {}, "matrix": false}
