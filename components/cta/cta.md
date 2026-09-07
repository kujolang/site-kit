# CTA

## Purpose

A conversion block with a clear next action.

## When To Use

Group a call-to-action headline, supporting copy and action row.

## When Not To Use

A form submission service or automatic action renderer.

## Props

See cta.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| band | alias | Base style; no switch |
| inline | alias | Base style; no switch |
| stacked | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Keyboard access, visible focus, and accessible names are required.
- Color must not be the only means of communication.

## Legacy Source Coverage

- old-components/testing-cta-1.html
- old-components/testing-cta-2.html
- old-components/testing-cta-3.html
- old-components/testing-cta-4.html
- old-components/testing-cta-5.html

## Agent Usage Notes

- Read cta.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and cta.html.

## Maintained contract and standalone example

Use: Group a call-to-action headline, supporting copy and action row.

Avoid: A form submission service or automatic action renderer.

See [contract](cta.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
