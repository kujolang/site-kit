# Team Grid

## Purpose

A responsive people grid for profiles, roles, and compact bios.

## When To Use

Arrange profile summaries in an intrinsic grid.

## When Not To Use

A directory service or avatar loader.

## Props

See team-grid.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| profiles | alias | Base style; no switch |
| compact | alias | Base style; no switch |
| leadership | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Keyboard access, visible focus, and accessible names are required for interactive descendants.
- Color must not be the only means of communication.

## Legacy Source Coverage

- old-components/testing-our-team-1.html

## Agent Usage Notes

- Read team-grid.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Preserve square geometry and SiteKit typography instead of restoring legacy decorative styles.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and team-grid.html.

## Maintained contract and standalone example

Use: Arrange profile summaries in an intrinsic grid.

Avoid: A directory service or avatar loader.

See [contract](team-grid.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
