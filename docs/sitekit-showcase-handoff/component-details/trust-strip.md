# Trust Strip

Category: Commerce. Public: HTML/CSS source contract. Status: `html-css`. Primitive: False.

## Purpose and selection

Display a compact grid of named trust/delivery claims.

Avoid: Real compliance, uptime or refund evidence.

## Source and consumption

- schema: `components/trust-strip/trust-strip.schema.json`
- template: `components/trust-strip/trust-strip.html`
- css: `components/trust-strip/trust-strip.css`
- documentation: `components/trust-strip/trust-strip.md`
- examples: `components/trust-strip/examples.json`

Load `dist/sitekit.css`; root selector `.sk-trust-strip`. No component JavaScript export.

## Declared API versus binding

| Field | Declared type | Required | Default | Verified binding / uncertainty |
| --- | --- | --- | --- | --- |
| items | array | True | null | UNKNOWN: no automatic binding established; consumer authors markup. |

Required fields: ["items"].

Template placeholders: []. Declared slots: ["items"].

Allowed children (declared only): ["items"].

Callbacks/custom events: none exported. DOM/native state and consumer event handlers; no framework controlled/uncontrolled prop runtime.

## Variants, sizes and states

Declared variants: default, compact, bordered.

Verified component data-variant selectors: none. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: none established; sizing follows CSS/native dimensions.

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/trust-strip/trust-strip.html |
| focus | CSS selector; may target descendants | components/trust-strip/trust-strip.css |
| busy | CSS selector; may target descendants | components/trust-strip/trust-strip.css |
| error | CSS selector; may target descendants | components/trust-strip/trust-strip.css |

## Interaction and accessibility

No component-specific shipped JavaScript; links and native descendants retain browser behavior.

ACCEPTABLE: Preserve the template native semantics and visible text. Consumer content and composition need page-level verification.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css
.sk-trust-strip { display: grid; gap: var(--sk-space-4); position: relative; border: var(--sk-border-1) solid var(--sk-border-default); border-radius: var(--sk-radius-0); background: var(--sk-surface-card); color: var(--sk-text-primary); padding: var(--sk-component-card-padding); box-shadow: var(--sk-shadow-none); container-type: inline-size; }
.sk-trust-strip::before, .sk-trust-strip::after { content: ""; position: absolute; inline-size: var(--sk-space-4); block-size: var(--sk-space-4); border-color: var(--sk-border-default); pointer-events: none; }
.sk-trust-strip ul { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 10rem), 1fr)); gap: var(--sk-border-1); margin: 0; padding: 0; border: var(--sk-border-1) solid var(--sk-border-default); background: var(--sk-border-default); list-style: none; }
```

## Motion

```css
/* No component animation/transition found. */
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<section class="sk-trust-strip" aria-labelledby="trust-strip-title"><h2 id="trust-strip-title">Trusted delivery signals</h2><ul><li><strong>SSL</strong><span>Secure checkout</span></li><li><strong>24h</strong><span>Response window</span></li><li><strong>99.9%</strong><span>Uptime target</span></li><li><strong>30d</strong><span>Refund policy</span></li></ul></section>
```

## Composition and dependencies

Nested SiteKit components: []. External runtime libraries: none.

Related: [].

Actual CSS variables: `--sk-border-1`, `--sk-border-default`, `--sk-component-card-padding`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-font-mono`, `--sk-radius-0`, `--sk-shadow-none`, `--sk-space-2`, `--sk-space-3`, `--sk-space-4`, `--sk-state-danger`, `--sk-surface-card`, `--sk-text-primary`, `--sk-text-secondary`, `--sk-type-size-lg`.

## Caveats and documentation

- Claims are illustrative placeholders; no backend verification, default/compact/bordered selectors absent.

MINIMAL: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: ["examples/component-lab/index.html"]. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {}, "matrix": false}
