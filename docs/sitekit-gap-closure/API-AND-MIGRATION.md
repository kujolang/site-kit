# SiteKit library contracts and migration

SiteKit remains private, source-vendored HTML/CSS. Copy `dist/` intact with sibling `fonts/`; the existing CSS/script/font exports are unchanged. The optional browser script has no required framework and no per-component module API. JSON contracts describe authoring inputs; they do not render or bind props.

## Lifecycle

```js
// Initial document enhancement happens automatically.
SiteKit.enhance();                 // compatible, returns undefined
SiteKit.enhance(container);        // Element, Document or DocumentFragment
SiteKit.dispose(container);        // remove owned listeners/observers before removal
container.replaceChildren(next);
SiteKit.enhance(container);
```

Use `dispose` before removing or replacing enhanced subtrees. It releases document listeners and ResizeObservers; it does not undo HTML state or remove content. Reinserted disposed content can be enhanced again. Repeated enhancement is safe. New modal/drawer openers targeting existing panels work through delegated listeners. New tabs can be inserted and synchronized by enhancing their root. Replace other widget options/controls by disposing and enhancing their component root. There is no global MutationObserver. Calling `enhance` on a child does not reconfigure its ancestors. Theme application synchronizes all controls; initial saved theme is read once and storage failures are ignored. Supported themes are kujo-light, kujo-dark, personal-dark.

Before repeating an example, use unique IDs in authored HTML, or prefix a **detached** instance:

```js
const instance = template.content.cloneNode(true);
SiteKit.prefixIds(instance, 'settings-two');
host.append(instance);
SiteKit.enhance(host);
```

`prefixIds(root, prefix)` returns root and rewrites local IDs, label `for`, ARIA IDREFs, table headers, datalist references, local fragment/sprite references and modal/drawer opener/scrim targets. Prefix must begin with a letter and contain letters, digits, underscores or hyphens. Duplicate source IDs or collisions with existing target IDs throw. External references are preserved. Supply a fresh prefix per instance; this is explicit authoring assistance, not an HTML renderer or sanitizer.

`SiteKit.serializeEditor(root)` returns an allowed HTML fragment from an editor root or editable element. Treat this as the supported editor output rather than reading arbitrary `innerHTML`.

## Bounded interaction contracts

| Component | Markup and behavior | Ownership and boundary |
| --- | --- | --- |
| Tabs | `.sk-tabs`, labeled `[role=tablist]`, native button tabs and associated section panels. One selected tab, hidden inactive panels and roving tabindex. Horizontal Left/Right, vertical Up/Down; Home/End. Automatic activation by default; `data-activation=manual` moves focus until Enter/Space/click. | SiteKit owns selection after enhancement. Supplied panels must correspond to tabs. `sk:change` bubbles with `{value: tab.id}`. Static source panels remain readable before enhancement. |
| Combobox | `.sk-combobox`, labeled text `input[role=combobox]` and local `[role=listbox]` options. Typing filters case-insensitively; arrows move active option; Enter/click commits. `data-active` distinguishes navigation from `aria-selected`. Escape restores the committed label; blur restores it and closes. Empty input clears selection. | Optional hidden `input[data-sk-value]` receives option `data-value` or label. Disabled options use `aria-disabled=true`, remain visible and cannot be selected. Empty results announce “No results.” No remote loading or multi-select. `change` fires on commit and `sk:change` carries value. CSS-only consumers should use native Select if choosing a fixed option is essential. |
| Date Picker | Single-date, inline Sunday-first en-US calendar with native date input. Previous/next month, arrows ±1/7 days, Home/End week, PageUp/Down month, Enter/Space selects. Full accessible date names, live month title, today underline separate from selected fill. | Date-only `YYYY-MM-DD`, local calendar arithmetic at noon; no UTC parsing. Native `min/max` disable dates and bound keyboard movement. Input/change events follow selection. Native Date Input remains usable without JS. No ranges, booking rules or locale infrastructure. |
| Tree View | Native nested navigation lists, branch buttons with `aria-expanded` and generated `aria-controls`. Enter/Space toggles; Tab follows document links/buttons. | Navigation disclosure, not an ARIA tree widget. No role=tree or virtualized focus model. |
| Rich Text Editor | Named contenteditable textbox; toolbar buttons Bold, Italic and Insert link. Select text first; toolbar keyboard access uses native Tab/Enter. Formatting wraps selected content, pressing an active bold/italic control unwraps its enclosing mark. State follows the selection, including aria-pressed=mixed across differently formatted text. Existing links are updated without nesting anchors. | Small HTML fragment editor, not a document framework. Links accept absolute https/http/mailto only. Paste inserts plain text; drop is rejected. Serialization preserves text, p/div/br/strong/em/a, strips attributes except safe href, and drops executable foreign content. Formatting is selection-based, not a future-typing toggle; use browser editing for text. App must validate stored input server-side and never reinsert untrusted HTML. No execCommand dependency or undo-history guarantee for toolbar transformations. |
| Code Block | `[data-copy-code]` copies exact code text, announces success only after resolved clipboard write; failure explains manual copy. Overflowing pre becomes a named, focusable region, with ResizeObserver cleanup. | No highlighter or clipboard permission request. Copy preserves focus. No tab stop on non-scrolling code. |
| Stepper | Native number input, two buttons named Decrease/Increase. Native stepUp/stepDown use min/max/step; endpoint buttons disable. | Empty/invalid values initialize to min or zero. Fractions follow native step alignment; `step=any` has no stepping operation. Changed values emit bubbling input then change. Readonly/disabled inputs do not step. |
| Segmented Control | Native group of buttons, exclusive aria-pressed state; every button remains in normal Tab order. | Not tabs. `sk:change` carries button data-value or label; application owns the changed view. |
| Toast / Promo Banner | Include labeled `[data-sk-dismiss]` control; toast has role=status for messages inserted into an existing live region. | Explicit dismissal only, no timeout, storage or global notification service. Persistence and message insertion belong to the app. |
| Carousel | Track is keyboard-focusable; previous/next move by a viewport, disable at boundaries and announce direction. | No autoplay. Respects reduced motion and RTL. Native keyboard scrolling remains available. |
| Drawer | Nonmodal secondary aside, hidden when closed, focus enters on opening and returns to connected opener on close/Escape/scrim. | Tab follows document order; no nominally modal focus trap. Inline shell is default; `data-position=sheet` explicitly positions it. For actual modality use native Modal, not Drawer. |

