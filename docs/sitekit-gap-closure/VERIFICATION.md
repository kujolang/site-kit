# Verification record

Final Linux browser matrix passed against verification commit `9c7da48` (implementation source `83cf23e`): **518 passed, 58 intentional skips, zero failures and zero flakes**, in 303,375.11 ms. See [case results](evidence/browser-results.json) and [CI steps](evidence/ci-results.json). See [tested source](evidence/tested-source.json) for the full commit, distribution hashes, runtime and Playwright versions. The package remains private, version 1.0.0, source-vendored and unpublished.

## Executed gates

`npm ci` and `npm run browser:install` completed successfully. The final static commands below all returned exit 0; [structured gate results](evidence/gates.json) preserve durations.

- `npm run format:check`
- `npm run build`
- `npm run lint`
- `npm run validate` (component contracts, release contract, version, links and negative metadata tests)
- `npm run snapshot`
- `npm run smoke`
- `npm run generated:check`
- `npm run release:check`

The repository-specific ShipCheck gate returned exit 0: 14/16 checks passed, zero errors, two warnings for a missing Kujo package manifest/entry point in this Node package. See [command, target and results](evidence/shipcheck.json). Release checks created local test archives only; no release, tag or package was published.

## Browser evidence

The full suite uses Chromium, Firefox and WebKit with actual dist CSS, optional script, local fonts and local assets. Every one of the 85 canonical examples receives an isolated axe check in every engine. Interactive checks cover open/selected/error states, native controls, multiple instances, dynamic enhancement/disposal, IDs, focus, keyboard movement, disabled controls, copy failure, editor paste/link sanitization and safe output.

Responsive coverage distinguishes viewport and component-container sizes at 320, 390, 768 and 1440 pixels. It includes long content, doubled root text, nested cards/code, navigation, table scrolling, pricing cells, forms, floating edges and RTL. All four themes exercise button/icon states. Five reviewed Chromium PNG baselines cover four critical theme compositions and the narrow reference composition; redundant Firefox/WebKit visual and variant cases are intentionally skipped, while their behavioral and canonical accessibility cases run. The screenshot fixture uses the bundled font and masks only native video rendering. The long reference image has separately inspected macOS/Linux baselines because native text rasterization and input metrics differ; the four smaller critical-state baselines are shared. Comparison tolerance was not increased.

The final full matrix ran in [GitHub Actions](https://github.com/kujolang/site-kit/actions/runs/34071120146). Supplemental macOS verification passed seven cases with two intentional visual skips across all three engines, covering CSS-only native fallbacks, clean copied distribution over HTTP/file URLs and the native reference screenshot; see [macOS results](evidence/macos-final-results.json). Earlier targeted editor/date/text-stress runs also passed in all three engines. Tests added in this mission live in [gap-closure.spec.mjs](../../tests/browser/gap-closure.spec.mjs); existing valid browser tests were retained.

### Reproductions and corrections

[Before evidence](evidence/before.json) was captured before source changes: isolated 390px Bento expanded to 434px; Slider expanded to 392px; component splits depended on an external container. New tests assert actual geometry and behavior, not a list of declared variants. The original audit and its pinned generator guard remain intact.

Verification also found and fixed narrow reference-page expansion from a nested Stack track, clipped code-copy controls, missing canonical header structure in the reference, and a doubled-text heading overflow. Initial platform-specific test assumptions were corrected: Safari keyboard focus follows native macOS behavior; responsive `naturalWidth` is density-adjusted; screenshot prose now uses the bundled font. The earlier Linux screenshot failure remains historical CI evidence, not a passing result. A five-worker local run hit browser/OS resource exhaustion and was aborted. A subsequent local full run was interrupted by the user after Chromium; its partial output is not reported as a completed pass. Final full coverage comes from Linux CI; targeted native macOS checks supplement it.

## Distribution cost

| Artifact | Before raw | After raw | Before gzip | After gzip |
| --- | ---: | ---: | ---: | ---: |
| CSS | 122,689 | 125,466 | 13,858 | 14,310 |
| Optional JavaScript | 12,540 | 39,450 | 2,827 | 9,798 |

[Measured sizes](evidence/after-sizes.json) use Node gzip on the generated files. CSS grows 452 gzip bytes; optional JavaScript grows 6,971 gzip bytes for the bounded widgets, lifecycle, sanitization and promoted interactions. CSS-only consumers need no script or framework. No editor framework, remote service, schema renderer or runtime dependency was introduced.

## Review scope and limits

Agent-directed real-browser keyboard review separately exercised the revealing skip link, target focus, local form submission and search navigation; see [keyboard record](evidence/keyboard-review.json). Chromium screenshots were inspected for light/dark critical states and the corrected narrow reference composition. Local video loaded without media errors in all three engines. This is browser automation and visual inspection, not a physical-device test.

No assistive-technology screen-reader session was performed. Screen-reader/browser combinations remain unverified; axe and keyboard tests do not certify WCAG compliance. Date Picker uses en-US, Sunday-first, date-only values; Combobox is local single-select; Tree View is navigation disclosure; editor output is a small sanitized HTML subset. Consumer submission, remote loading, application persistence and media ownership remain explicitly outside these library contracts.
