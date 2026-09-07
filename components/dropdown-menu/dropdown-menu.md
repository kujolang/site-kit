# Dropdown Menu

## Purpose

A menu button with grouped actions.

## When To Use

Offer a button-triggered menu of commands with keyboard movement.

## When Not To Use

Navigation lists or a complete nested/typeahead menu system.

## Props

See dropdown-menu.schema.json for the source contract.

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

Load `dist/sitekit.js` after the markup to progressively enhance this CSS-first pattern. The script manages `aria-expanded`, menu IDs, Arrow/Home/End navigation, Escape, Tab, outside-click close, and trigger focus restoration. Without the script the menu remains semantic HTML and can be wired by a consumer.

## Examples

See examples.json and dropdown-menu.html.

## Maintained contract and standalone example

Use: Offer a button-triggered menu of commands with keyboard movement.

Avoid: Navigation lists or a complete nested/typeahead menu system.

See [contract](dropdown-menu.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
