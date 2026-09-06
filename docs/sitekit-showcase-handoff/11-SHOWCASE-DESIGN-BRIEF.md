# Visual and interaction direction

## Evidence and identity

VERIFIED source: DESIGN.md, tokens/core.json, tokens/semantic.json, component CSS and examples/component-lab/index.html. The current `https://kujolang.ai/` document was fetched successfully with HTTP 200 on 2026-09-06 after the web reader failed. It references local assets/css/sitekit.css, a separate style.min.css, local Kujo logomark, local scripts, and a static site index. Live appearance is supporting ecosystem evidence, not authority for component behavior. See evidence/external-research.json and the visual review notes in verification.

The local `../kujolang.ai-work` source uses Kujo SSG and SiteKit plus project composition styles. Its default SSG settings include remote fonts, but production configuration overrides them; do not copy those defaults. `../docs.kujolang.ai` has additional typography overrides and older flattened font references, which must not override this repository's current dist/fonts contract.

The visual review confirmed a bordered white header, small K logo, pixel-like Departure Mono display, monochrome dither hero imagery and square compact actions on the live home. The local dashboard shares the framed geometry and monospace hierarchy, but its black primary icon buttons exposed an inherited color defect. Preserve the identity while addressing documented consumer/library boundaries. Screenshots are in evidence/kujo-home.png and evidence/consumer-dashboard.png.

## Direction (PROPOSED)

The site should feel like a carefully organized technical reference built with the system on display. Use SiteKit's actual monochrome surfaces, fine borders, square corners, Departure Mono display labels and system monospace body. Let colorful severity states remain meaningful. Use the official small K logomark from a verified Kujo asset source, preserve provenance, and keep it subordinate to the SiteKit name. SiteKit itself does not bundle an official Kujo logo collection.

Use a restrained header and a legible navigation column with clear section names. Show catalog density on the index and give individual previews breathing room. Component pages should have a strong name/purpose/support block followed immediately by an example, not a hero illustration. The preview canvas can use an optional token-based measurement grid; default to an uncluttered surface.

Typography must show what ships. Body is monospace despite font.sans naming. Headings h1/h2 and many component labels use Departure Mono; only a regular 400 font asset exists. Keep line lengths practical and use clear spacing; do not present invented Inter/sans typography as a SiteKit foundation. A site prose override may improve reading hierarchy but belongs outside component previews and must be documented as composition.

Hard borders and section rhythm carry structure. Shadow tokens resolve to none. Avoid unrelated gradients, pill-shaped navigation, floating glass panels, giant decorative motion, copied shadcn/Tailwind/Radix visual identity, or a full-screen Storybook-style control console. Borrow predictable reference-page organization, not another library's appearance.

Keep demo and control surfaces distinct with headings and borders. Do not recolor components simply to match the site shell; frame themes independently. Show light as the default Kujo identity while making all four themes accessible. Preserve dark code panels as they actually resolve; do not silently force inverse code colors.

## Responsive and interaction principles

Navigation becomes a simple labeled disclosure on smaller screens; search has its own usable page. Preview/code/controls stack naturally. Tables may scroll in a named bounded region; ordinary body content must reflow. Copy feedback must be accurate and announced without moving focus. Theme and state changes retain keyboard focus. High-density matrices become sequential cards or horizontally scrollable semantic comparisons, not unreadable scaled miniatures.

Use existing Button transitions and focus rings. Only animate meaningful changes already in the components; honor reduced motion. Previewing an overlay should exercise its real behavior, not merely show an open static mockup. Examples with incomplete behavior receive candid support labels and a link to the implementation boundary.

## Visual acceptance

At 390px and 1440px, the homepage, component page, token inspector, search results and dashboard must be recognizably the same system. Verify the actual font loaded, clear hierarchy, current-page navigation, focus visibility, four-theme legibility, code overflow and a consistent source-version indicator. The site must be useful with scripts blocked, even when dynamic controls cannot run.
