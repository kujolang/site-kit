# Rating

## Purpose

A rating display or input for qualitative feedback.

## When To Use

Render a static star rating with an accessible summary.

## When Not To Use

An editable rating input.

## Props

See rating.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| five-point | alias | Base style; no switch |
| compact | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Interactive controls need visible focus and keyboard access.
- Color must not be the only means of communication.

## Examples

See examples.json and rating.html.

## Maintained contract and standalone example

Use: Render a static star rating with an accessible summary.

Avoid: An editable rating input.

See [contract](rating.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
