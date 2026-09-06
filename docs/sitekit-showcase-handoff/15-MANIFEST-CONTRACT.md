# Manifest contracts and synchronization

These are audit metadata, not a new runtime component API. All JSON is UTF-8 with schemaVersion=1 where applicable. Canonical identity is component slug, not display name. Each manifest pins sourceCommit; confidence and nulls must survive ingestion.

## component-manifest.json

The top-level model carries product/version, confidence legend, consumer model, 85 components, 15 primitive slugs, six utilities, runtime hooks/helpers, eight recipes and six layouts.

Each component separates source-declared props/requiredFields/slots/variants from observed HTML attributes, verified CSS variant selectors, actual CSS token references and authored behavior notes. A prop binding may be null even when a schema string exists: no automated runtime binding was established. Default null means undeclared. No component module export exists. RequiredFieldsAbsentFromProps captures four concrete discrepancies. State entries record evidence scope because a CSS selector may target descendants rather than the wrapper itself.

Status values: html-css = source structure/styles; native = meaningful native behavior; optional-js = one of five dist enhancement families; example-only-js = related custom behavior exists in lab but not dist. Status does not certify accessibility. Documentation ratings are authored judgments and may change after new evidence. Sizes lists contain only explicitly established APIs, not every numeric CSS value.

Examples are source-template instantiations with explicit caveats, not completed production widgets. They are safe to read as strings, but website code must still use reviewed adapters, escaping and unique IDs rather than inserting arbitrary edited HTML. ExistingExampleMetadata preserves original records, including historical entries; it is not an executable fixture registry.

Playground controls are recommendations attached only to real DOM/native bindings. They are not library props. cssRulesObserved and templateAttributes are maintainer evidence; omit these bulky fields from browser bootstrap/search data. Generate small per-component API records and separate code downloads.

## token-manifest.json

120 leaves have canonical dotted name, generated CSS variable, core/semantic layer, source path, raw value, reference edges, resolved default, per-theme override/resolved value and direct component consumers. Theme overrides are not counted again as distinct tokens. Null override means inherit the default graph. Resolution is static token substitution, not computed cascade, contrast scoring or browser validation.

Direct references come from component CSS var() occurrences; schema tokenDependencies is preserved separately. Transitive consumers can be computed by traversing reference edges. Base/utility references are marked but not mislabeled as components. No token reference may be unresolved or cyclic.

## showcase-routes.json

PROPOSED route objects specify path/title/kind/purpose/audience/data/interactions/priority. There are 126 HTML routes (including 85 component pages and one 404) and 91 machine routes, totaling 217 planned entries. Preview and code-download route patterns are separate implementation outputs, populated only for reviewed adapters. Nothing in this manifest was deployed.

## Reproduction and versioning

`generate-audit.py` verifies that first-party source still matches the pinned baseline, then regenerates component/token inventories, details, source hashes and discrepancy data using audit-notes.json. It does not generate routes, the authored foundation explanation or website narrative. `verify-handoff.py` checks coverage, source hashes, tokens, paths, related slugs and route uniqueness. Run the repository formatter after staging new generated JSON.

For a library upgrade: pin the desired new source commit, inspect changed source and rerun relevant tests, update audit-notes and sourceCommit intentionally, regenerate facts, review authored routes/foundations/specification, verify every changed adapter and source reference, and record the new tested baseline. Do not merely regenerate old claims against changed code. This is a hybrid authored/extracted synchronization model, not a documentation compiler.
