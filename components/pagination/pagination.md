# Pagination

## Purpose

A page navigation control for long result sets.

## When To Use

Link between pages and mark the current one.

## When Not To Use

Client-side data pagination, item slicing or total-page computation.

## Props

See pagination.schema.json for the source contract.

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

See examples.json and pagination.html.

## Maintained contract and standalone example

Use: Link between pages and mark the current one.

Avoid: Client-side data pagination, item slicing or total-page computation.

See [contract](pagination.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
