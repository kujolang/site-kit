# Component details

Start with the shared API rules, then the per-component records. All 85 components have one record.

## Shared API rules

Schemas are descriptive JSON contracts, not executable prop bindings. There is no templating library, React component tree, TypeScript props package, callback registration API, slot renderer, or automatic variant generator in the distribution. `{{...}}` slots are source notation. Some templates hardcode example content instead. Consumers own escaping, ID uniqueness, loops, child markup, form submission, and application state.

Required means `requiredFields` in source, not browser validation. Defaults in the tables are null when undeclared; template attributes show actual sample values. Native `disabled`, `readonly`, `required`, `value`, `checked`, `input`, `change`, `click`, `submit`, and dialog events remain browser APIs where the chosen element supports them. An `aria-disabled` attribute changes semantics/styles but does not prevent activation.

Slots and allowedChildren are declared vocabulary, not enforced content models. Most array/object entries lack item schemas. Use each copyable example as a standalone starting point and apply the explicit caveats before publishing. Source-derived CSS excerpts are implementation evidence, not a substitute for browser checks.

The status `example-only-js` means the lab contains some related click behavior, not that a complete widget is implemented there. `native` identifies browser-owned control behavior. All examples include every source placeholder; template shortcomings are retained and disclosed rather than silently repaired.

- [Accordion](component-details/accordion.md) — Feedback; native.
- [Alert](component-details/alert.md) — Feedback; html-css.
- [Avatar](component-details/avatar.md) — Data Display; html-css.
- [Badge](component-details/badge.md) — Data Display; html-css.
- [Bento Grid](component-details/bento-grid.md) — Content; html-css.
- [Breadcrumbs](component-details/breadcrumbs.md) — Navigation; html-css.
- [Button](component-details/button.md) — Actions; native.
- [Card](component-details/card.md) — Content; html-css.
- [Carousel](component-details/carousel.md) — Data Display; example-only-js.
- [Checkbox](component-details/checkbox.md) — Forms; native.
- [Checkout Summary](component-details/checkout-summary.md) — Commerce; html-css.
- [Code Block](component-details/code-block.md) — Data Display; example-only-js.
- [Color Picker](component-details/color-picker.md) — Forms; native.
- [Combobox](component-details/combobox.md) — Forms; example-only-js.
- [Command Strip](component-details/command-strip.md) — Data Display; html-css.
- [Content Section](component-details/content-section.md) — Content; html-css.
- [CTA](component-details/cta.md) — Content; html-css.
- [Date Input](component-details/date-input.md) — Forms; native.
- [Date Picker](component-details/date-picker.md) — Forms; example-only-js.
- [Drawer](component-details/drawer.md) — Overlays; optional-js.
- [Dropdown Menu](component-details/dropdown-menu.md) — Actions; optional-js.
- [Ecosystem Map](component-details/ecosystem-map.md) — Data Display; html-css.
- [Empty State](component-details/empty-state.md) — Feedback; html-css.
- [Error State](component-details/error-state.md) — Feedback; html-css.
- [Feature Grid](component-details/feature-grid.md) — Content; html-css.
- [Fieldset](component-details/fieldset.md) — Forms; native.
- [File](component-details/file.md) — Forms; html-css.
- [File Upload](component-details/file-upload.md) — Forms; native.
- [Footer](component-details/footer.md) — Content; html-css.
- [Form](component-details/form.md) — Forms; native.
- [Form Field](component-details/form-field.md) — Forms; native.
- [Generator Panel](component-details/generator-panel.md) — Tools; html-css.
- [Header](component-details/header.md) — Navigation; html-css.
- [Heading](component-details/heading.md) — Foundations; html-css.
- [Hero](component-details/hero.md) — Content; html-css.
- [Icon](component-details/icon.md) — Foundations; html-css.
- [Image](component-details/image.md) — Data Display; html-css.
- [Label](component-details/label.md) — Forms; html-css.
- [Link](component-details/link.md) — Foundations; native.
- [List](component-details/list.md) — Data Display; html-css.
- [Metadata Panel](component-details/metadata-panel.md) — Data Display; html-css.
- [Modal](component-details/modal.md) — Overlays; optional-js.
- [Navigation](component-details/navigation.md) — Navigation; html-css.
- [Newsletter Signup](component-details/newsletter-signup.md) — Content; html-css.
- [Pagination](component-details/pagination.md) — Actions; native.
- [Partners Strip](component-details/partners-strip.md) — Content; html-css.
- [Popover](component-details/popover.md) — Overlays; optional-js.
- [Pricing Table](component-details/pricing-table.md) — Commerce; html-css.
- [Product Card](component-details/product-card.md) — Commerce; html-css.
- [Product Grid](component-details/product-grid.md) — Commerce; html-css.
- [Product Showcase](component-details/product-showcase.md) — Commerce; html-css.
- [Progress Bar](component-details/progress-bar.md) — Feedback; html-css.
- [Progress Indicator](component-details/progress-indicator.md) — Feedback; html-css.
- [Promo Banner](component-details/promo-banner.md) — Commerce; html-css.
- [Quote](component-details/quote.md) — Content; html-css.
- [Radio Button](component-details/radio-button.md) — Forms; native.
- [Rating](component-details/rating.md) — Data Display; html-css.
- [Recent Posts](component-details/recent-posts.md) — Content; html-css.
- [Resource Links](component-details/resource-links.md) — Content; html-css.
- [Rich Text Editor](component-details/rich-text-editor.md) — Forms; html-css.
- [Roadmap](component-details/roadmap.md) — Data Display; html-css.
- [Search Input](component-details/search-input.md) — Forms; native.
- [Segmented Control](component-details/segmented-control.md) — Actions; example-only-js.
- [Select](component-details/select.md) — Forms; native.
- [Separator](component-details/separator.md) — Foundations; html-css.
- [Skeleton](component-details/skeleton.md) — Feedback; html-css.
- [Skip Link](component-details/skip-link.md) — Foundations; native.
- [Slider](component-details/slider.md) — Forms; native.
- [Spinner](component-details/spinner.md) — Feedback; html-css.
- [Stack](component-details/stack.md) — Content; html-css.
- [Stats Bar](component-details/stats-bar.md) — Data Display; html-css.
- [Stepper](component-details/stepper.md) — Forms; example-only-js.
- [Table](component-details/table.md) — Data Display; html-css.
- [Tabs](component-details/tabs.md) — Navigation; example-only-js.
- [Team Grid](component-details/team-grid.md) — Content; html-css.
- [Testimonial Rail](component-details/testimonial-rail.md) — Content; html-css.
- [Text Input](component-details/text-input.md) — Forms; native.
- [Textarea](component-details/textarea.md) — Forms; native.
- [Toast](component-details/toast.md) — Feedback; example-only-js.
- [Toggle](component-details/toggle.md) — Forms; native.
- [Tooltip](component-details/tooltip.md) — Overlays; optional-js.
- [Tree View](component-details/tree-view.md) — Navigation; html-css.
- [Trust Strip](component-details/trust-strip.md) — Commerce; html-css.
- [Video](component-details/video.md) — Data Display; html-css.
- [Visually Hidden](component-details/visually-hidden.md) — Foundations; html-css.
