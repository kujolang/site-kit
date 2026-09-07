# Header

## Purpose

A top-level site header with navigation and primary action.

## When To Use

Build a branded wrapping header with primary links and actions.

## When Not To Use

A ready-made mobile hamburger or sticky sidebar shell.

## Props

See header.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| default | alias | Base style; no switch |
| docs | alias | Base style; no switch |
| commerce | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Keyboard access, visible focus, and accessible names are required.
- Color must not be the only means of communication.

## Legacy Source Coverage

- old-components/testing-header-1.html
- old-components/testing-header-2.html
- old-components/testing-header-3.html
- old-components/testing-header-4.html
- old-components/testing-header-5.html
- old-components/testing-header-6.html
- old-components/testing-header-7.html
- old-components/testing-header-8.html

## Agent Usage Notes

- Read header.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and header.html.

## Maintained contract and standalone example

Use: Build a branded wrapping header with primary links and actions.

Avoid: A ready-made mobile hamburger or sticky sidebar shell.

See [contract](header.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
