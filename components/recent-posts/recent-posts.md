# Recent Posts

## Purpose

A semantic article-list component for blog previews and latest insights.

## When To Use

Present authored article cards and metadata.

## When Not To Use

Fetching posts or automatic blog generation.

## Props

See recent-posts.schema.json for the source contract.

## Variants

| Name | Contract | Binding |
| --- | --- | --- |
| cards | alias | Base style; no switch |
| list | alias | Base style; no switch |
| featured | alias | Base style; no switch |

## Accessibility Notes

- Prefer native HTML before ARIA.
- Keyboard access, visible focus, and accessible names are required for interactive descendants.
- Color must not be the only means of communication.

## Legacy Source Coverage

- old-components/testing-recent-posts-1.html
- old-components/testing5.html

## Agent Usage Notes

- Read recent-posts.schema.json before using or changing this component.
- Keep CSS values tokenized.
- Preserve square geometry and SiteKit typography instead of restoring legacy decorative styles.
- Fix reusable component source when this pattern fails validation.

## Examples

See examples.json and recent-posts.html.

## Maintained contract and standalone example

Use: Present authored article cards and metadata.

Avoid: Fetching posts or automatic blog generation.

See [contract](recent-posts.schema.json) for field types, ownership, slots and explicit legacy aliases. [Copyable HTML](example.html) is the current standalone reference. Prefix every ID and IDREF when repeating it; see [lifecycle and migration](../../docs/sitekit-gap-closure/API-AND-MIGRATION.md). These are source authoring contracts, not JavaScript props.
