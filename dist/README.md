# SiteKit 1.0.0 distribution

This directory is the supported SiteKit v1 source-vendored artifact. Copy it as a unit, load `sitekit.css`, and optionally load `sitekit.js` for progressive behavior. Keep `fonts/` beside the CSS file because the relative font URLs are part of the contract.

The bundle order is reset, tokens, themes, base, components, and utilities. `LICENSE` covers SiteKit; `fonts/DepartureMono-LICENSE.txt` covers the bundled Departure Mono assets. The curated Tabler sprite is in icons/tabler.svg; preserve icons/LICENSE.txt. Theme-aware scrollbars apply throughout the bundle, with forced-color system fallback. npm publication is not part of SiteKit v1.
