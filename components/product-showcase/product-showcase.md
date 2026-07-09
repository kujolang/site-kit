# Product Showcase

## Purpose

A compact commerce or template showcase adapted from legacy landing-page demos.

## When To Use

Use Product Showcase when the page needs this legacy-informed pattern as a reusable, token-driven SiteKit component.

## When Not To Use

Do not use Product Showcase to bypass semantic structure, heading order, token usage, or accessibility behavior.

## Props

See product-showcase.schema.json for the source contract.

## Variants

- template
- commerce
- editorial

## Accessibility Notes

- Prefer native HTML before ARIA.
- Keyboard access, visible focus, and accessible names are required for interactive descendants.
- Color must not be the only means of communication.

## Legacy Source Coverage

- old-components/testing.html
- old-components/testing2.html
- old-components/testing4.html

## Agent Usage Notes

- Read product-showcase.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Preserve square geometry and SiteKit typography instead of restoring legacy decorative styles.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and product-showcase.html.
