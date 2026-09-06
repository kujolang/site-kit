# Dropdown Menu

Category: Actions. Public: HTML/CSS source contract. Status: `optional-js`. Primitive: False.

## Purpose and selection

Offer a button-triggered menu of commands with keyboard movement.

Avoid: Navigation lists or a complete nested/typeahead menu system.

## Source and consumption

- schema: `components/dropdown-menu/dropdown-menu.schema.json`
- template: `components/dropdown-menu/dropdown-menu.html`
- css: `components/dropdown-menu/dropdown-menu.css`
- documentation: `components/dropdown-menu/dropdown-menu.md`
- examples: `components/dropdown-menu/examples.json`

Load `dist/sitekit.css`; root selector `.sk-dropdown-menu`. Load `dist/sitekit.js` for the hooks below.

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
| default | source template | components/dropdown-menu/dropdown-menu.html |
| hover | CSS selector; may target descendants | components/dropdown-menu/dropdown-menu.css |
| focus | CSS selector; may target descendants | components/dropdown-menu/dropdown-menu.css |
| open/closed | behavior hook | scripts/sitekit-behavior.js |

## Interaction and accessibility

Shipped: trigger click toggles; ArrowDown/Enter/Space opens first item; ArrowUp opens last; menu arrows wrap; Home/End jump; Escape closes and restores; Tab closes; document click and delayed focusout close. No typeahead, nested submenus, disabled-item filtering or automatic item-activation close.

ACCEPTABLE: Preserve the template native semantics and visible text. Consumer content and composition need page-level verification.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css
.sk-dropdown-menu { position: relative; display: inline-grid; gap: var(--sk-space-2); inline-size: max-content; color: var(--sk-text-primary); }
.sk-dropdown-menu > * { min-inline-size: 0; }
.sk-dropdown-menu ul { position: absolute; inset-block-start: calc(100% + var(--sk-space-2)); inset-inline-start: 0; z-index: var(--sk-z-dropdown); display: grid; gap: var(--sk-border-1); min-inline-size: 12rem; padding: 0; margin: 0; border: var(--sk-border-1) solid var(--sk-border-default); background: var(--sk-border-default); list-style: none; }
.sk-dropdown-menu li, .sk-dropdown-menu [role="menuitem"] { inline-size: 100%; }
```

## Motion

```css
/* No component animation/transition found. */
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<div class="sk-dropdown-menu"><button class="sk-button" type="button" aria-haspopup="menu" aria-expanded="false">Actions</button><ul role="menu" hidden><li role="none"><button role="menuitem" type="button">Duplicate</button></li><li role="none"><button role="menuitem" type="button">Archive</button></li></ul></div>
```

## Composition and dependencies

Nested SiteKit components: ["button"]. External runtime libraries: none.

Related: [].

Actual CSS variables: `--sk-action-primary`, `--sk-action-primary-text`, `--sk-border-1`, `--sk-border-default`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-space-2`, `--sk-space-3`, `--sk-surface-card`, `--sk-text-primary`, `--sk-z-dropdown`.

## Caveats and documentation

- Arrow/Home/End/Escape and outside dismissal are shipped; disabled menuitems are not filtered and activation does not automatically close.

ADEQUATE: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: ["tests/browser/sitekit.spec.mjs"].

Examples containing references: ["examples/component-lab/index.html", "examples/consumer-dashboard/index.html"]. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {}, "matrix": false}
