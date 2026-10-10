# Consumer upgrades and asset recipes

SiteKit 1.1 is a source-vendored minor release. Existing consumers keep their copied assets until they explicitly upgrade. Keep local overrides outside the vendor directory. No automatic migration, CSS pruning or font conversion runs during a build.

## Compare before copying

From a trusted SiteKit checkout, run:

```sh
node scripts/consumer-audit /absolute/site/vendor/sitekit /absolute/candidate/dist
```

The read-only JSON report identifies both versions and exact manifest SHA-256 values, added/removed/changed assets, missing files, modified files and unexpected files. Exit status is nonzero for invalid or incomplete distributions. This works with schema-1 manifests from 1.0 and 1.1. A consumer without a manifest needs its original release restored into a separate comparison directory; do not invent a manifest for unverified files.

A version label alone does not identify an old unreleased build. Record the release tag, Git commit, downloaded archive checksum and manifest SHA-256 alongside each integration. Hash checks detect drift, not authenticity: verify the archive against the trusted release checksum first. An attacker able to replace both payload and manifest can defeat a local comparison.

## Intact, cache-safe upgrade

1. Verify the candidate archive checksum, extract it separately, and audit its `dist/` directory.
2. Copy the **entire** directory, including fonts, icons, licenses, README, compatibility assets and manifest. Do not merge it over an existing vendor directory.
3. Use a new asset directory such as `/assets/sitekit/1.1.0-<manifest-sha256>/`. Preserve relative paths within that directory; CSS font URLs rely on them. Use the full manifest digest returned by the audit, not the version alone.
4. Switch CSS, optional JavaScript, icon sprite and font preload references together in staging. Check relative paths for nested pages and any base URL.
5. Run the consumer's build, accessibility and keyboard checks, representative screenshots at mobile/tablet/desktop, theme persistence and network checks for missing fonts/icons. Review overrides against the changed-file report.
6. Deploy the new directory before switching HTML. Cache immutable asset URLs long term; revalidate HTML. Retain the old directory and references for rollback and older cached pages.

The report compares files; it does not prove visual or behavioral compatibility. Sites with custom patches need explicit review. Never purge old assets while cached pages still reference them.

## Hero structure

Existing heroes retain their last-child action-row fallback. New heroes should set `data-sk-hero-slots="explicit"` on `.sk-hero` and use `.sk-hero__actions` on the actual action row. A final terminal, image, card or content block will then keep its own layout. The canonical templates demonstrate this opt-in contract.

## Retired bzby theme

The default supported themes remain `kujo-light`, `kujo-dark`, and `personal-dark`. The old commercial theme is named `bzby`. Sites that still depend on it can load the exact v1.0 token palette from the optional compatibility stylesheet:

```html
<html data-theme="bzby" data-sk-legacy-bzby>
<!-- inside head: -->
<link rel="stylesheet" href="/assets/sitekit/sitekit.css">
<link rel="stylesheet" href="/assets/sitekit/compat/bzby.css">
<!-- optional behavior, after the opt-in attribute exists: -->
<script src="/assets/sitekit/sitekit.js" defer></script>
```

The opt-in attribute allows the behavior layer to restore a saved `bzby` preference. It does not add theme controls to your UI. To retire it, migrate stored preferences and controls to a current theme, verify the result, then remove the attribute and stylesheet together. Simply removing the old palette is not a safe consumer migration.

## Optional page-specific CSS

The complete distribution is the supported default. For a measured performance need, a consumer can assemble an additional page bundle from the same pinned source revision: `css/reset.css`, generated tokens and themes, `css/base.css`, selected component CSS, then `css/utilities.css`, in the same order as the distribution builder. Inspect `scripts/sitekit.js` for canonical inputs and preserve its base font URL rewrite. Keep the complete vendor directory and its manifest intact; store custom bundles separately with their own digest and provenance.

Include nested dependencies, shared primitives, overlays, error/loading/empty states, responsive selectors, all supported themes and classes added by JavaScript. Do not infer required selectors only from initial HTML. Compare the custom bundle against the full bundle using the consumer's real routes, keyboard flows and screenshots. Fall back to the full stylesheet if coverage is uncertain. This is a recipe, not a dependency-aware pruning tool or an automatic size guarantee.

## Local font roles and budgets

Use SiteKit's Departure Mono for the documented mono/UI roles; set `--sk-font-sans` for body text and `--sk-font-mono` for headings and code, or use scoped overrides deliberately. Despite its historical name, `--sk-font-sans` defaults to a system monospace stack. Prefer a system body font if another downloadable family offers no clear benefit. The intact distribution includes WOFF2, WOFF and the Departure Mono license; retain the license when redistributing or subsetting.

Preload only the actual above-the-fold font that will be used, and use the exact same content-addressed URL as CSS:

```html
<link rel="preload" href="/assets/sitekit/1.1.0-DIGEST/fonts/DepartureMono-Regular.woff2" as="font" type="font/woff2" crossorigin>
```

Do not preload every format, weight or family. Keep WOFF fallback available, preserve `font-display`, and check network requests for duplicate downloads and layout shift under a cold cache. Font subsetting is optional consumer build work: confirm the license allows it, include all required languages, punctuation, symbols and dynamic content, and verify rendered glyphs. Keep subset files outside the vendor directory, name them by content, record the source/font-tool versions, and keep the original licensed font available for rollback. SiteKit does not ship a font subsetter.

## Optional CLI

The [standalone CLI](../packages/sitekit-cli/README.md) automates verified whole-directory upgrades with backups and recovery. It requires a complete manifest-bearing installation and Node 20+, but no Kujo runtime. Its registry publication is separate from the SiteKit asset release. Follow its README for current installation instructions.
