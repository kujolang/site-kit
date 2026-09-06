# CTA

Category: Content. Public: HTML/CSS source contract. Status: `html-css`. Primitive: False.

## Purpose and selection

Group a call-to-action headline, supporting copy and action row.

Avoid: A form submission service or automatic action renderer.

## Source and consumption

- schema: `components/cta/cta.schema.json`
- template: `components/cta/cta.html`
- css: `components/cta/cta.css`
- documentation: `components/cta/cta.md`
- examples: `components/cta/examples.json`

Load `dist/sitekit.css`; root selector `.sk-cta`. No component JavaScript export.

## Declared API versus binding

| Field | Declared type | Required | Default | Verified binding / uncertainty |
| --- | --- | --- | --- | --- |
| heading | string | True | null | UNKNOWN: no automatic binding established; consumer authors markup. |
| body | string | False | null | UNKNOWN: no automatic binding established; consumer authors markup. |
| actions | array | True | null | Template {{actions}} placeholder only; consumer must safely render it. |

Required fields: ["heading", "actions"].

Template placeholders: ["actions"]. Declared slots: ["heading", "body", "actions"].

Allowed children (declared only): ["heading", "body", "actions"].

Callbacks/custom events: none exported. DOM/native state and consumer event handlers; no framework controlled/uncontrolled prop runtime.

## Variants, sizes and states

Declared variants: band, inline, stacked.

Verified component data-variant selectors: none. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: none established; sizing follows CSS/native dimensions.

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/cta/cta.html |
| focus | CSS selector; may target descendants | components/cta/cta.css |

## Interaction and accessibility

No component-specific shipped JavaScript; links and native descendants retain browser behavior.

ACCEPTABLE: Preserve the template native semantics and visible text. Consumer content and composition need page-level verification.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [{"type": "container", "condition": "(min-width: 56rem)"}].

```css
.sk-cta { border: var(--sk-border-1) solid var(--sk-border-default); border-radius: var(--sk-radius-0); background: var(--sk-surface-card); padding: var(--sk-space-5); container-type: inline-size; }
.sk-cta .sk-cta__inner { inline-size: 100%; margin-inline: auto; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--sk-space-5); }
.sk-cta h1, .sk-cta h2 { max-inline-size: none; margin: 0; font-family: var(--sk-font-mono); font-size: var(--sk-type-size-xl); line-height: var(--sk-type-line-tight); }
.sk-cta p { max-inline-size: 44ch; margin: 0; color: var(--sk-text-secondary); font-size: var(--sk-type-size-md); line-height: var(--sk-type-line-loose); }
.sk-cta__actions, .sk-cta .sk-cta__inner > div:last-child { display: flex; flex-wrap: wrap; gap: var(--sk-space-3); }
```

## Motion

```css
/* No component animation/transition found. */
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<section class="sk-cta" aria-labelledby="cta-title"><div class="sk-cta__inner"><div class="sk-cta__copy"><h2 id="cta-title">Ship the next page.</h2><p>Compose tokenized sections and move from idea to production.</p></div><div class="sk-cta__actions"><button class="sk-button" type="button">Continue</button></div></div></section>
```

## Composition and dependencies

Nested SiteKit components: []. External runtime libraries: none.

Related: [].

Actual CSS variables: `--sk-border-1`, `--sk-border-default`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-font-mono`, `--sk-radius-0`, `--sk-space-2`, `--sk-space-3`, `--sk-space-5`, `--sk-surface-card`, `--sk-text-secondary`, `--sk-type-line-loose`, `--sk-type-line-tight`, `--sk-type-size-md`, `--sk-type-size-xl`.

## Caveats and documentation

- Only actions is a template placeholder; heading/body are static. A split data-layout rule exists, not the declared band/inline/stacked switches.

MINIMAL: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: ["examples/component-lab/index.html"]. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {}, "matrix": false}
