# Metadata Panel

## Purpose

A compact key-value panel for operational metadata and object facts.

## When To Use

Present labeled key/value rows in a definition list.

## When Not To Use

A JSON parser or automatically generated inspector.

## Props

See metadata-panel.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| default | alias | Base style; no switch |
| compact | alias | Base style; no switch |
| sidecar | alias | Base style; no switch |

## Accessibility Notes

- Prefer description-list markup for key-value facts.
- Keep row labels explicit.
- Interactive slotted content must retain visible focus.

## Agent Usage Notes

- Read metadata-panel.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and metadata-panel.html.

## Maintained contract and standalone example

Use: Present labeled key/value rows in a definition list.

Avoid: A JSON parser or automatically generated inspector.

See [contract](metadata-panel.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
