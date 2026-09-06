# Product Grid

Category: Commerce. Public: HTML/CSS source contract. Status: `html-css`. Primitive: False.

## Purpose and selection

Arrange product summaries in an intrinsic responsive grid.

Avoid: A catalog service, filter engine or cart.

## Source and consumption

- schema: `components/product-grid/product-grid.schema.json`
- template: `components/product-grid/product-grid.html`
- css: `components/product-grid/product-grid.css`
- documentation: `components/product-grid/product-grid.md`
- examples: `components/product-grid/examples.json`

Load `dist/sitekit.css`; root selector `.sk-product-grid`. No component JavaScript export.

## Declared API versus binding

| Field | Declared type | Required | Default | Verified binding / uncertainty |
| --- | --- | --- | --- | --- |
| products | array | True | null | UNKNOWN: no automatic binding established; consumer authors markup. |
| filters | array optional | False | null | UNKNOWN: no automatic binding established; consumer authors markup. |

Required fields: ["products"].

Template placeholders: []. Declared slots: ["products", "filters"].

Allowed children (declared only): ["products", "filters"].

Callbacks/custom events: none exported. DOM/native state and consumer event handlers; no framework controlled/uncontrolled prop runtime.

## Variants, sizes and states

Declared variants: catalog, compact, comparison.

Verified component data-variant selectors: none. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: none established; sizing follows CSS/native dimensions.

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/product-grid/product-grid.html |
| focus | CSS selector; may target descendants | components/product-grid/product-grid.css |

## Interaction and accessibility

No component-specific shipped JavaScript; links and native descendants retain browser behavior.

ACCEPTABLE: Preserve the template native semantics and visible text. Consumer content and composition need page-level verification.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css
.sk-product-grid { display: grid; gap: var(--sk-component-grid-gap); grid-template-columns: repeat(auto-fit, minmax(min(100%, 12rem), 1fr)); }
.sk-product-grid[data-density="dense"] { grid-template-columns: repeat(auto-fit, minmax(min(100%, 10rem), 1fr)); }
```

## Motion

```css
.sk-product-grid [data-product-media] { display: grid; place-items: center; aspect-ratio: 4 / 3; border: var(--sk-border-1) solid var(--sk-border-default); background: var(--sk-surface-subtle); color: var(--sk-text-muted); font-family: var(--sk-font-mono); font-size: var(--sk-type-size-xs); text-transform: uppercase; }
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<section class="sk-product-grid" aria-label="Products"><article><div data-product-media>Preview</div><h3>Starter Kit</h3><p>$49</p><button class="sk-button" type="button">Add</button></article><article><div data-product-media>Preview</div><h3>Pro Kit</h3><p>$99</p><button class="sk-button" type="button">Add</button></article><article><div data-product-media>Preview</div><h3>Team Kit</h3><p>$149</p><button class="sk-button" type="button">Add</button></article></section>
```

## Composition and dependencies

Nested SiteKit components: ["button"]. External runtime libraries: none.

Related: ["product-card", "checkout-summary"].

Actual CSS variables: `--sk-border-1`, `--sk-border-default`, `--sk-component-grid-gap`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-font-mono`, `--sk-radius-0`, `--sk-space-3`, `--sk-space-5`, `--sk-surface-card`, `--sk-surface-subtle`, `--sk-text-muted`, `--sk-type-size-xs`.

## Caveats and documentation

- Add buttons have no handlers; dense CSS is undocumented as data-density rather than declared catalog/compact/comparison variants.

MINIMAL: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: ["examples/component-lab/index.html", "examples/ecommerce-page/index.html"]. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {"density": {"type": "select", "values": ["default", "dense"], "attribute": "data-density"}}, "matrix": false}
