# Promo Banner

## Purpose

A dismissible commercial or release announcement banner.

## When To Use

Present a promotional message and action cluster.

## When Not To Use

A dismissible announcement system out of the box.

## Props

See promo-banner.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| info | alias | Base style; no switch |
| success | alias | Base style; no switch |
| warning | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Keyboard access, visible focus, and accessible names are required.
- Color must not be the only means of communication.

## Agent Usage Notes

- Read promo-banner.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and promo-banner.html.

## Maintained contract and standalone example

Use: Present a promotional message and action cluster.

Avoid: A dismissible announcement system out of the box.

See [contract](promo-banner.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
