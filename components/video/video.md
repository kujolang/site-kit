# Video

## Purpose

A responsive video embed frame with caption.

## When To Use

Display a captioned 16:9 media placeholder.

## When Not To Use

A working video player, embed or caption-track API.

## Props

See video.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| embed | alias | Base style; no switch |
| compact | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Interactive controls need visible focus and keyboard access.
- Color must not be the only means of communication.

## Examples

See examples.json and video.html.

## Maintained contract and standalone example

Use: Display a captioned 16:9 media placeholder.

Avoid: A working video player, embed or caption-track API.

See [contract](video.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
