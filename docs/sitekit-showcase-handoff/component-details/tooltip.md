# Tooltip

Category: Overlays. Public: HTML/CSS source contract. Status: `optional-js`. Primitive: False.

## Purpose and selection

Show advisory text on trigger focus/hover with Escape dismissal.

Avoid: Essential content, interactive tooltip content or collision-aware positioning.

## Source and consumption

- schema: `components/tooltip/tooltip.schema.json`
- template: `components/tooltip/tooltip.html`
- css: `components/tooltip/tooltip.css`
- documentation: `components/tooltip/tooltip.md`
- examples: `components/tooltip/examples.json`

Load `dist/sitekit.css`; root selector `.sk-tooltip`. Load `dist/sitekit.js` for the hooks below.

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
| default | source template | components/tooltip/tooltip.html |
| hover | CSS selector; may target descendants | components/tooltip/tooltip.css |
| focus | CSS selector; may target descendants | components/tooltip/tooltip.css |
| open/closed | behavior hook | scripts/sitekit-behavior.js |

## Interaction and accessibility

Shipped: button/[aria-describedby] and role=tooltip receive ID relationship; focus and mouseenter reveal; blur/mouseleave hide only when both inactive; Escape hides. Does not keep tooltip open when pointer moves onto tip.

NEEDS IMPROVEMENT: Shipped listeners track trigger hover/focus; tooltip pointer-events:none prevents hovering the tooltip itself. Existing aria-describedby is replaced. No touch-specific model.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css
.sk-tooltip [role="tooltip"] { position: absolute; inset-block-end: calc(100% + var(--sk-space-2)); inset-inline-start: 50%; transform: translateX(-50%); inline-size: max-content; max-inline-size: 18rem; border: var(--sk-border-1) solid var(--sk-border-default); background: var(--sk-surface-card); color: var(--sk-text-primary); padding: var(--sk-space-2) var(--sk-space-3); font-size: var(--sk-type-size-sm); opacity: 0; visibility: hidden; pointer-events: none; transition: opacity var(--sk-motion-base) var(--sk-motion-ease), visibility var(--sk-motion-base) var(--sk-motion-ease); z-index: var(--sk-z-dropdown); }
```

## Motion

```css
.sk-tooltip [role="tooltip"] { position: absolute; inset-block-end: calc(100% + var(--sk-space-2)); inset-inline-start: 50%; transform: translateX(-50%); inline-size: max-content; max-inline-size: 18rem; border: var(--sk-border-1) solid var(--sk-border-default); background: var(--sk-surface-card); color: var(--sk-text-primary); padding: var(--sk-space-2) var(--sk-space-3); font-size: var(--sk-type-size-sm); opacity: 0; visibility: hidden; pointer-events: none; transition: opacity var(--sk-motion-base) var(--sk-motion-ease), visibility var(--sk-motion-base) var(--sk-motion-ease); z-index: var(--sk-z-dropdown); }
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<span class="sk-tooltip"><button class="sk-button" type="button" aria-describedby="tooltip-content" aria-expanded="false">Info</button><span id="tooltip-content" role="tooltip" hidden>Helpful context for this control.</span></span>
```

## Composition and dependencies

Nested SiteKit components: ["button"]. External runtime libraries: none.

Related: [].

Actual CSS variables: `--sk-border-1`, `--sk-border-default`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-motion-base`, `--sk-motion-ease`, `--sk-space-2`, `--sk-space-3`, `--sk-surface-card`, `--sk-text-primary`, `--sk-type-size-sm`, `--sk-z-dropdown`.

## Caveats and documentation

- Shipped listeners track trigger hover/focus; tooltip pointer-events:none prevents hovering the tooltip itself. Existing aria-describedby is replaced. No touch-specific model.

ADEQUATE: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: ["tests/browser/sitekit.spec.mjs"].

Examples containing references: ["examples/component-lab/index.html", "examples/consumer-dashboard/index.html"]. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {}, "matrix": false}
