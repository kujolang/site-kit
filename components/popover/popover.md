# Popover

## Purpose

A small contextual surface anchored to a trigger.

## When To Use

Toggle contextual nonmodal content next to a trigger.

## When Not To Use

A modal form or collision-aware floating positioning library.

## Props

See popover.schema.json for the source contract.

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

Load `dist/sitekit.js` to add `aria-controls`, toggle state, Escape handling, and outside-click dismissal. Keep essential content in the page flow rather than only inside the popover.

## Examples

See examples.json and popover.html.

## Maintained contract and standalone example

Use: Toggle contextual nonmodal content next to a trigger.

Avoid: A modal form or collision-aware floating positioning library.

See [contract](popover.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
