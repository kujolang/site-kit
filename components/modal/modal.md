# Modal Dialog

## Purpose

An interruptive dialog that requires deliberate focus management.

## When To Use

Use Modal Dialog when the page needs this pattern as a reusable, token-driven component.

## When Not To Use

Do not use Modal Dialog to bypass semantic structure, heading order, or accessibility behavior.

## Props

See modal.schema.json for the source contract.

## Variants

- default
- danger
- wide

## Accessibility Notes

- Prefer native HTML before ARIA.
- Keyboard access, visible focus, and accessible names are required.
- Color must not be the only means of communication.

## Optional behavior

Prefer the native `<dialog>` contract. Point a real button at its ID with `data-sk-modal-open`, add `data-sk-modal` to the dialog, and use `data-sk-modal-close` for explicit dismissal. `dist/sitekit.js` restores the opener, handles Escape, and keeps Tab inside the modal. Keep the close action visible and labeled.

## Agent Usage Notes

- Read modal.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and modal.html.
