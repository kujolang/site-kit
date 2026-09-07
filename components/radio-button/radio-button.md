# Radio Button

## Purpose

A single-choice input within a related option group.

## When To Use

Capture one native choice within a labeled radio group.

## When Not To Use

Independent multiple choices or an ARIA-only custom radio widget.

## Props

See radio-button.schema.json for the source contract.

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

See examples.json and radio-button.html.

## Maintained contract and standalone example

Use: Capture one native choice within a labeled radio group.

Avoid: Independent multiple choices or an ARIA-only custom radio widget.

See [contract](radio-button.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
