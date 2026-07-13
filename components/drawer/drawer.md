# Drawer

## Purpose

A side panel for secondary navigation or contextual actions.

## When To Use

Use Drawer when a page or application needs this interface pattern with SiteKit tokens and accessibility defaults.

## When Not To Use

Do not use Drawer to bypass semantic HTML, heading order, token usage, or keyboard accessibility.

## Props

See drawer.schema.json for the source contract.

## Variants

- right
- compact

## Accessibility Notes

- Prefer native HTML before ARIA.
- Interactive controls need visible focus and keyboard access.
- Color must not be the only means of communication.

## Optional behavior

Add `data-sk-drawer` to the labeled `<aside>`, point a real button at its ID with `data-sk-drawer-open`, and add `data-sk-drawer-close` to the close button. `dist/sitekit.js` adds Escape handling, outside scrim dismissal, focus containment, and focus restoration.

## Examples

See examples.json and drawer.html.
