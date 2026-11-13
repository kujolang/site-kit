/* Optional JSON-only formatting adapter, supplied by this example's consumer. */
(function () {
  'use strict';
  window.SiteKitRecipes.enhance(document, {
    format(source, language) {
      return language === 'json' ? JSON.stringify(JSON.parse(source), null, 2) : source;
    },
    tokenize(source, language) {
      if (language !== 'json') return [{ text: source }];
      const parts = [];
      const expression = /"(?:\\.|[^"\\])*"|\b(?:true|false|null)\b|-?\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/g;
      let position = 0;
      for (const match of source.matchAll(expression)) {
        parts.push({ text: source.slice(position, match.index) });
        parts.push({ text: match[0], kind: match[0].startsWith('"') ? 'string' : /^(true|false|null)$/.test(match[0]) ? 'keyword' : 'number' });
        position = match.index + match[0].length;
      }
      parts.push({ text: source.slice(position) });
      return parts;
    }
  });
})();
