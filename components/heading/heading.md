# Heading

## Purpose

A typographic heading pattern with optional supporting text.

## When To Use

Group an eyebrow, h2 and supporting metadata.

## When Not To Use

An automatic level/size heading API.

## Props

See heading.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| section | alias | Base style; no switch |
| compact | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Interactive controls need visible focus and keyboard access.
- Color must not be the only means of communication.

## Examples

See examples.json and heading.html.

## Maintained contract and standalone example

Use: Group an eyebrow, h2 and supporting metadata.

Avoid: An automatic level/size heading API.

See [contract](heading.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
