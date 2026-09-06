# Promo Banner

Category: Commerce. Public: HTML/CSS source contract. Status: `html-css`. Primitive: False.

## Purpose and selection

Present a promotional message and action cluster.

Avoid: A dismissible announcement system out of the box.

## Source and consumption

- schema: `components/promo-banner/promo-banner.schema.json`
- template: `components/promo-banner/promo-banner.html`
- css: `components/promo-banner/promo-banner.css`
- documentation: `components/promo-banner/promo-banner.md`
- examples: `components/promo-banner/examples.json`

Load `dist/sitekit.css`; root selector `.sk-promo-banner`. No component JavaScript export.

## Declared API versus binding

| Field | Declared type | Required | Default | Verified binding / uncertainty |
| --- | --- | --- | --- | --- |
| message | string | True | null | UNKNOWN: no automatic binding established; consumer authors markup. |
| action | object optional | False | null | UNKNOWN: no automatic binding established; consumer authors markup. |
| dismissible | boolean | False | null | UNKNOWN: no automatic binding established; consumer authors markup. |

Required fields: ["message"].

Template placeholders: ["actions"]. Declared slots: ["message", "action"].

Allowed children (declared only): ["message", "action"].

Callbacks/custom events: none exported. DOM/native state and consumer event handlers; no framework controlled/uncontrolled prop runtime.

## Variants, sizes and states

Declared variants: info, success, warning.

Verified component data-variant selectors: none. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: none established; sizing follows CSS/native dimensions.

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/promo-banner/promo-banner.html |
| focus | CSS selector; may target descendants | components/promo-banner/promo-banner.css |
| busy | CSS selector; may target descendants | components/promo-banner/promo-banner.css |
| error | CSS selector; may target descendants | components/promo-banner/promo-banner.css |

## Interaction and accessibility

No component-specific shipped JavaScript; links and native descendants retain browser behavior.

ACCEPTABLE: Preserve the template native semantics and visible text. Consumer content and composition need page-level verification.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css
.sk-promo-banner { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--sk-space-4); position: relative; border: var(--sk-border-1) solid var(--sk-border-default); border-radius: var(--sk-radius-0); background: var(--sk-surface-card); color: var(--sk-text-primary); padding: var(--sk-component-card-padding); box-shadow: var(--sk-shadow-none); container-type: inline-size; }
.sk-promo-banner::before, .sk-promo-banner::after { content: ""; position: absolute; inline-size: var(--sk-space-4); block-size: var(--sk-space-4); border-color: var(--sk-border-default); pointer-events: none; }
.sk-promo-banner__actions, .sk-promo-banner > div:last-child { display: flex; flex-wrap: wrap; gap: var(--sk-space-3); }
```

## Motion

```css
/* No component animation/transition found. */
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<section class="sk-promo-banner" aria-labelledby="promo-banner-title"><div class="sk-promo-banner__copy"><h2 id="promo-banner-title">Launch week bundle</h2><p>Save 20% on templates, components, and deployment recipes.</p></div><div class="sk-promo-banner__actions"><button class="sk-button" type="button">Continue</button></div></section>
```

## Composition and dependencies

Nested SiteKit components: []. External runtime libraries: none.

Related: [].

Actual CSS variables: `--sk-border-1`, `--sk-border-default`, `--sk-component-card-padding`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-font-mono`, `--sk-radius-0`, `--sk-shadow-none`, `--sk-space-2`, `--sk-space-3`, `--sk-space-4`, `--sk-state-danger`, `--sk-surface-card`, `--sk-text-primary`, `--sk-text-secondary`, `--sk-type-size-lg`.

## Caveats and documentation

- dismissible prop has no close markup/handler. Info/success/warning lack selectors; generic error state is separate.

CONTRADICTS IMPLEMENTATION: dismissible prop has no close markup/handler. Info/success/warning lack selectors; generic error state is separate.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: ["examples/component-lab/index.html"]. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {}, "matrix": false}
