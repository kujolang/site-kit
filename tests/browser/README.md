# Browser tests

`npm run smoke` is the deterministic static distribution/HTTP contract test; it is not rendered-browser proof. `npm run browser:test` runs Playwright Chromium, Firefox, and WebKit over the component lab, dashboard, landing, documentation, ecommerce, CSS-only, interaction, reduced-motion, text-scaling, and clean-consumer cases. Reports are generated under `artifacts/browser/` and are not committed.

Run Lens separately against the local server for deterministic screenshots, links, network, DOM, overflow, and axe-core evidence. See [the launch checklist](../../docs/launch-checklist.md) for the exact matrix and evidence boundary.

Console output uses a compact dot reporter; failure details and HTML/JSON reports remain available. Accessibility page/theme scans are independent tests so a failure identifies its exact composition. Tooling server guards are checked separately by `npm run test:tooling`; the loopback fixture rejects malformed URLs, hidden paths and symlink escapes and must only serve a trusted checkout.
