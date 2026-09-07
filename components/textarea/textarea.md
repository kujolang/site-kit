# Textarea

## Purpose

A multi-line text input with label and help text.

## When To Use

Capture multiline native text with label and minimum height.

## When Not To Use

Rich-text formatting or autoresize behavior.

## Props

See textarea.schema.json for the source contract.

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

See examples.json and textarea.html.

## Maintained contract and standalone example

Use: Capture multiline native text with label and minimum height.

Avoid: Rich-text formatting or autoresize behavior.

See [contract](textarea.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
