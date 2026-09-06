# Roadmap

Category: Data Display. Public: HTML/CSS source contract. Status: `html-css`. Primitive: False.

## Purpose and selection

Display an ordered milestone timeline with dates.

Avoid: A scheduling engine or current release plan.

## Source and consumption

- schema: `components/roadmap/roadmap.schema.json`
- template: `components/roadmap/roadmap.html`
- css: `components/roadmap/roadmap.css`
- documentation: `components/roadmap/roadmap.md`
- examples: `components/roadmap/examples.json`

Load `dist/sitekit.css`; root selector `.sk-roadmap`. No component JavaScript export.

## Declared API versus binding

| Field | Declared type | Required | Default | Verified binding / uncertainty |
| --- | --- | --- | --- | --- |
| heading | string | False | null | UNKNOWN: no automatic binding established; consumer authors markup. |
| milestones | array | True | null | UNKNOWN: no automatic binding established; consumer authors markup. |

Required fields: ["milestones"].

Template placeholders: []. Declared slots: ["heading", "milestones"].

Allowed children (declared only): ["heading", "milestones"].

Callbacks/custom events: none exported. DOM/native state and consumer event handlers; no framework controlled/uncontrolled prop runtime.

## Variants, sizes and states

Declared variants: timeline, compact, release-plan.

Verified component data-variant selectors: none. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: none established; sizing follows CSS/native dimensions.

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/roadmap/roadmap.html |
| focus | CSS selector; may target descendants | components/roadmap/roadmap.css |

## Interaction and accessibility

No component-specific shipped JavaScript; links and native descendants retain browser behavior.

ACCEPTABLE: Preserve the template native semantics and visible text. Consumer content and composition need page-level verification.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css

```

## Motion

```css
.sk-roadmap time { color: var(--sk-text-muted); font-size: var(--sk-type-size-xs); text-transform: uppercase; }
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<section class="sk-roadmap" aria-labelledby="roadmap-title">
  <h2 id="roadmap-title">Product roadmap</h2>
  <ol>
    <li><time datetime="2026-07">Jul 2026</time><h3>Component import</h3><p>Legacy marketing patterns become token-driven SiteKit components.</p></li>
    <li><time datetime="2026-08">Aug 2026</time><h3>Recipe refresh</h3><p>Recipes consume the expanded component set.</p></li>
    <li><time datetime="2026-09">Sep 2026</time><h3>Snapshot review</h3><p>Visual baselines cover the full catalog.</p></li>
  </ol>
</section>
```

## Composition and dependencies

Nested SiteKit components: []. External runtime libraries: none.

Related: [].

Actual CSS variables: `--sk-border-1`, `--sk-border-default`, `--sk-border-heavy`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-font-mono`, `--sk-space-4`, `--sk-space-5`, `--sk-surface-card`, `--sk-text-muted`, `--sk-text-secondary`, `--sk-type-size-xs`.

## Caveats and documentation

- Fixture dates describe sample content. CSS timeline is static; compact/release-plan have no switches.

MINIMAL: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: []. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {}, "matrix": false}
