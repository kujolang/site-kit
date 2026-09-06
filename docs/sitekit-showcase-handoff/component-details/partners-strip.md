# Partners Strip

Category: Content. Public: HTML/CSS source contract. Status: `html-css`. Primitive: False.

## Purpose and selection

Lay out partner names or consumer-provided logos in an intrinsic grid.

Avoid: Evidence of actual endorsements or a bundled logo collection.

## Source and consumption

- schema: `components/partners-strip/partners-strip.schema.json`
- template: `components/partners-strip/partners-strip.html`
- css: `components/partners-strip/partners-strip.css`
- documentation: `components/partners-strip/partners-strip.md`
- examples: `components/partners-strip/examples.json`

Load `dist/sitekit.css`; root selector `.sk-partners-strip`. No component JavaScript export.

## Declared API versus binding

| Field | Declared type | Required | Default | Verified binding / uncertainty |
| --- | --- | --- | --- | --- |
| heading | string optional | False | null | UNKNOWN: no automatic binding established; consumer authors markup. |
| partners | array | True | null | UNKNOWN: no automatic binding established; consumer authors markup. |

Required fields: ["partners"].

Template placeholders: []. Declared slots: ["heading", "partners"].

Allowed children (declared only): ["heading", "partners"].

Callbacks/custom events: none exported. DOM/native state and consumer event handlers; no framework controlled/uncontrolled prop runtime.

## Variants, sizes and states

Declared variants: logos, boxed, compact.

Verified component data-variant selectors: none. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: none established; sizing follows CSS/native dimensions.

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/partners-strip/partners-strip.html |
| focus | CSS selector; may target descendants | components/partners-strip/partners-strip.css |

## Interaction and accessibility

No component-specific shipped JavaScript; links and native descendants retain browser behavior.

ACCEPTABLE: Preserve the template native semantics and visible text. Consumer content and composition need page-level verification.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css
.sk-partners-strip ul { display: grid; gap: var(--sk-space-3); grid-template-columns: repeat(auto-fit, minmax(min(100%, 9rem), 1fr)); margin: 0; padding: 0; list-style: none; }
```

## Motion

```css
.sk-partners-strip li { border: var(--sk-border-1) solid var(--sk-border-default); background: var(--sk-surface-card); padding: var(--sk-space-4); font-family: var(--sk-font-mono); text-align: center; text-transform: uppercase; }
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<section class="sk-partners-strip" aria-labelledby="partners-title">
  <h2 id="partners-title">Trusted by leading teams</h2>
  <ul>
    <li>Northstar</li>
    <li>Atlas</li>
    <li>Signal</li>
    <li>Foundry</li>
  </ul>
</section>
```

## Composition and dependencies

Nested SiteKit components: []. External runtime libraries: none.

Related: [].

Actual CSS variables: `--sk-border-1`, `--sk-border-default`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-font-mono`, `--sk-space-3`, `--sk-space-4`, `--sk-space-5`, `--sk-surface-card`, `--sk-type-size-lg`.

## Caveats and documentation

- Template names are placeholders; logos/boxed/compact are unimplemented switches.

MINIMAL: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: []. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {}, "matrix": false}
