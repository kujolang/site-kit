# Carousel

## Purpose

A grouped media or content sequence with explicit navigation controls.

## When To Use

Browse a scrollable card series with optional previous/next controls.

## When Not To Use

Forced autoplay, virtualized slides or a media-player service.

## Props

See carousel.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| cards | alias | Base style; no switch |
| compact | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Interactive controls need visible focus and keyboard access.
- Color must not be the only means of communication.

## Examples

See examples.json and carousel.html.

## Maintained contract and standalone example

Use: Browse a scrollable card series with optional previous/next controls.

Avoid: Forced autoplay, virtualized slides or a media-player service.

See [contract](carousel.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
