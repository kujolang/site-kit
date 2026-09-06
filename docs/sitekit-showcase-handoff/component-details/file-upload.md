# File Upload

Category: Forms. Public: HTML/CSS source contract. Status: `native`. Primitive: False.

## Purpose and selection

Expose a native file chooser in a dashed frame.

Avoid: A built-in upload client, dropzone or validation pipeline.

## Source and consumption

- schema: `components/file-upload/file-upload.schema.json`
- template: `components/file-upload/file-upload.html`
- css: `components/file-upload/file-upload.css`
- documentation: `components/file-upload/file-upload.md`
- examples: `components/file-upload/examples.json`

Load `dist/sitekit.css`; root selector `.sk-file-upload`. No component JavaScript export.

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

Declared variants: dropzone, compact.

Verified component data-variant selectors: none. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: none established; sizing follows CSS/native dimensions.

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/file-upload/file-upload.html |
| hover | CSS selector; may target descendants | components/file-upload/file-upload.css |
| focus | CSS selector; may target descendants | components/file-upload/file-upload.css |

## Interaction and accessibility

Browser-native control/navigation behavior for the source elements; no SiteKit-specific callback or controller. Drag-files copy exceeds implementation: no drop listeners, transfer, progress or accept/multiple configuration in schema.

ACCEPTABLE: Preserve the template native semantics and visible text. Consumer content and composition need page-level verification.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css
.sk-file-upload input[type="file"] { max-inline-size: 100%; justify-self: center; border: var(--sk-border-1) solid var(--sk-border-default); border-radius: var(--sk-radius-0); background: var(--sk-surface-card); color: var(--sk-text-primary); padding: var(--sk-space-3); font: inherit; }
```

## Motion

```css
.sk-file-upload label, .sk-file-upload legend, .sk-file-upload__label { color: var(--sk-text-muted); font-family: var(--sk-font-mono); font-size: var(--sk-type-size-xs); line-height: var(--sk-type-line-tight); text-transform: uppercase; }
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<div class="sk-file-upload"><label for="file-upload-control">Upload files</label><input id="file-upload-control" type="file"><p>Drag files here or choose a file.</p></div>
```

## Composition and dependencies

Nested SiteKit components: []. External runtime libraries: none.

Related: [].

Actual CSS variables: `--sk-action-primary`, `--sk-action-primary-text`, `--sk-action-secondary`, `--sk-action-secondary-text`, `--sk-border-1`, `--sk-border-default`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-font-mono`, `--sk-radius-0`, `--sk-space-2`, `--sk-space-3`, `--sk-space-4`, `--sk-space-8`, `--sk-surface-card`, `--sk-text-muted`, `--sk-text-primary`, `--sk-text-secondary`, `--sk-type-line-tight`, `--sk-type-size-xs`.

## Caveats and documentation

- Drag-files copy exceeds implementation: no drop listeners, transfer, progress or accept/multiple configuration in schema.

CONTRADICTS IMPLEMENTATION: Drag-files copy exceeds implementation: no drop listeners, transfer, progress or accept/multiple configuration in schema.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: []. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {}, "matrix": false}
