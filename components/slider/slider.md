# Slider

## Purpose

A range input for selecting a numeric value.

## When To Use

Capture a scalar through a native range control.

## When Not To Use

A multi-thumb slider or labeled value display supplied by SiteKit.

## Props

See slider.schema.json for the source contract.

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

See examples.json and slider.html.

## Maintained contract and standalone example

Use: Capture a scalar through a native range control.

Avoid: A multi-thumb slider or labeled value display supplied by SiteKit.

See [contract](slider.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
