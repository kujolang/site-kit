# Badge

Category: Data Display. Public: HTML/CSS source contract. Status: `html-css`. Primitive: True.

## Purpose and selection

Add compact text status labels.

Avoid: An interactive control or status conveyed only by color.

## Source and consumption

- schema: `components/badge/badge.schema.json`
- template: `components/badge/badge.html`
- css: `components/badge/badge.css`
- documentation: `components/badge/badge.md`
- examples: `components/badge/examples.json`

Load `dist/sitekit.css`; root selector `.sk-badge`. No component JavaScript export.

## Declared API versus binding

| Field | Declared type | Required | Default | Verified binding / uncertainty |
| --- | --- | --- | --- | --- |
| label | string | True | null | Template {{label}} placeholder only; consumer must safely render it. |
| variant | neutral\|success\|warning\|danger\|outline | False | null | UNKNOWN: no automatic binding established; consumer authors markup. |

Required fields: ["label"].

Template placeholders: ["label"]. Declared slots: ["label"].

Allowed children (declared only): ["label"].

Callbacks/custom events: none exported. DOM/native state and consumer event handlers; no framework controlled/uncontrolled prop runtime.

## Variants, sizes and states

Declared variants: neutral, success, warning, danger, outline.

Verified component data-variant selectors: danger, success, warning. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: none established; sizing follows CSS/native dimensions.

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/badge/badge.html |

## Interaction and accessibility

No component-specific shipped JavaScript; links and native descendants retain browser behavior.

ACCEPTABLE: Preserve the template native semantics and visible text. Consumer content and composition need page-level verification.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css

```

## Motion

```css
.sk-badge { display: inline-flex; align-items: center; min-block-size: 1.5rem; padding-inline: var(--sk-space-2); border: var(--sk-border-1) solid var(--sk-border-default); border-radius: var(--sk-radius-0); background: var(--sk-surface-subtle); color: var(--sk-text-primary); font-family: var(--sk-font-mono); font-size: var(--sk-type-size-xs); font-weight: var(--sk-type-weight-bold); text-transform: uppercase; }
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<span class="sk-badge" data-variant="neutral">Add compact text status labels.</span>
```

## Composition and dependencies

Nested SiteKit components: []. External runtime libraries: none.

Related: [].

Actual CSS variables: `--sk-border-1`, `--sk-border-default`, `--sk-font-mono`, `--sk-radius-0`, `--sk-space-2`, `--sk-state-danger`, `--sk-state-success`, `--sk-state-warning`, `--sk-surface-subtle`, `--sk-text-primary`, `--sk-type-size-xs`, `--sk-type-weight-bold`.

## Caveats and documentation

- Neutral and outline share base styling; only success/warning/danger have dedicated selectors.

CONTRADICTS IMPLEMENTATION: Neutral and outline share base styling; only success/warning/danger have dedicated selectors.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: ["examples/component-lab/index.html", "examples/consumer-dashboard/index.html"]. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {"variant": {"type": "select", "values": ["neutral", "success", "warning", "danger"], "attribute": "data-variant"}, "label": {"type": "text", "target": "textContent"}}, "matrix": true}
