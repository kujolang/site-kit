# SiteKit

SiteKit is an AI-readable, human-verifiable design system and component library for building accessible, semantic, token-driven websites and web interfaces.

It is useful for Kujo official websites, Kujo ecosystem projects, developer documentation sites, product landing pages, SaaS and ecommerce pages, personal sites, agent-generated static sites, and future Kujo-native site generation workflows.

## Source Model

The source of truth is tokens, component schemas, component templates, component CSS, layout recipes, and standards documents. DESIGN.md and css/generated are generated outputs.

## Distribution and compatibility

SiteKit remains an internal package at `0.1.0`; `private: true` is intentional.
Consumers should copy or vendor the generated `dist/` directory, or keep this
repository as a local dependency. No npm publication or hosted service is
promised.

The supported consumer entry point is:

```text
dist/sitekit.css
dist/sitekit.js        optional progressive behavior
dist/fonts/*           required sibling assets for Departure Mono
```

`npm run build` regenerates the bundle in this order: reset, primitive and
semantic tokens, theme overrides, base styles, components, then utilities. The
font URLs in `dist/sitekit.css` are relative to `dist/fonts/`; preserve that
directory relationship when copying or vendoring. The same bundle works from a
`file://` URL and from a local HTTP server. `css/generated/*` remains useful for
source inspection, but consumers should not manually assemble it.

For a static HTML consumer:

```html
<html lang="en" data-theme="kujo-light">
  <head>
    <link rel="stylesheet" href="./sitekit.css">
  </head>
  <body>
    <!-- semantic SiteKit markup -->
    <script src="./sitekit.js" defer></script>
  </body>
</html>
```

Omit `sitekit.js` when CSS-only markup is preferred. If it is loaded, it
enhances dropdowns, popovers, drawers, dialogs, tooltips, theme controls, and
focus behavior only when their documented hooks are present. See
[docs/components.md](docs/components.md) for selection guidance and
composition contracts.

## Quick Start

```bash
npm run build
npm run lint
npm run validate
npm run snapshot
npm run smoke
open examples/component-lab/index.html
```

## Design Commitments

- Clarity, context, and control.
- Local-first files where possible.
- Agent-readable contracts and human-verifiable output.
- Semantic HTML before ARIA.
- Tokens before one-off values.
- Components before page-specific styling.

## Release checks

```bash
npm run build
npm run lint
npm run validate
npm run snapshot
```

The GitHub Actions workflow runs the same source-only gate. Browser/accessibility
testing remains a separate pre-launch requirement for representative consuming
layouts; it is not represented as proof from this package alone.

## Launch readiness

Current launch scope: locally verified technical preview. The 2026-07-28 next
batch proof passes the native build, lint, validation, snapshot, browser smoke,
and formatting gates. Release-candidate scope still requires current Workcell
proof and broader representative visual/accessibility evidence. See
[`docs/launch-checklist.md`](docs/launch-checklist.md).
