# Empty State

## Purpose

A clear message for empty collections with optional recovery action.

## When To Use

Explain an empty collection and offer a next action.

## When Not To Use

A loading indicator or unexplained decorative blank.

## Props

See empty-state.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| default | alias | Base style; no switch |
| compact | alias | Base style; no switch |
| commerce | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Keyboard access, visible focus, and accessible names are required.
- Color must not be the only means of communication.

## Agent Usage Notes

- Read empty-state.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and empty-state.html.

## Maintained contract and standalone example

Use: Explain an empty collection and offer a next action.

Avoid: A loading indicator or unexplained decorative blank.

See [contract](empty-state.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
