# Testing and quality model

## Existing gates: what they actually prove

| Gate | Coverage | Limits |
| --- | --- | --- |
| format:check | Tracked JSON formatting and normalized text | Not a semantic linter; stage new docs before checking |
| build / generated:check | Deterministic token/CSS/docs/dist generation and drift | Does not validate runtime prop bindings |
| validate:components | 85 folders, required schema keys, focus marker, no raw hex in component CSS, recipes and selected heading checks | No full JSON schema enforcement or browser behavior |
| validate:contract | Export/version contract, hashes/fonts/licenses/layer order, all schemas, five representative pages and index count | Regex/assertions, not every instance/state |
| validate:version / validate:links | Version alignment and local Markdown destinations | No external URL availability proof |
| snapshot | Names, variants, example counts in JSON | No pixels, DOM state or visual regression assertions |
| smoke | Static distribution checks plus HTTP asset serving | Not a rendered browser |
| release:check / release:archive | Package file allowlist, licenses, deterministic archive and clean consumer | No publication/deployment |
| browser:test | Chromium, Firefox, WebKit; page matrix and progressive behavior regressions | Representative pages rather than all previews |
| Lens configurations | Six flow targets plus viewport/a11y/links settings | Must be run separately; not executed in this audit |
| CI | Release gate, artifact evidence, source drift; separate ShipCheck checkout/build/gate | Local passing checks do not prove current hosted run status |

No Jest/Vitest unit suite, TypeScript/type tests, coverage instrumentation, framework integration tests, or formal line/branch coverage percentage exists. Some browser regression tests act as focused integration tests. Node contract scripts use assertions rather than a general unit-test runner. No toHaveScreenshot pixel baseline assertions were found in the Playwright suite.

## Browser test matrix

`tests/browser/sitekit.spec.mjs` defines five pages × three viewports × two themes = 30 parameterized cases per engine. Fifteen additional tests per engine cover automated axe scans, dashboard keyboard/focus/state, CSS-only reading, reduced motion/200 percent text, copied HTTP/file consumer, and ten focused progressive-behavior regressions. Total: 45 × three engines = 135 cases.

The axe test scans all five representative pages in Chromium, but only the dashboard in Firefox/WebKit, in light and dark themes. The catalog page renders cards with preview buttons; the matrix does not open every component. The component record testCoverage fields distinguish source/page references from actual behavior assertions.

## Executed audit results

The initial npm test passed all static stages but could not invoke the correct Playwright test CLI until local dependencies were installed. After npm ci and browser installation, `npm run browser:test -- --workers=2` passed all **135 tests** (reported 3.6 minutes). Initial missing-browser/port setup failures were environmental and resolved. See evidence/verification.json for structured final stats.

Additional read-only probes instantiated all **85 dossier examples in two themes (170 cases)** at 390×844, with explicit outer containment and current dist. Twelve cases across six components produced axe findings: Avatar (prohibited aria-label), Code Block (unfocusable overflowing code), Date Picker (missing grid children), Drawer (aria-hidden focus), Progress Bar (prohibited aria-label/missing progress semantics), Rich Text Editor (unnamed textbox). Slider overflowed by 2px in both themes. These findings remain open; they are not fixed by this documentation task.

The standalone Drawer remains rendered despite hidden because authored display:grid overrides the browser hidden rule. Existing dashboard composition supplies its own hiding rules, explaining the discrepancy with passing integration tests. A focused probe also found black SVG stroke on a black primary Button background due to Icon resetting the color token. At 390px, uncontained Bento Grid overflowed to 434px; an outer container produced one column and no overflow. Content Section, Generator Panel, Newsletter Signup and Product Showcase split only when an outer container existed at 1000px.

Probe limitations matter: CSS is injected into setContent, so relative font loading is not established; two themes and default samples do not cover every state. A separate visual review used the live Kujo home and local dashboard with their actual asset loading. No screen-reader review or formal WCAG certification is claimed.

## Reproduce and maintain the dossier

```sh
python3 docs/sitekit-showcase-handoff/generate-audit.py
python3 docs/sitekit-showcase-handoff/verify-handoff.py
node docs/sitekit-showcase-handoff/evidence/probe-components.cjs
node docs/sitekit-showcase-handoff/evidence/reproduce-findings.cjs
```

Generation updates component/token manifests, component details, inventory and source hashes from the pinned source plus authored audit-notes. Routes, foundation narrative and website specifications are authored snapshots and must be reviewed on source upgrades. Probe scripts are evidence tools, not a showcase implementation. Existing npm gates remain the release baseline; 13 adds the website-specific acceptance requirements.
