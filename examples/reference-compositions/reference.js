/* Local fixture composition; no network submission or search service. */
(function () {
  const form = document.querySelector('[data-reference-form]');
  const email = form.elements.email;
  email.addEventListener('invalid', () => { email.setAttribute('aria-invalid', 'true'); document.querySelector('#email-error').hidden = false; });
  email.addEventListener('input', () => { email.removeAttribute('aria-invalid'); document.querySelector('#email-error').hidden = true; });
  form.addEventListener('submit', event => { event.preventDefault(); document.querySelector('[data-form-status]').textContent = 'Valid locally. No data was sent.'; });
  const input = document.querySelector('#reference-search');
  const list = document.querySelector('[data-search-results]');
  const records = [...list.querySelectorAll('li')];
  input.addEventListener('input', () => {
    const query = input.value.trim().toLocaleLowerCase();
    records.forEach(row => { row.hidden = !row.textContent.toLocaleLowerCase().includes(query); });
    const count = records.filter(row => !row.hidden).length;
    document.querySelector('[data-search-status]').textContent = count ? `${count} results` : 'No matching records';
  });
  input.addEventListener('keydown', event => { if (event.key === 'ArrowDown') { const link = list.querySelector('li:not([hidden]) a'); if (link) { event.preventDefault(); link.focus(); } } });
  list.addEventListener('keydown', event => {
    const links = [...list.querySelectorAll('li:not([hidden]) a')], i = links.indexOf(event.target);
    if (event.key === 'Escape') input.focus();
    if (i >= 0 && ['ArrowDown', 'ArrowUp'].includes(event.key)) { event.preventDefault(); links[(i + (event.key === 'ArrowDown' ? 1 : links.length - 1)) % links.length].focus(); }
  });
})();
