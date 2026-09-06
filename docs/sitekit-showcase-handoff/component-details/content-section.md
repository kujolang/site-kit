# Content Section

Category: Content. Public: HTML/CSS source contract. Status: `html-css`. Primitive: False.

## Purpose and selection

Compose supporting copy, action and a metadata/media panel.

Avoid: Assuming schema media objects automatically render.

## Source and consumption

- schema: `components/content-section/content-section.schema.json`
- template: `components/content-section/content-section.html`
- css: `components/content-section/content-section.css`
- documentation: `components/content-section/content-section.md`
- examples: `components/content-section/examples.json`

Load `dist/sitekit.css`; root selector `.sk-content-section`. No component JavaScript export.

## Declared API versus binding

| Field | Declared type | Required | Default | Verified binding / uncertainty |
| --- | --- | --- | --- | --- |
| eyebrow | string optional | False | null | UNKNOWN: no automatic binding established; consumer authors markup. |
| heading | string | True | null | UNKNOWN: no automatic binding established; consumer authors markup. |
| body | string | False | null | UNKNOWN: no automatic binding established; consumer authors markup. |
| media | object optional | False | null | UNKNOWN: no automatic binding established; consumer authors markup. |
| actions | array optional | False | null | UNKNOWN: no automatic binding established; consumer authors markup. |

Required fields: ["heading"].

Template placeholders: []. Declared slots: ["eyebrow", "heading", "body", "actions", "media"].

Allowed children (declared only): ["eyebrow", "heading", "body", "actions", "media"].

Callbacks/custom events: none exported. DOM/native state and consumer event handlers; no framework controlled/uncontrolled prop runtime.

## Variants, sizes and states

Declared variants: media-right, media-left, centered, compact.

Verified component data-variant selectors: none. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: none established; sizing follows CSS/native dimensions.

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/content-section/content-section.html |
| focus | CSS selector; may target descendants | components/content-section/content-section.css |

## Interaction and accessibility

No component-specific shipped JavaScript; links and native descendants retain browser behavior.

ACCEPTABLE: Preserve the template native semantics and visible text. Consumer content and composition need page-level verification.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Root-changing container queries cannot query the root itself; provide and test an explicit outer inline-size container. Descendant rules may use the component root as a different nearest query container. Exact thresholds/rules below are source observations.

Observed queries: [{"type": "container", "condition": "(min-width: 54rem)"}].

```css
.sk-content-section { display: grid; gap: var(--sk-space-6); align-items: center; border: var(--sk-border-1) solid var(--sk-border-default); background: var(--sk-surface-card); padding: var(--sk-space-6); container-type: inline-size; }
.sk-content-section__copy p { max-inline-size: 65ch; color: var(--sk-text-secondary); }
.sk-content-section { grid-template-columns: minmax(0, 1fr) minmax(18rem, .75fr); }
```

## Motion

```css
.sk-content-section__media figcaption { margin-block-end: var(--sk-space-4); font-family: var(--sk-font-mono); font-size: var(--sk-type-size-sm); text-transform: uppercase; }
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<section class="sk-content-section" aria-labelledby="content-section-title">
  <div class="sk-content-section__copy">
    <span class="sk-badge" data-variant="outline">Workflow</span>
    <h2 id="content-section-title">Build fast, deploy faster.</h2>
    <p>Use a focused content block when the page needs a deeper argument than a hero or card can carry.</p>
    <a class="sk-button" href="#content-section-title">Read the guide</a>
  </div>
  <figure class="sk-content-section__media">
    <figcaption>Deploy pipeline</figcaption>
    <dl>
      <div><dt>Build</dt><dd>42s</dd></div>
      <div><dt>Checks</dt><dd>Passing</dd></div>
      <div><dt>Theme</dt><dd>Tokenized</dd></div>
    </dl>
  </figure>
</section>
```

## Composition and dependencies

Nested SiteKit components: ["badge", "button"]. External runtime libraries: none.

Related: [].

Actual CSS variables: `--sk-border-1`, `--sk-border-default`, `--sk-border-subtle`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-font-mono`, `--sk-space-3`, `--sk-space-4`, `--sk-space-5`, `--sk-space-6`, `--sk-surface-card`, `--sk-surface-page`, `--sk-text-muted`, `--sk-text-secondary`, `--sk-type-size-sm`.

## Caveats and documentation

- media-left uses data-layout within a 54rem container query; several schema variants have no CSS mapping. Root self-query needs ancestor container.

MINIMAL: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: []. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {}, "matrix": false}
