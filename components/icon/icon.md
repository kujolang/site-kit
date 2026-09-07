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

## Registration contract

Register only the symbols a consumer uses in its own sprite. Names use lowercase kebab-case (`github`, `external-link`, `close`, `check`). Preserve the source license in the consuming project. SiteKit does not bundle a third-party icon library.

## Examples

See examples.json and icon.html. The examples include inline SVG, a GitHub brand symbol, and an icon-only close action.

## Maintained contract and standalone example

Use: Wrap small inline SVG or a consumer-owned sprite with sizing and semantics.

Avoid: An icon package, registry service or label for an otherwise unnamed button.

See [contract](icon.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.

## Asset provenance

The canonical check mark is simple SiteKit example geometry under the repository MIT license. The historical `examples/icons.svg#github` is a GitHub brand mark, not an MIT icon-library grant. For permitted uses and current artwork, consult [GitHub brand guidance](https://brand.github.com/foundations/logo) (checked 2026-09-06). Preserve brand attribution and use it only to identify/link GitHub; do not present it as SiteKit artwork. The distribution does not bundle that example sprite.
