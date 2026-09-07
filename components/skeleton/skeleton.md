# Skeleton

## Purpose

A placeholder surface that indicates loading content.

## When To Use

Show a decorative loading placeholder silhouette.

## When Not To Use

A loading announcement on its own.

## Props

See skeleton.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| text | alias | Base style; no switch |
| compact | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Interactive controls need visible focus and keyboard access.
- Color must not be the only means of communication.

## Examples

See examples.json and skeleton.html.

## Maintained contract and standalone example

Use: Show a decorative loading placeholder silhouette.

Avoid: A loading announcement on its own.

See [contract](skeleton.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
