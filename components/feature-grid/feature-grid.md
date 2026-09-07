# Feature Grid

## Purpose

A responsive list of capabilities or benefits.

## When To Use

Arrange feature articles with marker boxes in an intrinsic grid.

## When Not To Use

An enforced two/three-column prop runtime.

## Props

See feature-grid.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| two-column | alias | Base style; no switch |
| three-column | alias | Base style; no switch |
| dense | implemented | [data-density="dense"] |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Preserve semantic text structure and slotted interactive focus.
- Color must not be the only means of communication.

## Legacy Source Coverage

- old-components/testing-features-1.html

## Agent Usage Notes

- Read feature-grid.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and feature-grid.html.

## Maintained contract and standalone example

Use: Arrange feature articles with marker boxes in an intrinsic grid.

Avoid: An enforced two/three-column prop runtime.

See [contract](feature-grid.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
