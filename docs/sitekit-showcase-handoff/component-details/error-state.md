# Error State

Category: Feedback. Public: HTML/CSS source contract. Status: `html-css`. Primitive: False.

## Purpose and selection

Explain a recoverable failure and show retry/review actions.

Avoid: An automatic error boundary or network retry implementation.

## Source and consumption

- schema: `components/error-state/error-state.schema.json`
- template: `components/error-state/error-state.html`
- css: `components/error-state/error-state.css`
- documentation: `components/error-state/error-state.md`
- examples: `components/error-state/examples.json`

Load `dist/sitekit.css`; root selector `.sk-error-state`. No component JavaScript export.

## Declared API versus binding

| Field | Declared type | Required | Default | Verified binding / uncertainty |
| --- | --- | --- | --- | --- |
| heading | string | True | null | UNKNOWN: no automatic binding established; consumer authors markup. |
| body | string | False | null | UNKNOWN: no automatic binding established; consumer authors markup. |
| actions | array optional | False | null | Template {{actions}} placeholder only; consumer must safely render it. |

Required fields: ["heading"].

Template placeholders: ["actions"]. Declared slots: ["heading", "body", "actions"].

Allowed children (declared only): ["heading", "body", "actions"].

Callbacks/custom events: none exported. DOM/native state and consumer event handlers; no framework controlled/uncontrolled prop runtime.

## Variants, sizes and states

Declared variants: default, inline, critical.

Verified component data-variant selectors: none. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: none established; sizing follows CSS/native dimensions.

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/error-state/error-state.html |
| focus | CSS selector; may target descendants | components/error-state/error-state.css |
| busy | CSS selector; may target descendants | components/error-state/error-state.css |
| error | CSS selector; may target descendants | components/error-state/error-state.css |

## Interaction and accessibility

No component-specific shipped JavaScript; links and native descendants retain browser behavior.

ACCEPTABLE: Preserve the template native semantics and visible text. Consumer content and composition need page-level verification.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css
.sk-error-state { display: grid; gap: var(--sk-space-4); position: relative; border: var(--sk-border-2) solid var(--sk-state-danger); border-inline-start-width: var(--sk-border-heavy); border-radius: var(--sk-radius-0); background: var(--sk-surface-card); color: var(--sk-text-primary); padding: var(--sk-component-card-padding); box-shadow: var(--sk-shadow-none); container-type: inline-size; }
.sk-error-state::before, .sk-error-state::after { content: ""; position: absolute; inline-size: var(--sk-space-4); block-size: var(--sk-space-4); border-color: var(--sk-border-default); pointer-events: none; }
.sk-error-state [data-error-code] { display: inline-block; inline-size: fit-content; border: var(--sk-border-1) solid var(--sk-state-danger); padding: var(--sk-space-1) var(--sk-space-2); color: var(--sk-text-danger); font-family: var(--sk-font-mono); font-size: var(--sk-type-size-xs); text-transform: uppercase; }
```

## Motion

```css
.sk-error-state [data-error-code] { display: inline-block; inline-size: fit-content; border: var(--sk-border-1) solid var(--sk-state-danger); padding: var(--sk-space-1) var(--sk-space-2); color: var(--sk-text-danger); font-family: var(--sk-font-mono); font-size: var(--sk-type-size-xs); text-transform: uppercase; }
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<section class="sk-error-state" aria-labelledby="error-state-title"><span data-error-code>Sync failed</span><h2 id="error-state-title">We could not save changes.</h2><p>The API returned a recoverable error. Retry the request or review the deployment log.</p><div><button class="sk-button" type="button">Continue</button></div></section>
```

## Composition and dependencies

Nested SiteKit components: []. External runtime libraries: none.

Related: [].

Actual CSS variables: `--sk-border-1`, `--sk-border-2`, `--sk-border-default`, `--sk-border-heavy`, `--sk-component-card-padding`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-font-mono`, `--sk-radius-0`, `--sk-shadow-none`, `--sk-space-1`, `--sk-space-2`, `--sk-space-4`, `--sk-state-danger`, `--sk-surface-card`, `--sk-text-danger`, `--sk-text-primary`, `--sk-text-secondary`, `--sk-type-size-xs`.

## Caveats and documentation

- No automatic alert announcement or retry logic; content and actions are consumer-owned.

MINIMAL: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: ["examples/component-lab/index.html"]. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {}, "matrix": false}
