# Checkout Summary

## Purpose

A commerce order summary with totals, taxes, discounts, and trust metadata.

## When To Use

Display items and a definition list of totals with checkout actions.

## When Not To Use

Payment processing or automatic totals computation.

## Props

See checkout-summary.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| default | alias | Base style; no switch |
| compact | alias | Base style; no switch |
| sticky | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Keyboard access, visible focus, and accessible names are required.
- Color must not be the only means of communication.

## Agent Usage Notes

- Read checkout-summary.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and checkout-summary.html.

## Maintained contract and standalone example

Use: Display items and a definition list of totals with checkout actions.

Avoid: Payment processing or automatic totals computation.

See [contract](checkout-summary.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
