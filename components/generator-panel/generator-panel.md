# Generator Panel

## Purpose

A form-forward tool panel for small generators, prompts, and preview controls.

## When To Use

Arrange a form next to a preview placeholder.

## When Not To Use

An AI generator or API-backed tool.

## Props

See generator-panel.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| form-preview | alias | Base style; no switch |
| compact | alias | Base style; no switch |
| stacked | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Keyboard access, visible focus, and accessible names are required for interactive descendants.
- Color must not be the only means of communication.

## Legacy Source Coverage

- old-components/testing-img-gen-1.html

## Agent Usage Notes

- Read generator-panel.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Preserve square geometry and SiteKit typography instead of restoring legacy decorative styles.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and generator-panel.html.

## Maintained contract and standalone example

Use: Arrange a form next to a preview placeholder.

Avoid: An AI generator or API-backed tool.

See [contract](generator-panel.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
