# Tooltip

## Purpose

A short contextual text hint for an adjacent control.

## When To Use

Show advisory text on trigger focus/hover with Escape dismissal.

## When Not To Use

Essential content, interactive tooltip content or collision-aware positioning.

## Props

See tooltip.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| default | alias | Base style; no switch |
| compact | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Interactive controls need visible focus and keyboard access.
- Color must not be the only means of communication.

## Optional behavior

Load `dist/sitekit.js` to expose the tooltip while its trigger is focused or hovered and to hide it on blur or Escape. Tooltip content is advisory; use a visible label or description for essential information.

## Examples

See examples.json and tooltip.html.

## Maintained contract and standalone example

Use: Show advisory text on trigger focus/hover with Escape dismissal.

Avoid: Essential content, interactive tooltip content or collision-aware positioning.

See [contract](tooltip.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
