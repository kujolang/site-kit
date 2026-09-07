# Product Grid

## Purpose

A responsive product listing surface.

## When To Use

Arrange product summaries in an intrinsic responsive grid.

## When Not To Use

A catalog service, filter engine or cart.

## Props

See product-grid.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| catalog | alias | Base style; no switch |
| compact | alias | Base style; no switch |
| comparison | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Preserve semantic text structure and slotted interactive focus.
- Color must not be the only means of communication.

## Agent Usage Notes

- Read product-grid.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and product-grid.html.

## Maintained contract and standalone example

Use: Arrange product summaries in an intrinsic responsive grid.

Avoid: A catalog service, filter engine or cart.

See [contract](product-grid.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
