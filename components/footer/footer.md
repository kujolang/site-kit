# Footer

## Purpose

A semantic page footer for navigation, metadata, and legal links.

## When To Use

Compose brand, links and legal text in a wrapping footer.

## When Not To Use

An automatic multi-column sitemap renderer.

## Props

See footer.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| simple | alias | Base style; no switch |
| columns | alias | Base style; no switch |
| product | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Preserve semantic text structure and slotted interactive focus.
- Color must not be the only means of communication.

## Legacy Source Coverage

- old-components/testing-footer-1.html
- old-components/testing-footer-2.html
- old-components/testing-footer-3.html
- old-components/testing-footer-4.html
- old-components/testing-footer-5.html
- old-components/testing-footer-6.html
- old-components/testing-footer-7.html
- old-components/testing-footer-8.html
- old-components/testing-footer-9.html
- old-components/testing-footer-10.html

## Agent Usage Notes

- Read footer.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and footer.html.

## Maintained contract and standalone example

Use: Compose brand, links and legal text in a wrapping footer.

Avoid: An automatic multi-column sitemap renderer.

See [contract](footer.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
