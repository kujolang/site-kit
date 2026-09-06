# Popover

Category: Overlays. Public: HTML/CSS source contract. Status: `optional-js`. Primitive: False.

## Purpose and selection

Toggle contextual nonmodal content next to a trigger.

Avoid: A modal form or collision-aware floating positioning library.

## Source and consumption

- schema: `components/popover/popover.schema.json`
- template: `components/popover/popover.html`
- css: `components/popover/popover.css`
- documentation: `components/popover/popover.md`
- examples: `components/popover/examples.json`

Load `dist/sitekit.css`; root selector `.sk-popover`. Load `dist/sitekit.js` for the hooks below.

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
| default | source template | components/popover/popover.html |
| focus | CSS selector; may target descendants | components/popover/popover.css |
| open/closed | behavior hook | scripts/sitekit-behavior.js |

## Interaction and accessibility

Shipped: first button/[aria-expanded] toggles role=dialog or data-sk-popover-panel; creates missing ID and aria-controls; updates hidden/aria-hidden; Escape on trigger/panel restores trigger; outside click closes without restoration.

ACCEPTABLE: Preserve the template native semantics and visible text. Consumer content and composition need page-level verification.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css
.sk-popover { position: relative; display: inline-grid; gap: var(--sk-space-2); color: var(--sk-text-primary); inline-size: max-content; }
.sk-popover > * { min-inline-size: 0; }
.sk-popover [role="dialog"] { position: absolute; inset-block-start: calc(100% + var(--sk-space-2)); inset-inline-start: 0; z-index: var(--sk-z-dropdown); inline-size: min(80vw, 22rem); border: var(--sk-border-1) solid var(--sk-border-default); background: var(--sk-surface-raised); padding: var(--sk-space-4); opacity: 1; transform: translateY(0); transition: opacity var(--sk-motion-base) var(--sk-motion-ease), transform var(--sk-motion-base) var(--sk-motion-ease); }
```

## Motion

```css
.sk-popover [role="dialog"] { position: absolute; inset-block-start: calc(100% + var(--sk-space-2)); inset-inline-start: 0; z-index: var(--sk-z-dropdown); inline-size: min(80vw, 22rem); border: var(--sk-border-1) solid var(--sk-border-default); background: var(--sk-surface-raised); padding: var(--sk-space-4); opacity: 1; transform: translateY(0); transition: opacity var(--sk-motion-base) var(--sk-motion-ease), transform var(--sk-motion-base) var(--sk-motion-ease); }
.sk-popover [role="dialog"][hidden] { display: block; visibility: hidden; opacity: 0; transform: translateY(calc(-1 * var(--sk-space-2))); pointer-events: none; }
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<div class="sk-popover"><button class="sk-button" type="button" aria-expanded="false">Details</button><div role="dialog" aria-label="Details popover" hidden><p>Compact contextual information.</p></div></div>
```

## Composition and dependencies

Nested SiteKit components: ["button"]. External runtime libraries: none.

Related: [].

Actual CSS variables: `--sk-border-1`, `--sk-border-default`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-motion-base`, `--sk-motion-ease`, `--sk-space-2`, `--sk-space-4`, `--sk-surface-raised`, `--sk-text-primary`, `--sk-text-secondary`, `--sk-z-dropdown`.

## Caveats and documentation

- Shipped toggle/Escape/outside click; no initial panel focus, trap, collision avoidance or portal. data-sk-popover-panel selector is JS-only unless role=dialog also supplies CSS.

ADEQUATE: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: ["tests/browser/sitekit.spec.mjs"].

Examples containing references: ["examples/component-lab/index.html", "examples/consumer-dashboard/index.html"]. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {}, "matrix": false}
