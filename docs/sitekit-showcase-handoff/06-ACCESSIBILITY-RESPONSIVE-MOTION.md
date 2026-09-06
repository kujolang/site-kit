# Accessibility, responsive behavior and motion

This is a source and targeted browser audit, not a WCAG conformance assessment. Ratings reflect implementation evidence; existing automated page tests cover only selected compositions and states. Per-component records supply precise source paths and CSS observations.

## Accessibility review

| Rating | Finding | Evidence / implication |
| --- | --- | --- |
| Strong | Native details/summary, labeled native inputs, native dialog, captioned tables | accordion, form-field, checkbox/radio, modal, table templates |
| Strong | Global visible focus, optional behavior regression cases | css/base.css; scripts/sitekit-behavior.js; tests/browser/sitekit.spec.mjs |
| Acceptable | Nonmodal popover toggle and menu keyboard basics | Escape/outside dismissal exist; no menu typeahead or placement engine |
| Needs improvement | Tabs/combobox/calendar are incomplete widgets | dist has no controllers; lab click handlers do not establish keyboard semantics |
| Needs improvement | Date Picker role=grid has direct buttons, no rows/gridcells | date-picker.html; static partial calendar, no month calculation |
| Needs improvement | Progress Bar lacks programmatic value semantics | progress-bar.html is a labeled generic div with percentage width |
| Needs improvement | Editor textbox lacks an accessible name | rich-text-editor.html labels section but not contenteditable role=textbox |
| Needs improvement | Drawer focus containment is not modality | aside + hidden state, no inert background, no aria-modal or scroll lock |
| Needs improvement | Tooltip is not hoverable itself | pointer-events:none; listeners attached only to trigger, not tip |
| Needs improvement | Several layout skip links never reveal on focus | layouts/*.html use sk-sr-only; use actual Skip Link component instead |
| Needs improvement | Decorative icon CSS cannot set ARIA | .sk-icon--decorative { aria-hidden: true } is an invalid CSS declaration; set attribute in HTML |
| Needs improvement | Avatar's generic span accessible label is uncertain | empty-alt child image; prefer meaningful image alt or explicit supported semantics |
| Unknown without expanded testing | Contrast and target sizes across every state/theme | four themes, many unchecked states; passing representative axe scans is insufficient |

Native controls inherit disabled/readonly behavior only where those attributes are valid. Most schemas do not document them; disabled-looking anchors still activate. Explicit focus rules commonly match interactive descendants, not the component root. Base focus covers additional native focusable elements, but doesn't supply keyboard logic.

OBSERVED isolated source failures are recorded in 16 and evidence/component-probes.json: six components produce axe findings, and the source Drawer remains visible/focusable despite hidden. The primary Button/Icon composition also yields an invisible symbol, confirmed through computed colors in evidence/focused-findings.json. These are unresolved library defects.

Drawer opens focus at the first matched focusable, cycles endpoint Tab presses and restores the opener. Empty-focus drawers have no fallback target. No background inertness means assistive navigation and pointer behavior can reach outside content. The dashboard adds fixed positioning but does not transform this into a fully native modal dialog. Use a native dialog if the showcase needs genuine modality.

Dropdown items are selected with role=menuitem; no disabled filtering/typeahead/submenu support is present. Opening by click does not focus the first menu item; arrows do. Clicking a command does not automatically close the menu. Native item handlers are consumer responsibility.

Tooltip sets aria-describedby to a single generated/existing tip ID, replacing any existing list of descriptions. Its Escape dismissal is tested, but pointer travel onto the tip, zoom clipping and touch discovery require separate review. Essential instructions must be visible outside it.

Many templates use literal IDs (card-title, form control IDs, etc.). Repeating them in a matrix without prefixing IDs and every for/ARIA/fragment/hook reference creates collisions. Examples in this dossier are standalone and do not promise multi-instance uniqueness.

## Responsive model

Core breakpoints are sm=36rem, md=48rem, lg=64rem, xl=80rem. These become custom properties, but component queries use literal thresholds rather than those variables. Generic schema claims listing sm/md/lg do not establish actual responsiveness.

The distribution uses logical dimensions, wrapping flex, auto-fit grids and inline-size containers. There is no comprehensive breakpoint utility system, responsive prop API, mobile navigation controller, responsive font scale or density framework.

| Component / source | Actual behavior to demonstrate |
| --- | --- |
| Hero | Heading 3rem → 5.375rem at container 56rem; split inner grid when data-layout=split |
| Bento Grid | Explicit 4-column/3-row layout; 56rem and 34rem container rules; dense placement and long content need review |
| Content Section | Root columns and media-left ordering at 54rem |
| Generator Panel | Root two-column form/preview at 56rem |
| Newsletter Signup | Root split layout at 48rem |
| Product Showcase | Root split layout at 58rem |
| Product Card | Child grid splits at 30rem using root container |
| Header/Footer/Navigation/Tabs | Wrapping, not automatic collapse |
| Feature/Product/Ecosystem grids | auto-fit minimums; data-density=dense for smaller tracks |
| Table | Horizontal overflow wrapper |
| Pricing Table | Fixed layout, wrap-anywhere; not the same scroll contract as Table |
| Carousel | Horizontal scrolling with one full-width slide per track; snapping |
| Drawer | Inline shell has 18rem minimum panel; consumer-dashboard adds fixed overlay composition |
| Modal | Maximum min(100% minus gutters,42rem); native top layer, no wide variant |
| Popover/Tooltip | Positioned next to trigger; no collision flipping or viewport clamping beyond simple widths |

**Container caveat:** a container query cannot use an element as its own size container. Rules targeting `.sk-bento-grid`, `.sk-content-section`, `.sk-generator-panel`, `.sk-newsletter-signup` and `.sk-product-showcase` require an ancestor container; descendants may instead resolve against the component root. A preview width slider alone is insufficient unless containment is explicitly established. Test both stand-alone and nested compositions; see targeted probes in evidence.

Viewport demos must distinguish viewport width from container width. Use a same-origin static preview document for media-query behavior and an explicit outer container for container-query behavior. On phones, scale neither the font nor the entire iframe down just to fake fit: use actual narrow layout and accessible horizontal scrolling only where intended.

## Complete component motion inventory

| Component | Motion | Trigger / boundary |
| --- | --- | --- |
| Button | background and color, motion.fast (120ms), motion.ease | hover/active and variant styling |
| Toggle | transform, motion.base (180ms) | native checked thumb; physical translateX |
| Popover | opacity and translateY, motion.base | hidden/unhidden; hidden CSS deliberately retains a visibility-hidden block |
| Tooltip | opacity and visibility, motion.base | hover/focus/hidden state; hidden attribute can cut off transition |
| Skeleton | pulse, hardcoded 1400ms, motion.ease | no-preference query only |
| Spinner | blinking cells, hardcoded 1800ms and staggered delays | no-preference query only |
| Carousel | CSS smooth scroll; lab scrollBy smooth option | native scrolling or lab-only buttons |

No general transition engine, drag behavior, spring animation, modal enter/exit, drawer slide animation, accordion height animation or page transition system exists. Focus changes are immediate browser focus changes. `motion.slow` is available as a token, not evidence that a component uses it.

`css/base.css` reduces animation and transition duration to 1ms and sets CSS scroll-behavior:auto under prefers-reduced-motion:reduce. This does not prove that a consumer's explicit JavaScript scrollBy({behavior:'smooth'}) respects the preference. The showcase carousel adapter must choose instant scrolling when reduction is requested. Motion demos require a deliberate replay control, explanatory text and no endless decorative animation outside the relevant sample.

## Verification still required during website implementation

Exercise every public preview in Chromium at minimum, all five behavioral components across three engines, all four themes for color/state examples, 390/768/1440 widths plus 320px and 200 percent text, keyboard-only navigation, focus return, no-JS reading, duplicate IDs, labels/IDREFs, reduced motion, and high-content overflow. Manually inspect screen-reader output for complex widgets and preview frames. Do not make a production site inaccessible merely to reproduce a flawed source sample: label it as a limitation and show a clearly attributed corrected consumer composition or noninteractive reference.
