# Fieldset

## Purpose

A grouped set of form controls with a legend.

## When To Use

Group native related form controls with a legend.

## When Not To Use

A generic visual card without grouped form meaning.

## Props

See fieldset.schema.json for the source contract.

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

See examples.json and fieldset.html.

## Maintained contract and standalone example

Use: Group native related form controls with a legend.

Avoid: A generic visual card without grouped form meaning.

See [contract](fieldset.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
