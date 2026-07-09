# Video Demo

## Purpose

A responsive media demo block with caption, controls, and supporting product copy.

## When To Use

Use Video Demo when the page needs this legacy-informed pattern as a reusable, token-driven SiteKit component.

## When Not To Use

Do not use Video Demo to bypass semantic structure, heading order, token usage, or accessibility behavior.

## Props

See video-demo.schema.json for the source contract.

## Variants

- embed
- split
- captioned

## Accessibility Notes

- Prefer native HTML before ARIA.
- Keyboard access, visible focus, and accessible names are required for interactive descendants.
- Color must not be the only means of communication.

## Legacy Source Coverage

- old-components/testing-video-demo-1.html

## Agent Usage Notes

- Read video-demo.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Preserve square geometry and SiteKit typography instead of restoring legacy decorative styles.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and video-demo.html.
