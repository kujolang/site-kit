# Resource Links

Category: Content. Public: HTML/CSS source contract. Status: `html-css`. Primitive: False.

## Purpose and selection

Group descriptive resource links in an intrinsic grid.

Avoid: An automatic link crawler or search index.

## Source and consumption

- schema: `components/resource-links/resource-links.schema.json`
- template: `components/resource-links/resource-links.html`
- css: `components/resource-links/resource-links.css`
- documentation: `components/resource-links/resource-links.md`
- examples: `components/resource-links/examples.json`

Load `dist/sitekit.css`; root selector `.sk-resource-links`. No component JavaScript export.

## Declared API versus binding

| Field | Declared type | Required | Default | Verified binding / uncertainty |
| --- | --- | --- | --- | --- |
| heading | string | False | null | UNKNOWN: no automatic binding established; consumer authors markup. |
| links | array | True | null | UNKNOWN: no automatic binding established; consumer authors markup. |

Required fields: ["links"].

Template placeholders: []. Declared slots: ["heading", "links"].

Allowed children (declared only): ["heading", "links"].

Callbacks/custom events: none exported. DOM/native state and consumer event handlers; no framework controlled/uncontrolled prop runtime.

## Variants, sizes and states

Declared variants: grid, stack, annotated.

Verified component data-variant selectors: none. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: none established; sizing follows CSS/native dimensions.

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/resource-links/resource-links.html |
| focus | CSS selector; may target descendants | components/resource-links/resource-links.css |

## Interaction and accessibility

No component-specific shipped JavaScript; links and native descendants retain browser behavior.

ACCEPTABLE: Preserve the template native semantics and visible text. Consumer content and composition need page-level verification.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css
.sk-resource-links ul { display: grid; gap: var(--sk-space-3); grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr)); margin: 0; padding: 0; list-style: none; }
```

## Motion

```css
/* No component animation/transition found. */
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<section class="sk-resource-links" aria-labelledby="resources-title">
  <h2 id="resources-title">Resource links</h2>
  <ul>
    <li><a href="#resources-title">Starter docs</a><p>Implementation notes and source contracts.</p></li>
    <li><a href="#resources-title">Component recipes</a><p>Composable page patterns.</p></li>
    <li><a href="#resources-title">Validation guide</a><p>Build, lint, and snapshot checks.</p></li>
  </ul>
</section>
```

## Composition and dependencies

Nested SiteKit components: []. External runtime libraries: none.

Related: [].

Actual CSS variables: `--sk-border-1`, `--sk-border-default`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-font-mono`, `--sk-space-3`, `--sk-space-4`, `--sk-surface-card`, `--sk-text-primary`, `--sk-text-secondary`.

## Caveats and documentation

- Static links need real destinations; grid/stack/annotated have no variant selectors.

MINIMAL: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: []. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {}, "matrix": false}
