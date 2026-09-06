# Navigation

Category: Navigation. Public: HTML/CSS source contract. Status: `html-css`. Primitive: False.

## Purpose and selection

Display a wrapping set of primary navigation links.

Avoid: A router, sidebar manager or mobile menu controller.

## Source and consumption

- schema: `components/navigation/navigation.schema.json`
- template: `components/navigation/navigation.html`
- css: `components/navigation/navigation.css`
- documentation: `components/navigation/navigation.md`
- examples: `components/navigation/examples.json`

Load `dist/sitekit.css`; root selector `.sk-navigation`. No component JavaScript export.

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

Declared variants: primary, compact.

Verified component data-variant selectors: none. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: none established; sizing follows CSS/native dimensions.

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/navigation/navigation.html |
| focus | CSS selector; may target descendants | components/navigation/navigation.css |

## Interaction and accessibility

No component-specific shipped JavaScript; links and native descendants retain browser behavior.

ACCEPTABLE: Preserve the template native semantics and visible text. Consumer content and composition need page-level verification.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css
.sk-navigation { display: flex; flex-wrap: wrap; align-items: center; gap: var(--sk-space-4); border: var(--sk-border-1) solid var(--sk-border-default); background: var(--sk-surface-card); padding: var(--sk-space-4); }
```

## Motion

```css
.sk-navigation a { color: var(--sk-text-primary); font-family: var(--sk-font-mono); font-size: var(--sk-type-size-xs); text-transform: uppercase; }
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<nav class="sk-navigation" aria-label="Primary"><a href="#components">Components</a><a href="#tokens">Tokens</a><a href="#recipes">Recipes</a></nav>
```

## Composition and dependencies

Nested SiteKit components: []. External runtime libraries: none.

Related: [].

Actual CSS variables: `--sk-border-1`, `--sk-border-default`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-font-mono`, `--sk-space-4`, `--sk-surface-card`, `--sk-text-primary`, `--sk-type-size-xs`.

## Caveats and documentation

- No current-route detection or collapse behavior; consumer writes aria-current and destinations.

MINIMAL: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: ["examples/consumer-dashboard/index.html"]. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {}, "matrix": false}
