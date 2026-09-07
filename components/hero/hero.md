# Hero

## Purpose

A first-viewport introduction for product, documentation, and launch pages.

## When To Use

Present a large centered heading, explanation and action row.

## When Not To Use

A complete responsive marketing page or rich media renderer.

## Props

See hero.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| split | implemented | [data-layout="split"] |
| centered | implemented | [data-layout="centered"] |
| technical | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Preserve semantic text structure and slotted interactive focus.
- Color must not be the only means of communication.

## Legacy Source Coverage

- old-components/testing-hero-1.html
- old-components/testing-hero-2.html
- old-components/testing-hero-3.html
- old-components/testing-hero-4.html
- old-components/testing-hero-5.html
- old-components/testing-hero-6.html
- old-components/testing-hero-7.html
- old-components/testing-hero-8.html

## Agent Usage Notes

- Read hero.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and hero.html.

## Maintained contract and standalone example

Use: Present a large centered heading, explanation and action row.

Avoid: A complete responsive marketing page or rich media renderer.

See [contract](hero.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
