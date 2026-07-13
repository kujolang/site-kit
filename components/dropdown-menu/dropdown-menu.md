# Dropdown Menu

## Purpose

A menu button with grouped actions.

## When To Use

Use Dropdown Menu when a page or application needs this interface pattern with SiteKit tokens and accessibility defaults.

## When Not To Use

Do not use Dropdown Menu to bypass semantic HTML, heading order, token usage, or keyboard accessibility.

## Props

See dropdown-menu.schema.json for the source contract.

## Variants

- default
- compact

## Accessibility Notes

- Prefer native HTML before ARIA.
- Interactive controls need visible focus and keyboard access.
- Color must not be the only means of communication.

## Optional behavior

Load `dist/sitekit.js` after the markup to progressively enhance this CSS-first pattern. The script manages `aria-expanded`, menu IDs, Arrow/Home/End navigation, Escape, Tab, outside-click close, and trigger focus restoration. Without the script the menu remains semantic HTML and can be wired by a consumer.

## Examples

See examples.json and dropdown-menu.html.
