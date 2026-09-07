# Trust Strip

## Purpose

A compact proof row for security, shipping, warranties, or social proof.

## When To Use

Display a compact grid of named trust/delivery claims.

## When Not To Use

Real compliance, uptime or refund evidence.

## Props

See trust-strip.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| default | alias | Base style; no switch |
| compact | alias | Base style; no switch |
| bordered | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Preserve semantic text structure and slotted interactive focus.
- Color must not be the only means of communication.

## Agent Usage Notes

- Read trust-strip.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and trust-strip.html.

## Maintained contract and standalone example

Use: Display a compact grid of named trust/delivery claims.

Avoid: Real compliance, uptime or refund evidence.

See [contract](trust-strip.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
