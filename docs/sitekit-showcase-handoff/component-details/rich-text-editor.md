# Rich Text Editor

Category: Forms. Public: HTML/CSS source contract. Status: `html-css`. Primitive: False.

## Purpose and selection

Show a contenteditable text area with toolbar affordances.

Avoid: A secure full editor or working formatting controls.

## Source and consumption

- schema: `components/rich-text-editor/rich-text-editor.schema.json`
- template: `components/rich-text-editor/rich-text-editor.html`
- css: `components/rich-text-editor/rich-text-editor.css`
- documentation: `components/rich-text-editor/rich-text-editor.md`
- examples: `components/rich-text-editor/examples.json`

Load `dist/sitekit.css`; root selector `.sk-rich-text-editor`. No component JavaScript export.

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

Declared variants: basic, compact.

Verified component data-variant selectors: none. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: none established; sizing follows CSS/native dimensions.

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/rich-text-editor/rich-text-editor.html |
| focus | CSS selector; may target descendants | components/rich-text-editor/rich-text-editor.css |

## Interaction and accessibility

No component-specific shipped JavaScript; links and native descendants retain browser behavior.

NEEDS IMPROVEMENT: No toolbar handlers, serialization or sanitization. Textbox lacks an accessible name; section label does not label the textbox. OBSERVED: axe aria-input-field-name on contenteditable textbox in both Kujo themes.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css
.sk-rich-text-editor > * { min-inline-size: 0; }
```

## Motion

```css
/* No component animation/transition found. */
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<section class="sk-rich-text-editor" aria-labelledby="rte-title"><h2 id="rte-title">Editor</h2><div role="toolbar" aria-label="Formatting"><button type="button">B</button><button type="button">I</button><button type="button">Link</button></div><div contenteditable="true" role="textbox" aria-multiline="true">Write content here.</div></section>
```

## Composition and dependencies

Nested SiteKit components: []. External runtime libraries: none.

Related: [].

Actual CSS variables: `--sk-border-1`, `--sk-border-default`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-radius-0`, `--sk-space-2`, `--sk-space-3`, `--sk-space-4`, `--sk-space-5`, `--sk-surface-card`, `--sk-surface-raised`, `--sk-text-primary`, `--sk-text-secondary`.

## Caveats and documentation

- No toolbar handlers, serialization or sanitization. Textbox lacks an accessible name; section label does not label the textbox.
- OBSERVED: axe aria-input-field-name on contenteditable textbox in both Kujo themes.

MINIMAL: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: []. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {}, "matrix": false}
