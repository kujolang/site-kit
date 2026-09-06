# Segmented Control

Category: Actions. Public: HTML/CSS source contract. Status: `example-only-js`. Primitive: False.

## Purpose and selection

Present a group of view-mode buttons.

Avoid: A complete single-select state controller.

## Source and consumption

- schema: `components/segmented-control/segmented-control.schema.json`
- template: `components/segmented-control/segmented-control.html`
- css: `components/segmented-control/segmented-control.css`
- documentation: `components/segmented-control/segmented-control.md`
- examples: `components/segmented-control/examples.json`

Load `dist/sitekit.css`; root selector `.sk-segmented-control`. No component JavaScript export.

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

Declared variants: single-select, compact.

Verified component data-variant selectors: none. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: none established; sizing follows CSS/native dimensions.

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/segmented-control/segmented-control.html |
| hover | CSS selector; may target descendants | components/segmented-control/segmented-control.css |
| focus | CSS selector; may target descendants | components/segmented-control/segmented-control.css |
| pressed | CSS selector; may target descendants | components/segmented-control/segmented-control.css |

## Interaction and accessibility

Only lab clicks synchronize aria-pressed. Native button semantics remain; all buttons should explicitly declare pressed state in consumer code.

ACCEPTABLE: Preserve the template native semantics and visible text. Consumer content and composition need page-level verification.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css

```

## Motion

```css
/* No component animation/transition found. */
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<div class="sk-segmented-control" role="group" aria-label="View mode"><button type="button" aria-pressed="true">Grid</button><button type="button">List</button><button type="button">Table</button></div>
```

## Composition and dependencies

Nested SiteKit components: []. External runtime libraries: none.

Related: [].

Actual CSS variables: `--sk-action-primary`, `--sk-action-primary-text`, `--sk-border-1`, `--sk-border-default`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-font-mono`, `--sk-space-2`, `--sk-space-3`, `--sk-surface-card`, `--sk-surface-subtle`, `--sk-text-primary`, `--sk-type-weight-bold`.

## Caveats and documentation

- Only lab clicks synchronize aria-pressed. Native button semantics remain; all buttons should explicitly declare pressed state in consumer code.

MINIMAL: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: ["examples/component-lab/index.html"]. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {}, "matrix": false}
