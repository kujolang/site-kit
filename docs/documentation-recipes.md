# Documentation recipes

Four optional compositions extend the existing components without changing their APIs:

| Recipe | Runnable distribution example | Responsibility |
| --- | --- | --- |
| Documentation code panel | [Code panel](../dist/recipes/code-panel.html) | Authored/optionally formatted display with canonical copy |
| Catalog filtering | [Two catalogs](../dist/recipes/catalog-filtering.html) | Query and category intersection, reset, announcements and empty state |
| Documentation workspace | [Setup guide](../dist/recipes/documentation-workspace.html), [reference guide](../dist/recipes/documentation-reference.html) | Responsive navigation, local section search and readable article content |
| Token reference | [Token table](../dist/recipes/token-reference.html) | Explicit theme values, variable copying and direct consumers |

Copy `dist/` intact, including `recipes/`. Read the [integration and lifecycle contract](../dist/recipes/README.md). Load recipe CSS and behavior only where needed. Core Code Block still does not implement formatting, highlighting, editing or execution. Its legacy variant aliases remain unchanged. No dependencies were added. These additions are unreleased source changes; they do not create a registry release.

Recipe metadata lives in `recipes/*.json`; authored HTML/CSS/JS lives in `recipes/documentation/`. Build copies this material into the supported distribution and its manifest, and the release archive includes it. Token rows are resolved from authoritative token sources during generation. Edit the source template or generator, never `dist/`.

## Workspace evidence and scope

The composition was compared against two existing documentation consumers:

- SiteKit showcase `scripts/templates/documentation-workbench.html`: a task-oriented installation/validation/media workflow, local section search and paired examples.
- The separate SiteKit documentation template `templates/post-docs.html` and `templates/layout.html`: generated documentation with sidebar navigation, prerequisites, article body, optional outline and previous/next links.

Their shared requirements are landmarks, navigation before article in reading order, flexible content width, native links, contained source/tables and optional local navigation search. The second consumer requires an optional outline region, which the recipe allows with `data-with-outline`. The recipe does not own the template's SSG, global search index, previous/next generation or routing. The two runnable examples demonstrate different content shapes; the verification record describes the actual second-consumer browser check separately.

## Acceptance

The recipe browser suite checks independent catalogs and URL history, no-JavaScript reading, canonical copying, clipboard failure, safe text-only syntax tokens, adapter failure, lifecycle cleanup and late async results. It checks keyboard operation, both themes, narrow layouts, text zoom, file-copy consumption, token values and accessibility. Existing component and release gates remain required.
