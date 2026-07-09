# Generator Panel

## Purpose

A form-forward tool panel for small generators, prompts, and preview controls.

## When To Use

Use Generator Panel when the page needs this legacy-informed pattern as a reusable, token-driven SiteKit component.

## When Not To Use

Do not use Generator Panel to bypass semantic structure, heading order, token usage, or accessibility behavior.

## Props

See generator-panel.schema.json for the source contract.

## Variants

- form-preview
- compact
- stacked

## Accessibility Notes

- Prefer native HTML before ARIA.
- Keyboard access, visible focus, and accessible names are required for interactive descendants.
- Color must not be the only means of communication.

## Legacy Source Coverage

- old-components/testing-img-gen-1.html

## Agent Usage Notes

- Read generator-panel.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Preserve square geometry and SiteKit typography instead of restoring legacy decorative styles.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and generator-panel.html.
