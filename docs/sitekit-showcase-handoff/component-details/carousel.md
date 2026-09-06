# Carousel

Category: Data Display. Public: HTML/CSS source contract. Status: `example-only-js`. Primitive: False.

## Purpose and selection

Present a horizontally scrollable, snapping series of cards.

Avoid: An autoplay slider or a complete accessible carousel controller.

## Source and consumption

- schema: `components/carousel/carousel.schema.json`
- template: `components/carousel/carousel.html`
- css: `components/carousel/carousel.css`
- documentation: `components/carousel/carousel.md`
- examples: `components/carousel/examples.json`

Load `dist/sitekit.css`; root selector `.sk-carousel`. No component JavaScript export.

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

Declared variants: cards, compact.

Verified component data-variant selectors: none. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: none established; sizing follows CSS/native dimensions.

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/carousel/carousel.html |
| focus | CSS selector; may target descendants | components/carousel/carousel.css |

## Interaction and accessibility

Prev/Next work only in lab click code; dist has no handler. Native scroll works. Track hides scrollbar.

ACCEPTABLE: Preserve the template native semantics and visible text. Consumer content and composition need page-level verification.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css
.sk-carousel > * { min-inline-size: 0; }
.sk-carousel__track { display: grid; grid-auto-flow: column; grid-auto-columns: 100%; gap: var(--sk-space-4); overflow-x: auto; scroll-snap-type: x mandatory; scroll-behavior: smooth; scrollbar-width: none; }
```

## Motion

```css
.sk-carousel__track { display: grid; grid-auto-flow: column; grid-auto-columns: 100%; gap: var(--sk-space-4); overflow-x: auto; scroll-snap-type: x mandatory; scroll-behavior: smooth; scrollbar-width: none; }
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<section class="sk-carousel" aria-labelledby="carousel-title"><h2 id="carousel-title">Featured components</h2><div class="sk-carousel__track" tabindex="0"><article><h3>Card</h3><p>Structured content.</p></article><article><h3>Tabs</h3><p>Switchable panels.</p></article><article><h3>Modal</h3><p>Focused dialog.</p></article></div><div class="sk-carousel__controls"><button class="sk-button" type="button" data-variant="secondary" data-carousel-prev>Prev</button><button class="sk-button" type="button" data-carousel-next>Next</button></div></section>
```

## Composition and dependencies

Nested SiteKit components: ["button"]. External runtime libraries: none.

Related: [].

Actual CSS variables: `--sk-border-1`, `--sk-border-default`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-font-mono`, `--sk-radius-0`, `--sk-space-3`, `--sk-space-4`, `--sk-space-5`, `--sk-surface-card`, `--sk-surface-raised`, `--sk-text-primary`, `--sk-text-secondary`.

## Caveats and documentation

- Prev/Next work only in lab click code; dist has no handler. Native scroll works. Track hides scrollbar.

MINIMAL: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: ["examples/component-lab/index.html"]. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {}, "matrix": false}
