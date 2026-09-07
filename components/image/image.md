# Image

## Purpose

A responsive image frame with optional caption.

## When To Use

Provide a captioned image-frame visual example.

## When Not To Use

An image optimizer, responsive image loader or implemented img API.

## Props

See image.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| figure | alias | Base style; no switch |
| compact | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Interactive controls need visible focus and keyboard access.
- Color must not be the only means of communication.

## Examples

See examples.json and image.html.

## Maintained contract and standalone example

Use: Provide a captioned image-frame visual example.

Avoid: An image optimizer, responsive image loader or implemented img API.

See [contract](image.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
