# Link

Category: Foundations. Public: HTML/CSS source contract. Status: `native`. Primitive: True.

## Purpose and selection

Style a real navigation anchor with underline and focus.

Avoid: A command action that should use button.

## Source and consumption

- schema: `components/link/link.schema.json`
- template: `components/link/link.html`
- css: `components/link/link.css`
- documentation: `components/link/link.md`
- examples: `components/link/examples.json`

Load `dist/sitekit.css`; root selector `.sk-link`. No component JavaScript export.

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

Declared variants: inline, compact.

Verified component data-variant selectors: none. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: none established; sizing follows CSS/native dimensions.

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/link/link.html |
| hover | CSS selector; may target descendants | components/link/link.css |
| focus | CSS selector; may target descendants | components/link/link.css |

## Interaction and accessibility

Browser-native control/navigation behavior for the source elements; no SiteKit-specific callback or controller. Native href navigation; compact is not a separate style.

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
<a class="sk-link" href="#components">Read component docs</a>
```

## Composition and dependencies

Nested SiteKit components: []. External runtime libraries: none.

Related: [].

Actual CSS variables: `--sk-border-2`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-font-mono`, `--sk-text-primary`.

## Caveats and documentation

- Native href navigation; compact is not a separate style.

MINIMAL: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: []. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {}, "matrix": false}
