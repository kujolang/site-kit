# SiteKit component index

Generated from component schemas by `npm run build`. Use this index to choose an existing contract before creating a new pattern.

## Selection guidance

Use a component when its semantics and behavior match the content. Do not use a component when a native element is clearer, when the surface is only decorative, or when the required keyboard/focus contract cannot be provided. Every component folder contains the schema, template, CSS, docs, and examples.

## Foundations

- **Heading** (`components/heading`): A typographic heading pattern with optional supporting text.
- **Icon** (`components/icon`): A small symbolic marker with an accessible name when meaningful.
- **Separator** (`components/separator`): A semantic visual divider between related sections.
- **Skip Link** (`components/skip-link`): An accessible link for skipping directly to page content.
- **Visually Hidden** (`components/visually-hidden`): A utility wrapper for content available to assistive technology only.

## Actions

- **Button** (`components/button`): A semantic action control for links, form submits, and interface commands.
- **Dropdown Menu** (`components/dropdown-menu`): A menu button with grouped actions.
- **Pagination** (`components/pagination`): A page navigation control for long result sets.
- **Segmented Control** (`components/segmented-control`): A compact grouped control for switching modes.

## Forms

- **Checkbox** (`components/checkbox`): A binary input that can be checked or unchecked.
- **Color Picker** (`components/color-picker`): A native color control with an accessible label.
- **Date Input** (`components/date-input`): A native date input with label and help text.
- **Date Picker** (`components/date-picker`): A compact date-picker surface with a visible calendar grid.
- **File** (`components/file`): A file metadata row for selected or attached files.
- **Form** (`components/form`): A semantic form layout for labeled controls and actions.
- **Label** (`components/label`): A compact text label for form fields or metadata.
- **Radio Button** (`components/radio-button`): A single-choice input within a related option group.
- **Search Input** (`components/search-input`): A search field with a visible submit action.
- **Select** (`components/select`): A native select control with label and options.
- **Slider** (`components/slider`): A range input for selecting a numeric value.
- **Stepper** (`components/stepper`): A numeric input with increment and decrement actions.
- **Text Input** (`components/text-input`): A single-line text input with a visible label.
- **Textarea** (`components/textarea`): A multi-line text input with label and help text.
- **Toggle** (`components/toggle`): A binary switch-style control using a native checkbox.

## Navigation

- **Breadcrumbs** (`components/breadcrumbs`): A navigational trail that shows the current page location.
- **Header** (`components/header`): A top-level site header with navigation and primary action.
- **Navigation** (`components/navigation`): A semantic navigation region for primary or secondary links.
- **Tabs** (`components/tabs`): A keyboard navigable view switcher for related panels.
- **Tree View** (`components/tree-view`): A hierarchical navigation or selection tree.

## Overlays

- **Drawer** (`components/drawer`): A side panel for secondary navigation or contextual actions.
- **Modal** (`components/modal`): An interruptive dialog that requires deliberate focus management.
- **Popover** (`components/popover`): A small contextual surface anchored to a trigger.
- **Toast** (`components/toast`): A non-modal notification for transient feedback.
- **Tooltip** (`components/tooltip`): A short contextual text hint for an adjacent control.

## Data Display

- **Alert** (`components/alert`): A status message for success, warning, error, or neutral feedback.
- **Badge** (`components/badge`): A compact status, category, or metadata label.
- **Command Strip** (`components/command-strip`): A compact operational metric strip for status, filters, or system state.
- **Metadata Panel** (`components/metadata-panel`): A compact key-value panel for operational metadata and object facts.
- **Progress Bar** (`components/progress-bar`): A horizontal progress meter for determinate completion.
- **Skeleton** (`components/skeleton`): A placeholder surface that indicates loading content.
- **Spinner** (`components/spinner`): A compact indeterminate loading indicator.
- **Table** (`components/table`): A semantic table for structured comparison or tabular data.

## Commerce

- **Checkout Summary** (`components/checkout-summary`): A commerce order summary with totals, taxes, discounts, and trust metadata.
- **Pricing Table** (`components/pricing-table`): A commercial pricing comparison layout with plans and features.
- **Product Card** (`components/product-card`): A semantic commerce product summary with media, price, and actions.
- **Product Grid** (`components/product-grid`): A responsive product listing surface.
- **Product Showcase** (`components/product-showcase`): A compact commerce or template showcase adapted from legacy landing-page demos.
- **Trust Strip** (`components/trust-strip`): A compact proof row for security, shipping, warranties, or social proof.

## Layouts

- **Card** (`components/card`): A bounded content region for a single object, summary, or grouped action.
- **Content Section** (`components/content-section`): A responsive editorial section with copy, actions, and an optional media or proof panel.
- **CTA** (`components/cta`): A conversion block with a clear next action.
- **Feature Grid** (`components/feature-grid`): A responsive list of capabilities or benefits.
- **Footer** (`components/footer`): A semantic page footer for navigation, metadata, and legal links.
- **Hero** (`components/hero`): A first-viewport introduction for product, documentation, and launch pages.
- **Stack** (`components/stack`): A vertical layout primitive for consistent spacing.

## Behavior-enabled composition

- Dropdown Menu + Icon + Button: use a real button with an accessible label; the optional `sitekit.js` layer adds menu focus movement, Escape, outside-click close, and `aria-expanded` state.
- Drawer + Header/Navigation: use a labeled panel, a real close button, and `data-sk-drawer-open` / `data-sk-drawer-close` hooks for optional focus containment.
- Modal + Button: use a native `<dialog>` with `data-sk-modal` and a labeled heading; the optional behavior layer restores focus and traps Tab.
- Popover + Tooltip: use these for contextual information, never for essential content or a replacement for a form label.
- Header + Navigation + Theme: keep landmarks and use `data-sk-theme-toggle` or `data-sk-theme-select` for optional persistence.
- Table + Badge + Metadata Panel: keep table captions and scoped headers; use badges as redundant status labels.

