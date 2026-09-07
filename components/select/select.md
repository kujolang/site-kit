# Select

## Purpose

A native select control with label and options.

## When To Use

Capture a choice with a native select.

## When Not To Use

An async combobox or custom select listbox.

## Props

See select.schema.json for the source contract.

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

See examples.json and select.html.

## Maintained contract and standalone example

Use: Capture a choice with a native select.

Avoid: An async combobox or custom select listbox.

See [contract](select.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
