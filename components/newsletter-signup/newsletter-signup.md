# Newsletter Signup

## Purpose

A focused email capture block with semantic form controls and compact supporting copy.

## When To Use

Use Newsletter Signup when the page needs this legacy-informed pattern as a reusable, token-driven SiteKit component.

## When Not To Use

Do not use Newsletter Signup to bypass semantic structure, heading order, token usage, or accessibility behavior.

## Props

See newsletter-signup.schema.json for the source contract.

## Variants

- inline
- boxed
- modal
- split

## Accessibility Notes

- Prefer native HTML before ARIA.
- Keyboard access, visible focus, and accessible names are required for interactive descendants.
- Color must not be the only means of communication.

## Legacy Source Coverage

- old-components/newsletter-box-1.html
- old-components/newsletter-box-2.html
- old-components/newsletter-box-3.html
- old-components/newsletter-box-4.html
- old-components/testing-newsletter-1.html

## Agent Usage Notes

- Read newsletter-signup.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Preserve square geometry and SiteKit typography instead of restoring legacy decorative styles.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and newsletter-signup.html.
