# Progress Bar

Category: Feedback. Public: HTML/CSS source contract. Status: `html-css`. Primitive: False.

## Purpose and selection

Draw a horizontal completion fill.

Avoid: An accessible progress widget without additional native/ARIA semantics.

## Source and consumption

- schema: `components/progress-bar/progress-bar.schema.json`
- template: `components/progress-bar/progress-bar.html`
- css: `components/progress-bar/progress-bar.css`
- documentation: `components/progress-bar/progress-bar.md`
- examples: `components/progress-bar/examples.json`

Load `dist/sitekit.css`; root selector `.sk-progress-bar`. No component JavaScript export.

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

Declared variants: determinate, compact.

Verified component data-variant selectors: none. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: none established; sizing follows CSS/native dimensions.

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/progress-bar/progress-bar.html |
| focus | CSS selector; may target descendants | components/progress-bar/progress-bar.css |

## Interaction and accessibility

No component-specific shipped JavaScript; links and native descendants retain browser behavior.

NEEDS IMPROVEMENT: Template div has no role=progressbar or value semantics; 64 percent inline-size is visual only. OBSERVED: axe aria-prohibited-attr on generic div aria-label; no progress role/value semantics.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css
.sk-progress-bar { overflow: hidden; block-size: var(--sk-space-4); border: var(--sk-border-1) solid var(--sk-border-default); background: var(--sk-surface-card); }
```

## Motion

```css
/* No component animation/transition found. */
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<div class="sk-progress-bar" aria-label="Build progress"><span style="inline-size: 64%"></span></div>
```

## Composition and dependencies

Nested SiteKit components: []. External runtime libraries: none.

Related: ["progress-indicator", "spinner"].

Actual CSS variables: `--sk-border-1`, `--sk-border-default`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-space-4`, `--sk-surface-card`, `--sk-text-primary`.

## Caveats and documentation

- Template div has no role=progressbar or value semantics; 64 percent inline-size is visual only.
- OBSERVED: axe aria-prohibited-attr on generic div aria-label; no progress role/value semantics.

MINIMAL: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: []. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {}, "matrix": false}
