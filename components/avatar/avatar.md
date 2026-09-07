# Avatar

## Purpose

A compact visual identity marker for a person, team, or object.

## When To Use

Frame an image or manually authored initials in a square.

## When Not To Use

A guaranteed initials generator or image fallback service.

## Props

See avatar.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| initials | composition | avatar-initials |
| compact | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Interactive controls need visible focus and keyboard access.
- Color must not be the only means of communication.

## Examples

See examples.json and avatar.html.

## Maintained contract and standalone example

Use: Frame an image or manually authored initials in a square.

Avoid: A guaranteed initials generator or image fallback service.

See [contract](avatar.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
