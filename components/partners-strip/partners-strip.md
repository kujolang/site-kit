# Partners Strip

## Purpose

A logo or partner proof row with semantic list structure and theme-safe styling.

## When To Use

Use Partners Strip when the page needs this legacy-informed pattern as a reusable, token-driven SiteKit component.

## When Not To Use

Do not use Partners Strip to bypass semantic structure, heading order, token usage, or accessibility behavior.

## Props

See partners-strip.schema.json for the source contract.

## Variants

- logos
- boxed
- compact

## Accessibility Notes

- Prefer native HTML before ARIA.
- Keyboard access, visible focus, and accessible names are required for interactive descendants.
- Color must not be the only means of communication.

## Legacy Source Coverage

- old-components/testing-partners-1.html

## Agent Usage Notes

- Read partners-strip.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Preserve square geometry and SiteKit typography instead of restoring legacy decorative styles.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and partners-strip.html.
