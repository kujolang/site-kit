# Link

## Purpose

A text link with visible focus and hover states.

## When To Use

Style a real navigation anchor with underline and focus.

## When Not To Use

A command action that should use button.

## Props

See link.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| inline | alias | Base style; no switch |
| compact | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Interactive controls need visible focus and keyboard access.
- Color must not be the only means of communication.

## Examples

See examples.json and link.html.

## Maintained contract and standalone example

Use: Style a real navigation anchor with underline and focus.

Avoid: A command action that should use button.

See [contract](link.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
