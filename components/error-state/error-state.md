# Error State

## Purpose

A recoverable error message with next steps and support context.

## When To Use

Explain a recoverable failure and show retry/review actions.

## When Not To Use

An automatic error boundary or network retry implementation.

## Props

See error-state.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| default | alias | Base style; no switch |
| inline | alias | Base style; no switch |
| critical | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Keyboard access, visible focus, and accessible names are required.
- Color must not be the only means of communication.

## Agent Usage Notes

- Read error-state.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and error-state.html.

## Maintained contract and standalone example

Use: Explain a recoverable failure and show retry/review actions.

Avoid: An automatic error boundary or network retry implementation.

See [contract](error-state.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
