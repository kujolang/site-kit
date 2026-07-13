# Browser smoke

`npm run smoke` verifies the browser-facing distribution contract deterministically: generated CSS order, relative font assets, both Kujo themes, the optional behavior hooks, reduced-motion CSS, semantic consumer markup, `file://` URL resolution, and local HTTP asset loading.

The consuming layout is [examples/consumer-dashboard/index.html](../../examples/consumer-dashboard/index.html). Use a browser against that file or a local HTTP server to inspect the visual and interactive behavior; no third-party browser driver is required for the deterministic contract suite.
