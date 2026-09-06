# SiteKit improvements, separate from website scope

These are PROPOSED changes to the library. This audit does not implement them. A comprehensive website can ship with visible support boundaries rather than silently presenting incomplete features as complete.

## Critical: materially limits reliable reuse

1. **Reconcile schemas and implementations.** Specify actual DOM bindings, required arrays/items, defaults, template slots and status. Resolve Button loading/href, Tabs panels, Card title/heading, Form Field control and Checkout totals. Mark composition-only variants explicitly. Evidence: per-component records and discrepancy manifest. Done when each advertised field/variant maps to working markup/style/behavior or is explicitly declared consumer-owned.
2. **Complete or relabel advanced widgets.** Tabs, Combobox, Date Picker, Tree View and Rich Text Editor need honest scope boundaries; keyboard controllers and semantic fixes are required before claiming finished widgets. Use native select/date/text controls when the full widget is unnecessary.
3. **Fix reusable accessibility defects.** Repair Drawer hidden-state display and primary Button/Icon color inheritance; name editor textbox; provide progress values; repair calendar grid semantics; use revealing skip links; make tooltip content hoverable where required; resolve avatar naming. Add isolated tests rather than relying on closed previews.
4. **Define drawer semantics and responsive composition.** Decide nonmodal panel versus modal sheet; supply matching semantics/focus/background behavior. Document required outer containment for root-changing container queries and validate canonical source templates at narrow widths.
5. **Test actual component instances and states.** Add isolated semantic/keyboard coverage, real screenshot baselines where valuable, four-theme contrast cases and multi-instance IDs. Keep the existing distribution and release gates.

## Useful additions

- Promote hardened clipboard copy, bounded stepper controls, segmented selection and toast dismissal from lab into opt-in documented helpers, or explicitly ship recipes for consumer implementations.
- Publish a small metadata contract distinguishing implemented, native, example-only and proposed behavior, with unique-ID-safe examples.
- Add lifecycle support or documented integration patterns for dynamic previews: scoped enhancement, cleanup and rebinding newly inserted openers.
- Add form error/help patterns and a truthful loading Button composition with status, aria-busy and disabled semantics.
- Add a documented documentation shell/sidebar/TOC pattern and local search composition. A command palette should only follow a complete keyboard model.
- Audit CSS hardcoded dimensions/motion, generic duplicated card recipes, token-reference drift and directional assumptions such as Toggle translateX.
- Provide real responsive image/video recipes with width/height, alt, controls and caption-track guidance; the current frames remain useful but should be named accurately.

## Optional

- Framework adapters after a demonstrated consumer need; no forced React rewrite.
- Typed authored metadata and stronger JSON schema validation after contracts are reconciled.
- More specialized chart, chat, agent-monitoring or editing patterns only when backed by actual compositions.
- Advanced floating-position collision handling, richer transitions, additional themes and dedicated animation tokens.

No charting library, command palette, JSON viewer, drag-and-drop framework, virtualized grid, context menu, multi-thumb slider or fully modeled authentication/settings system was found. Their absence is not a reason to bloat v1. The strongest launch route is to document the actual design system thoroughly and make existing presentation patterns reliable.
