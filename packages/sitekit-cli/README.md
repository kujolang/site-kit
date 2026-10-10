# SiteKit CLI

Manage source-vendored SiteKit assets in any website using Node 20 or newer. Kujo is optional. The website itself needs no Node runtime.

This is CLI version **0.1.0**, independent of the SiteKit asset version. Installing or updating this package never changes your website automatically. The SiteKit asset distribution remains version 1.1.0.

## Install

Until this package is published to npm, build its installable tarball from the SiteKit repository:

```sh
npm pack ./packages/sitekit-cli --pack-destination ./artifacts/release
# In your website project, use the absolute path to the generated tarball:
npm install --save-dev /path/to/site-kit/artifacts/release/kujolang-sitekit-cli-0.1.0.tgz
npx sitekit --help
```

After publication, the registry installation will be:

```sh
npm install --save-dev @kujolang/sitekit-cli
# Or run once without adding a dependency:
npx @kujolang/sitekit-cli status
```

Do not use the registry examples until the package is published. No install hooks or runtime dependencies are included.

## Adopt an existing installation

```sh
npx sitekit init public/vendor/sitekit
npx sitekit status
npx sitekit upgrade --check
npx sitekit upgrade
npx sitekit upgrade 1.1.0
```

`init` checks the existing files and creates `sitekit.json` and `sitekit.lock.json`. Commit both files with your website. An omitted directory triggers bounded discovery (five levels, 5,000 directories); multiple matches require an explicit path. Use forward slashes in configuration paths on all platforms. The managed directory must be a dedicated directory inside your project, with no symlink ancestors.

Adoption requires a complete distribution with `sitekit-manifest.json`. Older installations without that manifest, copied subsets, and locally modified assets need manual reconciliation first. Adoption records the local manifest identity; it does not certify that existing assets came from an official release. Keep site-specific CSS outside the managed directory.

Run the standalone CLI anywhere beneath the configured project root. `status` verifies files against both their manifest and the recorded lock. Local modifications, missing files, extra files/directories, and symlinks block replacement. There is no force-overwrite flag.

## Upgrade behavior

`upgrade --check` downloads and verifies the release in memory and makes **no project writes**, including locks, backups or staging directories. Omitting a version selects the latest stable published GitHub release. Exact stable versions accept `1.1.0` or `v1.1.0`; arbitrary tags, prereleases and version ranges are unsupported. A specific version selects this invocation's target; it does not create a persistent pin.

Downloads have a shared 15-second deadline and size bounds. Both release and distribution manifests must agree with the target version and their file hashes. Archives use SiteKit's regular-file ustar format; links, traversal, duplicate paths, unexpected payloads and corrupt headers are rejected. Checksums establish integrity from the official HTTPS release endpoint, not an independent publisher signature.

Before replacement, the CLI acquires a project lock, rechecks the installation, writes a recovery journal and stages the complete distribution beside the asset directory. It retains the previous directory as `sitekit-backup-<transaction>`. That path and the transaction ID appear in the result. Backups consume disk space; inspect them before manually removing them. Keep `.sitekit/`, `sitekit-stage-*` and `sitekit-backup-*` out of website deployment output and version control. Keep them locally until validation and the rollback window are complete.

Downgrades require `--allow-downgrade`; upgrades across a major version require `--allow-major`. These flags acknowledge version changes; they do not bypass integrity checks. A matching version and manifest is a no-op. A matching version with different contents is refused.

The managed directory stays at the same path. HTML references, bundler configuration, preloads and cache keys are not rewritten. Rebuild bundles, update cache keys where needed, and test your actual website before deploying. Content-addressed asset paths and migrations requiring markup changes still need project-specific work. For the retired `bzby` theme, follow SiteKit's compatibility instructions before upgrading. CLI success verifies the asset operation, not your pages' rendering or accessibility.

## Rollback and recovery

```sh
npx sitekit rollback <transaction-id>
npx sitekit recover
```

Rollback restores a verified backup through a new transaction and preserves the current version as another backup. It refuses locally edited installations and altered backups.

After an interrupted or failed replacement, `recover` restores the previous assets and lock. If a stale process lock exists, recovery checks that its local owner is no longer running. A live or unprovable owner blocks recovery. Candidate files are retained for inspection. If files changed after interruption, recovery refuses to overwrite them. Do not delete the journal or backups before recovering.

Directory renames and metadata updates form a recoverable sequence, not one atomic multi-file operation. A reader may briefly see the managed directory absent during replacement. Stop concurrent builds/servers and other writers while updating; the updater lock coordinates SiteKit CLI processes, not arbitrary editors. This is a development tool, not an in-place production deployment system. Recovery covers interrupted processes; it is not a guarantee against filesystem corruption or power loss.

Use `--json` for machine-readable results. Errors exit 1; successful commands exit 0.

## Optional Kujo extension

```sh
npx sitekit kujo install
kujo sitekit status
kujo sitekit upgrade --check
kujo sitekit upgrade 1.1.0
kujo sitekit rollback <transaction-id>
kujo sitekit recover
```

Installation copies this CLI and small `.kujo` adapters into `.kujo/packs/sitekit`. No Kujo language files are changed. Node must be on PATH and Kujo must support `spawn_process`. Run these aliases from the project root, where Kujo discovers the pack. The adapter uses an explicit argument array, not shell interpolation. A copied pack is independent of `node_modules`; reinstall it explicitly when updating the CLI, after relocating/removing the old pack.

Kujo wraps results in its standard workflow report (`--json` is handled by Kujo). Its existing command timeout is 30 seconds; the adapter gives the subprocess 25 seconds. For large projects or interrupted operations, use the standalone CLI and recovery command. Use `npx sitekit --help` for full command help; Kujo owns namespace help and `--save` behavior.

## Maintainers

From the repository root, run `npm run test:cli`. Set `KUJO` to an absolute Kujo executable path to include real namespace-routing verification. CI tests the engine on Linux, macOS and Windows. The package is separate from the private root asset package; publishing the CLI does not release new CSS/JS assets.

Publish from this directory with `npm publish --access public` only after the CLI gates and package-install smoke pass and npm organization access is configured. Root asset release tags and workflows do not publish this package.
