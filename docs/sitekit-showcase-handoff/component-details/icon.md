# Icon

Category: Foundations. Public: HTML/CSS source contract. Status: `html-css`. Primitive: True.

## Purpose and selection

Wrap small inline SVG or a consumer-owned sprite with sizing and semantics.

Avoid: An icon package, registry service or label for an otherwise unnamed button.

## Source and consumption

- schema: `components/icon/icon.schema.json`
- template: `components/icon/icon.html`
- css: `components/icon/icon.css`
- documentation: `components/icon/icon.md`
- examples: `components/icon/examples.json`

Load `dist/sitekit.css`; root selector `.sk-icon`. No component JavaScript export.

## Declared API versus binding

| Field | Declared type | Required | Default | Verified binding / uncertainty |
| --- | --- | --- | --- | --- |
| label | string optional | False | null | UNKNOWN: no automatic binding established; consumer authors markup. |
| variant | decorative\|meaningful\|inline\|external | False | null | UNKNOWN: no automatic binding established; consumer authors markup. |
| name | string optional | False | null | data-icon-name is metadata only; SVG markup must be supplied. |
| size | sm\|md\|lg optional | False | null | data-size=sm\|lg; md uses base 2.5rem. |
| source | inline SVG markup or external SVG reference optional | False | null | UNKNOWN: no automatic binding established; consumer authors markup. |

Required fields: [].

Template placeholders: []. Declared slots: ["label", "content", "actions", "svg"].

Allowed children (declared only): ["label", "content", "actions", "svg"].

Callbacks/custom events: none exported. DOM/native state and consumer event handlers; no framework controlled/uncontrolled prop runtime.

## Variants, sizes and states

Declared variants: line, compact, decorative, meaningful, inline, external.

Verified component data-variant selectors: none. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: ["sm: 2rem wrapper", "md/base: 2.5rem wrapper", "lg: 3rem wrapper"]

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/icon/icon.html |
| focus | CSS selector; may target descendants | components/icon/icon.css |

## Interaction and accessibility

No component-specific shipped JavaScript; links and native descendants retain browser behavior.

NEEDS IMPROVEMENT:  OBSERVED: a default .sk-icon inside a primary .sk-button resets color to text.primary; SVG stroke rgb(6,6,6) matches button background rgb(6,6,6), making the symbol invisible in light theme. See evidence/focused-findings.json.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css
.sk-icon { display: inline-grid; place-items: center; inline-size: var(--sk-size-control-md); block-size: var(--sk-size-control-md); aspect-ratio: 1; color: var(--sk-text-primary); font-family: var(--sk-font-mono); line-height: 1; }
.sk-icon[data-size="sm"] { inline-size: var(--sk-size-control-sm); block-size: var(--sk-size-control-sm); }
.sk-icon[data-size="lg"] { inline-size: var(--sk-size-control-lg); block-size: var(--sk-size-control-lg); }
.sk-icon svg { display: block; inline-size: 70%; block-size: 70%; fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; stroke-width: var(--sk-border-2); }
```

## Motion

```css
/* No component animation/transition found. */
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<span class="sk-icon" data-icon-name="check" role="img" aria-label="Confirmed"><svg aria-hidden="true" viewBox="0 0 24 24" focusable="false"><path d="m5 12 4 4L19 6" /></svg></span>
```

## Composition and dependencies

Nested SiteKit components: []. External runtime libraries: none.

Related: ["button", "avatar"].

Actual CSS variables: `--sk-border-1`, `--sk-border-2`, `--sk-border-default`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-font-mono`, `--sk-size-control-lg`, `--sk-size-control-md`, `--sk-size-control-sm`, `--sk-surface-card`, `--sk-text-primary`.

## Caveats and documentation

- data-icon-name does not fetch icons. CSS aria-hidden:true is invalid and cannot supply an ARIA attribute. Boxed uses data-icon-variant, not data-variant.
- OBSERVED: a default .sk-icon inside a primary .sk-button resets color to text.primary; SVG stroke rgb(6,6,6) matches button background rgb(6,6,6), making the symbol invisible in light theme. See evidence/focused-findings.json.

CONTRADICTS IMPLEMENTATION: Authored icon guidance is useful, but size/boxed bindings and invalid decorative CSS declaration need explicit qualification.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: ["examples/consumer-dashboard/index.html"]. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {"size": {"type": "select", "values": ["sm", "md", "lg"], "attribute": "data-size"}, "boxed": {"type": "boolean", "attribute": "data-icon-variant", "trueValue": "boxed"}}, "matrix": true}
