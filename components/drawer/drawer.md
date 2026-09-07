# Drawer

## Purpose

A side panel for secondary navigation or contextual actions.

## When To Use

Show a nonmodal secondary panel with open/close, initial focus and focus restoration; Tab remains in normal document order.

## When Not To Use

Assuming it is a complete modal sheet with inert background.

## Props

See drawer.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| right | alias | Base style; no switch |
| compact | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Interactive controls need visible focus and keyboard access.
- Color must not be the only means of communication.

## Optional behavior

Add `data-sk-drawer` to the labeled `<aside>`, point a real button at its ID with `data-sk-drawer-open`, and add `data-sk-drawer-close` to the close button. `dist/sitekit.js` adds Escape handling, outside scrim dismissal, initial focus, and focus restoration; the nonmodal panel does not trap Tab.

## Examples

See examples.json and drawer.html.

## Maintained contract and standalone example

Use: Show a nonmodal secondary panel with optional open/close and focus restoration.

Avoid: Assuming it is a complete modal sheet with inert background.

See [contract](drawer.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
