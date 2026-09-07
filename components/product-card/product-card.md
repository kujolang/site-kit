# Product Card

## Purpose

A semantic commerce product summary with media, price, and actions.

## When To Use

Present product title, description, price and actions beside media.

## When Not To Use

A cart item, inventory model or automatic media renderer.

## Props

See product-card.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| default | alias | Base style; no switch |
| compact | alias | Base style; no switch |
| featured | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Keyboard access, visible focus, and accessible names are required.
- Color must not be the only means of communication.

## Agent Usage Notes

- Read product-card.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and product-card.html.

## Maintained contract and standalone example

Use: Present product title, description, price and actions beside media.

Avoid: A cart item, inventory model or automatic media renderer.

See [contract](product-card.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
