# File

## Purpose

A file metadata row for selected or attached files.

## When To Use

Show a file metadata row and a remove affordance.

## When Not To Use

Uploading, downloading or deleting files automatically.

## Props

See file.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| row | alias | Base style; no switch |
| compact | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Interactive controls need visible focus and keyboard access.
- Color must not be the only means of communication.

## Examples

See examples.json and file.html.

## Maintained contract and standalone example

Use: Show a file metadata row and a remove affordance.

Avoid: Uploading, downloading or deleting files automatically.

See [contract](file.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
