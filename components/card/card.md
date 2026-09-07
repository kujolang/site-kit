# Card

## Purpose

A bounded content region for a single object, summary, or grouped action.

## When To Use

Group a heading, explanatory body and actions in a framed section.

## When Not To Use

A clickable whole-card interaction without a real link.

## Props

See card.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| plain | alias | Base style; no switch |
| interactive | composition | card-interactive |
| dense | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Keyboard access, visible focus, and accessible names are required.
- Color must not be the only means of communication.

## Agent Usage Notes

- Read card.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and card.html.

## Maintained contract and standalone example

Use: Group a heading, explanatory body and actions in a framed section.

Avoid: A clickable whole-card interaction without a real link.

See [contract](card.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
