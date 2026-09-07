# Command Strip

## Purpose

A compact operational metric strip for status, filters, or system state.

## When To Use

Display compact single-line metadata cells in a responsive strip.

## When Not To Use

A command palette or keyboard launcher.

## Props

See command-strip.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| default | alias | Base style; no switch |
| compact | alias | Base style; no switch |
| four-up | alias | Base style; no switch |

## Accessibility Notes

- Use an accessible label when the strip needs context.
- Keep each item concise so truncation does not hide critical meaning.
- Interactive slotted content must retain visible focus.

## Agent Usage Notes

- Read command-strip.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and command-strip.html.

## Maintained contract and standalone example

Use: Display compact single-line metadata cells in a responsive strip.

Avoid: A command palette or keyboard launcher.

See [contract](command-strip.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
