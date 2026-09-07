# SiteKit

[![Version](https://img.shields.io/badge/version-1.0.0-black)](https://github.com/kujolang/site-kit/releases/tag/v1.0.0)
[![License](https://img.shields.io/badge/license-MIT-lightgrey)](LICENSE)
[![built for Kujo](https://img.shields.io/badge/built%20for-Kujo-white.svg)](https://github.com/kujolang/kujo)
[![CI](https://github.com/kujolang/site-kit/actions/workflows/ci.yml/badge.svg)](https://github.com/kujolang/site-kit/actions/workflows/ci.yml)
[![node](https://img.shields.io/badge/node-%E2%89%A520-black.svg?logo=node.js&logoColor=white)](#install-or-vendor)

SiteKit 1.0 is a stable, source-driven design system for accessible, semantic, token-based static websites and web interfaces. Its supported consumer artifact is the generated `dist/` directory, copied or vendored into a project. SiteKit remains `private: true`; npm registry publication is not part of v1.

## Stable v1 contract

SiteKit v1 keeps these surfaces stable:

- design tokens and bundled themes;
- component schemas and semantic HTML templates;
- generated component CSS and layout recipes;
- documented accessibility and responsive contracts;
- `dist/sitekit.css` and optional progressive behavior in `dist/sitekit.js`;
- bundled Departure Mono font assets and their license;
- file-copy/vendor consumption from `file://` or HTTP;
- deterministic generation, validation, and representative static HTML consumers.

Tokens, schemas, templates, component CSS, recipes, and standards are authoritative. [DESIGN.md](DESIGN.md), [the component index](docs/components.md), generated CSS, and `dist/` are generated outputs.

## Install or vendor

Build from a clean checkout with Node 20 or newer:

```bash
npm ci
npm run build
cp -R dist /path/to/consumer/sitekit
```

Alternatively, download the GitHub release archive and copy its `dist/` directory. Do not flatten it: the font URLs in `sitekit.css` require `fonts/` to remain beside the CSS file. The archive and distribution include the SiteKit MIT license and the separate Departure Mono license.

## Quick Start

```html
<!doctype html>
<html lang="en" data-theme="kujo-light">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="./sitekit/sitekit.css">
  </head>
  <body>
    <main class="sk-container sk-stack">
      <h1>Semantic SiteKit page</h1>
      <button class="sk-button" type="button">Continue</button>
    </main>
    <script src="./sitekit/sitekit.js" defer></script>
  </body>
</html>
```

`sitekit.css` is the required CSS entry point. `sitekit.js` is optional and is a browser script, not a conventional Node application entry point. It progressively enhances documented dropdown, popover, drawer, dialog, tooltip, and theme hooks. Without it, semantic HTML, native controls, content, layout, and CSS remain usable; consumers provide any behavior they need.

## Themes


## Fonts, icons, and licenses

`sitekit.css` loads `DepartureMono-Regular.woff2` and `.woff` from `./fonts/`. Preserve those paths. SiteKit's code and documentation use the [MIT license](LICENSE); Departure Mono retains its own license in [fonts/DepartureMono-LICENSE.txt](fonts/DepartureMono-LICENSE.txt) and `dist/fonts/DepartureMono-LICENSE.txt`.

SiteKit does not bundle an icon library. Use a small inline SVG or a consumer-owned SVG sprite following the [Icon contract](components/icon/icon.md), and preserve the source icon license.

## Browser support

The release gate exercises the supported static distribution in current Playwright Chromium, Firefox, and WebKit across desktop (1440×900), tablet (768×1024), and mobile (390×844) viewports, in light and dark themes. It also covers `file://`, local HTTP, reduced motion, 200% text scaling, horizontal overflow, and CSS-only use. Unsupported or obsolete engines are not promised visual parity.

## Accessibility boundary

WCAG 2.2 AA is the design and automated-test baseline for SiteKit source components, documented hooks, and tested reference compositions. The contract includes semantic landmarks, ordered headings, labels and descriptions, table captions and scoped headers, keyboard access, visible focus, reduced-motion fallbacks, and focus management for supported progressive behaviors.

SiteKit does not certify arbitrary downstream pages. Consumers remain responsible for their content, composition, application state, contrast changes, assistive-technology testing, and any framework integration.

## Discover components and layouts

- [Component index](docs/components.md) lists every schema-backed component and composition guidance.
- `components/<name>/` contains the schema, semantic template, CSS, documentation, and examples.
- `recipes/` describes supported page compositions.
- `layouts/` and `examples/` provide representative static HTML consumers.
- [DESIGN.md](DESIGN.md) summarizes generated design-system guidance.

## Generate and verify

```bash
npm run format:check
npm run build
npm run lint
npm run validate
npm run snapshot
npm run smoke
npm run browser:test
npm run generated:check
npm run release:check
npm test
```

`npm run format` deterministically formats repository JSON and normalizes supported text files. `npm run generated:check` generates twice, compares outputs, and rejects tracked drift in `css/generated/`, `DESIGN.md`, `docs/components.md`, `dist/`, and the component snapshot. `npm run release:archive` creates deterministic `artifacts/release/sitekit-v1.0.0.tar.gz` plus a SHA-256 checksum without publishing anything.

See the [launch checklist](docs/launch-checklist.md) for Workcell, Lens, ShipCheck, hosted CI, tagging, rollback, and clean-consumer procedures.

## Compatibility and upgrades

Patch releases may fix defects without changing documented v1 contracts. Minor releases may add backward-compatible tokens, schemas, components, hooks, themes, or metadata. Removing or redefining a supported path, token, schema contract, or documented behavior requires a major release. Consumers should vendor an exact release archive, retain its checksum, read [CHANGELOG.md](CHANGELOG.md), and rerun their own page-level accessibility and browser tests when upgrading.

## Explicit non-goals

SiteKit v1 does not promise npm publication, a hosted component service, universal compatibility with every framework, accessibility certification for arbitrary downstream compositions, visual parity in unsupported browsers, or automatic behavior for markup that omits documented hooks.

## Current implementation contracts

See [gap-closure handoff](docs/sitekit-gap-closure/README.md) for scoped enhancement, bounded widgets, compatibility aliases, current metadata and verification. [Reference compositions](examples/reference-compositions/index.html) demonstrate forms, native media, documentation navigation and local fixture search.
