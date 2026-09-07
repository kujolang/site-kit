# Separator

## Purpose

A semantic visual divider between related sections.

## When To Use

Separate adjacent content with horizontal separator semantics.

## When Not To Use

Vertical orientation without new styles/markup.

## Props

See separator.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| horizontal | alias | Base style; no switch |
| compact | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Interactive controls need visible focus and keyboard access.
- Color must not be the only means of communication.

## Examples

See examples.json and separator.html.

## Maintained contract and standalone example

Use: Separate adjacent content with horizontal separator semantics.

Avoid: Vertical orientation without new styles/markup.

See [contract](separator.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
