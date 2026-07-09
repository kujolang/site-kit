# Toast

## Purpose

A non-modal notification for transient feedback.

## When To Use

Use Toast when a page or application needs this interface pattern with SiteKit tokens and accessibility defaults.

## When Not To Use

Do not use Toast to bypass semantic HTML, heading order, token usage, or keyboard accessibility.

## Props

See toast.schema.json for the source contract.

## Variants

- default
- compact

## Accessibility Notes

- Prefer native HTML before ARIA.
- Interactive controls need visible focus and keyboard access.
- Color must not be the only means of communication.

## Examples

See examples.json and toast.html.
