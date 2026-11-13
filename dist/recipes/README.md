# Optional documentation recipes

Copy the complete parent distribution, then open `code-panel.html`, `catalog-filtering.html`, `documentation-workspace.html`, `documentation-reference.html` or `token-reference.html`. They work over HTTP and from local files. Keep `../sitekit.css`, its sibling fonts, and the local recipe files together.

These are compositions of existing components. Nothing is automatically added to the core CSS or JavaScript. Include `recipes.css` after `sitekit.css`, then load `recipes.js` as a classic script and call `SiteKitRecipes.enhance(document)`. The optional core `sitekit.js` enables the example theme button. Without JavaScript, all source, catalog entries, documentation links and token values stay readable; inactive filter/copy controls remain hidden.

## Code panel

Use the markup in `code-panel.html`. `data-source` contains the HTML-escaped canonical string, decoded by the browser. It is optional and falls back to the original code text. Copy always uses that canonical string, even when the display is formatted. Never use `data-copy-code` on the recipe button: that core hook copies display text and has a different contract.

`enhance(root, { format(source, language), tokenize(display, language) })` accepts optional synchronous or asynchronous adapters. `format` returns a string. `tokenize` returns `{text, kind}` records whose text must concatenate exactly to the display. Allowed kinds: keyword, string, comment, number, attribute. Unknown kinds render as plain text. All tokens are inserted with textContent; HTML is never executed. Failure retains authored content and announces the fallback. `example.js` demonstrates JSON-only formatting/highlighting without dependencies. It preserves HTML, shell, Kujo and whitespace-sensitive source unchanged. Consumers may provide their own formatter; keep it outside the core Code Block contract.

## Catalog filtering

Each `data-recipe-catalog` owns its query, optional category, reset, result status, empty state and items. Use exact category values. Query matches `data-search` when supplied, otherwise item text. Results retain DOM order. The optional category select can be replaced by consumer-authored native controls only with a corresponding adapter; the base recipe expects a select. Catalog instances may share a page; avoid nesting them.

A change emits `sitekit:filterchange` with `{query, category, count}`. Data and URL policy belong to the application. `url-adapter.js` demonstrates independent ID-prefixed URL parameters and browser Back/Forward restoration. To restore state, set the controls and dispatch `sitekit:filterrestore` on that catalog; it updates results without emitting another change. The core recipe does not read or change the URL.

## Workspace and token reference

The workspace composes an ordinary navigation region and article. Search filters navigation only; headings and article text remain visible. Both task-oriented and reference-oriented examples use the same responsive CSS. Links stay native, and navigation remains usable without enhancement. On narrow screens navigation precedes the article; do not hide it behind a script-only menu.

Token tables retain captions, scoped headers, explicit light/dark values and a keyboard-focusable scrolling region. Copy acts on the variable only, with a distinct label and status. The reference example is generated from actual token sources and direct component dependencies; it does not claim indirect consumers. Search can match names, variables or consumers. A real application owns its full token inventory and data fetching.

## Lifecycle and integration

`enhance` returns a cleanup function for the elements that invocation mounted. Repeated enhancement is idempotent. Call cleanup before replacing source or removing a mounted subtree, then enhance the replacement. Cleanup restores original code, visibility and result status. A late asynchronous formatter/copy result cannot mutate a disposed instance. Controls and markup are consumer-owned; malformed/incomplete recipe roots are skipped. Add unique IDs when copying examples. Recipes never invoke network requests, execute code, submit forms to services or persist data themselves.

Verify keyboard navigation, both themes, reduced motion, 320px layouts, 200% text, no-JavaScript reading, exact copying and clipboard denial. Test independent instances and browser history when adopting the optional URL adapter.
