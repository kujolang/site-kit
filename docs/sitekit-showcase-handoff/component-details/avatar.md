# Avatar

Category: Data Display. Public: HTML/CSS source contract. Status: `html-css`. Primitive: False.

## Purpose and selection

Frame an image or manually authored initials in a square.

Avoid: A guaranteed initials generator or image fallback service.

## Source and consumption

- schema: `components/avatar/avatar.schema.json`
- template: `components/avatar/avatar.html`
- css: `components/avatar/avatar.css`
- documentation: `components/avatar/avatar.md`
- examples: `components/avatar/examples.json`

Load `dist/sitekit.css`; root selector `.sk-avatar`. No component JavaScript export.

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

Declared variants: initials, compact.

Verified component data-variant selectors: none. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: none established; sizing follows CSS/native dimensions.

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/avatar/avatar.html |
| focus | CSS selector; may target descendants | components/avatar/avatar.css |

## Interaction and accessibility

No component-specific shipped JavaScript; links and native descendants retain browser behavior.

NEEDS IMPROVEMENT: Template has an empty-alt image inside a generic span with aria-label; accessible exposure needs correction or verification. No fallback generation. OBSERVED: axe aria-prohibited-attr on generic span aria-label in both Kujo themes.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css
.sk-avatar { display: inline-grid; place-items: center; inline-size: var(--sk-size-control-lg); block-size: var(--sk-size-control-lg); aspect-ratio: 1; overflow: hidden; border: var(--sk-border-1) solid var(--sk-border-default); border-radius: var(--sk-radius-0); background: var(--sk-surface-raised); color: var(--sk-text-primary); }
.sk-avatar img, .sk-avatar svg { inline-size: 100%; block-size: 100%; object-fit: cover; display: block; }
```

## Motion

```css
/* No component animation/transition found. */
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<span class="sk-avatar" aria-label="Alex Morgan"><img alt="" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='white'/%3E%3Cpath d='M16 48V18h32v30H16Z' fill='none' stroke='black' stroke-width='4'/%3E%3Ccircle cx='32' cy='29' r='8' fill='black'/%3E%3Cpath d='M19 48c4-9 10-13 13-13s9 4 13 13' fill='black'/%3E%3C/svg%3E"></span>
```

## Composition and dependencies

Nested SiteKit components: []. External runtime libraries: none.

Related: [].

Actual CSS variables: `--sk-border-1`, `--sk-border-default`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-radius-0`, `--sk-size-control-lg`, `--sk-surface-raised`, `--sk-text-primary`.

## Caveats and documentation

- Template has an empty-alt image inside a generic span with aria-label; accessible exposure needs correction or verification. No fallback generation.
- OBSERVED: axe aria-prohibited-attr on generic span aria-label in both Kujo themes.

MINIMAL: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: ["examples/component-lab/index.html"]. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {}, "matrix": false}
