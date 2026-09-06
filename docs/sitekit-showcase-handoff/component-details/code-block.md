# Code Block

Category: Data Display. Public: HTML/CSS source contract. Status: `example-only-js`. Primitive: False.

## Purpose and selection

Display escaped code in pre/code with a caption and copy affordance.

Avoid: A syntax highlighter, executable console or automatic clipboard library.

## Source and consumption

- schema: `components/code-block/code-block.schema.json`
- template: `components/code-block/code-block.html`
- css: `components/code-block/code-block.css`
- documentation: `components/code-block/code-block.md`
- examples: `components/code-block/examples.json`

Load `dist/sitekit.css`; root selector `.sk-code-block`. No component JavaScript export.

## Declared API versus binding

| Field | Declared type | Required | Default | Verified binding / uncertainty |
| --- | --- | --- | --- | --- |
| language | string | False | null | UNKNOWN: no automatic binding established; consumer authors markup. |
| code | string | True | null | Template {{code}} placeholder only; consumer must safely render it. |
| caption | string optional | False | null | Template {{caption}} placeholder only; consumer must safely render it. |

Required fields: ["code"].

Template placeholders: ["caption", "code"]. Declared slots: ["caption", "code", "actions"].

Allowed children (declared only): ["caption", "code", "actions"].

Callbacks/custom events: none exported. DOM/native state and consumer event handlers; no framework controlled/uncontrolled prop runtime.

## Variants, sizes and states

Declared variants: default, terminal, numbered.

Verified component data-variant selectors: none. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: none established; sizing follows CSS/native dimensions.

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/code-block/code-block.html |
| hover | CSS selector; may target descendants | components/code-block/code-block.css |
| focus | CSS selector; may target descendants | components/code-block/code-block.css |

## Interaction and accessibility

Copy handler exists only in component lab. Terminal/numbered variants have no CSS selectors.

NEEDS IMPROVEMENT:  OBSERVED at 390px with the dossier long-code example: axe scrollable-region-focusable on pre. Provide a keyboard-focusable named code scroll region in consumer composition.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css
.sk-code-block { background: var(--sk-code-surface); color: var(--sk-code-text); border: var(--sk-border-1) solid var(--sk-code-border); border-radius: var(--sk-radius-0); overflow: auto; }
.sk-code-block pre { margin: 0; padding: var(--sk-space-4); overflow: auto; }
```

## Motion

```css
/* No component animation/transition found. */
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<figure class="sk-code-block"><figcaption><span>HTML example</span><button type="button" data-copy-code>Copy</button></figcaption><pre><code>&lt;button class="sk-button" type="button"&gt;Save&lt;/button&gt;</code></pre></figure>
```

## Composition and dependencies

Nested SiteKit components: []. External runtime libraries: none.

Related: ["button", "command-strip"].

Actual CSS variables: `--sk-action-primary`, `--sk-action-primary-text`, `--sk-action-secondary`, `--sk-action-secondary-text`, `--sk-border-1`, `--sk-border-default`, `--sk-code-border`, `--sk-code-surface`, `--sk-code-text`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-font-mono`, `--sk-radius-0`, `--sk-size-control-md`, `--sk-space-3`, `--sk-space-4`, `--sk-type-size-sm`.

## Caveats and documentation

- Copy handler exists only in component lab. Terminal/numbered variants have no CSS selectors.
- OBSERVED at 390px with the dossier long-code example: axe scrollable-region-focusable on pre. Provide a keyboard-focusable named code scroll region in consumer composition.

CONTRADICTS IMPLEMENTATION: Copy handler exists only in component lab. Terminal/numbered variants have no CSS selectors.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: ["examples/component-lab/index.html", "examples/docs-site/index.html"]. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {}, "matrix": false}
