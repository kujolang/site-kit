# Pricing Table

## Purpose

A commercial pricing comparison layout with plans and features.

## When To Use

Compare plans in a captioned table with row and column headers.

## When Not To Use

Billing logic, plan selection or cadence switching.

## Props

See pricing-table.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| monthly | alias | Base style; no switch |
| annual | alias | Base style; no switch |
| comparison | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Keyboard access, visible focus, and accessible names are required.
- Color must not be the only means of communication.

## Legacy Source Coverage

- old-components/testing-pricing-1.html
- old-components/testing-pricing-2.html
- old-components/testing-pricing-3.html
- old-components/testing-pricing-4.html

## Agent Usage Notes

- Read pricing-table.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and pricing-table.html.

## Maintained contract and standalone example

Use: Compare plans in a captioned table with row and column headers.

Avoid: Billing logic, plan selection or cadence switching.

See [contract](pricing-table.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
