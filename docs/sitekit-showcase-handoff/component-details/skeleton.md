# Skeleton

Category: Feedback. Public: HTML/CSS source contract. Status: `html-css`. Primitive: False.

## Purpose and selection

Show a decorative loading placeholder silhouette.

Avoid: A loading announcement on its own.

## Source and consumption

- schema: `components/skeleton/skeleton.schema.json`
- template: `components/skeleton/skeleton.html`
- css: `components/skeleton/skeleton.css`
- documentation: `components/skeleton/skeleton.md`
- examples: `components/skeleton/examples.json`

Load `dist/sitekit.css`; root selector `.sk-skeleton`. No component JavaScript export.

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

Declared variants: text, compact.

Verified component data-variant selectors: none. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: none established; sizing follows CSS/native dimensions.

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/skeleton/skeleton.html |
| focus | CSS selector; may target descendants | components/skeleton/skeleton.css |

## Interaction and accessibility

No component-specific shipped JavaScript; links and native descendants retain browser behavior.

ACCEPTABLE: Preserve the template native semantics and visible text. Consumer content and composition need page-level verification.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [{"type": "media", "condition": "(prefers-reduced-motion: no-preference)"}].

```css
.sk-skeleton { display: grid; gap: var(--sk-space-4); inline-size: min(100%, 26rem); border: var(--sk-border-1) solid var(--sk-border-default); background: var(--sk-surface-card); padding: var(--sk-space-5); }
.sk-skeleton span:nth-child(3) { inline-size: 82%; }
.sk-skeleton span:nth-child(4) { inline-size: 64%; }
```

## Motion

```css
.sk-skeleton__media, .sk-skeleton span { animation: sk-skeleton-pulse 1400ms var(--sk-motion-ease) infinite; }
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<div class="sk-skeleton" aria-hidden="true"><span class="sk-skeleton__media"></span><span></span><span></span><span></span></div>
```

## Composition and dependencies

Nested SiteKit components: []. External runtime libraries: none.

Related: [].

Actual CSS variables: `--sk-border-1`, `--sk-border-default`, `--sk-border-subtle`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-motion-ease`, `--sk-space-4`, `--sk-space-5`, `--sk-surface-card`, `--sk-surface-raised`, `--sk-surface-subtle`.

## Caveats and documentation

- aria-hidden=true; pair with a named status elsewhere. Pulse duration is hardcoded 1400ms and opt-in to motion.

MINIMAL: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: ["examples/component-lab/index.html"]. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {}, "matrix": false}
