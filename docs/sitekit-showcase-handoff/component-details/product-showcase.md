# Product Showcase

Category: Commerce. Public: HTML/CSS source contract. Status: `html-css`. Primitive: False.

## Purpose and selection

Compose a featured product, media placeholder and supporting offers.

Avoid: A product gallery or interactive commerce backend.

## Source and consumption

- schema: `components/product-showcase/product-showcase.schema.json`
- template: `components/product-showcase/product-showcase.html`
- css: `components/product-showcase/product-showcase.css`
- documentation: `components/product-showcase/product-showcase.md`
- examples: `components/product-showcase/examples.json`

Load `dist/sitekit.css`; root selector `.sk-product-showcase`. No component JavaScript export.

## Declared API versus binding

| Field | Declared type | Required | Default | Verified binding / uncertainty |
| --- | --- | --- | --- | --- |
| heading | string | True | null | UNKNOWN: no automatic binding established; consumer authors markup. |
| products | array | True | null | UNKNOWN: no automatic binding established; consumer authors markup. |
| actions | array optional | False | null | UNKNOWN: no automatic binding established; consumer authors markup. |

Required fields: ["heading", "products"].

Template placeholders: []. Declared slots: ["heading", "products", "actions"].

Allowed children (declared only): ["heading", "products", "actions"].

Callbacks/custom events: none exported. DOM/native state and consumer event handlers; no framework controlled/uncontrolled prop runtime.

## Variants, sizes and states

Declared variants: template, commerce, editorial.

Verified component data-variant selectors: none. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: none established; sizing follows CSS/native dimensions.

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/product-showcase/product-showcase.html |
| focus | CSS selector; may target descendants | components/product-showcase/product-showcase.css |

## Interaction and accessibility

No component-specific shipped JavaScript; links and native descendants retain browser behavior.

ACCEPTABLE: Preserve the template native semantics and visible text. Consumer content and composition need page-level verification.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Root-changing container queries cannot query the root itself; provide and test an explicit outer inline-size container. Descendant rules may use the component root as a different nearest query container. Exact thresholds/rules below are source observations.

Observed queries: [{"type": "container", "condition": "(min-width: 58rem)"}].

```css
.sk-product-showcase { display: grid; gap: var(--sk-space-5); border: var(--sk-border-1) solid var(--sk-border-default); background: var(--sk-surface-card); padding: var(--sk-space-5); container-type: inline-size; }
.sk-product-showcase__items { display: grid; gap: var(--sk-space-4); grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr)); }
.sk-product-showcase { grid-template-columns: minmax(0, 1.1fr) minmax(18rem, .9fr); align-items: stretch; }
```

## Motion

```css
.sk-product-showcase__hero { display: grid; place-items: center; min-block-size: 16rem; border: var(--sk-border-1) solid var(--sk-border-default); background: var(--sk-surface-subtle); font-family: var(--sk-font-mono); text-transform: uppercase; }
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<section class="sk-product-showcase" aria-labelledby="product-showcase-title">
  <div class="sk-product-showcase__intro">
    <span class="sk-badge" data-variant="outline">Featured</span>
    <h2 id="product-showcase-title">Launch System Pro</h2>
    <p>A focused product showcase with a clear hero object, benefits, and supporting offers.</p>
    <a class="sk-button" href="#product-showcase-title">View product</a>
  </div>
  <div class="sk-product-showcase__hero" role="img" aria-label="Launch System Pro product preview">Product preview</div>
  <div class="sk-product-showcase__items">
    <article><h3>Included templates</h3><p>Landing, docs, pricing, and ecommerce sections.</p></article>
    <article><h3>Team license</h3><p>Use across production launches and client builds.</p></article>
  </div>
</section>
```

## Composition and dependencies

Nested SiteKit components: ["badge", "button"]. External runtime libraries: none.

Related: [].

Actual CSS variables: `--sk-border-1`, `--sk-border-default`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-font-mono`, `--sk-space-3`, `--sk-space-4`, `--sk-space-5`, `--sk-surface-card`, `--sk-surface-page`, `--sk-surface-subtle`, `--sk-text-secondary`.

## Caveats and documentation

- Template contains static sample content; root split query at 58rem needs external containment.

MINIMAL: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: ["examples/component-lab/index.html"]. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {}, "matrix": false}
