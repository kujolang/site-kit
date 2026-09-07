# Newsletter Signup

## Purpose

A focused email capture block with semantic form controls and compact supporting copy.

## When To Use

Compose email signup copy and an inline submission form.

## When Not To Use

A working email subscription or consent service.

## Props

See newsletter-signup.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| inline | alias | Base style; no switch |
| boxed | alias | Base style; no switch |
| modal | alias | Base style; no switch |
| split | implemented | [data-layout="split"] |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Keyboard access, visible focus, and accessible names are required for interactive descendants.
- Color must not be the only means of communication.

## Legacy Source Coverage

- old-components/newsletter-box-1.html
- old-components/newsletter-box-2.html
- old-components/newsletter-box-3.html
- old-components/newsletter-box-4.html
- old-components/testing-newsletter-1.html

## Agent Usage Notes

- Read newsletter-signup.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Preserve square geometry and SiteKit typography instead of restoring legacy decorative styles.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and newsletter-signup.html.

## Maintained contract and standalone example

Use: Compose email signup copy and an inline submission form.

Avoid: A working email subscription or consent service.

See [contract](newsletter-signup.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
