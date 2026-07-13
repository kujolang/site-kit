# Changelog

## Unreleased

- Documented the intentional internal/source-only package scope, compatibility
  boundary, release gate, and remaining browser/accessibility evidence gap.
- Added generated `dist/sitekit.css`, optional `dist/sitekit.js`, and sibling
  `dist/fonts/` assets. Consumers should migrate from manually ordered source
  CSS files to the generated bundle; preserve the relative font directory.
- Added documented progressive behavior hooks for dropdown menus, popovers,
  drawers, modals, tooltips, theme controls, and focus management.
- Expanded the Icon contract for inline SVG, registered external SVG symbols,
  decorative versus meaningful semantics, and labeled icon-only controls.
- Added the component index, dashboard recipe, consumer dashboard example, and
  deterministic browser-facing distribution smoke suite.
