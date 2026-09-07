# SiteKit component index

Generated from all 86 component schemas by `npm run build` for SiteKit 1.0.0. Use this index to choose an existing contract before creating a new pattern.

## Selection guidance

Use a component when its semantics and behavior match the content. Do not use a component when a native element is clearer, when the surface is only decorative, or when the required keyboard/focus contract cannot be provided. Every component folder contains the schema, template, CSS, docs, and examples.

## Foundations

- **Heading** (`components/heading`): A typographic heading pattern with optional supporting text.
- **Icon** (`components/icon`): A small symbolic marker with an accessible name when meaningful.
- **Link** (`components/link`): A text link with visible focus and hover states.
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
- **Combobox** (`components/combobox`): An autocomplete text input paired with suggested options.
- **Date Input** (`components/date-input`): A native date input with label and help text.
- **Date Picker** (`components/date-picker`): A compact date-picker surface with a visible calendar grid.
- **Fieldset** (`components/fieldset`): A grouped set of form controls with a legend.
- **File** (`components/file`): A file metadata row for selected or attached files.
- **File Upload** (`components/file-upload`): A file input drop area with a clear label.
- **Form** (`components/form`): A semantic form layout for labeled controls and actions.
- **Form Field** (`components/form-field`): A labeled input group with help, validation, and autocomplete support.
- **Label** (`components/label`): A compact text label for form fields or metadata.
- **Radio Button** (`components/radio-button`): A single-choice input within a related option group.
- **Rich Text Editor** (`components/rich-text-editor`): A text editing surface with formatting controls.
- **Search Input** (`components/search-input`): A search field with a visible submit action.
- **Select** (`components/select`): A native select control with label and options.
- **Slider** (`components/slider`): A range input for selecting a numeric value.
- **Stepper** (`components/stepper`): A numeric input with increment and decrement actions.
- **Text Input** (`components/text-input`): A single-line text input with a visible label.
- **Textarea** (`components/textarea`): A multi-line text input with label and help text.
- **Toggle** (`components/toggle`): A binary switch-style control using a native checkbox.

## Navigation

- **Mobile Menu** (`components/mobile-menu`): A full-screen modal navigation flyout with native dialog focus and explicit dismissal.
- **Breadcrumbs** (`components/breadcrumbs`): A navigational trail that shows the current page location.
- **Header** (`components/header`): A top-level site header with navigation and primary action.
- **Navigation** (`components/navigation`): A semantic navigation region for primary or secondary links.
- **Tabs** (`components/tabs`): A keyboard navigable view switcher for related panels.
- **Tree View** (`components/tree-view`): A hierarchical navigation or selection tree.

## Overlays

- **Drawer** (`components/drawer`): A side panel for secondary navigation or contextual actions.
- **Modal** (`components/modal`): An interruptive dialog that requires deliberate focus management.
- **Popover** (`components/popover`): A small contextual surface anchored to a trigger.
- **Tooltip** (`components/tooltip`): A short contextual text hint for an adjacent control.

## Feedback

- **Accordion** (`components/accordion`): A stacked disclosure control for expandable sections.
- **Alert** (`components/alert`): A status message for success, warning, error, or neutral feedback.
- **Empty State** (`components/empty-state`): A clear message for empty collections with optional recovery action.
- **Error State** (`components/error-state`): A recoverable error message with next steps and support context.
- **Progress Bar** (`components/progress-bar`): A horizontal progress meter for determinate completion.
- **Progress Indicator** (`components/progress-indicator`): A compact step or status indicator for multi-step flows.
- **Skeleton** (`components/skeleton`): A placeholder surface that indicates loading content.
- **Spinner** (`components/spinner`): A compact indeterminate loading indicator.
- **Toast** (`components/toast`): A non-modal notification for transient feedback.

## Data Display

