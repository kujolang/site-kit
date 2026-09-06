# Footer

Category: Content. Public: HTML/CSS source contract. Status: `html-css`. Primitive: False.

## Purpose and selection

Compose brand, links and legal text in a wrapping footer.

Avoid: An automatic multi-column sitemap renderer.

## Source and consumption

- schema: `components/footer/footer.schema.json`
- template: `components/footer/footer.html`
- css: `components/footer/footer.css`
- documentation: `components/footer/footer.md`
- examples: `components/footer/examples.json`

Load `dist/sitekit.css`; root selector `.sk-footer`. No component JavaScript export.

## Declared API versus binding

| Field | Declared type | Required | Default | Verified binding / uncertainty |
| --- | --- | --- | --- | --- |
| brand | string | True | null | Template {{brand}} placeholder only; consumer must safely render it. |
| links | array | False | null | Template {{links}} placeholder only; consumer must safely render it. |
| legal | string | False | null | Template {{legal}} placeholder only; consumer must safely render it. |

Required fields: ["brand"].

Template placeholders: ["brand", "legal", "links"]. Declared slots: ["brand", "links", "legal"].

Allowed children (declared only): ["brand", "links", "legal"].

Callbacks/custom events: none exported. DOM/native state and consumer event handlers; no framework controlled/uncontrolled prop runtime.

## Variants, sizes and states

Declared variants: simple, columns, product.

Verified component data-variant selectors: none. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: none established; sizing follows CSS/native dimensions.

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/footer/footer.html |
| hover | CSS selector; may target descendants | components/footer/footer.css |
| focus | CSS selector; may target descendants | components/footer/footer.css |
| current | CSS selector; may target descendants | components/footer/footer.css |

## Interaction and accessibility

No component-specific shipped JavaScript; links and native descendants retain browser behavior.

ACCEPTABLE: Preserve the template native semantics and visible text. Consumer content and composition need page-level verification.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css
.sk-footer .sk-footer__inner { inline-size: min(100% - (2 * var(--sk-space-5)), var(--sk-size-content-lg)); margin-inline: auto; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--sk-space-4); padding: var(--sk-space-4); border: var(--sk-border-1) solid var(--sk-border-default); background: var(--sk-surface-raised); }
.sk-footer nav { display: flex; flex-wrap: wrap; align-items: center; gap: var(--sk-space-4); }
```

## Motion

```css
.sk-footer a { color: var(--sk-text-primary); font-family: var(--sk-font-mono); font-size: var(--sk-type-size-xs); line-height: var(--sk-type-line-tight); text-decoration: none; text-transform: uppercase; }
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<footer class="sk-footer"><div class="sk-footer__inner"><p>SiteKit</p><nav aria-label="Footer"><a href="#main">Documentation</a></nav><small>SiteKit · MIT</small></div></footer>
```

## Composition and dependencies

Nested SiteKit components: []. External runtime libraries: none.

Related: [].

Actual CSS variables: `--sk-border-1`, `--sk-border-default`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-font-mono`, `--sk-size-content-lg`, `--sk-space-4`, `--sk-space-5`, `--sk-surface-page`, `--sk-surface-raised`, `--sk-text-primary`, `--sk-type-line-tight`, `--sk-type-size-xs`, `--sk-type-weight-bold`.

## Caveats and documentation

- simple/columns/product variants have no selectors; links/legal/brand are source placeholders.

MINIMAL: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: []. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {}, "matrix": false}
