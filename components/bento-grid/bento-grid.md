# Bento Grid

## Purpose

A square-cornered modular grid for grouped capabilities, proof points, or portfolio services.

## When To Use

Arrange an intro and unevenly spanning feature panels.

## When Not To Use

Arbitrary item counts without testing explicit grid placement.

## Props

See bento-grid.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| portfolio | alias | Base style; no switch |
| balanced | alias | Base style; no switch |
| showcase | alias | Base style; no switch |
| dense | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Keyboard access, visible focus, and accessible names are required for interactive descendants.
- Color must not be the only means of communication.

## Legacy Source Coverage

- old-components/bento-grid-7.html
- old-components/testing-bento-1.html
- old-components/testing-bento-1-bootstrap.html
- old-components/testing-bento-grid-2.html
- old-components/testing-bento-grid-3.html
- old-components/testing-bento-grid-4.html
- old-components/testing-bento-grid-5.html
- old-components/testing-bento-grid-6.html
- old-components/testing-bento-grid-7.html

## Agent Usage Notes

- Read bento-grid.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Preserve square geometry and SiteKit typography instead of restoring legacy decorative styles.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and bento-grid.html.

## Maintained contract and standalone example

Use: Arrange an intro and unevenly spanning feature panels.

Avoid: Arbitrary item counts without testing explicit grid placement.

See [contract](bento-grid.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
