# Alert

Category: Feedback. Public: HTML/CSS source contract. Status: `html-css`. Primitive: False.

## Purpose and selection

Show a status notice with an exclamation marker and optional severity colors.

Avoid: A blocking dialog or automatically dismissing notification.

## Source and consumption

- schema: `components/alert/alert.schema.json`
- template: `components/alert/alert.html`
- css: `components/alert/alert.css`
- documentation: `components/alert/alert.md`
- examples: `components/alert/examples.json`

Load `dist/sitekit.css`; root selector `.sk-alert`. No component JavaScript export.

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

Declared variants: neutral, compact.

Verified component data-variant selectors: danger, neutral, success, warning. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: none established; sizing follows CSS/native dimensions.

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/alert/alert.html |
| focus | CSS selector; may target descendants | components/alert/alert.css |

## Interaction and accessibility

No component-specific shipped JavaScript; links and native descendants retain browser behavior.

ACCEPTABLE: Preserve the template native semantics and visible text. Consumer content and composition need page-level verification.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css
.sk-alert { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: var(--sk-space-3); align-items: start; border: var(--sk-border-1) solid var(--sk-border-default); border-inline-start-width: var(--sk-border-heavy); border-radius: var(--sk-radius-0); background: var(--sk-surface-card); color: var(--sk-text-primary); padding: var(--sk-space-4); }
.sk-alert::before { content: "!"; display: grid; place-items: center; inline-size: var(--sk-size-control-sm); block-size: var(--sk-size-control-sm); border: var(--sk-border-1) solid currentColor; font-family: var(--sk-font-mono); font-weight: var(--sk-type-weight-bold); line-height: 1; }
.sk-alert > * { min-inline-size: 0; grid-column: 2; }
```

## Motion

```css
.sk-alert strong { font-family: var(--sk-font-mono); text-transform: uppercase; }
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<aside class="sk-alert" role="status" data-variant="warning"><strong>Deploy attention</strong><p>Two checks need review before this build can ship.</p></aside>
```

## Composition and dependencies

Nested SiteKit components: []. External runtime libraries: none.

Related: [].

Actual CSS variables: `--sk-border-1`, `--sk-border-default`, `--sk-border-heavy`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-font-mono`, `--sk-radius-0`, `--sk-size-control-sm`, `--sk-space-3`, `--sk-space-4`, `--sk-state-danger`, `--sk-state-info`, `--sk-state-success`, `--sk-state-warning`, `--sk-surface-card`, `--sk-text-danger`, `--sk-text-primary`, `--sk-text-secondary`, `--sk-text-success`, `--sk-text-warning`, `--sk-type-weight-bold`.

## Caveats and documentation

- CSS supports danger, warning, success and neutral; schema lists neutral/compact. No compact selector.

CONTRADICTS IMPLEMENTATION: CSS supports danger, warning, success and neutral; schema lists neutral/compact. No compact selector.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: ["examples/component-lab/index.html"]. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {"variant": {"type": "select", "values": ["neutral", "success", "warning", "danger"], "attribute": "data-variant"}}, "matrix": true}
