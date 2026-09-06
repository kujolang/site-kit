# Pagination

Category: Actions. Public: HTML/CSS source contract. Status: `native`. Primitive: False.

## Purpose and selection

Link between pages and mark the current one.

Avoid: Client-side data pagination, item slicing or total-page computation.

## Source and consumption

- schema: `components/pagination/pagination.schema.json`
- template: `components/pagination/pagination.html`
- css: `components/pagination/pagination.css`
- documentation: `components/pagination/pagination.md`
- examples: `components/pagination/examples.json`

Load `dist/sitekit.css`; root selector `.sk-pagination`. No component JavaScript export.

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
| default | source template | components/pagination/pagination.html |
| focus | CSS selector; may target descendants | components/pagination/pagination.css |
| current | CSS selector; may target descendants | components/pagination/pagination.css |

## Interaction and accessibility

Browser-native control/navigation behavior for the source elements; no SiteKit-specific callback or controller. Links are fixture anchors; hrefs and aria-current are authored.

ACCEPTABLE: Preserve the template native semantics and visible text. Consumer content and composition need page-level verification.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css
.sk-pagination { display: flex; flex-wrap: wrap; justify-content: center; gap: var(--sk-space-2); }
```

## Motion

```css
/* No component animation/transition found. */
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<nav class="sk-pagination" aria-label="Pagination"><a href="#prev">Prev</a><a aria-current="page" href="#1">1</a><a href="#2">2</a><a href="#next">Next</a></nav>
```

## Composition and dependencies

Nested SiteKit components: []. External runtime libraries: none.

Related: [].

Actual CSS variables: `--sk-action-primary`, `--sk-action-primary-text`, `--sk-border-1`, `--sk-border-default`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-font-mono`, `--sk-space-2`, `--sk-space-3`, `--sk-surface-card`, `--sk-text-primary`, `--sk-type-weight-bold`.

## Caveats and documentation

- Links are fixture anchors; hrefs and aria-current are authored.

MINIMAL: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: []. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {}, "matrix": false}
