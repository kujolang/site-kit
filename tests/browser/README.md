# Browser tests

`npm run smoke` is the deterministic static distribution/HTTP contract test; it is not rendered-browser proof. `npm run browser:test` runs Playwright Chromium, Firefox, and WebKit over the component lab, dashboard, landing, documentation, ecommerce, CSS-only, interaction, reduced-motion, text-scaling, and clean-consumer cases. Reports are generated under `artifacts/browser/` and are not committed.

Run Lens separately against the local server for deterministic screenshots, links, network, DOM, overflow, and axe-core evidence. See [the launch checklist](../../docs/launch-checklist.md) for the exact matrix and evidence boundary.
