# Empty State

Category: Feedback. Public: HTML/CSS source contract. Status: `html-css`. Primitive: False.

## Purpose and selection

Explain an empty collection and offer a next action.

Avoid: A loading indicator or unexplained decorative blank.

## Source and consumption

- schema: `components/empty-state/empty-state.schema.json`
- template: `components/empty-state/empty-state.html`
- css: `components/empty-state/empty-state.css`
- documentation: `components/empty-state/empty-state.md`
- examples: `components/empty-state/examples.json`

Load `dist/sitekit.css`; root selector `.sk-empty-state`. No component JavaScript export.

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

Declared variants: default, compact, commerce.

Verified component data-variant selectors: none. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: none established; sizing follows CSS/native dimensions.

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/empty-state/empty-state.html |
| focus | CSS selector; may target descendants | components/empty-state/empty-state.css |
| busy | CSS selector; may target descendants | components/empty-state/empty-state.css |
| error | CSS selector; may target descendants | components/empty-state/empty-state.css |

## Interaction and accessibility

No component-specific shipped JavaScript; links and native descendants retain browser behavior.

ACCEPTABLE: Preserve the template native semantics and visible text. Consumer content and composition need page-level verification.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css
.sk-empty-state { display: grid; justify-items: center; gap: var(--sk-space-4); text-align: center; position: relative; border: var(--sk-border-1) dashed var(--sk-border-default); border-radius: var(--sk-radius-0); background: var(--sk-surface-card); color: var(--sk-text-primary); padding: var(--sk-component-card-padding); box-shadow: var(--sk-shadow-none); container-type: inline-size; }
.sk-empty-state::before, .sk-empty-state::after { content: ""; position: absolute; inline-size: var(--sk-space-4); block-size: var(--sk-space-4); border-color: var(--sk-border-default); pointer-events: none; }
.sk-empty-state__mark { display: grid; place-items: center; inline-size: var(--sk-size-control-lg); block-size: var(--sk-size-control-lg); border: var(--sk-border-1) solid var(--sk-border-default); background: var(--sk-surface-page); font-family: var(--sk-font-mono); }
.sk-empty-state p { max-inline-size: 42ch; color: var(--sk-text-secondary); }
```

## Motion

```css
/* No component animation/transition found. */
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<section class="sk-empty-state" aria-labelledby="empty-state-title"><span class="sk-empty-state__mark" aria-hidden="true">0</span><h2 id="empty-state-title">No projects yet</h2><p>Create your first project to start collecting tasks, files, and deployment notes.</p><div><button class="sk-button" type="button">Continue</button></div></section>
```

## Composition and dependencies

Nested SiteKit components: []. External runtime libraries: none.

Related: [].

Actual CSS variables: `--sk-border-1`, `--sk-border-default`, `--sk-component-card-padding`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-font-mono`, `--sk-radius-0`, `--sk-shadow-none`, `--sk-size-control-lg`, `--sk-space-2`, `--sk-space-4`, `--sk-state-danger`, `--sk-surface-card`, `--sk-surface-page`, `--sk-text-primary`, `--sk-text-secondary`.

## Caveats and documentation

- Fixture heading/body are static despite props; actions is a slot. Busy/error rules do not create data states.

MINIMAL: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: ["examples/component-lab/index.html"]. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {}, "matrix": false}
