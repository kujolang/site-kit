# Tree View

## Purpose

A hierarchical navigation or selection tree.

## When To Use

Nested navigation with branch disclosure buttons. Tab visits native buttons and links; no ARIA tree widget.

## When Not To Use

An ARIA tree widget with arrow-key navigation.

## Props

See tree-view.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| default | alias | Base style; no switch |
| compact | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Interactive controls need visible focus and keyboard access.
- Color must not be the only means of communication.

## Examples

See examples.json and tree-view.html.

## Maintained contract and standalone example

Use: Nested navigation with branch disclosure buttons. Tab visits native buttons and links; no ARIA tree widget.

Avoid: An ARIA tree widget with arrow-key navigation.

See [contract](tree-view.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
