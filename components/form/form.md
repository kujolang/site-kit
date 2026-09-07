# Form

## Purpose

A semantic form layout for labeled controls and actions.

## When To Use

Compose labeled native email and message controls with submit.

## When Not To Use

A schema-driven form builder or backend integration.

## Props

See form.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| stacked | alias | Base style; no switch |
| compact | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Interactive controls need visible focus and keyboard access.
- Color must not be the only means of communication.

## Examples

See examples.json and form.html.

## Maintained contract and standalone example

Use: Compose labeled native email and message controls with submit.

Avoid: A schema-driven form builder or backend integration.

See [contract](form.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
