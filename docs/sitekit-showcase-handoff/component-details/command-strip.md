# Command Strip

Category: Data Display. Public: HTML/CSS source contract. Status: `html-css`. Primitive: False.

## Purpose and selection

Display compact single-line metadata cells in a responsive strip.

Avoid: A command palette or keyboard launcher.

## Source and consumption

- schema: `components/command-strip/command-strip.schema.json`
- template: `components/command-strip/command-strip.html`
- css: `components/command-strip/command-strip.css`
- documentation: `components/command-strip/command-strip.md`
- examples: `components/command-strip/examples.json`

Load `dist/sitekit.css`; root selector `.sk-command-strip`. No component JavaScript export.

## Declared API versus binding

| Field | Declared type | Required | Default | Verified binding / uncertainty |
| --- | --- | --- | --- | --- |
| items | array | True | null | Template {{items}} placeholder only; consumer must safely render it. |
| label | string optional | False | null | Template {{label}} placeholder only; consumer must safely render it. |

Required fields: ["items"].

Template placeholders: ["items", "label"]. Declared slots: ["items"].

Allowed children (declared only): ["items"].

Callbacks/custom events: none exported. DOM/native state and consumer event handlers; no framework controlled/uncontrolled prop runtime.

## Variants, sizes and states

Declared variants: default, compact, four-up.

Verified component data-variant selectors: none. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: none established; sizing follows CSS/native dimensions.

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/command-strip/command-strip.html |
| focus | CSS selector; may target descendants | components/command-strip/command-strip.css |

## Interaction and accessibility

No component-specific shipped JavaScript; links and native descendants retain browser behavior.

ACCEPTABLE: Preserve the template native semantics and visible text. Consumer content and composition need page-level verification.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css
.sk-command-strip { display: grid; gap: var(--sk-border-1); grid-template-columns: repeat(auto-fit, minmax(min(100%, 11rem), 1fr)); border: var(--sk-border-1) solid var(--sk-border-default); background: var(--sk-border-default); color: var(--sk-text-primary); font-family: var(--sk-font-mono); font-size: var(--sk-type-size-xs); line-height: var(--sk-type-line-tight); text-transform: uppercase; overflow: hidden; }
.sk-command-strip > * { min-inline-size: 0; padding: var(--sk-space-3) var(--sk-space-4); background: var(--sk-surface-card); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
```

## Motion

```css
.sk-command-strip { display: grid; gap: var(--sk-border-1); grid-template-columns: repeat(auto-fit, minmax(min(100%, 11rem), 1fr)); border: var(--sk-border-1) solid var(--sk-border-default); background: var(--sk-border-default); color: var(--sk-text-primary); font-family: var(--sk-font-mono); font-size: var(--sk-type-size-xs); line-height: var(--sk-type-line-tight); text-transform: uppercase; overflow: hidden; }
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<section class="sk-command-strip" aria-label="Display compact single-line metadata cells in a responsive strip."><span>Version 1.0.0</span><span>Source-vendored</span></section>
```

## Composition and dependencies

Nested SiteKit components: []. External runtime libraries: none.

Related: [].

Actual CSS variables: `--sk-border-1`, `--sk-border-default`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-font-mono`, `--sk-space-3`, `--sk-space-4`, `--sk-surface-card`, `--sk-text-primary`, `--sk-type-line-tight`, `--sk-type-size-xs`.

## Caveats and documentation

- Cells truncate with ellipsis; items/label are placeholders. No command execution or four-up variant implementation.

MINIMAL: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: []. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {}, "matrix": false}
