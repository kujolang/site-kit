# Team Grid

## Purpose

A responsive people grid for profiles, roles, and compact bios.

## When To Use

Use Team Grid when the page needs this legacy-informed pattern as a reusable, token-driven SiteKit component.

## When Not To Use

Do not use Team Grid to bypass semantic structure, heading order, token usage, or accessibility behavior.

## Props

See team-grid.schema.json for the source contract.

## Variants

- profiles
- compact
- leadership

## Accessibility Notes

- Prefer native HTML before ARIA.
- Keyboard access, visible focus, and accessible names are required for interactive descendants.
- Color must not be the only means of communication.

## Legacy Source Coverage

- old-components/testing-our-team-1.html

## Agent Usage Notes

- Read team-grid.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Preserve square geometry and SiteKit typography instead of restoring legacy decorative styles.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and team-grid.html.
