# Bento Grid

## Purpose

A square-cornered modular grid for grouped capabilities, proof points, or portfolio services.

## When To Use

Use Bento Grid when the page needs this legacy-informed pattern as a reusable, token-driven SiteKit component.

## When Not To Use

Do not use Bento Grid to bypass semantic structure, heading order, token usage, or accessibility behavior.

## Props

See bento-grid.schema.json for the source contract.

## Variants

- portfolio
- balanced
- showcase
- dense

## Accessibility Notes

- Prefer native HTML before ARIA.
- Keyboard access, visible focus, and accessible names are required for interactive descendants.
- Color must not be the only means of communication.

## Legacy Source Coverage

- old-components/bento-grid-7.html
- old-components/testing-bento-1.html
- old-components/testing-bento-1-bootstrap.html
- old-components/testing-bento-grid-2.html
- old-components/testing-bento-grid-3.html
- old-components/testing-bento-grid-4.html
- old-components/testing-bento-grid-5.html
- old-components/testing-bento-grid-6.html
- old-components/testing-bento-grid-7.html

## Agent Usage Notes

- Read bento-grid.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Preserve square geometry and SiteKit typography instead of restoring legacy decorative styles.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and bento-grid.html.
