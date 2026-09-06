# Generator Panel

Category: Tools. Public: HTML/CSS source contract. Status: `html-css`. Primitive: False.

## Purpose and selection

Arrange a form next to a preview placeholder.

Avoid: An AI generator or API-backed tool.

## Source and consumption

- schema: `components/generator-panel/generator-panel.schema.json`
- template: `components/generator-panel/generator-panel.html`
- css: `components/generator-panel/generator-panel.css`
- documentation: `components/generator-panel/generator-panel.md`
- examples: `components/generator-panel/examples.json`

Load `dist/sitekit.css`; root selector `.sk-generator-panel`. No component JavaScript export.

## Declared API versus binding

| Field | Declared type | Required | Default | Verified binding / uncertainty |
| --- | --- | --- | --- | --- |
| heading | string | True | null | UNKNOWN: no automatic binding established; consumer authors markup. |
| fields | array | True | null | UNKNOWN: no automatic binding established; consumer authors markup. |
| preview | object optional | False | null | UNKNOWN: no automatic binding established; consumer authors markup. |

Required fields: ["heading", "fields"].

Template placeholders: []. Declared slots: ["heading", "form", "preview"].

Allowed children (declared only): ["heading", "form", "preview"].

Callbacks/custom events: none exported. DOM/native state and consumer event handlers; no framework controlled/uncontrolled prop runtime.

## Variants, sizes and states

Declared variants: form-preview, compact, stacked.

Verified component data-variant selectors: none. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: none established; sizing follows CSS/native dimensions.

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/generator-panel/generator-panel.html |
| focus | CSS selector; may target descendants | components/generator-panel/generator-panel.css |

## Interaction and accessibility

No component-specific shipped JavaScript; links and native descendants retain browser behavior.

ACCEPTABLE: Preserve the template native semantics and visible text. Consumer content and composition need page-level verification.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Root-changing container queries cannot query the root itself; provide and test an explicit outer inline-size container. Descendant rules may use the component root as a different nearest query container. Exact thresholds/rules below are source observations.

Observed queries: [{"type": "container", "condition": "(min-width: 56rem)"}].

```css
.sk-generator-panel { display: grid; gap: var(--sk-space-5); border: var(--sk-border-1) solid var(--sk-border-default); background: var(--sk-surface-card); padding: var(--sk-space-5); container-type: inline-size; }
.sk-generator-panel { grid-template-columns: minmax(18rem, .7fr) minmax(24rem, 1fr); }
```

## Motion

```css
/* No component animation/transition found. */
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<section class="sk-generator-panel" aria-labelledby="generator-title">
  <form>
    <h2 id="generator-title">Thumbnail generator</h2>
    <label for="generator-topic">Topic</label>
    <input id="generator-topic" name="topic" type="text" value="Static site launch">
    <label for="generator-style">Style</label>
    <select id="generator-style" name="style"><option>Editorial</option><option>Technical</option></select>
    <button class="sk-button" type="submit">Generate</button>
  </form>
  <div class="sk-generator-panel__preview" role="img" aria-label="Generated preview placeholder">Preview</div>
</section>
```

## Composition and dependencies

Nested SiteKit components: ["button"]. External runtime libraries: none.

Related: [].

Actual CSS variables: `--sk-border-1`, `--sk-border-default`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-font-mono`, `--sk-radius-0`, `--sk-size-control-md`, `--sk-space-2`, `--sk-space-3`, `--sk-space-4`, `--sk-space-5`, `--sk-space-8`, `--sk-surface-card`, `--sk-surface-page`, `--sk-text-primary`, `--sk-type-size-sm`.

## Caveats and documentation

- No generation, preview update or service code. 56rem root self-query requires an ancestor container.

MINIMAL: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: []. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {}, "matrix": false}
