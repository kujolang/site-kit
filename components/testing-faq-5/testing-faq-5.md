# FAQ Card Grid Layout

## Purpose

A source-specific FAQ component using accessible native disclosure controls.

## When To Use

Use this component when you need the SiteKit-native version of `old-components/testing-faq-5.html`.

## When Not To Use

Do not copy the legacy HTML or visual styling directly; use this tokenized source component instead.

## Props

See testing-faq-5.schema.json for the source contract.

## Variants

- accordion
- sidebar
- grid

## Accessibility Notes

- Prefer native HTML before ARIA.
- Keyboard access, visible focus, and accessible names are required for interactive descendants.
- Color must not be the only means of communication.

## Legacy Source Coverage

- old-components/testing-faq-5.html

## Agent Usage Notes

- Read testing-faq-5.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Preserve square geometry and SiteKit typography instead of restoring legacy decorative styles.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and testing-faq-5.html.
