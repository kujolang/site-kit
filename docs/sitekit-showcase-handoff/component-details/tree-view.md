# Tree View

Category: Navigation. Public: HTML/CSS source contract. Status: `html-css`. Primitive: False.

## Purpose and selection

Present nested navigation with a branch disclosure affordance.

Avoid: An ARIA tree widget with arrow-key navigation.

## Source and consumption

- schema: `components/tree-view/tree-view.schema.json`
- template: `components/tree-view/tree-view.html`
- css: `components/tree-view/tree-view.css`
- documentation: `components/tree-view/tree-view.md`
- examples: `components/tree-view/examples.json`

Load `dist/sitekit.css`; root selector `.sk-tree-view`. No component JavaScript export.

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
| default | source template | components/tree-view/tree-view.html |
| focus | CSS selector; may target descendants | components/tree-view/tree-view.css |

## Interaction and accessibility

No component-specific shipped JavaScript; links and native descendants retain browser behavior.

NEEDS IMPROVEMENT: No dist or lab tree collapse handler. Source uses nested navigation lists, not role=tree; button aria-expanded is static.

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
<nav class="sk-tree-view" aria-label="Component tree"><ul><li><button type="button" aria-expanded="true">Inputs</button><ul><li><a href="#text-input">Text input</a></li><li><a href="#select">Select</a></li></ul></li></ul></nav>
```

## Composition and dependencies

Nested SiteKit components: []. External runtime libraries: none.

Related: [].

Actual CSS variables: `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-font-mono`, `--sk-space-2`, `--sk-space-5`, `--sk-text-primary`.

## Caveats and documentation

- No dist or lab tree collapse handler. Source uses nested navigation lists, not role=tree; button aria-expanded is static.

MINIMAL: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: []. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {}, "matrix": false}
