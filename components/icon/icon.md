# Icon

## Purpose

A small symbolic marker with a stable inline or external SVG contract.

## When To Use

Use Icon when an interface needs a repeatable action, brand, status, or navigation symbol. Prefer an inline SVG for a small local set and an external `<use href="/icons/sprite.svg#github">` reference for a shared sprite.

## When Not To Use

Do not use Icon as the only accessible name for a control, as a replacement for text that carries essential meaning, or to bundle an entire icon library.

## Props

See icon.schema.json for the source contract.

## Variants

- decorative: add `aria-hidden="true"` and no label.
- meaningful: add a concise `aria-label` or visible adjacent text.
- inline: render one local SVG inside `.sk-icon`.
- external: reference a registered sprite symbol by name.
- `sm`, `md`, and `lg` sizes use SiteKit control tokens.

## Accessibility Notes

- A decorative icon must be hidden from assistive technology.
- A meaningful icon must have an accessible name; icon-only buttons must have an `aria-label`.
- Keep SVG `focusable="false"` and `aria-hidden="true"` when the parent owns the meaning.
- Do not rely on color alone.

## Registration contract

Register only the symbols a consumer uses in its own sprite. Names use lowercase kebab-case (`github`, `external-link`, `close`, `check`). Preserve the source license in the consuming project. SiteKit does not bundle a third-party icon library.

## Examples

See examples.json and icon.html. The examples include inline SVG, a GitHub brand symbol, and an icon-only close action.
