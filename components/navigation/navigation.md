# Navigation

## Purpose

A semantic navigation region for primary or secondary links.

## When To Use

Display a wrapping set of primary navigation links.

## When Not To Use

A router, sidebar manager or mobile menu controller.

## Props

See navigation.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| primary | alias | Base style; no switch |
| compact | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Interactive controls need visible focus and keyboard access.
- Color must not be the only means of communication.

## Examples

See examples.json and navigation.html.

## Maintained contract and standalone example

Use: Display a wrapping set of primary navigation links.

Avoid: A router, sidebar manager or mobile menu controller.

See [contract](navigation.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
