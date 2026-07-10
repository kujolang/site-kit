# SiteKit

SiteKit is an AI-readable, human-verifiable design system and component library for building accessible, semantic, token-driven websites and web interfaces.

It is useful for Kujo official websites, Kujo ecosystem projects, developer documentation sites, product landing pages, SaaS and ecommerce pages, personal sites, agent-generated static sites, and future Kujo-native site generation workflows.

## Source Model

The source of truth is tokens, component schemas, component templates, component CSS, layout recipes, and standards documents. DESIGN.md and css/generated are generated outputs.

## Distribution and compatibility

SiteKit is an internal, source-only design-system package at `0.1.0`. Its
`private: true` manifest is intentional: this repository does not publish an npm
package or promise a hosted component service. Consumers copy or vendor the
reviewed source surfaces they need and run the documented generation checks.

The public contract for this phase is the source model above plus generated
output reproducibility. Changes that alter schemas, templates, token names, or
generated CSS must include migration notes in [CHANGELOG.md](CHANGELOG.md) and
pass build, lint, validation, and snapshots before merging.

## Quick Start

```bash
npm run build
npm run lint
npm run snapshot
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
