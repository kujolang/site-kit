# Stats Bar

## Purpose

A semantic metric strip for proof points, performance numbers, or portfolio counters.

## When To Use

Use Stats Bar when the page needs this legacy-informed pattern as a reusable, token-driven SiteKit component.

## When Not To Use

Do not use Stats Bar to bypass semantic structure, heading order, token usage, or accessibility behavior.

## Props

See stats-bar.schema.json for the source contract.

## Variants

- inline
- boxed
- stacked

## Accessibility Notes

- Prefer native HTML before ARIA.
- Keyboard access, visible focus, and accessible names are required for interactive descendants.
- Color must not be the only means of communication.

## Legacy Source Coverage

- old-components/testing-stats-1.html
- old-components/testing3.html

## Agent Usage Notes

- Read stats-bar.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Preserve square geometry and SiteKit typography instead of restoring legacy decorative styles.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and stats-bar.html.
