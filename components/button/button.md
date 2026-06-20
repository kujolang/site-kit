# Button

## Purpose

A semantic action control for links, form submits, and interface commands.

## When To Use

Use Button when the page needs this pattern as a reusable, token-driven component.

## When Not To Use

Do not use Button to bypass semantic structure, heading order, or accessibility behavior.

## Props

See button.schema.json for the source contract.

## Variants

- primary
- secondary
- ghost
- danger

## Accessibility Notes

- Prefer native HTML before ARIA.
- Keyboard access, visible focus, and accessible names are required.
- Color must not be the only means of communication.

## Agent Usage Notes

- Read button.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and button.html.
