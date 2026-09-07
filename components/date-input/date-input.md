# Date Input

## Purpose

A native date input with label and help text.

## When To Use

Capture a date through the browser-native date input.

## When Not To Use

A date range picker or custom calendar.

## Props

See date-input.schema.json for the source contract.

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

See examples.json and date-input.html.

## Maintained contract and standalone example

Use: Capture a date through the browser-native date input.

Avoid: A date range picker or custom calendar.

See [contract](date-input.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
