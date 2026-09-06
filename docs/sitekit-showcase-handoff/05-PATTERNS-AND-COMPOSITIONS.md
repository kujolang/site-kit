# Patterns, layouts and example applications

## Existing composition sources

The eight recipe objects are retained verbatim with source paths in `component-manifest.json.recipes`. They specify component membership, a layout filename and short accessibility rules; they do not compose pages at runtime.

| Recipe | Layout | Distinct contribution |
| --- | --- | --- |
| Launch Page | landing.html | Header + Hero + Badge/Button + Feature Grid + CTA + Footer |
| Docs Home | docs.html | Header/Navigation + Hero + Code Block + Card + Footer |
| Source of Truth Dashboard | app-shell.html | Table, Badge, Metadata Panel, filters and five overlay/menu patterns |
| Ecommerce Page | ecommerce.html | Promo Banner, Product Grid/Card, Checkout Summary, Trust Strip, Accordion |
| Ecosystem Page | landing.html | Hero + Ecosystem Map + Card/Navigation |
| Pricing Page | landing.html | Pricing Table/Table + Accordion + CTA |
| Product Page | landing.html | Product Card + Feature Grid + Trust Strip + CTA |
| Blog Index | blog.html | Header + Badge/Card + Navigation/Footer |

Six layout HTML documents exist: landing, docs, ecommerce, app-shell, blog, changelog. These are starter pages rather than a layout engine. For example docs is a header plus short article, not a complete documentation sidebar/TOC system. App-shell is a simple section with one static tab, not the developed dashboard. Read `examples/consumer-dashboard/index.html` for the stronger app composition. Blog/changelog layouts do not imply a content parser, RSS generator or changelog runtime.

Six actual example pages exist: component-lab, consumer-dashboard, kujolang-ai, docs-site, ecommerce-page and personal-site. The lab has custom inline presentation and event code; it is not authoritative for shipped interactions. Examples named after brands use illustrative content; do not publish their metrics, endorsements, prices or promises as real product facts.

## Recommended four showcase examples (PROPOSED)

1. **Repository readiness dashboard** — adapt consumer-dashboard using local fixture data. Table + Badge + Metadata Panel + Header + native filter inputs + Dropdown/Menu + Modal + Popover/Tooltip. Add actual local filtering as clearly marked example application behavior. Proves a serious operational interface and keyboard use. Drawer requires the documented positional CSS and modality decision; avoid presenting it as a fully supplied shell.
2. **Documentation workbench** — the showcase itself, also available as a small downloadable composition. Header/Footer, Navigation, Search Input, Code Block, Card, Badge, Table and native details for mobile navigation. Proves dense reference material, readable prose and progressive enhancement. Search, TOC, clipboard and navigation state are site-owned modules.
3. **Product catalog and order review** — adapt ecommerce-page/recipe with Product Grid/Card, Pricing Table, Checkout Summary, Trust Strip, Accordion and Empty/Error State. Use inert local items and a deterministic local cart only if needed to show state; no checkout service or external payments. Label all amounts as demo data. Proves commercially useful structures and narrow-screen data layouts.
4. **Launch/editorial page** — combine kujolang-ai and personal-site patterns: Hero, Content Section, Feature Grid/Bento Grid, Recent Posts, Quote, Resource Links and CTA. Proves long-page hierarchy, restrained typography and composition breadth. Use reviewed project facts instead of fabricated testimonials.

Each example has a stable route, component list, data fixture, minimal source download and explanation of what SiteKit supplies versus the example controller. These four are sufficient for v1; generator/agent/chat applications are not implied by the repository.

## Composition recipes that deserve first-class explanation

- Button + Icon: accessible name on the button; decorative SVG hidden; size wrapper separately from SVG path geometry.
- Form + Form Field + Label: unique IDs, visible labels, help/error association, native constraints; explain why schema requiredFields is unrelated to HTML required.
- Modal + action Button: opener ID hook, dialog label, close button, native method=dialog; test focus restoration after dismissal.
- Table + Badge + Metadata Panel: caption and scoped headers, redundant status words, long values, narrow-width scrolling.
- Card + Empty/Error State: distinguish a display state from a data-fetching or retry controller.
- Theme controls + any component: select all four supported values, persist only explicit preference, demonstrate code surfaces separately in dark themes.
- Utility Stack/Cluster/Grid + sections: composition spacing belongs to utilities; the schema Stack adds child panel styles and should not wrap everything.

No layout/recipe is a reusable constructor. Copying a recipe object alone produces no HTML. The second agent should author a small number of explicit render adapters for real component markup and composition templates, not an inferred universal DSL.
