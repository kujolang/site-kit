# Documentation recipes verification

Four optional recipes are shipped under `dist/recipes/`: canonical-source code panels, independent catalog filtering, a documentation workspace, and a generated token reference. Integration and ownership contracts are in [the guide](../documentation-recipes.md).

## Verification

- Full library browser regression: **672 passed, 72 intentional skips, zero failures** across Chromium, Firefox and WebKit. The skipped cases are existing Chromium-only representative checks.
- Final focused recipe checks after table sizing, disclosure icons and CRLF preservation polish: **27 passed** across all three engines.
- Final `npm run test:static`: passed formatting, build, tooling/CLI, lint, contracts, snapshots, smoke and deterministic archive checks (24 archive entries).
- Recipe accessibility and responsive assertions cover both themes, widths 320, 375, 430, 768, 1024, 1440 and 1920, and 200% text. Tests include clipboard denial, exact canonical source, hostile tokenizer output, async cleanup, independent catalog states, URL restore, no JavaScript and copied file consumers.
- Second documentation consumer: actual docs-template build passed (22 pages); its configuration reference was adapted to the shared workspace recipe and checked in all three engines. [Fixture provenance](../../tests/fixtures/documentation-template.md) records the source revision and adaptations; this is not a full starter migration.

Machine reports, static output, second-consumer build output and final screenshots are in [recipe-evidence](recipe-evidence/). The broad regression precedes the final presentation polish; the 27-case run verifies that final delta. Representative code, workspace and token screenshots were visually reviewed. Automated accessibility checks do not constitute screen-reader certification.

Core CSS/JavaScript, dependencies and version are unchanged. Recipes are opt-in source-vendored additions; no npm publication or production deployment is part of this change.
