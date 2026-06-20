# Error State

## Purpose

A recoverable error message with next steps and support context.

## When To Use

Use Error State when the page needs this pattern as a reusable, token-driven component.

## When Not To Use

Do not use Error State to bypass semantic structure, heading order, or accessibility behavior.

## Props

See error-state.schema.json for the source contract.

## Variants

- default
- inline
- critical

## Accessibility Notes

- Prefer native HTML before ARIA.
- Keyboard access, visible focus, and accessible names are required.
- Color must not be the only means of communication.

## Agent Usage Notes

- Read error-state.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and error-state.html.
