# Text Input

## Purpose

A single-line text input with a visible label.

## When To Use

Capture short text with an explicit label.

## When Not To Use

An autocomplete, validator or form-state manager.

## Props

See text-input.schema.json for the source contract.

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

See examples.json and text-input.html.

## Maintained contract and standalone example

Use: Capture short text with an explicit label.

Avoid: An autocomplete, validator or form-state manager.

See [contract](text-input.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
