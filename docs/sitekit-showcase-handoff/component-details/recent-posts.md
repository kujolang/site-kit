# Recent Posts

Category: Content. Public: HTML/CSS source contract. Status: `html-css`. Primitive: False.

## Purpose and selection

Present authored article cards and metadata.

Avoid: Fetching posts or automatic blog generation.

## Source and consumption

- schema: `components/recent-posts/recent-posts.schema.json`
- template: `components/recent-posts/recent-posts.html`
- css: `components/recent-posts/recent-posts.css`
- documentation: `components/recent-posts/recent-posts.md`
- examples: `components/recent-posts/examples.json`

Load `dist/sitekit.css`; root selector `.sk-recent-posts`. No component JavaScript export.

## Declared API versus binding

| Field | Declared type | Required | Default | Verified binding / uncertainty |
| --- | --- | --- | --- | --- |
| heading | string | False | null | UNKNOWN: no automatic binding established; consumer authors markup. |
| posts | array | True | null | UNKNOWN: no automatic binding established; consumer authors markup. |

Required fields: ["posts"].

Template placeholders: []. Declared slots: ["heading", "posts"].

Allowed children (declared only): ["heading", "posts"].

Callbacks/custom events: none exported. DOM/native state and consumer event handlers; no framework controlled/uncontrolled prop runtime.

## Variants, sizes and states

Declared variants: cards, list, featured.

Verified component data-variant selectors: none. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: none established; sizing follows CSS/native dimensions.

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/recent-posts/recent-posts.html |
| focus | CSS selector; may target descendants | components/recent-posts/recent-posts.css |

## Interaction and accessibility

No component-specific shipped JavaScript; links and native descendants retain browser behavior.

ACCEPTABLE: Preserve the template native semantics and visible text. Consumer content and composition need page-level verification.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css
.sk-recent-posts > div { display: grid; gap: var(--sk-space-4); grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr)); }
```

## Motion

```css
.sk-recent-posts__meta { color: var(--sk-text-muted); font-family: var(--sk-font-mono); font-size: var(--sk-type-size-xs); text-transform: uppercase; }
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<section class="sk-recent-posts" aria-labelledby="recent-posts-title">
  <h2 id="recent-posts-title">Latest insights</h2>
  <div>
    <article><p class="sk-recent-posts__meta">Guide</p><h3><a href="#recent-posts-title">How SiteKit keeps components consistent</a></h3><p>Source contracts, generated CSS, and previews stay connected.</p></article>
    <article><p class="sk-recent-posts__meta">Workflow</p><h3><a href="#recent-posts-title">Migrating legacy patterns cleanly</a></h3><p>Use old layouts as source material, not visual drift.</p></article>
  </div>
</section>
```

## Composition and dependencies

Nested SiteKit components: []. External runtime libraries: none.

Related: [].

Actual CSS variables: `--sk-border-1`, `--sk-border-default`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-font-mono`, `--sk-space-4`, `--sk-space-5`, `--sk-surface-card`, `--sk-text-muted`, `--sk-text-secondary`, `--sk-type-size-xs`.

## Caveats and documentation

- cards/list/featured are declared but share the intrinsic grid implementation.

MINIMAL: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: []. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {}, "matrix": false}
