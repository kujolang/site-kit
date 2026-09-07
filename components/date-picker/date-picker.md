# Date Picker

## Purpose

A compact date-picker surface with a visible calendar grid.

## When To Use

Choose one date in a Sunday-first en-US calendar with a native input fallback.

## When Not To Use

Date ranges, bookings or a localization framework.

## Props

See date-picker.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| calendar | alias | Base style; no switch |
| compact | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Interactive controls need visible focus and keyboard access.
- Color must not be the only means of communication.

## Examples

See examples.json and date-picker.html.

## Maintained contract and standalone example

Use: Choose one date in a Sunday-first en-US calendar with a native input fallback.

Avoid: Date ranges, bookings or a localization framework.

See [contract](date-picker.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
