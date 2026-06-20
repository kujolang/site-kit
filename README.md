# SiteKit

SiteKit is an AI-readable, human-verifiable design system and component library for building accessible, semantic, token-driven websites and web interfaces.

It is useful for Kujo official websites, Kujo ecosystem projects, developer documentation sites, product landing pages, SaaS and ecommerce pages, personal sites, agent-generated static sites, and future Kujo-native site generation workflows.

## Source Model

The source of truth is tokens, component schemas, component templates, component CSS, layout recipes, and standards documents. DESIGN.md and css/generated are generated outputs.

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
