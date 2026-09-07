# Label

## Purpose

A compact text label for form fields or metadata.

## When To Use

Label an associated native form control.

## When Not To Use

A generic caption or label with no target control.

## Props

See label.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| field | alias | Base style; no switch |
| compact | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Interactive controls need visible focus and keyboard access.
- Color must not be the only means of communication.

## Examples

See examples.json and label.html.

## Maintained contract and standalone example

Use: Label an associated native form control.

Avoid: A generic caption or label with no target control.

See [contract](label.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
