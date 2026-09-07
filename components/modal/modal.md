# Modal Dialog

## Purpose

An interruptive dialog that requires deliberate focus management.

## When To Use

Open a labeled native dialog with explicit dismissal and opener restoration.

## When Not To Use

Persistent page content or a fallback modal for obsolete browsers.

## Props

See modal.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| default | alias | Base style; no switch |
| danger | alias | Base style; no switch |
| wide | alias | Base style; no switch |

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

## Maintained contract and standalone example

Use: Open a labeled native dialog with explicit dismissal and opener restoration.

Avoid: Persistent page content or a fallback modal for obsolete browsers.

See [contract](modal.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
