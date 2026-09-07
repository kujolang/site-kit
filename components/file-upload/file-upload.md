# File Upload

## Purpose

A file input drop area with a clear label.

## When To Use

Expose a native file chooser in a dashed frame.

## When Not To Use

A built-in upload client, dropzone or validation pipeline.

## Props

See file-upload.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| dropzone | alias | Base style; no switch |
| compact | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Interactive controls need visible focus and keyboard access.
- Color must not be the only means of communication.

## Examples

See examples.json and file-upload.html.

## Maintained contract and standalone example

Use: Expose a native file chooser in a dashed frame.

Avoid: A built-in upload client, dropzone or validation pipeline.

See [contract](file-upload.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
