# Testimonial Rail

## Purpose

A scroll-safe testimonial layout for customer quotes and builder proof.

## When To Use

Present quote figures with attributions in a grid.

## When Not To Use

An animated testimonial carousel.

## Props

See testimonial-rail.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| rail | alias | Base style; no switch |
| grid | alias | Base style; no switch |
| featured | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Keyboard access, visible focus, and accessible names are required for interactive descendants.
- Color must not be the only means of communication.

## Legacy Source Coverage

- old-components/testing-testimonials-1.html

## Agent Usage Notes

- Read testimonial-rail.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Preserve square geometry and SiteKit typography instead of restoring legacy decorative styles.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and testimonial-rail.html.

## Maintained contract and standalone example

Use: Present quote figures with attributions in a grid.

Avoid: An animated testimonial carousel.

See [contract](testimonial-rail.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
