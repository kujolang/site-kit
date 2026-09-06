# Date Picker

Category: Forms. Public: HTML/CSS source contract. Status: `example-only-js`. Primitive: False.

## Purpose and selection

Provide a styled calendar mockup for further implementation.

Avoid: A production date selector without consumer controller and semantic repairs.

## Source and consumption

- schema: `components/date-picker/date-picker.schema.json`
- template: `components/date-picker/date-picker.html`
- css: `components/date-picker/date-picker.css`
- documentation: `components/date-picker/date-picker.md`
- examples: `components/date-picker/examples.json`

Load `dist/sitekit.css`; root selector `.sk-date-picker`. No component JavaScript export.

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

Declared variants: calendar, compact.

Verified component data-variant selectors: none. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: none established; sizing follows CSS/native dimensions.

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/date-picker/date-picker.html |
| hover | CSS selector; may target descendants | components/date-picker/date-picker.css |
| focus | CSS selector; may target descendants | components/date-picker/date-picker.css |
| disabled | CSS selector; may target descendants | components/date-picker/date-picker.css |
| pressed | CSS selector; may target descendants | components/date-picker/date-picker.css |
| current | CSS selector; may target descendants | components/date-picker/date-picker.css |

## Interaction and accessibility

Partial July calendar, no month navigation or date calculations. role=grid lacks rows/gridcells. Lab selection changes aria-current, conflating current and selected dates.

NEEDS IMPROVEMENT: Partial July calendar, no month navigation or date calculations. role=grid lacks rows/gridcells. Lab selection changes aria-current, conflating current and selected dates. OBSERVED: axe aria-required-children on role=grid in both Kujo themes.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css
.sk-date-picker { display: grid; gap: var(--sk-space-4); inline-size: min(100%, 24rem); border: var(--sk-border-1) solid var(--sk-border-default); border-radius: var(--sk-radius-0); background: var(--sk-surface-card); color: var(--sk-text-primary); padding: var(--sk-space-5); }
.sk-date-picker > * { min-inline-size: 0; }
.sk-date-picker [data-weekdays], .sk-date-picker [role="grid"] { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: var(--sk-border-1); }
```

## Motion

```css
/* No component animation/transition found. */
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<section class="sk-date-picker" aria-labelledby="date-picker-title"><header><button type="button" aria-label="Previous month">Prev</button><h2 id="date-picker-title">July 2026</h2><button type="button" aria-label="Next month">Next</button></header><div data-weekdays aria-hidden="true"><span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span></div><div role="grid" aria-label="July 2026"><button type="button" disabled>28</button><button type="button" disabled>29</button><button type="button" disabled>30</button><button type="button">1</button><button type="button">2</button><button type="button">3</button><button type="button">4</button><button type="button">5</button><button type="button">6</button><button type="button">7</button><button type="button">8</button><button type="button" aria-current="date" aria-pressed="true">9</button><button type="button">10</button><button type="button">11</button></div></section>
```

## Composition and dependencies

Nested SiteKit components: []. External runtime libraries: none.

Related: ["date-input"].

Actual CSS variables: `--sk-action-primary`, `--sk-action-primary-text`, `--sk-border-1`, `--sk-border-default`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-font-mono`, `--sk-radius-0`, `--sk-size-control-md`, `--sk-space-2`, `--sk-space-3`, `--sk-space-4`, `--sk-space-5`, `--sk-surface-card`, `--sk-surface-raised`, `--sk-surface-subtle`, `--sk-text-muted`, `--sk-text-primary`, `--sk-type-size-lg`, `--sk-type-size-xs`, `--sk-type-weight-bold`.

## Caveats and documentation

- Partial July calendar, no month navigation or date calculations. role=grid lacks rows/gridcells. Lab selection changes aria-current, conflating current and selected dates.
- OBSERVED: axe aria-required-children on role=grid in both Kujo themes.

MINIMAL: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: ["examples/component-lab/index.html"]. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {}, "matrix": false}
