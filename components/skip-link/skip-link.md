# Skip Link

## Purpose

An accessible link for skipping directly to page content.

## When To Use

Let keyboard users jump to the main region.

## When Not To Use

A hidden link whose target is missing or not useful.

## Props

See skip-link.schema.json for the source contract.

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

See examples.json and skip-link.html.

## Maintained contract and standalone example

Use: Let keyboard users jump to the main region.

Avoid: A hidden link whose target is missing or not useful.

See [contract](skip-link.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
