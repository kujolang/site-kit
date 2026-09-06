# Ordered implementation and deployment plan

PROPOSED. Build in a new website checkout (suggested `sitekit.kujolang.ai`) and keep this library package private. Do not turn library dist into the website output directory. The audit author has not created that checkout or deployed anything.

## Technical choice

Prefer **Kujo SSG + a small Python preprocessing/build script + plain browser modules**. Existing `../docs.kujolang.ai/scripts/build_site.py` demonstrates Python orchestration of `kujo run <SSG_ROOT>/build.kujo -- --content ... --output ... --site-url ... --no-aliases`, while `../kujolang.ai-work` shows SiteKit composition and static output. Pin both the SiteKit source and SSG revision; configure no remote fonts. Node >=20 remains needed for the upstream SiteKit build and Playwright tests. Python 3 and Kujo are build tools, not hosting runtimes.

Use Markdown for explanation and explicit generated HTML partials for API tables, controls, previews and indexes. Do not require SSG to evaluate JSON objects or component schemas. The preprocessing step can emit content/frontmatter/partials from the manifests; SSG handles pages and shared shell. Author page templates in the site checkout, not SiteKit. The docs site's section-build approach is evidence of feasibility, not an instruction to copy its entire bespoke postprocessing pipeline.

Proposed build entrypoint to implement: `python3 scripts/build_site.py --site-url https://sitekit.kujolang.ai`, with `SSG_ROOT` and `KUJO_BIN` overrides; output `output/`. This command does not exist in SiteKit today. A minimal Node static renderer is a fallback only if the chosen SSG revision cannot preserve required markup/anchors; document that decision rather than adding a React application by default. Nothing here requires SSR, a database, auth, API tokens or server-side component execution.

## Phase 1 — Pin, ingest and establish contracts (P0)

Copy a pinned dist as `assets/sitekit/` with fonts/licenses intact. Preserve upstream manifest and checksum. Ingest component/token/routes metadata. Review audit notes and confidence fields, assign stable example IDs and category/alias maps, and generate compact website records. Validate JSON, source paths, all 85 slugs and 120 tokens. Fail builds on unexpected source drift. Do not ship the full maintainer manifest (including all CSS rules) as a page bootstrap payload.

Create a small adapter table for plain HTML examples; start Button, native inputs and Modal to prove native/dist/consumer behavior boundaries. Define unique ID prefixes, escaping and state serialization before generating the other examples. Preserve each component's caveats as content.

## Phase 2 — Static shell and complete content (P0)

Build semantic header, Skip Link, navigation, page layouts, prose styles and footer using SiteKit. Render all canonical routes from showcase-routes.json, all component pages, foundation pages, recipe/layout references and a real 404. Include source permalinks pinned to audited revision, docs anchors and canonical metadata. Add no-JS category browsing and readable API tables. Copy the official Kujo logomark only with verified source/license provenance.

## Phase 3 — Real previews and audited controls (P0)

Generate standalone preview documents with source markup, the actual dist and outer containment when needed. Use the shared adapter model for preview and serialized code. Implement theme, reset, copy and width controls. Verify five dist behaviors via real actions. For incomplete widgets, show static reference and explicit boundary; add a consumer controller only where needed and include it in copied code. Never mark proposed library behavior as shipped.

## Phase 4 — Search, tokens and selected matrices (P0)

Generate compact local search records; implement /search/ and inline component filtering. Add token inspector with four-theme resolution, copy and direct usage references. Implement Button/Badge/Alert/Icon/native-state matrices. Global playground reuses the same adapters and validated query state; it is a route, not a second rendering system.

## Phase 5 — Four serious examples and agent outputs (P0)

Compose dashboard, documentation workbench, product catalog and launch/editorial examples from local fixtures. Keep application interactions explicitly attributed. Publish llms.txt, component/token/route JSON, per-component metadata, canonical example downloads, sitemap and robots. Avoid enabling unused WebMCP scripts merely because a sibling site does so.

## Phase 6 — QA and hardening (P0)

Apply 13-ACCEPTANCE-CRITERIA.md. Test all 85 previews, supported controls, copied examples, ID relationships, forms without network side effects, search, focus, themes, viewport and reduced motion. Capture actual visual baselines of high-value states instead of naming schema JSON a visual test. Audit template injection and postMessage bounds. Measure performance with a fixed declared device/network profile. Repair site composition defects and report reusable library defects separately.

## Phase 7 — Hosting integration (P0, implementation agent)

Static output is compatible with Cloudflare Pages or Workers Static Assets. Recommended default: Pages static hosting for the generated directory, or Workers Static Assets if the project owner's platform standard favors Workers. Both serve HTML/CSS/JS/assets without a dynamic worker requirement. Current authoritative references checked 2026-09-06: [Cloudflare static HTML Pages guide](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/) and [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/).

Configure the build to install pinned build tools and run the proposed build entrypoint, publish output/, use directory index routes, preserve a real 404 and avoid a blanket SPA fallback. Add appropriate MIME types for JSON/fonts, compress assets, cache content-addressed/versioned assets immutably and let HTML/manifests revalidate. A versioned SiteKit asset directory is safer than renaming its CSS independently of the sibling fonts. `_headers`/platform configuration must be verified against the chosen host at implementation time.

No Cloudflare account/project IDs, DNS zone records, existing domain binding or deployment secrets were inspected. Confirm target ownership and desired hosting project before the authorized deployment step. Stage a preview, verify routes/assets/fonts/CSP and missing-page HTTP status, then bind sitekit.kujolang.ai. Record deployment ID, commit, output checksum and rollback route. The present audit does not authorize deploying this assignment's artifacts.

## Performance targets (PROPOSED acceptance budgets)

- Static documentation content needs no hydration to read. Ordinary docs shell JavaScript <=30 KiB gzip, excluding lazily requested preview/search modules.
- One active demo module plus dist behavior <=25 KiB gzip incremental for native/simple components; justify exceptions with measured reports.
- Current dist CSS/JS raw/gzip sizes are recorded in evidence. Avoid loading 85 live iframes or all examples on index pages.
- Lazy search index target <=150 KiB gzip; include concise records, not raw CSS, example source duplicates or whole docs bodies.
- LCP <=2.5s, CLS <=0.1 and measured interaction responsiveness target <=200ms on the declared mobile test profile; field INP remains unknown until sufficient real traffic exists.
- Local WOFF2, font-display:swap, reserve preview/image dimensions, no icon font/library bundle. Syntax highlighting at build time only if needed; plain escaped code is a valid launch baseline.
- Long code and matrices scroll within bounded regions. Use explicit user activation for motion-heavy examples and honor reduction. Keep one component demo active at a time in the global playground.

These are website targets, not measurements claimed for the current library.

## Prioritized website backlog

| Priority | Work |
| --- | --- |
| P0 | All component pages, audited examples/API, static shell, four themes, actual controls, copy/reset, viewport/container previews, local search, token inspector, selected matrices, four example compositions, structured agent outputs, QA, static hosting integration |
| P1 | Ctrl/Cmd+K search dialog, more authored compositions, richer cross-component state examples, downloadable multi-file examples, broader visual baseline matrix, build-time highlighting |
| P2 | Token dependency graph UI, advanced comparison workspace, saved workspaces, framework-specific snippets, code editing, custom themes, hosted services |

P2 is not a prerequisite for launch. Arbitrary executable playground code is outside the recommended architecture entirely.
