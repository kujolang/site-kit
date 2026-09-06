# Header

Category: Navigation. Public: HTML/CSS source contract. Status: `html-css`. Primitive: False.

## Purpose and selection

Build a branded wrapping header with primary links and actions.

Avoid: A ready-made mobile hamburger or sticky sidebar shell.

## Source and consumption

- schema: `components/header/header.schema.json`
- template: `components/header/header.html`
- css: `components/header/header.css`
- documentation: `components/header/header.md`
- examples: `components/header/examples.json`

Load `dist/sitekit.css`; root selector `.sk-header`. No component JavaScript export.

## Declared API versus binding

| Field | Declared type | Required | Default | Verified binding / uncertainty |
| --- | --- | --- | --- | --- |
| brand | string | True | null | Template {{brand}} placeholder only; consumer must safely render it. |
| nav | array | False | null | Template {{nav}} placeholder only; consumer must safely render it. |
| actions | array optional | False | null | Template {{actions}} placeholder only; consumer must safely render it. |

Required fields: ["brand"].

Template placeholders: ["actions", "brand", "nav"]. Declared slots: ["brand", "nav", "actions"].

Allowed children (declared only): ["brand", "nav", "actions"].

Callbacks/custom events: none exported. DOM/native state and consumer event handlers; no framework controlled/uncontrolled prop runtime.

## Variants, sizes and states

Declared variants: default, docs, commerce.

Verified component data-variant selectors: none. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: none established; sizing follows CSS/native dimensions.

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/header/header.html |
| hover | CSS selector; may target descendants | components/header/header.css |
| focus | CSS selector; may target descendants | components/header/header.css |
| current | CSS selector; may target descendants | components/header/header.css |

## Interaction and accessibility

No component-specific shipped JavaScript; links and native descendants retain browser behavior.

ACCEPTABLE: Preserve the template native semantics and visible text. Consumer content and composition need page-level verification.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic wrapping only. Inner maximum 78rem and fixed token gutters; no mobile toggle, sticky header or viewport collapse hook.

Observed queries: [].

```css
.sk-header .sk-header__inner { inline-size: min(100% - (2 * var(--sk-space-5)), var(--sk-size-content-lg)); margin-inline: auto; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--sk-space-4); padding: var(--sk-space-4); border: var(--sk-border-1) solid var(--sk-border-default); background: var(--sk-surface-raised); }
.sk-header nav { display: flex; flex-wrap: wrap; gap: var(--sk-space-4); }
.sk-header__actions, .sk-header .sk-header__inner > div { display: flex; flex-wrap: wrap; gap: var(--sk-space-3); align-items: center; }
```

## Motion

```css
.sk-header a { color: var(--sk-text-primary); font-family: var(--sk-font-mono); font-size: var(--sk-type-size-xs); line-height: var(--sk-type-line-tight); text-decoration: none; text-transform: uppercase; }
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<header class="sk-header"><div class="sk-header__inner"><a href="/" aria-label="SiteKit home">SiteKit</a><nav aria-label="Primary"><a href="#main">Overview</a></nav><div class="sk-header__actions"><button class="sk-button" type="button">Continue</button></div></div></header>
```

## Composition and dependencies

Nested SiteKit components: []. External runtime libraries: none.

Related: [].

Actual CSS variables: `--sk-action-primary-text`, `--sk-action-secondary-text`, `--sk-border-1`, `--sk-border-default`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-font-mono`, `--sk-size-content-lg`, `--sk-space-3`, `--sk-space-4`, `--sk-space-5`, `--sk-surface-page`, `--sk-surface-raised`, `--sk-text-primary`, `--sk-type-line-tight`, `--sk-type-size-xs`, `--sk-type-weight-bold`.

## Caveats and documentation

- Header wraps; docs/commerce/default are not switches. Descendant Button variant rules belong to Button.

MINIMAL: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: ["examples/component-lab/index.html", "examples/consumer-dashboard/index.html"]. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {}, "matrix": false}
