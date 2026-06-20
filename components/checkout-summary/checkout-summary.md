# Checkout Summary

## Purpose

A commerce order summary with totals, taxes, discounts, and trust metadata.

## When To Use

Use Checkout Summary when the page needs this pattern as a reusable, token-driven component.

## When Not To Use

Do not use Checkout Summary to bypass semantic structure, heading order, or accessibility behavior.

## Props

See checkout-summary.schema.json for the source contract.

## Variants

- default
- compact
- sticky

## Accessibility Notes

- Prefer native HTML before ARIA.
- Keyboard access, visible focus, and accessible names are required.
- Color must not be the only means of communication.

## Agent Usage Notes

- Read checkout-summary.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and checkout-summary.html.
