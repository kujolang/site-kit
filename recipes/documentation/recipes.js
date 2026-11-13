/* Optional source-vendored recipe behavior. No dependency on SiteKit's core runtime. */
(function (global) {
  'use strict';
  const mounted = new WeakMap();
  const kinds = new Set(['keyword', 'string', 'comment', 'number', 'attribute']);
  const all = (root, selector) => [...(root.matches?.(selector) ? [root] : []), ...root.querySelectorAll(selector)];

  function enhance(root = document, adapters = {}) {
    const owned = [];
    for (const element of all(root, '[data-recipe-code], [data-recipe-catalog], [data-recipe-copy]')) {
      if (mounted.has(element)) continue;
      const controller = new AbortController();
      let active = true;
      const restore = [];
      const listen = (target, type, fn) => target.addEventListener(type, fn, { signal: controller.signal });
      const dispose = () => {
        if (mounted.get(element) !== dispose) return;
        active = false;
        controller.abort();
        restore.forEach(fn => fn());
        mounted.delete(element);
      };
      mounted.set(element, dispose);
      owned.push(dispose);
      const reveal = (control) => {
        const hidden = control.hidden;
        control.hidden = false;
        restore.push(() => { control.hidden = hidden; });
      };
      const copy = (button, value, status) => {
        reveal(button);
        listen(button, 'click', async () => {
          try {
            if (!global.navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
            await global.navigator.clipboard.writeText(value());
            if (active) status.textContent = 'Copied.';
          } catch {
            if (active) status.textContent = 'Copy unavailable. Select the text and copy manually.';
          }
        });
        restore.push(() => { status.textContent = ''; });
      };
      if (element.matches('[data-recipe-code]')) {
        const code = element.querySelector('pre code');
        const button = element.querySelector('[data-recipe-code-copy]');
        const status = element.querySelector('[data-recipe-status]');
        if (!code || !button || !status) { dispose(); continue; }
        const source = code.dataset.source ?? code.textContent;
        const original = code.cloneNode(true);
        restore.push(() => code.replaceChildren(...original.cloneNode(true).childNodes));
        copy(button, () => source, status);
        // Formatting changes display only. Tokens are text, never trusted HTML.
        Promise.resolve().then(async () => {
          const language = code.dataset.language || 'text';
          const display = adapters.format ? await adapters.format(source, language) : code.textContent;
          if (typeof display !== 'string') throw new TypeError('Formatter must return text');
          const tokens = adapters.tokenize ? await adapters.tokenize(display, language) : [{ text: display }];
          if (!Array.isArray(tokens) || tokens.some(t => !t || typeof t.text !== 'string') || tokens.map(t => t.text).join('') !== display) throw new TypeError('Tokens must preserve displayed text');
          const fragment = document.createDocumentFragment();
          for (const token of tokens) {
            const span = document.createElement('span');
            if (kinds.has(token.kind)) span.className = `recipe-syntax-${token.kind}`;
            span.textContent = token.text;
            fragment.append(span);
          }
          if (active) code.replaceChildren(fragment);
        }).catch(() => { if (active) status.textContent = 'Showing authored source; formatting unavailable.'; });
      } else if (element.matches('[data-recipe-copy]')) {
        const button = element.querySelector('button');
        const value = element.querySelector('[data-recipe-value]');
        const status = element.querySelector('[data-recipe-status]');
        if (!button || !value || !status) { dispose(); continue; }
        copy(button, () => value.dataset.copyValue ?? value.textContent, status);
      } else {
        const controls = element.querySelector('[data-recipe-controls]');
        const query = element.querySelector('[data-recipe-query]');
        const category = element.querySelector('[data-recipe-category]');
        const reset = element.querySelector('[data-recipe-reset]');
        const status = element.querySelector('[data-recipe-status]');
        const empty = element.querySelector('[data-recipe-empty]');
        const items = [...element.querySelectorAll('[data-recipe-item]')].filter(item => item.closest('[data-recipe-catalog]') === element);
        if (!controls || !query || !reset || !status || !empty) { dispose(); continue; }
        const initial = items.map(item => item.hidden);
        const initialStatus = status.textContent;
        const initialEmpty = empty.hidden;
        reveal(controls);
        function filter(announce = true) {
          const term = query.value.trim().toLocaleLowerCase();
          const selected = category?.value || '';
          let count = 0;
          items.forEach(item => {
            item.hidden = !((!selected || item.dataset.category === selected) && (item.dataset.search ?? item.textContent).toLocaleLowerCase().includes(term));
            if (!item.hidden) count++;
          });
          status.textContent = `${count} of ${items.length} results`;
          empty.hidden = count !== 0;
          if (announce) element.dispatchEvent(new CustomEvent('sitekit:filterchange', { bubbles: true, detail: { query: query.value, category: selected, count } }));
        }
        listen(query, 'input', () => filter());
        if (category) listen(category, 'change', () => filter());
        listen(controls, 'submit', e => { e.preventDefault(); filter(); });
        listen(reset, 'click', () => { query.value = ''; if (category) category.value = ''; filter(); query.focus(); });
        // Application URL adapters set controls and request refresh without emitting another change.
        listen(element, 'sitekit:filterrestore', () => filter(false));
        restore.push(() => {
          items.forEach((item, i) => { item.hidden = initial[i]; });
          status.textContent = initialStatus;
          empty.hidden = initialEmpty;
        });
        filter(false);
      }
    }
    return () => owned.forEach(dispose => dispose());
  }
  global.SiteKitRecipes = Object.freeze({ enhance });
})(window);
