# Standalone SiteKit CLI implementation checklist

CLI package: `@kujolang/sitekit-cli` 0.1.0. Assets remain SiteKit 1.1.0.

- [x] Separate npm package and `sitekit` binary, with no Kujo dependency.
- [x] Shared manifest audit engine; retain existing consumer-audit interface.
- [x] Explicit/bounded discovery and adoption with project configuration and identity lock.
- [x] Status and read-only upgrade checks, latest and exact stable release selection.
- [x] Bounded downloads, checksum/manifest validation and strict archive parsing.
- [x] Drift protection, version guards, exclusive updates and retained backups.
- [x] Recoverable replacement, explicit rollback and interruption recovery tests.
- [x] Optional project-local Kujo namespace adapter calling the same engine.
- [x] Package installation smoke, hostile archive cases and cross-platform CI gates.
- [x] Setup, migration, deployment, recovery and publication documentation.
- [ ] Publish npm package: external-blocked; npm whoami returned E401 on 2026-10-10. Restore npm organization authentication, then publish the independently versioned CLI package.

All implementation items are local-fixable. Publication is external-blocked. No consuming websites are upgraded by this implementation and no SiteKit asset version or Kujo core changes are included.
