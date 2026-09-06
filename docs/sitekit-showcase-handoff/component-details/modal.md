# Modal

Category: Overlays. Public: HTML/CSS source contract. Status: `optional-js`. Primitive: False.

## Purpose and selection

Open a labeled native dialog with explicit dismissal and opener restoration.

Avoid: Persistent page content or a fallback modal for obsolete browsers.

## Source and consumption

- schema: `components/modal/modal.schema.json`
- template: `components/modal/modal.html`
- css: `components/modal/modal.css`
- documentation: `components/modal/modal.md`
- examples: `components/modal/examples.json`

Load `dist/sitekit.css`; root selector `.sk-modal`. Load `dist/sitekit.js` for the hooks below.

## Declared API versus binding

| Field | Declared type | Required | Default | Verified binding / uncertainty |
| --- | --- | --- | --- | --- |
| id | string | False | null | Template {{id}} placeholder only; consumer must safely render it. |
| title | string | True | null | Template {{title}} placeholder only; consumer must safely render it. |
| open | boolean | False | null | UNKNOWN: no automatic binding established; consumer authors markup. |
| dismissible | boolean | False | null | UNKNOWN: no automatic binding established; consumer authors markup. |

Required fields: ["title"].

Template placeholders: ["actions", "body", "id", "title"]. Declared slots: ["title", "body", "actions"].

Allowed children (declared only): ["title", "body", "actions"].

Callbacks/custom events: none exported. DOM/native state and consumer event handlers; no framework controlled/uncontrolled prop runtime.

## Variants, sizes and states

Declared variants: default, danger, wide.

Verified component data-variant selectors: none. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: none established; sizing follows CSS/native dimensions.

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/modal/modal.html |
| focus | CSS selector; may target descendants | components/modal/modal.css |
| open/closed | behavior hook | scripts/sitekit-behavior.js |

## Interaction and accessibility

Shipped: every data-sk-modal-open matching existing dialog ID calls showModal; close/dismiss hooks close; cancel and Escape close; Tab cycles focus; close event restores opener asynchronously (or containing menu trigger when opener is hidden). No custom events. Native dialog APIs remain available.

STRONG: Native dialog.showModal provides top-layer modality and browser focus behavior; enhancement restores the opener and cycles Tab. Check nested dialogs and empty-focus cases separately.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css
.sk-modal { max-inline-size: min(100% - (2 * var(--sk-space-4)), 42rem); border: var(--sk-border-2) solid var(--sk-border-default); border-radius: var(--sk-radius-0); background: var(--sk-surface-raised); color: var(--sk-text-primary); padding: var(--sk-space-6); box-shadow: var(--sk-shadow-none); }
.sk-modal .sk-modal__actions { display: flex; flex-wrap: wrap; gap: var(--sk-space-3); justify-content: flex-start; }
```

## Motion

```css
/* No component animation/transition found. */
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<button class="sk-button" type="button" data-sk-modal-open="demo-modal">Open Review changes</button><dialog class="sk-modal" data-sk-modal id="demo-modal" tabindex="-1" aria-labelledby="demo-modal-title"><h2 id="demo-modal-title">Review changes</h2><div>Semantic HTML, local assets, and reusable styles.</div><form method="dialog" class="sk-modal__actions"><button class="sk-button" type="submit" data-sk-modal-close data-variant="secondary">Close</button><button class="sk-button" type="button">Continue</button></form></dialog>
```

## Composition and dependencies

Nested SiteKit components: ["button"]. External runtime libraries: none.

Related: ["button", "drawer"].

Actual CSS variables: `--sk-border-2`, `--sk-border-default`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-radius-0`, `--sk-shadow-none`, `--sk-space-3`, `--sk-space-4`, `--sk-space-6`, `--sk-surface-inverse`, `--sk-surface-raised`, `--sk-text-primary`.

## Caveats and documentation

- Default/danger/wide variants have no distinct CSS. Native showModal provides modality; backdrop-click closing and close veto are not supplied.

ADEQUATE: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: ["tests/browser/sitekit.spec.mjs"].

Examples containing references: ["examples/component-lab/index.html", "examples/consumer-dashboard/index.html"]. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {}, "matrix": false}
