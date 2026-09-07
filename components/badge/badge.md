# Badge

## Purpose

A compact status, category, or metadata label.

## When To Use

Add compact text status labels.

## When Not To Use

An interactive control or status conveyed only by color.

## Props

See badge.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| neutral | alias | Base style; no switch |
| success | implemented | [data-variant="success"] |
| warning | implemented | [data-variant="warning"] |
| danger | implemented | [data-variant="danger"] |
| outline | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Preserve semantic text structure and slotted interactive focus.
- Color must not be the only means of communication.

## Agent Usage Notes

- Read badge.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and badge.html.

## Maintained contract and standalone example

Use: Add compact text status labels.

Avoid: An interactive control or status conveyed only by color.

See [contract](badge.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
