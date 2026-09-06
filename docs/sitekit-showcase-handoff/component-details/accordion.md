# Accordion

Category: Feedback. Public: HTML/CSS source contract. Status: `native`. Primitive: False.

## Purpose and selection

Group native details/summary disclosures for FAQs.

Avoid: Essential information hidden by default or a scripted tree.

## Source and consumption

- schema: `components/accordion/accordion.schema.json`
- template: `components/accordion/accordion.html`
- css: `components/accordion/accordion.css`
- documentation: `components/accordion/accordion.md`
- examples: `components/accordion/examples.json`

Load `dist/sitekit.css`; root selector `.sk-accordion`. No component JavaScript export.

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

Declared variants: faq, compact.

Verified component data-variant selectors: none. Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.

Explicit size API: none established; sizing follows CSS/native dimensions.

| State | Scope | Evidence |
| --- | --- | --- |
| default | source template | components/accordion/accordion.html |
| focus | CSS selector; may target descendants | components/accordion/accordion.css |

## Interaction and accessibility

Browser-native control/navigation behavior for the source elements; no SiteKit-specific callback or controller. Native multiple-open disclosures; no exclusive-open logic or FAQ/compact CSS variants.

STRONG: Native details/summary supplies keyboard and expanded/collapsed semantics. Source first item is open; no forced accordion exclusivity.

No formal WCAG certification. Existing page tests do not exercise every component preview; see evidence/verification.json.

## Responsive behavior

Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.

Observed queries: [].

```css

```

## Motion

```css
/* No component animation/transition found. */
```

Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.

## Standalone example

PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.

```html
<section class="sk-accordion" aria-label="Accordion"><details open><summary>What is included?</summary><p>Accessible disclosure behavior with tokenized SiteKit styling.</p></details><details><summary>Can I compose it?</summary><p>Use each item for a single question or grouped detail.</p></details></section>
```

## Composition and dependencies

Nested SiteKit components: []. External runtime libraries: none.

Related: [].

Actual CSS variables: `--sk-border-1`, `--sk-border-default`, `--sk-focus-offset`, `--sk-focus-ring`, `--sk-focus-width`, `--sk-font-mono`, `--sk-space-3`, `--sk-space-4`, `--sk-surface-card`, `--sk-text-secondary`, `--sk-type-weight-bold`.

## Caveats and documentation

- Native multiple-open disclosures; no exclusive-open logic or FAQ/compact CSS variants.

MINIMAL: Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.

## Verification coverage

Static: component file/field validation and schema snapshot. Optional behavior tests: [].

Examples containing references: []. Source mention is not rendered preview, state, or assertion coverage.

## Proposed showcase controls

{"recommended": true, "controls": {"open": {"type": "boolean", "attribute": "open", "target": "details"}}, "matrix": false}
