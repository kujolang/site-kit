# Metadata Panel

Category: Data Display. Public: HTML/CSS source contract. Status: `html-css`. Primitive: False.

## Purpose and selection

Present labeled key/value rows in a definition list.

Avoid: A JSON parser or automatically generated inspector.

## Source and consumption

- schema: `components/metadata-panel/metadata-panel.schema.json`
- template: `components/metadata-panel/metadata-panel.html`
- css: `components/metadata-panel/metadata-panel.css`
- documentation: `components/metadata-panel/metadata-panel.md`
- examples: `components/metadata-panel/examples.json`

Load `dist/sitekit.css`; root selector `.sk-metadata-panel`. No component JavaScript export.

## Declared API versus binding

| Field | Declared type | Required | Default | Verified binding / uncertainty |
| --- | --- | --- | --- | --- |
| label | string optional | False | null | Template {{label}} placeholder only; consumer must safely render it. |
| rows | array | True | null | Template {{rows}} placeholder only; consumer must safely render it. |

Required fields: ["rows"].

Template placeholders: ["label", "rows"]. Declared slots: ["rows"].

Allowed children (declared only): ["rows"].

Callbacks/custom events: none exported. DOM/native state and consumer event handlers; no framework controlled/uncontrolled prop runtime.

## Variants, sizes and states

Declared variants: default, compact, sidecar.

Verified component data-variant selectors: none. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: none established; sizing follows CSS/native dimensions.

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/metadata-panel/metadata-panel.html |
| focus | CSS selector; may target descendants | components/metadata-panel/metadata-panel.css |

## Interaction and accessibility

No component-specific shipped JavaScript; links and native descendants retain browser behavior.

ACCEPTABLE: Preserve the template native semantics and visible text. Consumer content and composition need page-level verification.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css
.sk-metadata-panel { border: var(--sk-border-1) solid var(--sk-border-default); background: var(--sk-surface-card); color: var(--sk-text-primary); padding: var(--sk-space-4); container-type: inline-size; }
```

## Motion

```css
.sk-metadata-panel dt { color: var(--sk-text-muted); font-family: var(--sk-font-mono); font-size: var(--sk-type-size-xs); line-height: var(--sk-type-line-tight); text-transform: uppercase; }
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<aside class="sk-metadata-panel" aria-label="Present labeled key/value rows in a definition list."><dl><div><dt>Version</dt><dd>1.0.0</dd></div></dl></aside>
```

## Composition and dependencies

Nested SiteKit components: []. External runtime libraries: none.

Related: [].

Actual CSS variables: `--sk-border-1`, `--sk-border-default`, `--sk-border-subtle`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-font-mono`, `--sk-space-3`, `--sk-space-4`, `--sk-surface-card`, `--sk-text-muted`, `--sk-text-primary`, `--sk-type-line-tight`, `--sk-type-size-sm`, `--sk-type-size-xs`, `--sk-type-weight-bold`.

## Caveats and documentation

- Rows/label placeholders are manually rendered; values align to the end and may need long-content tests.

MINIMAL: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: []. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {}, "matrix": false}
