# Code Block

## Purpose

A readable code or command block with caption and copy action.

## When To Use

Present readable source text with optional exact-text copy and keyboard scrolling.

## When Not To Use

A syntax highlighter, editor or arbitrary-code runner.

## Props

See code-block.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| default | alias | Base style; no switch |
| terminal | alias | Base style; no switch |
| numbered | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Keyboard access, visible focus, and accessible names are required.
- Color must not be the only means of communication.

## Agent Usage Notes

- Read code-block.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and code-block.html.

## Maintained contract and standalone example

Use: Present readable source text with optional exact-text copy and keyboard scrolling.

Avoid: A syntax highlighter, editor or arbitrary-code runner.

See [contract](code-block.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
