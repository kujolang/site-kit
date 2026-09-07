# Stats Bar

## Purpose

A semantic metric strip for proof points, performance numbers, or portfolio counters.

## When To Use

Present metrics as a definition list with strong numeric typography.

## When Not To Use

Live analytics or verified product statistics.

## Props

See stats-bar.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| inline | alias | Base style; no switch |
| boxed | alias | Base style; no switch |
| stacked | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Keyboard access, visible focus, and accessible names are required for interactive descendants.
- Color must not be the only means of communication.

## Legacy Source Coverage

- old-components/testing-stats-1.html
- old-components/testing3.html

## Agent Usage Notes

- Read stats-bar.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Preserve square geometry and SiteKit typography instead of restoring legacy decorative styles.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and stats-bar.html.

## Maintained contract and standalone example

Use: Present metrics as a definition list with strong numeric typography.

Avoid: Live analytics or verified product statistics.

See [contract](stats-bar.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
