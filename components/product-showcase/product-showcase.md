# Product Showcase

## Purpose

A compact commerce or template showcase adapted from legacy landing-page demos.

## When To Use

Compose a featured product, media placeholder and supporting offers.

## When Not To Use

A product gallery or interactive commerce backend.

## Props

See product-showcase.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| template | alias | Base style; no switch |
| commerce | alias | Base style; no switch |
| editorial | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Keyboard access, visible focus, and accessible names are required for interactive descendants.
- Color must not be the only means of communication.

## Legacy Source Coverage

- old-components/testing.html
- old-components/testing2.html
- old-components/testing4.html

## Agent Usage Notes

- Read product-showcase.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Preserve square geometry and SiteKit typography instead of restoring legacy decorative styles.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and product-showcase.html.

## Maintained contract and standalone example

Use: Compose a featured product, media placeholder and supporting offers.

Avoid: A product gallery or interactive commerce backend.

See [contract](product-showcase.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
