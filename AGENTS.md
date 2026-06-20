# SiteKit Agent Instructions

SiteKit is source-driven. Treat tokens, schemas, templates, component CSS, recipes, and standards as authoritative. DESIGN.md is generated or generator-ready guidance, not the only source of truth.

## Before Creating Or Editing UI

1. Read DESIGN.md.
2. Read relevant component schemas.
3. Use existing components before creating new ones.
4. Use tokens, never raw visual values.
5. Preserve semantic HTML.
6. Preserve accessibility behavior.
7. Run validation checks.
8. If a component fails, fix the reusable component source, not only the page.
9. If a new pattern is needed, propose it as a documented component.

## Anti-Patterns

- Do not invent one-off card styles.
- Do not use raw hex colors in component CSS.
- Do not skip heading hierarchy.
- Do not replace buttons with clickable divs.
- Do not remove focus styles.
- Do not create inaccessible modals.
- Do not add decorative motion without reduced-motion fallback.
- Do not introduce unrelated visual language.
