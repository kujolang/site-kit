# Toast

Category: Feedback. Public: HTML/CSS source contract. Status: `example-only-js`. Primitive: False.

## Purpose and selection

Show an inline live status with a dismiss button.

Avoid: A queue, portal, timer or notification service.

## Source and consumption

- schema: `components/toast/toast.schema.json`
- template: `components/toast/toast.html`
- css: `components/toast/toast.css`
- documentation: `components/toast/toast.md`
- examples: `components/toast/examples.json`

Load `dist/sitekit.css`; root selector `.sk-toast`. No component JavaScript export.

## Declared API versus binding

| Field | Declared type | Required | Default | Verified binding / uncertainty |
| --- | --- | --- | --- | --- |
| label | string optional | False | null | UNKNOWN: no automatic binding established; consumer authors markup. |
| variant | string optional | False | null | UNKNOWN: no automatic binding established; consumer authors markup. |

Required fields: [].

Template placeholders: []. Declared slots: ["label", "content", "actions"].

Allowed children (declared only): ["label", "content", "actions"].

Callbacks/custom events: none exported. DOM/native state and consumer event handlers; no framework controlled/uncontrolled prop runtime.

## Variants, sizes and states

Declared variants: default, compact.

Verified component data-variant selectors: none. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: none established; sizing follows CSS/native dimensions.

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/toast/toast.html |
| hover | CSS selector; may target descendants | components/toast/toast.css |
| focus | CSS selector; may target descendants | components/toast/toast.css |

## Interaction and accessibility

Dismiss is implemented only in the lab; no dist handler. Component is in flow, not fixed to viewport.

ACCEPTABLE: Preserve the template native semantics and visible text. Consumer content and composition need page-level verification.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css
.sk-toast { display: grid; gap: var(--sk-space-3) var(--sk-space-4); grid-template-columns: 1fr auto; align-items: start; inline-size: min(100%, 26rem); border: var(--sk-border-1) solid var(--sk-border-default); border-radius: var(--sk-radius-0); background: var(--sk-surface-card); color: var(--sk-text-primary); padding: var(--sk-space-4); }
.sk-toast > * { min-inline-size: 0; }
.sk-toast button { grid-column: 2; grid-row: 1 / span 2; display: inline-grid; place-items: center; inline-size: var(--sk-size-control-md); block-size: var(--sk-size-control-md); border: var(--sk-border-1) solid var(--sk-border-default); border-radius: var(--sk-radius-0); background: var(--sk-surface-raised); color: var(--sk-text-primary); padding: 0; font-family: var(--sk-font-mono); cursor: pointer; }
```

## Motion

```css
/* No component animation/transition found. */
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<section class="sk-toast" role="status"><strong>Saved</strong><p>Your changes are synced.</p><button type="button" aria-label="Dismiss">X</button></section>
```

## Composition and dependencies

Nested SiteKit components: []. External runtime libraries: none.

Related: [].

Actual CSS variables: `--sk-action-primary`, `--sk-action-primary-text`, `--sk-border-1`, `--sk-border-default`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-font-mono`, `--sk-radius-0`, `--sk-size-control-md`, `--sk-space-3`, `--sk-space-4`, `--sk-surface-card`, `--sk-surface-raised`, `--sk-text-primary`, `--sk-text-secondary`.

## Caveats and documentation

- Dismiss is implemented only in the lab; no dist handler. Component is in flow, not fixed to viewport.

MINIMAL: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: ["examples/component-lab/index.html"]. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {}, "matrix": false}
