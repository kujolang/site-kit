# Progress Bar

## Purpose

A horizontal progress meter for determinate completion.

## When To Use

Draw a horizontal completion fill.

## When Not To Use

An accessible progress widget without additional native/ARIA semantics.

## Props

See progress-bar.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| determinate | alias | Base style; no switch |
| compact | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Interactive controls need visible focus and keyboard access.
- Color must not be the only means of communication.

## Examples

See examples.json and progress-bar.html.

## Maintained contract and standalone example

Use: Draw a horizontal completion fill.

Avoid: An accessible progress widget without additional native/ARIA semantics.

See [contract](progress-bar.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
