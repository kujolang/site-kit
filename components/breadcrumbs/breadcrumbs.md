# Breadcrumbs

## Purpose

A navigational trail that shows the current page location.

## When To Use

Represent a hierarchy as an ordered navigation trail.

## When Not To Use

Primary navigation or an automatically generated router trail.

## Props

See breadcrumbs.schema.json for the source contract.

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

See examples.json and breadcrumbs.html.

## Maintained contract and standalone example

Use: Represent a hierarchy as an ordered navigation trail.

Avoid: Primary navigation or an automatically generated router trail.

See [contract](breadcrumbs.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
