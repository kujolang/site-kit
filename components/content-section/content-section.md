# Content Section

## Purpose

A responsive editorial section with copy, actions, and an optional media or proof panel.

## When To Use

Compose supporting copy, action and a metadata/media panel.

## When Not To Use

Assuming schema media objects automatically render.

## Props

See content-section.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| media-right | alias | Base style; no switch |
| media-left | implemented | [data-layout="media-left"] |
| centered | alias | Base style; no switch |
| compact | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Keyboard access, visible focus, and accessible names are required for interactive descendants.
- Color must not be the only means of communication.

## Legacy Source Coverage

- old-components/testing-content-1.html
- old-components/testing-content-2.html
- old-components/testing-content-3.html
- old-components/testing-content-5.html

## Agent Usage Notes

- Read content-section.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Preserve square geometry and SiteKit typography instead of restoring legacy decorative styles.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and content-section.html.

## Maintained contract and standalone example

Use: Compose supporting copy, action and a metadata/media panel.

Avoid: Assuming schema media objects automatically render.

See [contract](content-section.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
