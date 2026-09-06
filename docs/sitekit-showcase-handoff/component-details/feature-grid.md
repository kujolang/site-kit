# Feature Grid

Category: Content. Public: HTML/CSS source contract. Status: `html-css`. Primitive: False.

## Purpose and selection

Arrange feature articles with marker boxes in an intrinsic grid.

Avoid: An enforced two/three-column prop runtime.

## Source and consumption

- schema: `components/feature-grid/feature-grid.schema.json`
- template: `components/feature-grid/feature-grid.html`
- css: `components/feature-grid/feature-grid.css`
- documentation: `components/feature-grid/feature-grid.md`
- examples: `components/feature-grid/examples.json`

Load `dist/sitekit.css`; root selector `.sk-feature-grid`. No component JavaScript export.

## Declared API versus binding

| Field | Declared type | Required | Default | Verified binding / uncertainty |
| --- | --- | --- | --- | --- |
| items | array | True | null | UNKNOWN: no automatic binding established; consumer authors markup. |
| columns | 2\|3\|auto | False | null | UNKNOWN: no automatic binding established; consumer authors markup. |

Required fields: ["items"].

Template placeholders: ["label"]. Declared slots: ["items"].

Allowed children (declared only): ["items"].

Callbacks/custom events: none exported. DOM/native state and consumer event handlers; no framework controlled/uncontrolled prop runtime.

## Variants, sizes and states

Declared variants: two-column, three-column, dense.

Verified component data-variant selectors: none. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: none established; sizing follows CSS/native dimensions.

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/feature-grid/feature-grid.html |
| focus | CSS selector; may target descendants | components/feature-grid/feature-grid.css |

## Interaction and accessibility

No component-specific shipped JavaScript; links and native descendants retain browser behavior.

ACCEPTABLE: Preserve the template native semantics and visible text. Consumer content and composition need page-level verification.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css
.sk-feature-grid { display: grid; gap: var(--sk-component-grid-gap); grid-template-columns: repeat(auto-fit, minmax(min(100%, 12rem), 1fr)); }
.sk-feature-grid [data-feature-icon] { display: grid; place-items: center; inline-size: var(--sk-size-control-lg); block-size: var(--sk-size-control-lg); border: var(--sk-border-1) solid var(--sk-border-default); background: var(--sk-surface-raised); font-family: var(--sk-font-mono); }
.sk-feature-grid[data-density="dense"] { grid-template-columns: repeat(auto-fit, minmax(min(100%, 10rem), 1fr)); }
```

## Motion

```css
/* No component animation/transition found. */
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<section class="sk-feature-grid" aria-label="Arrange feature articles with marker boxes in an intrinsic grid."><article><span data-feature-icon aria-hidden="true">01</span><h3>Tokenized UI</h3><p>Every surface follows SiteKit theme contracts.</p></article><article><span data-feature-icon aria-hidden="true">02</span><h3>Semantic markup</h3><p>Patterns start from native HTML.</p></article><article><span data-feature-icon aria-hidden="true">03</span><h3>Fast previews</h3><p>Components can be inspected and copied quickly.</p></article></section>
```

## Composition and dependencies

Nested SiteKit components: []. External runtime libraries: none.

Related: [].

Actual CSS variables: `--sk-border-1`, `--sk-border-default`, `--sk-component-grid-gap`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-font-mono`, `--sk-radius-0`, `--sk-size-control-lg`, `--sk-space-3`, `--sk-space-5`, `--sk-surface-card`, `--sk-surface-raised`.

## Caveats and documentation

- data-density=dense changes minimum track size; columns schema has no direct binding.

MINIMAL: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: ["examples/component-lab/index.html"]. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {"density": {"type": "select", "values": ["default", "dense"], "attribute": "data-density"}}, "matrix": false}
