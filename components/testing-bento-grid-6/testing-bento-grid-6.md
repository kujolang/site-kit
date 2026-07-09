# Bento Grid

## Purpose

A source-specific bento grid adapted from an old component into SiteKit square geometry.

## When To Use

Use this component when you need the SiteKit-native version of `old-components/testing-bento-grid-6.html`.

## When Not To Use

Do not copy the legacy HTML or visual styling directly; use this tokenized source component instead.

## Props

See testing-bento-grid-6.schema.json for the source contract.

## Variants

- source-bento
- wide
- dense

## Accessibility Notes

- Prefer native HTML before ARIA.
- Keyboard access, visible focus, and accessible names are required for interactive descendants.
- Color must not be the only means of communication.

## Legacy Source Coverage

- old-components/testing-bento-grid-6.html

## Agent Usage Notes

- Read testing-bento-grid-6.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Preserve square geometry and SiteKit typography instead of restoring legacy decorative styles.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and testing-bento-grid-6.html.
