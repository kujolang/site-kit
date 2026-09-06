# Testimonial Rail

Category: Content. Public: HTML/CSS source contract. Status: `html-css`. Primitive: False.

## Purpose and selection

Present quote figures with attributions in a grid.

Avoid: An animated testimonial carousel.

## Source and consumption

- schema: `components/testimonial-rail/testimonial-rail.schema.json`
- template: `components/testimonial-rail/testimonial-rail.html`
- css: `components/testimonial-rail/testimonial-rail.css`
- documentation: `components/testimonial-rail/testimonial-rail.md`
- examples: `components/testimonial-rail/examples.json`

Load `dist/sitekit.css`; root selector `.sk-testimonial-rail`. No component JavaScript export.

## Declared API versus binding

| Field | Declared type | Required | Default | Verified binding / uncertainty |
| --- | --- | --- | --- | --- |
| heading | string optional | False | null | UNKNOWN: no automatic binding established; consumer authors markup. |
| quotes | array | True | null | UNKNOWN: no automatic binding established; consumer authors markup. |

Required fields: ["quotes"].

Template placeholders: []. Declared slots: ["heading", "quotes"].

Allowed children (declared only): ["heading", "quotes"].

Callbacks/custom events: none exported. DOM/native state and consumer event handlers; no framework controlled/uncontrolled prop runtime.

## Variants, sizes and states

Declared variants: rail, grid, featured.

Verified component data-variant selectors: none. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: none established; sizing follows CSS/native dimensions.

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/testimonial-rail/testimonial-rail.html |
| focus | CSS selector; may target descendants | components/testimonial-rail/testimonial-rail.css |

## Interaction and accessibility

No component-specific shipped JavaScript; links and native descendants retain browser behavior.

ACCEPTABLE: Preserve the template native semantics and visible text. Consumer content and composition need page-level verification.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css
.sk-testimonial-rail > div { display: grid; gap: var(--sk-space-4); grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr)); }
```

## Motion

```css
/* No component animation/transition found. */
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<section class="sk-testimonial-rail" aria-labelledby="testimonial-title">
  <h2 id="testimonial-title">What builders say</h2>
  <div>
    <figure><blockquote>SiteKit gave our launch pages a consistent system without slowing the team down.</blockquote><figcaption>Alex, product lead</figcaption></figure>
    <figure><blockquote>The components are plain enough to trust and structured enough to scale.</blockquote><figcaption>Morgan, engineer</figcaption></figure>
  </div>
</section>
```

## Composition and dependencies

Nested SiteKit components: []. External runtime libraries: none.

Related: [].

Actual CSS variables: `--sk-border-1`, `--sk-border-default`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-font-mono`, `--sk-space-4`, `--sk-space-5`, `--sk-surface-card`, `--sk-text-muted`, `--sk-text-primary`, `--sk-type-size-sm`.

## Caveats and documentation

- Despite rail name, implementation is an intrinsic grid with no scrolling/rail controller.

MINIMAL: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: []. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {}, "matrix": false}
