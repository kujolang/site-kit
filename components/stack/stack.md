# Stack

## Purpose

A vertical layout primitive for consistent spacing.

## When To Use

Display vertically spaced child panels with borders and padding.

## When Not To Use

Assuming sk-stack and sk-stack-component are identical.

## Props

See stack.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| default | alias | Base style; no switch |
| compact | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Interactive controls need visible focus and keyboard access.
- Color must not be the only means of communication.

## Examples

See examples.json and stack.html.

## Maintained contract and standalone example

Use: Display vertically spaced child panels with borders and padding.

Avoid: Assuming sk-stack and sk-stack-component are identical.

See [contract](stack.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
