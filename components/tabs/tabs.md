# Tabs

## Purpose

A keyboard navigable view switcher for related panels.

## When To Use

Switch related local panels with automatic or manual keyboard activation.

## When Not To Use

Navigation to unrelated pages or panels without associated tabs.

## Props

See tabs.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| line | alias | Base style; no switch |
| boxed | alias | Base style; no switch |
| docs | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Keyboard access, visible focus, and accessible names are required.
- Color must not be the only means of communication.

## Agent Usage Notes

- Read tabs.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and tabs.html.

## Maintained contract and standalone example

Use: Switch related local panels with automatic or manual keyboard activation.

Avoid: Navigation to unrelated pages or panels without associated tabs.

See [contract](tabs.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