- **Avatar** (`components/avatar`): A compact visual identity marker for a person, team, or object.
- **Badge** (`components/badge`): A compact status, category, or metadata label.
- **Carousel** (`components/carousel`): A grouped media or content sequence with explicit navigation controls.
- **Code Block** (`components/code-block`): A readable code or command block with caption and copy action.
- **Command Strip** (`components/command-strip`): A compact operational metric strip for status, filters, or system state.
- **Ecosystem Map** (`components/ecosystem-map`): A semantic map of projects, packages, docs, and relationships.
- **Image** (`components/image`): A responsive image frame with optional caption.
- **List** (`components/list`): A semantic ordered or unordered list with consistent spacing.
- **Metadata Panel** (`components/metadata-panel`): A compact key-value panel for operational metadata and object facts.
- **Rating** (`components/rating`): A rating display or input for qualitative feedback.
- **Roadmap** (`components/roadmap`): A chronological product timeline for milestones, launches, and upcoming work.
- **Stats Bar** (`components/stats-bar`): A semantic metric strip for proof points, performance numbers, or portfolio counters.
- **Table** (`components/table`): A semantic table for structured comparison or tabular data.
- **Video** (`components/video`): A responsive video embed frame with caption.

## Commerce

- **Checkout Summary** (`components/checkout-summary`): A commerce order summary with totals, taxes, discounts, and trust metadata.
- **Pricing Table** (`components/pricing-table`): A commercial pricing comparison layout with plans and features.
- **Product Card** (`components/product-card`): A semantic commerce product summary with media, price, and actions.
- **Product Grid** (`components/product-grid`): A responsive product listing surface.
- **Product Showcase** (`components/product-showcase`): A compact commerce or template showcase adapted from legacy landing-page demos.
- **Promo Banner** (`components/promo-banner`): A dismissible commercial or release announcement banner.
- **Trust Strip** (`components/trust-strip`): A compact proof row for security, shipping, warranties, or social proof.

## Content

- **Bento Grid** (`components/bento-grid`): A square-cornered modular grid for grouped capabilities, proof points, or portfolio services.
- **Card** (`components/card`): A bounded content region for a single object, summary, or grouped action.
- **Content Section** (`components/content-section`): A responsive editorial section with copy, actions, and an optional media or proof panel.
- **CTA** (`components/cta`): A conversion block with a clear next action.
- **Feature Grid** (`components/feature-grid`): A responsive list of capabilities or benefits.
- **Footer** (`components/footer`): A semantic page footer for navigation, metadata, and legal links.
- **Hero** (`components/hero`): A first-viewport introduction for product, documentation, and launch pages.
- **Newsletter Signup** (`components/newsletter-signup`): A focused email capture block with semantic form controls and compact supporting copy.
- **Partners Strip** (`components/partners-strip`): A logo or partner proof row with semantic list structure and theme-safe styling.
- **Quote** (`components/quote`): A pull quote or testimonial block with citation.
- **Recent Posts** (`components/recent-posts`): A semantic article-list component for blog previews and latest insights.
- **Resource Links** (`components/resource-links`): A compact link collection for docs, examples, templates, and external references.
- **Stack** (`components/stack`): A vertical layout primitive for consistent spacing.
- **Team Grid** (`components/team-grid`): A responsive people grid for profiles, roles, and compact bios.
- **Testimonial Rail** (`components/testimonial-rail`): A scroll-safe testimonial layout for customer quotes and builder proof.

## Tools

- **Generator Panel** (`components/generator-panel`): A form-forward tool panel for small generators, prompts, and preview controls.

## Behavior-enabled composition

- Dropdown Menu + Icon + Button: use a real button with an accessible label; the optional `sitekit.js` layer adds menu focus movement, Escape, outside-click close, and `aria-expanded` state.
- Drawer + Header/Navigation: use a labeled panel, a real close button, and `data-sk-drawer-open` / `data-sk-drawer-close` hooks for a nonmodal secondary panel; Tab follows normal document order.
- Modal + Button: use a native `<dialog>` with `data-sk-modal` and a labeled heading; the optional behavior layer restores focus and traps Tab.
- Popover + Tooltip: use these for contextual information, never for essential content or a replacement for a form label.
- Header + Navigation + Theme: keep landmarks and use `data-sk-theme-toggle` or `data-sk-theme-select` for optional persistence.
- Table + Badge + Metadata Panel: keep table captions and scoped headers; use badges as redundant status labels.

## Compatibility boundary

SiteKit v1 keeps schemas, semantic templates, generated CSS, layout recipes, responsive contracts, and documented progressive hooks stable. Consumers remain responsible for correct downstream content, framework integration, and accessibility testing of their complete compositions.
