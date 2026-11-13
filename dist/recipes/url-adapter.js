/* Consumer-owned URL policy: independent namespaces; no routing in recipes.js. */
(function () {
  'use strict';
  const catalogs = [...document.querySelectorAll('[data-recipe-catalog][id]')];
  function restore() {
    const params = new URL(location.href).searchParams;
    for (const catalog of catalogs) {
      catalog.querySelector('[data-recipe-query]').value = params.get(`${catalog.id}.q`) || '';
      const category = catalog.querySelector('[data-recipe-category]');
      const requested = params.get(`${catalog.id}.category`) || '';
      category.value = [...category.options].some(option => option.value === requested) ? requested : '';
      catalog.dispatchEvent(new Event('sitekit:filterrestore'));
    }
  }
  catalogs.forEach(catalog => catalog.addEventListener('sitekit:filterchange', event => {
    if (event.target !== catalog) return;
    const url = new URL(location.href);
    for (const [key, value] of [['q', event.detail.query], ['category', event.detail.category]]) {
      if (value) url.searchParams.set(`${catalog.id}.${key}`, value);
      else url.searchParams.delete(`${catalog.id}.${key}`);
    }
    // file:// consumers retain filtering even where History API updates are restricted.
    try { history.pushState(null, '', url); } catch { /* Host policy owns history. */ }
  }));
  window.addEventListener('popstate', restore);
  restore();
})();
