# Bento Grid

Category: Content. Public: HTML/CSS source contract. Status: `html-css`. Primitive: False.

## Purpose and selection

Arrange an intro and unevenly spanning feature panels.

Avoid: Arbitrary item counts without testing explicit grid placement.

## Source and consumption

- schema: `components/bento-grid/bento-grid.schema.json`
- template: `components/bento-grid/bento-grid.html`
- css: `components/bento-grid/bento-grid.css`
- documentation: `components/bento-grid/bento-grid.md`
- examples: `components/bento-grid/examples.json`

Load `dist/sitekit.css`; root selector `.sk-bento-grid`. No component JavaScript export.

## Declared API versus binding

| Field | Declared type | Required | Default | Verified binding / uncertainty |
| --- | --- | --- | --- | --- |
| heading | string optional | False | null | UNKNOWN: no automatic binding established; consumer authors markup. |
| items | array | True | null | UNKNOWN: no automatic binding established; consumer authors markup. |
| emphasis | string optional | False | null | UNKNOWN: no automatic binding established; consumer authors markup. |

Required fields: ["items"].

Template placeholders: []. Declared slots: ["heading", "items", "actions"].

Allowed children (declared only): ["heading", "items", "actions"].

Callbacks/custom events: none exported. DOM/native state and consumer event handlers; no framework controlled/uncontrolled prop runtime.

## Variants, sizes and states

Declared variants: portfolio, balanced, showcase, dense.

Verified component data-variant selectors: none. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: none established; sizing follows CSS/native dimensions.

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/bento-grid/bento-grid.html |
| focus | CSS selector; may target descendants | components/bento-grid/bento-grid.css |

## Interaction and accessibility

No component-specific shipped JavaScript; links and native descendants retain browser behavior.

ACCEPTABLE: Preserve the template native semantics and visible text. Consumer content and composition need page-level verification.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Root-changing container queries cannot query the root itself; provide and test an explicit outer inline-size container. Descendant rules may use the component root as a different nearest query container. Exact thresholds/rules below are source observations.

Observed queries: [{"type": "container", "condition": "(max-width: 56rem)"}, {"type": "container", "condition": "(max-width: 34rem)"}].

```css
.sk-bento-grid { inline-size: 100%; min-block-size: 100%; display: grid; gap: var(--sk-component-grid-gap); grid-template-columns: repeat(4, minmax(0, 1fr)); grid-template-rows: repeat(3, minmax(10rem, 1fr)); grid-auto-rows: minmax(10rem, 1fr); grid-auto-flow: dense; container-type: inline-size; }
.sk-bento-grid__intro { grid-template-rows: auto 1fr; align-content: stretch; background: var(--sk-surface-raised); }
.sk-bento-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); grid-template-rows: none; }
.sk-bento-grid { grid-template-columns: 1fr; }
```

## Motion

```css
.sk-bento-grid__kicker { color: var(--sk-text-muted); font-size: var(--sk-type-size-xs); text-transform: uppercase; }
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<section class="sk-bento-grid" aria-labelledby="bento-grid-title">
  <div class="sk-bento-grid__intro">
    <span class="sk-badge" data-variant="outline">Services</span>
    <div class="sk-bento-grid__content">
      <h2 id="bento-grid-title">Build systems that stay sharp.</h2>
      <p>A true bento composition with uneven spans, square panels, and mono titles.</p>
    </div>
  </div>
  <article class="sk-bento-grid__item" data-span="wide">
    <p class="sk-bento-grid__kicker">01</p>
    <h3>Custom Apps</h3>
    <p>Production interfaces, dashboards, and customer workflows with clean component boundaries.</p>
  </article>
  <article class="sk-bento-grid__item" data-span="tall">
    <p class="sk-bento-grid__kicker">02</p>
    <h3>Security Audits</h3>
    <p>Focused reviews with remediation paths, checklists, and durable proof.</p>
  </article>
  <article class="sk-bento-grid__item">
    <p class="sk-bento-grid__kicker">03</p>
    <h3>Plugins</h3>
    <p>Purpose-built extensions.</p>
  </article>
  <article class="sk-bento-grid__item">
    <p class="sk-bento-grid__kicker">04</p>
    <h3>Design Systems</h3>
    <p>Reusable component contracts.</p>
  </article>
</section>
```

## Composition and dependencies

Nested SiteKit components: ["badge"]. External runtime libraries: none.

Related: ["card", "feature-grid"].

Actual CSS variables: `--sk-border-1`, `--sk-border-default`, `--sk-component-grid-gap`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-font-mono`, `--sk-radius-0`, `--sk-space-4`, `--sk-space-5`, `--sk-surface-card`, `--sk-surface-raised`, `--sk-text-muted`, `--sk-text-secondary`, `--sk-type-size-xs`.

## Caveats and documentation

- data-span controls hero/wide/tall placement; named variants lack selectors. Dense visual placement can differ from reading order. Container self-query caveat applies.
- OBSERVED: at 390px without outer container, four columns and 434px document width; with outer containment, one column and 390px width. At 700px, outer containment yields two columns; no outer containment retains four.

MINIMAL: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: ["examples/component-lab/index.html"]. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {}, "matrix": false}
