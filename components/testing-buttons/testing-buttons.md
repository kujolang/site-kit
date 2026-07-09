# Animated Label Button

## Purpose

A source-specific button showcase using semantic SiteKit button controls.

## When To Use

Use this component when you need the SiteKit-native version of `old-components/testing-buttons.html`.

## When Not To Use

Do not copy the legacy HTML or visual styling directly; use this tokenized source component instead.

## Props

See testing-buttons.schema.json for the source contract.

## Variants

- action-row
- stacked

## Accessibility Notes

- Prefer native HTML before ARIA.
- Keyboard access, visible focus, and accessible names are required for interactive descendants.
- Color must not be the only means of communication.

## Legacy Source Coverage

- old-components/testing-buttons.html

## Agent Usage Notes

- Read testing-buttons.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Preserve square geometry and SiteKit typography instead of restoring legacy decorative styles.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and testing-buttons.html.
