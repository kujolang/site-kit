# Toggle

Category: Forms. Public: HTML/CSS source contract. Status: `native`. Primitive: True.

## Purpose and selection

Capture a native boolean with a square moving indicator.

Avoid: An automatically persisted setting or role=switch controller.

## Source and consumption

- schema: `components/toggle/toggle.schema.json`
- template: `components/toggle/toggle.html`
- css: `components/toggle/toggle.css`
- documentation: `components/toggle/toggle.md`
- examples: `components/toggle/examples.json`

Load `dist/sitekit.css`; root selector `.sk-toggle`. No component JavaScript export.

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
| default | source template | components/toggle/toggle.html |
| focus | CSS selector; may target descendants | components/toggle/toggle.css |
| checked | CSS selector; may target descendants | components/toggle/toggle.css |

## Interaction and accessibility

Browser-native control/navigation behavior for the source elements; no SiteKit-specific callback or controller. Uses checkbox semantics, not switch role. Thumb transform is physical translateX and may need RTL review.

ACCEPTABLE: Preserve the template native semantics and visible text. Consumer content and composition need page-level verification.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css
.sk-toggle input { appearance: none; position: relative; inline-size: calc(var(--sk-size-control-lg) + var(--sk-space-2)); block-size: var(--sk-size-control-md); border: var(--sk-border-1) solid var(--sk-border-default); border-radius: var(--sk-radius-0); background: var(--sk-surface-card); cursor: pointer; }
.sk-toggle input::before { content: ""; position: absolute; inset-block-start: var(--sk-space-1); inset-inline-start: var(--sk-space-1); inline-size: calc(var(--sk-size-control-md) - (2 * var(--sk-space-1)) - (2 * var(--sk-border-1))); block-size: calc(var(--sk-size-control-md) - (2 * var(--sk-space-1)) - (2 * var(--sk-border-1))); background: var(--sk-border-default); transition: transform var(--sk-motion-base) var(--sk-motion-ease); }
```

## Motion

```css
.sk-toggle input::before { content: ""; position: absolute; inset-block-start: var(--sk-space-1); inset-inline-start: var(--sk-space-1); inline-size: calc(var(--sk-size-control-md) - (2 * var(--sk-space-1)) - (2 * var(--sk-border-1))); block-size: calc(var(--sk-size-control-md) - (2 * var(--sk-space-1)) - (2 * var(--sk-border-1))); background: var(--sk-border-default); transition: transform var(--sk-motion-base) var(--sk-motion-ease); }
.sk-toggle input:checked::before { background: var(--sk-action-primary-text); transform: translateX(var(--sk-size-control-md)); }
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<label class="sk-toggle"><input type="checkbox" checked><span>Enable notifications</span></label>
```

## Composition and dependencies

Nested SiteKit components: []. External runtime libraries: none.

Related: [].

Actual CSS variables: `--sk-action-primary`, `--sk-action-primary-text`, `--sk-border-1`, `--sk-border-default`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-motion-base`, `--sk-motion-ease`, `--sk-radius-0`, `--sk-size-control-lg`, `--sk-size-control-md`, `--sk-space-1`, `--sk-space-2`, `--sk-space-3`, `--sk-surface-card`, `--sk-text-primary`.

## Caveats and documentation

- Uses checkbox semantics, not switch role. Thumb transform is physical translateX and may need RTL review.

MINIMAL: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: []. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {"checked": {"type": "boolean", "property": "checked", "target": "native input", "confidence": "PROPOSED browser-property adapter"}}, "matrix": true}
