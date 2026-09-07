# Stepper

## Purpose

A numeric input with increment and decrement actions.

## When To Use

Adjust a native number input with bounded increment and decrement controls.

## When Not To Use

Arbitrary numeric expressions or multi-value input.

## Props

See stepper.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| number | alias | Base style; no switch |
| compact | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Interactive controls need visible focus and keyboard access.
- Color must not be the only means of communication.

## Examples

See examples.json and stepper.html.

## Maintained contract and standalone example

Use: Adjust a native number input with bounded increment and decrement controls.

Avoid: Arbitrary numeric expressions or multi-value input.

See [contract](stepper.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
