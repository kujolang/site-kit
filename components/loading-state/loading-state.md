# Loading State

## Purpose

A non-blocking loading placeholder that respects reduced motion.

## When To Use

Use Loading State when the page needs this pattern as a reusable, token-driven component.

## When Not To Use

Do not use Loading State to bypass semantic structure, heading order, or accessibility behavior.

## Props

See loading-state.schema.json for the source contract.

## Variants

- skeleton
- inline
- panel

## Accessibility Notes

- Prefer native HTML before ARIA.
- Preserve semantic text structure and slotted interactive focus.
- Color must not be the only means of communication.

## Agent Usage Notes

- Read loading-state.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and loading-state.html.
