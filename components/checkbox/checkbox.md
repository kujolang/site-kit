# Checkbox

## Purpose

A binary input that can be checked or unchecked.

## When To Use

Capture a native boolean choice with a wrapping label.

## When Not To Use

A radio group or custom tri-state widget.

## Props

See checkbox.schema.json for the source contract.

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

See examples.json and checkbox.html.

## Maintained contract and standalone example

Use: Capture a native boolean choice with a wrapping label.

Avoid: A radio group or custom tri-state widget.

See [contract](checkbox.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
