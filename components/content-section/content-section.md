# Content Section

## Purpose

A responsive editorial section with copy, actions, and an optional media or proof panel.

## When To Use

Use Content Section when the page needs this legacy-informed pattern as a reusable, token-driven SiteKit component.

## When Not To Use

Do not use Content Section to bypass semantic structure, heading order, token usage, or accessibility behavior.

## Props

See content-section.schema.json for the source contract.

## Variants

- media-right
- media-left
- centered
- compact

## Accessibility Notes

- Prefer native HTML before ARIA.
- Keyboard access, visible focus, and accessible names are required for interactive descendants.
- Color must not be the only means of communication.

## Legacy Source Coverage

- old-components/testing-content-1.html
- old-components/testing-content-2.html
- old-components/testing-content-3.html
- old-components/testing-content-5.html

## Agent Usage Notes

- Read content-section.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Preserve square geometry and SiteKit typography instead of restoring legacy decorative styles.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and content-section.html.
