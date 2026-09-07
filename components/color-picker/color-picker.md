# Color Picker

## Purpose

A native color control with an accessible label.

## When To Use

Use a labeled native color input.

## When Not To Use

An alpha-channel, eyedropper or palette editor supplied by SiteKit.

## Props

See color-picker.schema.json for the source contract.

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

See examples.json and color-picker.html.

## Maintained contract and standalone example

Use: Use a labeled native color input.

Avoid: An alpha-channel, eyedropper or palette editor supplied by SiteKit.

See [contract](color-picker.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
