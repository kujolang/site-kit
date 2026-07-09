# YouTube Thumbnail Generator

## Purpose

A source-specific generator panel with form controls and preview output.

## When To Use

Use this component when you need the SiteKit-native version of `old-components/testing-img-gen-1.html`.

## When Not To Use

Do not copy the legacy HTML or visual styling directly; use this tokenized source component instead.

## Props

See testing-img-gen-1.schema.json for the source contract.

## Variants

- form-preview
- stacked

## Accessibility Notes

- Prefer native HTML before ARIA.
- Keyboard access, visible focus, and accessible names are required for interactive descendants.
- Color must not be the only means of communication.

## Legacy Source Coverage

- old-components/testing-img-gen-1.html

## Agent Usage Notes

- Read testing-img-gen-1.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Preserve square geometry and SiteKit typography instead of restoring legacy decorative styles.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and testing-img-gen-1.html.
