# Product Card

Category: Commerce. Public: HTML/CSS source contract. Status: `html-css`. Primitive: False.

## Purpose and selection

Present product title, description, price and actions beside media.

Avoid: A cart item, inventory model or automatic media renderer.

## Source and consumption

- schema: `components/product-card/product-card.schema.json`
- template: `components/product-card/product-card.html`
- css: `components/product-card/product-card.css`
- documentation: `components/product-card/product-card.md`
- examples: `components/product-card/examples.json`

Load `dist/sitekit.css`; root selector `.sk-product-card`. No component JavaScript export.

## Declared API versus binding

| Field | Declared type | Required | Default | Verified binding / uncertainty |
| --- | --- | --- | --- | --- |
| name | string | True | null | UNKNOWN: no automatic binding established; consumer authors markup. |
| price | string | True | null | UNKNOWN: no automatic binding established; consumer authors markup. |
| imageAlt | string | False | null | UNKNOWN: no automatic binding established; consumer authors markup. |
| availability | string | False | null | UNKNOWN: no automatic binding established; consumer authors markup. |

Required fields: ["name", "price"].

Template placeholders: ["actions"]. Declared slots: ["media", "summary", "actions"].

Allowed children (declared only): ["media", "summary", "actions"].

Callbacks/custom events: none exported. DOM/native state and consumer event handlers; no framework controlled/uncontrolled prop runtime.

## Variants, sizes and states

Declared variants: default, compact, featured.

Verified component data-variant selectors: none. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: none established; sizing follows CSS/native dimensions.

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/product-card/product-card.html |
| focus | CSS selector; may target descendants | components/product-card/product-card.css |
| busy | CSS selector; may target descendants | components/product-card/product-card.css |
| error | CSS selector; may target descendants | components/product-card/product-card.css |

## Interaction and accessibility

No component-specific shipped JavaScript; links and native descendants retain browser behavior.

ACCEPTABLE: Preserve the template native semantics and visible text. Consumer content and composition need page-level verification.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Root supplies inline-size containment; at 30rem its child layout becomes two columns with a 9rem minimum media track. Below threshold it is a single grid column.

Observed queries: [{"type": "container", "condition": "(min-width: 30rem)"}].

```css
.sk-product-card { position: relative; border: var(--sk-border-1) solid var(--sk-border-default); border-radius: var(--sk-radius-0); background: var(--sk-surface-card); color: var(--sk-text-primary); padding: var(--sk-component-card-padding); box-shadow: var(--sk-shadow-none); container-type: inline-size; }
.sk-product-card::before, .sk-product-card::after { content: ""; position: absolute; inline-size: var(--sk-space-4); block-size: var(--sk-space-4); border-color: var(--sk-border-default); pointer-events: none; }
.sk-product-card__layout > * { min-inline-size: 0; }
.sk-product-card__actions { display: flex; flex-wrap: wrap; gap: var(--sk-space-3); }
.sk-product-card__layout { grid-template-columns: minmax(0, 1fr) minmax(9rem, .7fr); }
```

## Motion

```css
.sk-product-card [data-product-media] { display: grid; place-items: center; min-block-size: 10rem; aspect-ratio: 1; border: var(--sk-border-1) solid var(--sk-border-default); background: var(--sk-surface-subtle); color: var(--sk-text-muted); font-family: var(--sk-font-mono); font-size: var(--sk-type-size-xs); text-transform: uppercase; }
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<section class="sk-product-card" aria-labelledby="product-card-title"><div class="sk-product-card__layout"><div><h2 id="product-card-title">SiteKit Pro</h2><p>Reusable component contracts, lab previews, and commerce-ready sections.</p><p class="sk-product-card__price">$49</p><div class="sk-product-card__actions"><button class="sk-button" type="button">Continue</button></div></div><div data-product-media aria-hidden="true">Product</div></div></section>
```

## Composition and dependencies

Nested SiteKit components: []. External runtime libraries: none.

Related: [].

Actual CSS variables: `--sk-border-1`, `--sk-border-default`, `--sk-component-card-gap`, `--sk-component-card-padding`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-font-mono`, `--sk-radius-0`, `--sk-shadow-none`, `--sk-space-2`, `--sk-space-3`, `--sk-space-4`, `--sk-state-danger`, `--sk-surface-card`, `--sk-surface-subtle`, `--sk-text-muted`, `--sk-text-primary`, `--sk-text-secondary`, `--sk-type-size-xl`, `--sk-type-size-xs`, `--sk-type-weight-bold`.

## Caveats and documentation

- Template has decorative Product div, not imageAlt/availability bindings. Layout child query at 30rem can use root container.

MINIMAL: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: ["examples/component-lab/index.html"]. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {}, "matrix": false}
