# Icon

## Purpose

A small symbolic marker with a stable inline or external SVG contract.

## When To Use

Wrap small inline SVG or a consumer-owned sprite with sizing and semantics.

## When Not To Use

An icon package, registry service or label for an otherwise unnamed button.

## Props

See icon.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| line | alias | Base style; no switch |
| compact | alias | Base style; no switch |
| decorative | composition | icon-decorative |
| meaningful | composition | icon-meaningful |
| inline | composition | icon-inline |
| external | composition | icon-external |

## Accessibility Notes

- A decorative icon must be hidden from assistive technology.
- A meaningful icon must have an accessible name; icon-only buttons must have an `aria-label`.
- Keep SVG `focusable="false"` and `aria-hidden="true"` when the parent owns the meaning.
- Do not rely on color alone.

## Bundled Tabler icons

SiteKit now includes a curated Tabler Icons v3.46.0 outline sprite in `dist/icons/tabler.svg`, its MIT license and symbol inventory. See [icon assets](../../icons/README.md). Use the lightweight `.sk-glyph` directly in buttons, or the existing `.sk-icon` wrapper for sized standalone symbols. Decorative icons use `aria-hidden="true"` and `focusable="false"`; icon-only controls need an accessible name. External use is same-origin HTTP; embed symbols for file URLs.

```html
<button class="sk-button" type="button" aria-label="Search">
  <svg class="sk-glyph" aria-hidden="true" focusable="false"><use href="/assets/sitekit/icons/tabler.svg#search"></use></svg>
</button>
```

Inline canonical check examples use Tabler check geometry. Custom product logos remain their owners’ brand assets; they are not interface icons. Additional symbols should be sourced from the pinned upstream set with license preservation.
