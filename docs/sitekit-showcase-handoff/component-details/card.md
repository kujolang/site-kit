# Card

Category: Content. Public: HTML/CSS source contract. Status: `html-css`. Primitive: False.

## Purpose and selection

Group a heading, explanatory body and actions in a framed section.

Avoid: A clickable whole-card interaction without a real link.

## Source and consumption

- schema: `components/card/card.schema.json`
- template: `components/card/card.html`
- css: `components/card/card.css`
- documentation: `components/card/card.md`
- examples: `components/card/examples.json`

Load `dist/sitekit.css`; root selector `.sk-card`. No component JavaScript export.

## Declared API versus binding

| Field | Declared type | Required | Default | Verified binding / uncertainty |
| --- | --- | --- | --- | --- |
| title | string optional | False | null | UNKNOWN: no automatic binding established; consumer authors markup. |
| body | string | True | null | Template {{body}} placeholder only; consumer must safely render it. |
| href | string optional | False | null | UNKNOWN: no automatic binding established; consumer authors markup. |

Required fields: ["body"].

Template placeholders: ["actions", "body", "heading"]. Declared slots: ["header", "body", "footer"].

Allowed children (declared only): ["header", "body", "footer"].

Callbacks/custom events: none exported. DOM/native state and consumer event handlers; no framework controlled/uncontrolled prop runtime.

## Variants, sizes and states

Declared variants: plain, interactive, dense.

Verified component data-variant selectors: none. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: none established; sizing follows CSS/native dimensions.

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/card/card.html |
| focus | CSS selector; may target descendants | components/card/card.css |
| busy | CSS selector; may target descendants | components/card/card.css |
| error | CSS selector; may target descendants | components/card/card.css |

## Interaction and accessibility

No component-specific shipped JavaScript; links and native descendants retain browser behavior.

ACCEPTABLE: Preserve the template native semantics and visible text. Consumer content and composition need page-level verification.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css
.sk-card { position: relative; border: var(--sk-border-1) solid var(--sk-border-default); border-radius: var(--sk-radius-0); background: var(--sk-surface-card); color: var(--sk-text-primary); padding: var(--sk-component-card-padding); box-shadow: var(--sk-shadow-none); container-type: inline-size; }
.sk-card::before, .sk-card::after { content: ""; position: absolute; inline-size: var(--sk-space-4); block-size: var(--sk-space-4); border-color: var(--sk-border-default); pointer-events: none; }
.sk-card__actions, .sk-card > div:last-child { display: flex; flex-wrap: wrap; gap: var(--sk-space-3); }
```

## Motion

```css
/* No component animation/transition found. */
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<section class="sk-card" aria-labelledby="card-title"><h2 id="card-title">Build with SiteKit</h2><p>Semantic HTML, local assets, and reusable styles.</p><div class="sk-card__actions"><button class="sk-button" type="button">Continue</button></div></section>
```

## Composition and dependencies

Nested SiteKit components: []. External runtime libraries: none.

Related: ["heading", "button", "badge"].

Actual CSS variables: `--sk-border-1`, `--sk-border-default`, `--sk-component-card-gap`, `--sk-component-card-padding`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-radius-0`, `--sk-shadow-none`, `--sk-space-2`, `--sk-space-3`, `--sk-space-4`, `--sk-state-danger`, `--sk-surface-card`, `--sk-text-primary`, `--sk-text-secondary`.

## Caveats and documentation

- Schema title differs from template heading. No plain/interactive/dense selectors; busy sets cursor only and error sets border only.

CONTRADICTS IMPLEMENTATION: Schema title differs from template heading. No plain/interactive/dense selectors; busy sets cursor only and error sets border only.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: ["examples/component-lab/index.html", "examples/consumer-dashboard/index.html", "examples/personal-site/index.html"]. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {"busy": {"type": "boolean", "attribute": "aria-busy"}, "error": {"type": "boolean", "attribute": "data-state", "trueValue": "error"}}, "matrix": true}
