# Visually Hidden

## Purpose

A utility wrapper for content available to assistive technology only.

## When To Use

Keep noninteractive descriptive text available to assistive technology.

## When Not To Use

Hiding focusable controls that must become visible on focus.

## Props

See visually-hidden.schema.json for the source contract.

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

See examples.json and visually-hidden.html.

## Maintained contract and standalone example

Use: Keep noninteractive descriptive text available to assistive technology.

Avoid: Hiding focusable controls that must become visible on focus.

See [contract](visually-hidden.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
