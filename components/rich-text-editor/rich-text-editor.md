# Rich Text Editor

## Purpose

A text editing surface with formatting controls.

## When To Use

Edit a small named text fragment with selected-text bold, italic and safe links.

## When Not To Use

A full document editor, rich HTML paste, media embeds or collaborative editing.

## Props

See rich-text-editor.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| basic | alias | Base style; no switch |
| compact | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Interactive controls need visible focus and keyboard access.
- Color must not be the only means of communication.

## Examples

See examples.json and rich-text-editor.html.

## Maintained contract and standalone example

Use: Edit a small named text fragment with selected-text bold, italic and safe links.

Avoid: A full document editor, rich HTML paste, media embeds or collaborative editing.

See [contract](rich-text-editor.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
