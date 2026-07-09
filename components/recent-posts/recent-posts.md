# Recent Posts

## Purpose

A semantic article-list component for blog previews and latest insights.

## When To Use

Use Recent Posts when the page needs this legacy-informed pattern as a reusable, token-driven SiteKit component.

## When Not To Use

Do not use Recent Posts to bypass semantic structure, heading order, token usage, or accessibility behavior.

## Props

See recent-posts.schema.json for the source contract.

## Variants

- cards
- list
- featured

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
