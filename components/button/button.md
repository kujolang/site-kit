# Button

## Purpose

A semantic action control for links, form submits, and interface commands.

## When To Use

Trigger an action using a native button, or style a navigation anchor.

## When Not To Use

A div acting as a button or an aria-disabled anchor assumed inert.

## Props

See button.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| primary | alias | Base style; no switch |
| secondary | implemented | [data-variant="secondary"] |
| ghost | implemented | [data-variant="ghost"] |
| danger | implemented | [data-variant="danger"] |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Keyboard access, visible focus, and accessible names are required.
- Color must not be the only means of communication.

## Legacy Source Coverage

- old-components/testing-buttons.html

## Agent Usage Notes

- Read button.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and button.html.

## Maintained contract and standalone example

Use: Trigger an action using a native button, or style a navigation anchor.

Avoid: A div acting as a button or an aria-disabled anchor assumed inert.

See [contract](button.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
