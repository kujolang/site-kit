# Popover

## Purpose

A small contextual surface anchored to a trigger.

## When To Use

Use Popover when a page or application needs this interface pattern with SiteKit tokens and accessibility defaults.

## When Not To Use

Do not use Popover to bypass semantic HTML, heading order, token usage, or keyboard accessibility.

## Props

See popover.schema.json for the source contract.

## Variants

- default
- compact

## Accessibility Notes

- Prefer native HTML before ARIA.
- Interactive controls need visible focus and keyboard access.
- Color must not be the only means of communication.

## Optional behavior

Load `dist/sitekit.js` to add `aria-controls`, toggle state, Escape handling, and outside-click dismissal. Keep essential content in the page flow rather than only inside the popover.

## Examples

See examples.json and popover.html.
