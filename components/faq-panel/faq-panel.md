# FAQ Panel

## Purpose

A structured question-and-answer surface for accordion, sidebar, and grid FAQ layouts.

## When To Use

Use FAQ Panel when the page needs this legacy-informed pattern as a reusable, token-driven SiteKit component.

## When Not To Use

Do not use FAQ Panel to bypass semantic structure, heading order, token usage, or accessibility behavior.

## Props

See faq-panel.schema.json for the source contract.

## Variants

- accordion
- sidebar
- card-grid
- icon-blocks

## Accessibility Notes

- Prefer native HTML before ARIA.
- Keyboard access, visible focus, and accessible names are required for interactive descendants.
- Color must not be the only means of communication.

## Legacy Source Coverage

- old-components/testing-faq-1.html
- old-components/testing-faq-2.html
- old-components/testing-faq-3.html
- old-components/testing-faq-4.html
- old-components/testing-faq-5.html
- old-components/testing-faq-6.html
- old-components/testing-faq-7.html
- old-components/testing-faq-8.html

## Agent Usage Notes

- Read faq-panel.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Preserve square geometry and SiteKit typography instead of restoring legacy decorative styles.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and faq-panel.html.
