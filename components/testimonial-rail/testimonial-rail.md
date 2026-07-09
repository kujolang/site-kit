# Testimonial Rail

## Purpose

A scroll-safe testimonial layout for customer quotes and builder proof.

## When To Use

Use Testimonial Rail when the page needs this legacy-informed pattern as a reusable, token-driven SiteKit component.

## When Not To Use

Do not use Testimonial Rail to bypass semantic structure, heading order, token usage, or accessibility behavior.

## Props

See testimonial-rail.schema.json for the source contract.

## Variants

- rail
- grid
- featured

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
