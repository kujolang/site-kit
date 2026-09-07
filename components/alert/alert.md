# Alert

## Purpose

A status message for success, warning, error, or neutral feedback.

## When To Use

Show a status notice with an exclamation marker and optional severity colors.

## When Not To Use

A blocking dialog or automatically dismissing notification.

## Props

See alert.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| neutral | implemented | [data-variant="neutral"] |
| compact | alias | Base style; no switch |
| danger | implemented | [data-variant="danger"] |
| warning | implemented | [data-variant="warning"] |
| success | implemented | [data-variant="success"] |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Interactive controls need visible focus and keyboard access.
- Color must not be the only means of communication.

## Examples

See examples.json and alert.html.

## Maintained contract and standalone example

Use: Show a status notice with an exclamation marker and optional severity colors.

Avoid: A blocking dialog or automatically dismissing notification.

See [contract](alert.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
