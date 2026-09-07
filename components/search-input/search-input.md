# Search Input

## Purpose

A search field with a visible submit action.

## When To Use

Provide a labeled native search form.

## When Not To Use

A search index or instant filtering supplied by SiteKit.

## Props

See search-input.schema.json for the source contract.

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

See examples.json and search-input.html.

## Maintained contract and standalone example

Use: Provide a labeled native search form.

Avoid: A search index or instant filtering supplied by SiteKit.

See [contract](search-input.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
