# Showcase information architecture

Everything in this document is PROPOSED website functionality. Canonical host is `https://sitekit.kujolang.ai`; use trailing-slash HTML routes and immutable component slugs. `showcase-routes.json` enumerates exact routes, audiences, required data and interactions. All 85 component pages are v1, including honest reference pages for incomplete widgets.

## Sitemap and navigation

```text
/
/getting-started/          product model, quickstart, file-copy setup
/getting-started/vendoring/ distribution, fonts, licenses, versions
/getting-started/behavior/ native vs shipped vs consumer behavior
/foundations/             overview
/foundations/colors/      semantic/raw swatches and themes
/foundations/typography/  both actual font stacks and type hierarchy
/foundations/spacing/      space and size rulers
/foundations/geometry/     borders, radius, surfaces, shadows
/foundations/layout/       utilities, containment and breakpoints
/foundations/motion/       real motion gallery and preference behavior
/foundations/icons/        inline/sprite/name/size/meaning contracts
/tokens/                   full token inspector
/components/               searchable categorized index
/components/<85 slugs>/   detailed reference and actual markup
/components/matrix/        selected verified states/variants
/patterns/                 eight recipe descriptions and compositions
/patterns/<8 recipe slugs>/
/layouts/                  six starter layout references
/layouts/<6 layout slugs>/
/examples/                 four application compositions
/examples/repository-dashboard/
/examples/documentation-workbench/
/examples/product-catalog/
/examples/launch-editorial/
/playground/               same component adapters as detail pages
/accessibility/            keyboard and known boundaries
/changelog/                library version history with source links
/search/                   useful full-page search results
/404.html                  real not-found document
```

The homepage's job is immediate orientation and one real interaction: display a compact Button/Badge/theme comparison and link to all components, foundations and a dashboard example. Avoid a long marketing funnel. The main navigation has Getting Started, Components, Foundations, Patterns and Examples. Tokens and Playground are prominent tools, not a second product. Search is globally available. Layout references may sit under Patterns in the sidebar while retaining distinct routes and data types.

## Audiences and data

New consumers need vendoring and a minimal page. Builders need component pages and exact DOM bindings. Maintainers need discrepancy notes, sources and tests. Designers need live token/theme comparisons. Coding agents need the same factual model with stable URLs and compact downloadable metadata. Do not maintain a competing AI-only knowledge source.

Sidebar categories use source index categories, with navigation aliases where useful: Form Field under forms, Accordion searchable as disclosure/FAQ, Modal as dialog, Toggle as checkbox/switch-like, Command Strip explicitly distinguished from command palette. The 15 primitives are a filter, not a misleading separate package.

## Reusable component page

1. Name, short audited purpose, category, source version and support badge (HTML/CSS, native, optional JS, example-only behavior).
2. Real initial preview, readable without a code editor; controls only for implemented bindings.
3. Synchronized HTML and any required consumer JS/CSS in separate labeled panels. Always show actual link/script consumption and copied dependencies.
4. Use/avoid guidance and a practical composition.
5. API table with declared type/required/default, verified DOM binding, confidence and implementation caveat; slots and template attributes separately.
6. Implemented variants/states matrix only when meaningful; declared-but-unimplemented names in an explicit limitations section.
7. Keyboard/ARIA notes, native behavior, lifecycle and responsive/container expectations.
8. Related components, recipe memberships, exact source permalink and evidence/version.

Stable section anchors: #preview, #usage, #api, #variants, #states, #accessibility, #responsive, #examples, #source. Do not show empty sections merely to preserve template symmetry; anchors can resolve to a concise not-applicable explanation for machine consistency.

## Mobile and site UI composition

Header/Footer and link Navigation are supplied. A docs sidebar, TOC, active-route marking and collapsed mobile navigation are site composition work. Start with native details/summary for mobile navigation, plus Skip Link; avoid relying on the incomplete Drawer for essential navigation. If a modal navigation sheet is later used, base it on native Modal and verify focus.

Search Input supplies controls, not results. Use a plain list of named links and an announced result count for v1. No command-menu role is necessary. A Ctrl/Cmd+K modal shortcut may be P1 once keyboard behavior and focus restoration are tested; do not build it on the incomplete Combobox.

Controls use native Select, Checkbox, Text Input, Slider and Buttons in Form Field/Fieldset structures. Tables use Table; notices use Alert; cards use Card; code uses Code Block with site-owned copy. Documentation prose uses semantic article headings/lists/tables and a small token-based prose layer: no Markdown/prose component currently exists. Preview boundaries and resizable frames are showcase CSS.

## Search contract

Generate a static index from audited metadata and authored content, not HTML dumps. Each record has id, canonical route+anchor, title, kind, category, aliases, short summary and keywords (props, slots, CSS variables, recipes). Rank exact name/slug highest, then aliases/tokens/props, then descriptions. Normalize case and hyphens; searching dialog finds Modal, switch finds Toggle with its checkbox boundary, command palette returns an explicit missing-feature explanation rather than Command Strip as an equivalent.

Fetch the index on search interaction; keep an accessible browse fallback at /components/. Display query, result count, clear/reset and no-results guidance. Deep-link `?q=` as plain encoded text; bounded query length, no HTML insertion. Keyboard Tab/Enter works on links. A full-page route preserves history and is useful on mobile and without modal UI.

## Human and agent discovery

Publish semantic HTML with one page h1, landmarks and explanatory text outside frames. Provide canonical URLs, sitemap.xml, robots.txt, title/description and static social metadata. Emit /llms.txt linking the quickstart, component index, API and token manifests; it is an index, not an access-control mechanism. Publish /api/components.json, /api/tokens.json, /api/routes.json and compact /api/components/<slug>.json files. Serve canonical HTML examples as text downloads with stable IDs and source version. Expose evidence/confidence in JSON; remove bulky raw CSS rule details from the browser index, retaining them in maintainer metadata. An executable agent server or WebMCP integration is not required for v1.
