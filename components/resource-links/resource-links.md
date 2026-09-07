# Resource Links

## Purpose

A compact link collection for docs, examples, templates, and external references.

## When To Use

Group descriptive resource links in an intrinsic grid.

## When Not To Use

An automatic link crawler or search index.

## Props

See resource-links.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| grid | alias | Base style; no switch |
| stack | alias | Base style; no switch |
| annotated | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Keyboard access, visible focus, and accessible names are required for interactive descendants.
- Color must not be the only means of communication.

## Legacy Source Coverage

- old-components/testing-resources-1.html

## Agent Usage Notes

- Read resource-links.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Preserve square geometry and SiteKit typography instead of restoring legacy decorative styles.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and resource-links.html.

## Maintained contract and standalone example

Use: Group descriptive resource links in an intrinsic grid.

Avoid: An automatic link crawler or search index.

See [contract](resource-links.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
