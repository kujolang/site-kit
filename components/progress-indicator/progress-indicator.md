# Progress Indicator

## Purpose

A compact step or status indicator for multi-step flows.

## When To Use

Show an ordered sequence of workflow steps.

## When Not To Use

Automatic step validation or navigation.

## Props

See progress-indicator.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| steps | alias | Base style; no switch |
| compact | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Interactive controls need visible focus and keyboard access.
- Color must not be the only means of communication.

## Examples

See examples.json and progress-indicator.html.

## Maintained contract and standalone example

Use: Show an ordered sequence of workflow steps.

Avoid: Automatic step validation or navigation.

See [contract](progress-indicator.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
