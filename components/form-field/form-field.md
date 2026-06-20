# Form Field

## Purpose

A labeled input group with help, validation, and autocomplete support.

## When To Use

Use Form Field when the page needs this pattern as a reusable, token-driven component.

## When Not To Use

Do not use Form Field to bypass semantic structure, heading order, or accessibility behavior.

## Props

See form-field.schema.json for the source contract.

## Variants

- text
- select
- textarea
- checkbox

## Accessibility Notes

- Prefer native HTML before ARIA.
- Keyboard access, visible focus, and accessible names are required.
- Color must not be the only means of communication.

## Agent Usage Notes

- Read form-field.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and form-field.html.