## Compatibility decisions

- Button: use `<button type="button">` for actions or `<a href>` for navigation; loading is an explicit accessible composition, never a pretend prop binding. Icon inherits text color so primary, secondary, ghost and danger compositions remain visible. Native disabled prevents activation. Enhanced `.sk-button[aria-disabled=true]` suppresses click/navigation; CSS-only anchors must omit href or be replaced with text when unavailable.
- Card: `title` names the heading; historical `heading` is an authoring alias. Body and actions are real child content. An interactive card composes a title link rather than nesting controls inside one clickable region.
- Form Field: `control` is a native input/select/textarea slot with a matching label ID and description references. `type` applies to inputs only; the canonical text example is one valid composition rather than the only control type.
- Checkout Summary: `totals` groups formatted subtotal/tax/total content. Existing subtotal/total names remain aliases. No calculation, payment or checkout action is supplied.
- Ecosystem Map: `nodes` and historical `items` describe authored node articles. Relationships are visible prose/links. The historical radial name aliases the base grid; no graph engine exists.
- Alert: danger/warning/success/neutral reflect implemented data-variant selectors. Compact remains an explicit base alias.
- Hero/layout/grid names bind to data-layout or data-density only where their schema variant contract says so. Other legacy names alias base styling; they are not promised switches. No names were removed to conceal missing styles.
- Icon: size is data-size=sm/md/lg; boxed is data-icon-variant=boxed. Meaningful wrappers need role=img and aria-label; decorative wrappers need aria-hidden=true. Inline SVG and local sprite use are markup compositions. CSS cannot assign ARIA. Consumer-supplied icon licenses remain consumer-owned; the local sample geometry is covered by SiteKit's MIT license.
- Avatar uses meaningful img alt or empty alt when decorative. Initials use `<span class="sk-avatar" role="img" aria-label="Alex Morgan">AM</span>`.
- Progress uses a labeled native progress element with bounded value/max and browser-synchronized fill. Omitted value uses native indeterminate presentation; legacy div/span markup remains styled but consumers must synchronize its ARIA values and fill themselves.
- Canonical templates for Bento Grid, Content Section, Generator Panel, Newsletter Signup and Product Showcase now include `.sk-component-container`. This outer element owns inline-size containment; the component root owns layout. Old explicitly contained markup remains supported. Unwrapped Bento uses an intrinsic grid fallback; do not expect authored spans without containment.
- Skip links now reveal on focus. Targets should have tabindex=-1 to accept navigation focus.

## Evidence and source model

Each component schema contains property/variant/slot contracts, guidance, and current example references. Standalone HTML lives at `components/<slug>/example.html`; `scripts/generate-contracts` validates metadata and generates the current manifests and lab catalog. Binding descriptions distinguish native attributes, authored content and SiteKit state. Neither schemas nor generated JSON execute code or sanitize arbitrary templates.

Guidance consulted: [WAI tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/), [WAI combobox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/), [WAI date-picker example](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/), and [MDN execCommand](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand). The implementation uses an inline calendar, not that example's modal dialog. Actual test scope is recorded in VERIFICATION.md; no screen-reader or WCAG certification is implied.

## Motion and containment inventory

Button color transitions, tooltip/popover visibility/position transitions, Toggle position, Spinner and Skeleton animation use existing SiteKit motion tokens or inherited reduced-motion overrides. Reduced motion limits CSS animation/transition duration to 1ms and disables smooth scrolling. Carousel explicitly selects immediate JS scrolling for the preference. There is no decorative page-animation system.

Floating popovers and tooltips are clamped to the viewport when enhanced and reposition on scroll/resize; oversized surfaces can scroll. This is bounded placement, not a collision/anchor positioning engine. Stack uses a zero-minimum grid track so nested code, tables and native media can shrink within the available component width. Loading Button uses `sk-button__label` for a stable intrinsic label width and overlays `sk-button__status` only while `aria-busy=true`.

For form submission from Combobox, leave the query input unnamed and put the application field name on `input[data-sk-value]`; initialize that hidden input to the committed option value. Query text is transient while editing. Read committed selections from that field or `sk:change`.

Without the optional script, native fields, disclosure controls, links and media remain usable. Tabs leave all source panels readable. Date Picker leaves its native date input visible and hides calendar controls until enhancement; Editor hides formatting controls until enhancement but retains named text editing. Other enhancement-only actions require the optional script; use the documented native Select/Date Input or plain content composition when scripting is intentionally absent.

## Mobile Menu

The full-screen navigation component uses native Modal hooks and adds navigation-link dismissal and CSS scroll locking. See components/mobile-menu/mobile-menu.md. Modal openers now synchronize aria-expanded; disposing an open modal closes it.
