# Team Grid

Category: Content. Public: HTML/CSS source contract. Status: `html-css`. Primitive: False.

## Purpose and selection

Arrange profile summaries in an intrinsic grid.

Avoid: A directory service or avatar loader.

## Source and consumption

- schema: `components/team-grid/team-grid.schema.json`
- template: `components/team-grid/team-grid.html`
- css: `components/team-grid/team-grid.css`
- documentation: `components/team-grid/team-grid.md`
- examples: `components/team-grid/examples.json`

Load `dist/sitekit.css`; root selector `.sk-team-grid`. No component JavaScript export.

## Declared API versus binding

| Field | Declared type | Required | Default | Verified binding / uncertainty |
| --- | --- | --- | --- | --- |
| heading | string optional | False | null | UNKNOWN: no automatic binding established; consumer authors markup. |
| people | array | True | null | UNKNOWN: no automatic binding established; consumer authors markup. |

Required fields: ["people"].

Template placeholders: []. Declared slots: ["heading", "people"].

Allowed children (declared only): ["heading", "people"].

Callbacks/custom events: none exported. DOM/native state and consumer event handlers; no framework controlled/uncontrolled prop runtime.

## Variants, sizes and states

Declared variants: profiles, compact, leadership.

Verified component data-variant selectors: none. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: none established; sizing follows CSS/native dimensions.

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/team-grid/team-grid.html |
| focus | CSS selector; may target descendants | components/team-grid/team-grid.css |

## Interaction and accessibility

No component-specific shipped JavaScript; links and native descendants retain browser behavior.

ACCEPTABLE: Preserve the template native semantics and visible text. Consumer content and composition need page-level verification.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css
.sk-team-grid ul { display: grid; gap: var(--sk-space-4); grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr)); margin: 0; padding: 0; list-style: none; }
.sk-team-grid span { inline-size: var(--sk-size-control-lg); block-size: var(--sk-size-control-lg); display: grid; place-items: center; border: var(--sk-border-1) solid var(--sk-border-default); margin-block-end: var(--sk-space-4); font-family: var(--sk-font-mono); }
```

## Motion

```css
/* No component animation/transition found. */
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<section class="sk-team-grid" aria-labelledby="team-title">
  <h2 id="team-title">Meet the team</h2>
  <ul>
    <li><span aria-hidden="true">AM</span><h3>Alexandra Morgan</h3><p>Product strategy</p></li>
    <li><span aria-hidden="true">MP</span><h3>Michael Patel</h3><p>Engineering systems</p></li>
    <li><span aria-hidden="true">JR</span><h3>Jamie Rivera</h3><p>Design operations</p></li>
  </ul>
</section>
```

## Composition and dependencies

Nested SiteKit components: []. External runtime libraries: none.

Related: [].

Actual CSS variables: `--sk-border-1`, `--sk-border-default`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-font-mono`, `--sk-size-control-lg`, `--sk-space-4`, `--sk-space-5`, `--sk-surface-card`, `--sk-text-secondary`.

## Caveats and documentation

- Initials are decorative spans; names carry identity. profiles/compact/leadership lack selectors.

MINIMAL: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: []. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {}, "matrix": false}
