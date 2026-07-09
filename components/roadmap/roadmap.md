# Roadmap

## Purpose

A chronological product timeline for milestones, launches, and upcoming work.

## When To Use

Use Roadmap when the page needs this legacy-informed pattern as a reusable, token-driven SiteKit component.

## When Not To Use

Do not use Roadmap to bypass semantic structure, heading order, token usage, or accessibility behavior.

## Props

See roadmap.schema.json for the source contract.

## Variants

- timeline
- compact
- release-plan

## Accessibility Notes

- Prefer native HTML before ARIA.
- Keyboard access, visible focus, and accessible names are required for interactive descendants.
- Color must not be the only means of communication.

## Legacy Source Coverage

- old-components/tessting-roadmap-1.html

## Agent Usage Notes

- Read roadmap.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Preserve square geometry and SiteKit typography instead of restoring legacy decorative styles.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and roadmap.html.
