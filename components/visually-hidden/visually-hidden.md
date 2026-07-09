# Visually Hidden

## Purpose

A utility wrapper for content available to assistive technology only.

## When To Use

Use Visually Hidden when a page or application needs this interface pattern with SiteKit tokens and accessibility defaults.

## When Not To Use

Do not use Visually Hidden to bypass semantic HTML, heading order, token usage, or keyboard accessibility.

## Props

See visually-hidden.schema.json for the source contract.

## Variants

- default
- compact

## Accessibility Notes

- Prefer native HTML before ARIA.
- Interactive controls need visible focus and keyboard access.
- Color must not be the only means of communication.

## Examples

See examples.json and visually-hidden.html.
