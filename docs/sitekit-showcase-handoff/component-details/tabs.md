# Tabs

Category: Navigation. Public: HTML/CSS source contract. Status: `example-only-js`. Primitive: False.

## Purpose and selection

Provide the styled tablist/panel structure for related views.

Avoid: A working accessible tabs controller from dist alone.

## Source and consumption

- schema: `components/tabs/tabs.schema.json`
- template: `components/tabs/tabs.html`
- css: `components/tabs/tabs.css`
- documentation: `components/tabs/tabs.md`
- examples: `components/tabs/examples.json`

Load `dist/sitekit.css`; root selector `.sk-tabs`. No component JavaScript export.

## Declared API versus binding

| Field | Declared type | Required | Default | Verified binding / uncertainty |
| --- | --- | --- | --- | --- |
| tabs | array | True | null | Template {{tabs}} placeholder only; consumer must safely render it. |
| selected | string | False | null | UNKNOWN: no automatic binding established; consumer authors markup. |

Required fields: ["tabs", "panels"].

Template placeholders: ["id", "label", "panel", "tabs"]. Declared slots: ["tablist", "panels"].

Allowed children (declared only): ["tablist", "panels"].

Callbacks/custom events: none exported. DOM/native state and consumer event handlers; no framework controlled/uncontrolled prop runtime.

## Variants, sizes and states

Declared variants: line, boxed, docs.

Verified component data-variant selectors: none. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: none established; sizing follows CSS/native dimensions.

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/tabs/tabs.html |
| focus | CSS selector; may target descendants | components/tabs/tabs.css |
| selected | CSS selector; may target descendants | components/tabs/tabs.css |

## Interaction and accessibility

No dist tab events or roving tabindex. Lab supports clicks only. required panels is absent from props; template panel singular differs from slots.

NEEDS IMPROVEMENT: No dist tab events or roving tabindex. Lab supports clicks only. required panels is absent from props; template panel singular differs from slots.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css
.sk-tabs [role="tablist"] { display: flex; flex-wrap: wrap; gap: 0; border-block-end: 0; }
```

## Motion

```css
/* No component animation/transition found. */
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<div class="sk-tabs"><div role="tablist" aria-label="Provide the styled tablist/panel structure for related views."><button id="demo-tabs-tab" type="button" role="tab" aria-selected="true" aria-controls="demo-tabs-panel">Overview</button></div><section id="demo-tabs-panel" role="tabpanel" tabindex="0">Panel content; additional tab behavior is consumer-owned.</section></div>
```

## Composition and dependencies

Nested SiteKit components: []. External runtime libraries: none.

Related: ["segmented-control", "navigation"].

Actual CSS variables: `--sk-border-1`, `--sk-border-default`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-font-mono`, `--sk-space-2`, `--sk-space-3`, `--sk-space-4`, `--sk-surface-raised`, `--sk-surface-subtle`, `--sk-text-primary`, `--sk-type-weight-bold`.

## Caveats and documentation

- No dist tab events or roving tabindex. Lab supports clicks only. required panels is absent from props; template panel singular differs from slots.
- Required fields absent from props: panels

CONTRADICTS IMPLEMENTATION: No dist tab events or roving tabindex. Lab supports clicks only. required panels is absent from props; template panel singular differs from slots.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: ["examples/component-lab/index.html"]. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {}, "matrix": false}
