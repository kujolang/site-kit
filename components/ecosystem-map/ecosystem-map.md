# Ecosystem Map

## Purpose

A semantic map of projects, packages, docs, and relationships.

## When To Use

Display ecosystem nodes as a responsive grid of authored cards.

## When Not To Use

A force graph, radial layout engine or relationship visualization.

## Props

See ecosystem-map.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| grid | alias | Base style; no switch |
| radial | alias | Base style; no switch |
| compact | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Keyboard access, visible focus, and accessible names are required.
- Color must not be the only means of communication.

## Agent Usage Notes

- Read ecosystem-map.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and ecosystem-map.html.

## Maintained contract and standalone example

Use: Display ecosystem nodes as a responsive grid of authored cards.

Avoid: A force graph, radial layout engine or relationship visualization.

See [contract](ecosystem-map.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
