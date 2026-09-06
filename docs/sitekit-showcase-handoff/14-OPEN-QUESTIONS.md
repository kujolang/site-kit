# Open questions and bounded caveats

## Settled by repository evidence

SiteKit is a source-vendored HTML/CSS system with optional browser hooks, not a React toolkit. There are 85 schema concepts, 120 base tokens, four themes, six layout documents and eight recipes. dist must retain sibling fonts. Existing advanced-looking templates do not imply fully implemented widgets. These are not questions the build agent needs to rediscover.

## Decisions the builder may make within this specification

| Question | Recommended default | Effect |
| --- | --- | --- |
| Website checkout location | Dedicated sitekit.kujolang.ai repository | Keeps library release package and site output separate |
| SSG version | Pin current compatible Kujo SSG and test HTML preservation | Existing ecosystem integration is demonstrated, exact future commit not selected |
| Search UI | Full-page plus inline search first | Avoids command-palette accessibility scope |
| Preview implementation | Static same-origin per-example documents, bounded adapters | No code execution service |
| Incomplete widgets | Honest static reference plus clearly owned consumer example only when needed | Do not block all documentation waiting for library expansion |
| Outer containers | Explicit wrapper for query-sensitive specimens | Preserve source CSS while making containment visible |
| Source links | Audit SHA until a new approved snapshot is ingested | Prevents silently shifting references |

## Unresolved library facts/behavior

- Many declared variants have no implementation selectors and no distinct compositions. Author intent cannot be safely inferred; classify them as declared-only.
- Array item structures, many defaults and schema slot bindings are unspecified. Use reviewed concrete examples rather than inventing generic render schemas.
- Browser/screen-reader behavior outside the executed test/probe scope remains unknown. Four-theme, RTL, high-contrast/forced-colors, dynamic opener insertion, nested modals, empty-focus drawers and hidden-ancestor focus selection need targeted validation.
- The lab's illustrative metrics, endorsements and commercial details are not validated product claims. Replace with approved facts or clearly labeled fixtures.
- No public service-level support policy or hosted SiteKit deployment contract was established beyond repository v1 statements.

## Deployment and external research unknowns

No Cloudflare zone/account, DNS ownership, existing project binding, production build environment, secret store or deployment credentials were queried. Choice of Pages versus Workers Static Assets remains a hosting decision. Compatibility is supported by official static hosting docs, not a completed deployment test.

The live Kujo home document was fetched on 2026-09-06; a website response and screenshot do not establish the deployed source commit. Local sibling sources are evidence of ecosystem convention, not guaranteed current production state. The official logomark asset should be copied with verified provenance during implementation.

## Audit verification boundary

Read evidence/verification.json and 16-TESTING-AND-QUALITY.md for exact commands and outcomes. Any failing isolated probe is a library/composition caveat, not hidden behind representative page-test results. This mission must leave source defects unfixed unless separately authorized; the implementation dossier and review captures preserve them.

**READY WITH CAVEATS:** the remaining unknowns concern bounded implementation/hosting choices and identified library limitations. None requires another broad archaeological pass before starting the showcase.
