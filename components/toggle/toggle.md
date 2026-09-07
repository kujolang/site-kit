# Toggle

## Purpose

A binary switch-style control using a native checkbox.

## When To Use

Capture a native boolean with a square moving indicator.

## When Not To Use

An automatically persisted setting or role=switch controller.

## Props

See toggle.schema.json for the source contract.

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

See examples.json and toggle.html.

## Maintained contract and standalone example

Use: Capture a native boolean with a square moving indicator.

Avoid: An automatically persisted setting or role=switch controller.

See [contract](toggle.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
