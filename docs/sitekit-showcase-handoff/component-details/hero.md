# Hero

Category: Content. Public: HTML/CSS source contract. Status: `html-css`. Primitive: False.

## Purpose and selection

Present a large centered heading, explanation and action row.

Avoid: A complete responsive marketing page or rich media renderer.

## Source and consumption

- schema: `components/hero/hero.schema.json`
- template: `components/hero/hero.html`
- css: `components/hero/hero.css`
- documentation: `components/hero/hero.md`
- examples: `components/hero/examples.json`

Load `dist/sitekit.css`; root selector `.sk-hero`. No component JavaScript export.

## Declared API versus binding

| Field | Declared type | Required | Default | Verified binding / uncertainty |
| --- | --- | --- | --- | --- |
| eyebrow | string optional | False | null | UNKNOWN: no automatic binding established; consumer authors markup. |
| heading | string | True | null | Template {{heading}} placeholder only; consumer must safely render it. |
| body | string | False | null | Template {{body}} placeholder only; consumer must safely render it. |
| actions | array optional | False | null | Template {{actions}} placeholder only; consumer must safely render it. |

Required fields: ["heading"].

Template placeholders: ["actions", "body", "heading"]. Declared slots: ["eyebrow", "heading", "body", "actions", "visual"].

Allowed children (declared only): ["eyebrow", "heading", "body", "actions", "visual"].

Callbacks/custom events: none exported. DOM/native state and consumer event handlers; no framework controlled/uncontrolled prop runtime.

## Variants, sizes and states

Declared variants: split, centered, technical.

Verified component data-variant selectors: none. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: none established; sizing follows CSS/native dimensions.

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/hero/hero.html |
| focus | CSS selector; may target descendants | components/hero/hero.css |

## Interaction and accessibility

No component-specific shipped JavaScript; links and native descendants retain browser behavior.

ACCEPTABLE: Preserve the template native semantics and visible text. Consumer content and composition need page-level verification.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Heading scales from 3rem to 5.375rem at container 56rem; inner split grid uses the root container. Heading line-height is hardcoded .9. Test long titles and 200 percent text.

Observed queries: [{"type": "container", "condition": "(min-width: 56rem)"}].

```css
.sk-hero { border: var(--sk-border-1) solid var(--sk-border-default); border-radius: var(--sk-radius-0); background: var(--sk-surface-card); padding-block: var(--sk-component-hero-padding-block); container-type: inline-size; }
.sk-hero .sk-hero__inner { inline-size: min(100% - (2 * var(--sk-space-5)), var(--sk-component-hero-max-width)); margin-inline: auto; display: grid; gap: var(--sk-space-5); justify-items: center; text-align: center; }
.sk-hero__actions, .sk-hero .sk-hero__inner > div:last-child { display: flex; flex-wrap: wrap; justify-content: center; gap: var(--sk-space-3); }
.sk-hero h1, .sk-hero h2 { max-inline-size: 15ch; font-size: var(--sk-type-size-4xl); line-height: .9; }
.sk-hero p { max-inline-size: 67ch; color: var(--sk-text-secondary); font-size: var(--sk-type-size-md); line-height: var(--sk-type-line-loose); }
.sk-hero[data-layout="split"] .sk-hero__inner { grid-template-columns: minmax(0, 1.1fr) minmax(18rem, .9fr); align-items: start; }
```

## Motion

```css
/* No component animation/transition found. */
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<section class="sk-hero" aria-labelledby="hero-title"><div class="sk-hero__inner"><h2 id="hero-title">Build with SiteKit</h2><p>Semantic HTML, local assets, and reusable styles.</p><div class="sk-hero__actions"><button class="sk-button" type="button">Continue</button></div></div></section>
```

## Composition and dependencies

Nested SiteKit components: []. External runtime libraries: none.

Related: ["cta", "feature-grid"].

Actual CSS variables: `--sk-border-1`, `--sk-border-default`, `--sk-component-hero-max-width`, `--sk-component-hero-padding-block`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-radius-0`, `--sk-space-3`, `--sk-space-5`, `--sk-surface-card`, `--sk-text-secondary`, `--sk-type-line-loose`, `--sk-type-size-4xl`, `--sk-type-size-5xl`, `--sk-type-size-md`.

## Caveats and documentation

- Centered base and data-layout=split exist; split distributes direct children without a dedicated media slot. Heading changes at container 56rem.

MINIMAL: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: ["examples/component-lab/index.html", "examples/consumer-dashboard/index.html", "examples/kujolang-ai/index.html"]. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {"layout": {"type": "select", "values": ["centered", "split"], "attribute": "data-layout", "note": "Provide a reviewed split composition; not an automatic schema variant."}}, "matrix": false}
