# Newsletter Signup

Category: Content. Public: HTML/CSS source contract. Status: `html-css`. Primitive: False.

## Purpose and selection

Compose email signup copy and an inline submission form.

Avoid: A working email subscription or consent service.

## Source and consumption

- schema: `components/newsletter-signup/newsletter-signup.schema.json`
- template: `components/newsletter-signup/newsletter-signup.html`
- css: `components/newsletter-signup/newsletter-signup.css`
- documentation: `components/newsletter-signup/newsletter-signup.md`
- examples: `components/newsletter-signup/examples.json`

Load `dist/sitekit.css`; root selector `.sk-newsletter-signup`. No component JavaScript export.

## Declared API versus binding

| Field | Declared type | Required | Default | Verified binding / uncertainty |
| --- | --- | --- | --- | --- |
| heading | string | True | null | UNKNOWN: no automatic binding established; consumer authors markup. |
| body | string optional | False | null | UNKNOWN: no automatic binding established; consumer authors markup. |
| fields | array | True | null | UNKNOWN: no automatic binding established; consumer authors markup. |
| consent | string optional | False | null | UNKNOWN: no automatic binding established; consumer authors markup. |

Required fields: ["heading", "fields"].

Template placeholders: []. Declared slots: ["heading", "body", "form", "consent"].

Allowed children (declared only): ["heading", "body", "form", "consent"].

Callbacks/custom events: none exported. DOM/native state and consumer event handlers; no framework controlled/uncontrolled prop runtime.

## Variants, sizes and states

Declared variants: inline, boxed, modal, split.

Verified component data-variant selectors: none. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: none established; sizing follows CSS/native dimensions.

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/newsletter-signup/newsletter-signup.html |
| focus | CSS selector; may target descendants | components/newsletter-signup/newsletter-signup.css |

## Interaction and accessibility

No component-specific shipped JavaScript; links and native descendants retain browser behavior.

ACCEPTABLE: Preserve the template native semantics and visible text. Consumer content and composition need page-level verification.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Root-changing container queries cannot query the root itself; provide and test an explicit outer inline-size container. Descendant rules may use the component root as a different nearest query container. Exact thresholds/rules below are source observations.

Observed queries: [{"type": "container", "condition": "(min-width: 48rem)"}].

```css
.sk-newsletter-signup { display: grid; gap: var(--sk-space-6); border: var(--sk-border-1) solid var(--sk-border-default); background: var(--sk-surface-card); padding: var(--sk-space-5); container-type: inline-size; }
.sk-newsletter-signup__form div { display: flex; flex-wrap: wrap; gap: var(--sk-space-3); align-items: center; }
.sk-newsletter-signup input { min-inline-size: min(100%, 18rem); min-block-size: var(--sk-size-control-md); border: var(--sk-border-1) solid var(--sk-border-default); border-radius: var(--sk-radius-0); background: var(--sk-surface-page); color: var(--sk-text-primary); padding: var(--sk-space-3); }
.sk-newsletter-signup[data-layout="split"], .sk-newsletter-signup:not([data-layout]) { grid-template-columns: minmax(0, 1fr) minmax(20rem, .9fr); align-items: center; }
```

## Motion

```css
/* No component animation/transition found. */
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<section class="sk-newsletter-signup" aria-labelledby="newsletter-title">
  <div class="sk-newsletter-signup__copy">
    <span class="sk-badge" data-variant="outline">Newsletter</span>
    <h2 id="newsletter-title">Stay in the loop.</h2>
    <p>Get concise build notes, release prompts, and design-system updates.</p>
  </div>
  <form class="sk-newsletter-signup__form">
    <label for="newsletter-email">Email address</label>
    <div>
      <input id="newsletter-email" name="email" type="email" autocomplete="email" placeholder="you@example.com">
      <button class="sk-button" type="submit">Subscribe</button>
    </div>
    <p>One useful note at a time. No feed noise.</p>
  </form>
</section>
```

## Composition and dependencies

Nested SiteKit components: ["badge", "button"]. External runtime libraries: none.

Related: [].

Actual CSS variables: `--sk-border-1`, `--sk-border-default`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-font-mono`, `--sk-radius-0`, `--sk-size-control-md`, `--sk-space-3`, `--sk-space-4`, `--sk-space-5`, `--sk-space-6`, `--sk-surface-card`, `--sk-surface-page`, `--sk-text-primary`, `--sk-text-secondary`, `--sk-type-size-sm`.

## Caveats and documentation

- No action/backend/required input/consent processing. Split container rule is real but requires an ancestor to affect root.

MINIMAL: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: ["examples/component-lab/index.html"]. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {}, "matrix": false}
