# Combobox

## Purpose

An autocomplete text input paired with suggested options.

## When To Use

Filter and select one supplied local option using the optional keyboard controller.

## When Not To Use

Remote loading, multiple selection or an application search service.

## Props

See combobox.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| autocomplete | alias | Base style; no switch |
| compact | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Interactive controls need visible focus and keyboard access.
- Color must not be the only means of communication.

## Examples

See examples.json and combobox.html.

## Maintained contract and standalone example

Use: Filter and select one supplied local option using the optional keyboard controller.

Avoid: Remote loading, multiple selection or an application search service.

See [contract](combobox.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
