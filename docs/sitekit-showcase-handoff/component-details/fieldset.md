# Fieldset

Category: Forms. Public: HTML/CSS source contract. Status: `native`. Primitive: False.

## Purpose and selection

Group native related form controls with a legend.

Avoid: A generic visual card without grouped form meaning.

## Source and consumption

- schema: `components/fieldset/fieldset.schema.json`
- template: `components/fieldset/fieldset.html`
- css: `components/fieldset/fieldset.css`
- documentation: `components/fieldset/fieldset.md`
- examples: `components/fieldset/examples.json`

Load `dist/sitekit.css`; root selector `.sk-fieldset`. No component JavaScript export.

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
| default | source template | components/fieldset/fieldset.html |
| focus | CSS selector; may target descendants | components/fieldset/fieldset.css |
| checked | CSS selector; may target descendants | components/fieldset/fieldset.css |

## Interaction and accessibility

Browser-native control/navigation behavior for the source elements; no SiteKit-specific callback or controller. Template includes radios. Styled radio/checkbox descendants are native controls; legend and shared name matter.

ACCEPTABLE: Preserve the template native semantics and visible text. Consumer content and composition need page-level verification.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css
.sk-fieldset input[type="radio"], .sk-fieldset input[type="checkbox"] { appearance: none; display: inline-grid; place-items: center; inline-size: var(--sk-size-control-sm); block-size: var(--sk-size-control-sm); padding: 0; flex: 0 0 auto; }
.sk-fieldset input[type="radio"]::before, .sk-fieldset input[type="checkbox"]::before { content: ""; inline-size: var(--sk-space-3); block-size: var(--sk-space-3); background: transparent; }
```

## Motion

```css
.sk-fieldset label, .sk-fieldset legend, .sk-fieldset__label { color: var(--sk-text-muted); font-family: var(--sk-font-mono); font-size: var(--sk-type-size-xs); line-height: var(--sk-type-line-tight); text-transform: uppercase; }
.sk-fieldset label { display: flex; align-items: center; gap: var(--sk-space-3); color: var(--sk-text-primary); font-family: inherit; font-size: inherit; text-transform: none; cursor: pointer; }
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<fieldset class="sk-fieldset"><legend>Contact preference</legend><label><input type="radio" name="contact" checked> Email</label><label><input type="radio" name="contact"> Phone</label></fieldset>
```

## Composition and dependencies

Nested SiteKit components: []. External runtime libraries: none.

Related: [].

Actual CSS variables: `--sk-action-primary`, `--sk-border-1`, `--sk-border-default`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-font-mono`, `--sk-radius-0`, `--sk-size-control-sm`, `--sk-space-3`, `--sk-space-4`, `--sk-surface-card`, `--sk-text-muted`, `--sk-text-primary`, `--sk-type-line-tight`, `--sk-type-size-xs`.

## Caveats and documentation

- Template includes radios. Styled radio/checkbox descendants are native controls; legend and shared name matter.

MINIMAL: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: []. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {}, "matrix": false}
