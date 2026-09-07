# List

## Purpose

A semantic ordered or unordered list with consistent spacing.

## When To Use

Format a semantic unordered list with spacing.

## When Not To Use

A virtualized list or interactive listbox.

## Props

See list.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| unordered | alias | Base style; no switch |
| compact | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Interactive controls need visible focus and keyboard access.
- Color must not be the only means of communication.

## Examples

See examples.json and list.html.

## Maintained contract and standalone example

Use: Format a semantic unordered list with spacing.

Avoid: A virtualized list or interactive listbox.

See [contract](list.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
