# File

Category: Forms. Public: HTML/CSS source contract. Status: `html-css`. Primitive: False.

## Purpose and selection

Show a file metadata row and a remove affordance.

Avoid: Uploading, downloading or deleting files automatically.

## Source and consumption

- schema: `components/file/file.schema.json`
- template: `components/file/file.html`
- css: `components/file/file.css`
- documentation: `components/file/file.md`
- examples: `components/file/examples.json`

Load `dist/sitekit.css`; root selector `.sk-file`. No component JavaScript export.

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

Declared variants: row, compact.

Verified component data-variant selectors: none. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: none established; sizing follows CSS/native dimensions.

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/file/file.html |
| focus | CSS selector; may target descendants | components/file/file.css |

## Interaction and accessibility

No component-specific shipped JavaScript; links and native descendants retain browser behavior.

ACCEPTABLE: Preserve the template native semantics and visible text. Consumer content and composition need page-level verification.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css
.sk-file > * { min-inline-size: 0; }
.sk-file { grid-template-columns: auto 1fr auto; align-items: center; }
.sk-file > span { display: inline-grid; place-items: center; inline-size: var(--sk-size-control-lg); block-size: var(--sk-size-control-lg); border: var(--sk-border-1) solid var(--sk-border-default); font-family: var(--sk-font-mono); font-size: var(--sk-type-size-xs); }
```

## Motion

```css
/* No component animation/transition found. */
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<article class="sk-file"><span aria-hidden="true">DOC</span><div><h3>proposal.pdf</h3><p>248 KB · Ready</p></div><button class="sk-button" type="button" data-variant="secondary">Remove</button></article>
```

## Composition and dependencies

Nested SiteKit components: ["button"]. External runtime libraries: none.

Related: [].

Actual CSS variables: `--sk-border-1`, `--sk-border-default`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-font-mono`, `--sk-radius-0`, `--sk-size-control-lg`, `--sk-space-4`, `--sk-space-5`, `--sk-surface-card`, `--sk-text-primary`, `--sk-text-secondary`, `--sk-type-size-xs`.

## Caveats and documentation

- Remove has no dist handler; file size/type/status are literal content.

MINIMAL: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: []. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {}, "matrix": false}
