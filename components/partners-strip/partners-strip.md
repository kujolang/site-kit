# Partners Strip

## Purpose

A logo or partner proof row with semantic list structure and theme-safe styling.

## When To Use

Lay out partner names or consumer-provided logos in an intrinsic grid.

## When Not To Use

Evidence of actual endorsements or a bundled logo collection.

## Props

See partners-strip.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| logos | alias | Base style; no switch |
| boxed | alias | Base style; no switch |
| compact | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Keyboard access, visible focus, and accessible names are required for interactive descendants.
- Color must not be the only means of communication.

## Legacy Source Coverage

- old-components/testing-partners-1.html

## Agent Usage Notes

- Read partners-strip.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Preserve square geometry and SiteKit typography instead of restoring legacy decorative styles.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and partners-strip.html.

## Maintained contract and standalone example

Use: Lay out partner names or consumer-provided logos in an intrinsic grid.

Avoid: Evidence of actual endorsements or a bundled logo collection.

See [contract](partners-strip.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
