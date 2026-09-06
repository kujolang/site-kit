# Drawer

Category: Overlays. Public: HTML/CSS source contract. Status: `optional-js`. Primitive: False.

## Purpose and selection

Show a secondary panel with optional open/close and focus containment.

Avoid: Assuming it is a complete modal sheet with inert background.

## Source and consumption

- schema: `components/drawer/drawer.schema.json`
- template: `components/drawer/drawer.html`
- css: `components/drawer/drawer.css`
- documentation: `components/drawer/drawer.md`
- examples: `components/drawer/examples.json`

Load `dist/sitekit.css`; root selector `.sk-drawer`. Load `dist/sitekit.js` for the hooks below.

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

Declared variants: right, compact.

Verified component data-variant selectors: none. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: none established; sizing follows CSS/native dimensions.

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/drawer/drawer.html |
| hover | CSS selector; may target descendants | components/drawer/drawer.css |
| focus | CSS selector; may target descendants | components/drawer/drawer.css |
| open/closed | behavior hook | scripts/sitekit-behavior.js |

## Interaction and accessibility

Shipped: data-sk-drawer-open matching ID unhides aside, updates aria-hidden, unhides resolved scrim and focuses first focusable; close/dismiss/Escape/scrim click hides it and restores opener; Tab cycles endpoints. This does not establish browser modality or background inertness.

NEEDS IMPROVEMENT: Source shell is an inline two-column frame; dashboard adds fixed positioning. No background inert, aria-modal, scroll lock or opener expanded-state synchronization. OBSERVED in 390px Chromium probes, both Kujo themes: .sk-drawer display:grid overrides native hidden display; aside remains rendered/focusable with aria-hidden=true. axe reports aria-hidden-focus. Consumer dashboard has its own hidden override, so existing page tests do not catch the source-template defect.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Inline shell has a minimum 18rem panel and 28rem minimum height; no component media query. Dashboard fixture supplies fixed panel/backdrop positioning outside the component CSS.

Observed queries: [].

```css
.sk-drawer-shell { display: grid; grid-template-columns: 1fr minmax(18rem, 28rem); min-block-size: 28rem; border: var(--sk-border-1) solid var(--sk-border-default); background: var(--sk-surface-page); overflow: hidden; }
.sk-drawer { display: grid; grid-template-rows: auto 1fr auto; gap: var(--sk-space-4); border: 0; border-radius: var(--sk-radius-0); background: var(--sk-surface-card); color: var(--sk-text-primary); padding: var(--sk-space-5); inline-size: 100%; min-block-size: 100%; box-shadow: var(--sk-shadow-none); }
.sk-drawer > * { min-inline-size: 0; }
```

## Motion

```css
/* No component animation/transition found. */
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<button class="sk-button" type="button" data-sk-drawer-open="project-drawer">Open settings</button><div class="sk-drawer-shell"><div class="sk-drawer-scrim" aria-hidden="true"></div><aside class="sk-drawer" id="project-drawer" data-sk-drawer hidden aria-hidden="true" aria-labelledby="drawer-title"><header><div><h2 id="drawer-title">Project settings</h2><p>Manage the active workspace.</p></div><button class="sk-button" type="button" data-variant="secondary" data-sk-drawer-close aria-label="Close drawer">X</button></header><nav aria-label="Drawer"><a href="#profile">Profile</a><a href="#billing">Billing</a><a href="#access">Access control</a></nav><button class="sk-button" type="button">Save changes</button></aside></div>
```

## Composition and dependencies

Nested SiteKit components: ["button"]. External runtime libraries: none.

Related: ["header", "navigation", "modal"].

Actual CSS variables: `--sk-border-1`, `--sk-border-default`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-radius-0`, `--sk-shadow-none`, `--sk-space-3`, `--sk-space-4`, `--sk-space-5`, `--sk-surface-card`, `--sk-surface-page`, `--sk-surface-subtle`, `--sk-text-primary`, `--sk-text-secondary`.

## Caveats and documentation

- Source shell is an inline two-column frame; dashboard adds fixed positioning. No background inert, aria-modal, scroll lock or opener expanded-state synchronization.
- OBSERVED in 390px Chromium probes, both Kujo themes: .sk-drawer display:grid overrides native hidden display; aside remains rendered/focusable with aria-hidden=true. axe reports aria-hidden-focus. Consumer dashboard has its own hidden override, so existing page tests do not catch the source-template defect.

ADEQUATE: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: ["tests/browser/sitekit.spec.mjs"].

Examples containing references: ["examples/component-lab/index.html", "examples/consumer-dashboard/index.html"]. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {}, "matrix": false}
