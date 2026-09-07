# Toast

## Purpose

A non-modal notification for transient feedback.

## When To Use

Announce application-inserted status in a live region with explicit dismissal.

## When Not To Use

Essential persistent instructions or time-critical information that disappears.

## Props

See toast.schema.json for the source contract.

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

See examples.json and toast.html.

## Maintained contract and standalone example

Use: Announce application-inserted status in a live region with explicit dismissal.

Avoid: Essential persistent instructions or time-critical information that disappears.

See [contract](toast.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
