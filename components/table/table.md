# Table

## Purpose

A semantic table for structured comparison or tabular data.

## When To Use

Display captioned tabular data with scoped headers and overflow wrapper.

## When Not To Use

A sortable, filterable, virtualized data grid.

## Props

See table.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| default | alias | Base style; no switch |
| compact | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Interactive controls need visible focus and keyboard access.
- Color must not be the only means of communication.

## Examples

See examples.json and table.html.

## Maintained contract and standalone example

Use: Display captioned tabular data with scoped headers and overflow wrapper.

Avoid: A sortable, filterable, virtualized data grid.

See [contract](table.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
