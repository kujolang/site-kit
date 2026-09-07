# Segmented Control

## Purpose

A compact grouped control for switching modes.

## When To Use

Choose one mode using mutually exclusive pressed buttons.

## When Not To Use

Tab panels or a menu with independent actions.

## Props

See segmented-control.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| single-select | alias | Base style; no switch |
| compact | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Interactive controls need visible focus and keyboard access.
- Color must not be the only means of communication.

## Examples

See examples.json and segmented-control.html.

## Maintained contract and standalone example

Use: Choose one mode using mutually exclusive pressed buttons.

Avoid: Tab panels or a menu with independent actions.

See [contract](segmented-control.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
