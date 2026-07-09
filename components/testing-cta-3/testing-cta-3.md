# SiteKit The Markdown Signup CTA

## Purpose

A source-specific call-to-action section adapted into SiteKit conversion styling.

## When To Use

Use this component when you need the SiteKit-native version of `old-components/testing-cta-3.html`.

## When Not To Use

Do not copy the legacy HTML or visual styling directly; use this tokenized source component instead.

## Props

See testing-cta-3.schema.json for the source contract.

## Variants

- band
- split
- stacked

## Accessibility Notes

- Prefer native HTML before ARIA.
- Keyboard access, visible focus, and accessible names are required for interactive descendants.
- Color must not be the only means of communication.

## Legacy Source Coverage

- old-components/testing-cta-3.html

## Agent Usage Notes

- Read testing-cta-3.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Preserve square geometry and SiteKit typography instead of restoring legacy decorative styles.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and testing-cta-3.html.
