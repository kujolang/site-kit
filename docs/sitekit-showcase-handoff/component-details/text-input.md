# Text Input

Category: Forms. Public: HTML/CSS source contract. Status: `native`. Primitive: True.

## Purpose and selection

Capture short text with an explicit label.

Avoid: An autocomplete, validator or form-state manager.

## Source and consumption

- schema: `components/text-input/text-input.schema.json`
- template: `components/text-input/text-input.html`
- css: `components/text-input/text-input.css`
- documentation: `components/text-input/text-input.md`
- examples: `components/text-input/examples.json`

Load `dist/sitekit.css`; root selector `.sk-text-input`. No component JavaScript export.

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
| default | source template | components/text-input/text-input.html |
| focus | CSS selector; may target descendants | components/text-input/text-input.css |

## Interaction and accessibility

Browser-native control/navigation behavior for the source elements; no SiteKit-specific callback or controller. Native value/required/readonly/disabled can be authored but are absent from component schema.

ACCEPTABLE: Preserve the template native semantics and visible text. Consumer content and composition need page-level verification.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css
.sk-text-input input, .sk-text-input select, .sk-text-input textarea { inline-size: 100%; border: var(--sk-border-1) solid var(--sk-border-default); border-radius: var(--sk-radius-0); background: var(--sk-surface-card); color: var(--sk-text-primary); padding: var(--sk-space-3); font: inherit; }
```

## Motion

```css
.sk-text-input label, .sk-text-input legend, .sk-text-input__label { color: var(--sk-text-muted); font-family: var(--sk-font-mono); font-size: var(--sk-type-size-xs); line-height: var(--sk-type-line-tight); text-transform: uppercase; }
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<div class="sk-text-input"><label for="text-input-control">Project</label><input id="text-input-control" type="text" value="SiteKit"></div>
```

## Composition and dependencies

Nested SiteKit components: []. External runtime libraries: none.

Related: [].

Actual CSS variables: `--sk-border-1`, `--sk-border-default`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-font-mono`, `--sk-radius-0`, `--sk-space-2`, `--sk-space-3`, `--sk-surface-card`, `--sk-text-muted`, `--sk-text-primary`, `--sk-type-line-tight`, `--sk-type-size-xs`.

## Caveats and documentation

- Native value/required/readonly/disabled can be authored but are absent from component schema.

MINIMAL: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: ["examples/consumer-dashboard/index.html"]. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {"value": {"type": "native-value", "property": "value", "confidence": "PROPOSED browser-property adapter; not schema API"}}, "matrix": false}
