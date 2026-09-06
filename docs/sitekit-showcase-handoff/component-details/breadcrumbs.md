# Breadcrumbs

Category: Navigation. Public: HTML/CSS source contract. Status: `html-css`. Primitive: False.

## Purpose and selection

Represent a hierarchy as an ordered navigation trail.

Avoid: Primary navigation or an automatically generated router trail.

## Source and consumption

- schema: `components/breadcrumbs/breadcrumbs.schema.json`
- template: `components/breadcrumbs/breadcrumbs.html`
- css: `components/breadcrumbs/breadcrumbs.css`
- documentation: `components/breadcrumbs/breadcrumbs.md`
- examples: `components/breadcrumbs/examples.json`

Load `dist/sitekit.css`; root selector `.sk-breadcrumbs`. No component JavaScript export.

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
| default | source template | components/breadcrumbs/breadcrumbs.html |
| focus | CSS selector; may target descendants | components/breadcrumbs/breadcrumbs.css |

## Interaction and accessibility

No component-specific shipped JavaScript; links and native descendants retain browser behavior.

ACCEPTABLE: Preserve the template native semantics and visible text. Consumer content and composition need page-level verification.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css
.sk-breadcrumbs ol { display: flex; flex-wrap: wrap; gap: var(--sk-space-2); padding: 0; margin: 0; list-style: none; }
```

## Motion

```css
.sk-breadcrumbs li { font-family: var(--sk-font-mono); font-size: var(--sk-type-size-xs); text-transform: uppercase; }
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<nav class="sk-breadcrumbs" aria-label="Breadcrumbs"><ol><li><a href="#home">Home</a></li><li><a href="#components">Components</a></li><li aria-current="page">Breadcrumbs</li></ol></nav>
```

## Composition and dependencies

Nested SiteKit components: []. External runtime libraries: none.

Related: [].

Actual CSS variables: `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-font-mono`, `--sk-space-2`, `--sk-text-muted`, `--sk-text-primary`, `--sk-type-size-xs`.

## Caveats and documentation

- Current page is manually marked on li. Compact has no dedicated rule.

MINIMAL: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: []. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {}, "matrix": false}
