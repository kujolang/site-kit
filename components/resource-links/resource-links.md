# Resource Links

## Purpose

A compact link collection for docs, examples, templates, and external references.

## When To Use

Use Resource Links when the page needs this legacy-informed pattern as a reusable, token-driven SiteKit component.

## When Not To Use

Do not use Resource Links to bypass semantic structure, heading order, token usage, or accessibility behavior.

## Props

See resource-links.schema.json for the source contract.

## Variants

- grid
- stack
- annotated

## Accessibility Notes

- Prefer native HTML before ARIA.
- Keyboard access, visible focus, and accessible names are required for interactive descendants.
- Color must not be the only means of communication.

## Legacy Source Coverage

- old-components/testing-resources-1.html

## Agent Usage Notes

- Read resource-links.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Preserve square geometry and SiteKit typography instead of restoring legacy decorative styles.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and resource-links.html.
