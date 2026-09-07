# Form Field

## Purpose

A labeled input group with help, validation, and autocomplete support.

## When To Use

Associate a label, native control and help description.

## When Not To Use

Automatic validation or rendering a control prop.

## Props

See form-field.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| text | alias | Base style; no switch |
| select | composition | form-field-select |
| textarea | composition | form-field-textarea |
| checkbox | composition | form-field-checkbox |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Keyboard access, visible focus, and accessible names are required.
- Color must not be the only means of communication.

## Agent Usage Notes

- Read form-field.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and form-field.html.

## Maintained contract and standalone example

Use: Associate a label, native control and help description.

Avoid: Automatic validation or rendering a control prop.

See [contract](form-field.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
