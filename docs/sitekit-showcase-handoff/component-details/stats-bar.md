# Stats Bar

Category: Data Display. Public: HTML/CSS source contract. Status: `html-css`. Primitive: False.

## Purpose and selection

Present metrics as a definition list with strong numeric typography.

Avoid: Live analytics or verified product statistics.

## Source and consumption

- schema: `components/stats-bar/stats-bar.schema.json`
- template: `components/stats-bar/stats-bar.html`
- css: `components/stats-bar/stats-bar.css`
- documentation: `components/stats-bar/stats-bar.md`
- examples: `components/stats-bar/examples.json`

Load `dist/sitekit.css`; root selector `.sk-stats-bar`. No component JavaScript export.

## Declared API versus binding

| Field | Declared type | Required | Default | Verified binding / uncertainty |
| --- | --- | --- | --- | --- |
| stats | array | True | null | UNKNOWN: no automatic binding established; consumer authors markup. |
| label | string optional | False | null | UNKNOWN: no automatic binding established; consumer authors markup. |

Required fields: ["stats"].

Template placeholders: []. Declared slots: ["stats"].

Allowed children (declared only): ["stats"].

Callbacks/custom events: none exported. DOM/native state and consumer event handlers; no framework controlled/uncontrolled prop runtime.

## Variants, sizes and states

Declared variants: inline, boxed, stacked.

Verified component data-variant selectors: none. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: none established; sizing follows CSS/native dimensions.

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/stats-bar/stats-bar.html |
| focus | CSS selector; may target descendants | components/stats-bar/stats-bar.css |

## Interaction and accessibility

No component-specific shipped JavaScript; links and native descendants retain browser behavior.

ACCEPTABLE: Preserve the template native semantics and visible text. Consumer content and composition need page-level verification.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css
.sk-stats-bar dl { display: grid; gap: var(--sk-space-3); grid-template-columns: repeat(auto-fit, minmax(min(100%, 11rem), 1fr)); margin: 0; }
```

## Motion

```css
.sk-stats-bar dt { color: var(--sk-text-muted); font-family: var(--sk-font-mono); font-size: var(--sk-type-size-xs); text-transform: uppercase; }
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<section class="sk-stats-bar" aria-label="Project stats">
  <dl>
    <div><dt>Open Source Plugins</dt><dd>50+</dd></div>
    <div><dt>Years Experience</dt><dd>20+</dd></div>
    <div><dt>Lighthouse Scores</dt><dd>100%</dd></div>
  </dl>
</section>
```

## Composition and dependencies

Nested SiteKit components: []. External runtime libraries: none.

Related: [].

Actual CSS variables: `--sk-border-1`, `--sk-border-default`, `--sk-border-subtle`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-font-mono`, `--sk-space-3`, `--sk-space-4`, `--sk-surface-card`, `--sk-text-muted`, `--sk-type-line-tight`, `--sk-type-size-3xl`, `--sk-type-size-xs`.

## Caveats and documentation

- Values are sample marketing copy; no inline/boxed/stacked switching.

MINIMAL: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: []. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {}, "matrix": false}
