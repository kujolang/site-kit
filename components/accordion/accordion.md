# Accordion

## Purpose

A stacked disclosure control for expandable sections.

## When To Use

Group native details/summary disclosures for FAQs.

## When Not To Use

Essential information hidden by default or a scripted tree.

## Props

See accordion.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| faq | alias | Base style; no switch |
| compact | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Interactive controls need visible focus and keyboard access.
- Color must not be the only means of communication.

## Examples

See examples.json and accordion.html.

## Maintained contract and standalone example

Use: Group native details/summary disclosures for FAQs.

Avoid: Essential information hidden by default or a scripted tree.

See [contract](accordion.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
