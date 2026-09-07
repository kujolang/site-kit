# Roadmap

## Purpose

A chronological product timeline for milestones, launches, and upcoming work.

## When To Use

Display an ordered milestone timeline with dates.

## When Not To Use

A scheduling engine or current release plan.

## Props

See roadmap.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| timeline | alias | Base style; no switch |
| compact | alias | Base style; no switch |
| release-plan | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Keyboard access, visible focus, and accessible names are required for interactive descendants.
- Color must not be the only means of communication.

## Legacy Source Coverage

- old-components/tessting-roadmap-1.html

## Agent Usage Notes

- Read roadmap.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Preserve square geometry and SiteKit typography instead of restoring legacy decorative styles.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and roadmap.html.

## Maintained contract and standalone example

Use: Display an ordered milestone timeline with dates.

Avoid: A scheduling engine or current release plan.

See [contract](roadmap.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
