import { test, expect } from '@playwright/test';
import fs from 'node:fs';

async function fixture(page, slug) {
  await page.setContent(`<!doctype html><html lang="en"><head><title>Hardening fixture</title><style>${fs.readFileSync('dist/sitekit.css', 'utf8')}</style></head><body>${fs.readFileSync(`components/${slug}/example.html`, 'utf8')}</body></html>`);
  await page.addScriptTag({ content: fs.readFileSync('dist/sitekit.js', 'utf8') });
}

test('calendar preserves early years and Gregorian leap-day arithmetic', async ({ page }) => {
  await fixture(page, 'date-picker');
  for (const [value, days] of [['0096-02-28', 29], ['0100-02-28', 28], ['2000-02-28', 29]]) {
    await page.locator('input[type=date]').evaluate((input, date) => { input.value = date; input.dispatchEvent(new Event('change', { bubbles: true })); }, value);
    const dates = await page.locator('[data-date]').evaluateAll(nodes => nodes.map(node => node.dataset.date));
    expect(dates[0]).toBe(value.slice(0, 8) + '01'); expect(dates).toHaveLength(days);
  }
  await page.locator('input[type=date]').evaluate(input => { input.value = '0096-02-28'; input.dispatchEvent(new Event('change', { bubbles: true })); });
  await page.locator('[data-date="0096-02-28"]').focus();
  await page.keyboard.press('ArrowRight'); await page.keyboard.press('Enter');
  await expect(page.locator('input[type=date]')).toHaveValue('0096-02-29');
});

test('calendar navigation stays in the documented four-digit year domain', async ({ page }) => {
  await fixture(page, 'date-picker');
  for (const [value, control, key] of [['0001-01-01', 0, 'ArrowLeft'], ['9999-12-31', 1, 'ArrowRight']]) {
    await page.locator('input[type=date]').evaluate((input, date) => { input.value = date; input.dispatchEvent(new Event('change', { bubbles: true })); }, value);
    const before = await page.locator('[role=grid]').textContent();
    await page.locator('.sk-date-picker header button').nth(control).evaluate(button => button.click());
    expect(await page.locator('[role=grid]').textContent()).toBe(before);
    expect(await page.locator('[data-date]').first().getAttribute('data-date')).toBe(value.slice(0, 8) + '01');
    await page.locator(`[data-date="${value}"]`).focus(); await page.keyboard.press(key);
    expect(await page.locator(':focus').getAttribute('data-date')).toBe(value);
  }
});

for (const mode of ['disabled', 'readOnly', 'fieldset']) test(`calendar respects ${mode} native input`, async ({ page }) => {
  await fixture(page, 'date-picker');
  const result = await page.evaluate(mode => {
    const input = document.querySelector('input[type=date]');
    input.value = '2024-02-28'; input.dispatchEvent(new Event('change', { bubbles: true }));
    if (mode === 'fieldset') { const fieldset = document.createElement('fieldset'); fieldset.disabled = true; input.before(fieldset); fieldset.append(input); }
    else input[mode] = true;
    let changes = 0; input.addEventListener('change', () => { changes++; });
    document.querySelector('[data-date="2024-02-29"]').click();
    return { value: input.value, changes };
  }, mode);
  expect(result).toEqual({ value: '2024-02-28', changes: 0 });
});

test('dynamic modal openers synchronize state and restore focus after close', async ({ page }) => {
  await fixture(page, 'modal');
  await page.evaluate(() => {
    const button = document.createElement('button'); button.id = 'dynamic-opener'; button.textContent = 'Dynamic opener';
    button.dataset.skModalOpen = document.querySelector('dialog').id; document.body.append(button); SiteKit.enhance(button);
  });
  await page.locator('#dynamic-opener').click();
  expect(await page.locator('#dynamic-opener').getAttribute('aria-expanded')).toBe('true');
  await page.keyboard.press('Escape');
  await expect(page.locator('#dynamic-opener')).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#dynamic-opener')).toBeFocused();
});

test('tabs resolve current panel IDs and write only state that changes', async ({ page }) => {
  await fixture(page, 'tabs');
  const result = await page.evaluate(() => {
    const root = document.createElement('div');
    root.className = 'sk-tabs';
    root.innerHTML = `<div role="tablist" aria-label="Settings">
      <button role="tab" aria-controls="late-panel">First</button>
      <button role="tab">Second</button>
      <button role="tab" aria-controls="early-panel" disabled>Unavailable</button>
    </div>
    <section role="tabpanel" id="early-panel">Unavailable panel</section>
    <section role="tabpanel">Generated ID panel</section>
    <section role="tabpanel" id="late-panel">First panel</section>`;
    document.body.append(root);
    SiteKit.enhance(root);
    const tabs = root.querySelectorAll('[role=tab]');
    const generatedId = tabs[1].getAttribute('aria-controls');
    const generatedPanel = document.getElementById(generatedId);
    const association = generatedPanel.getAttribute('aria-labelledby');
    const changes = [];
    root.addEventListener('sk:change', event => changes.push(event.detail.value));
    const observer = new MutationObserver(() => {});
    observer.observe(root, { subtree: true, attributes: true });
    tabs[0].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'x' }));
    const unrelatedWrites = observer.takeRecords().length;
    tabs[0].dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'ArrowRight' }));
    const writes = observer.takeRecords().map(record => record.attributeName).sort();
    observer.disconnect();
    const selected = root.querySelector('[aria-selected=true]');
    const focused = document.activeElement;
    const visiblePanel = root.querySelector('[role=tabpanel]:not([hidden])');
    const newTab = document.createElement('button');
    newTab.setAttribute('role', 'tab');
    newTab.setAttribute('aria-controls', 'new-settings-panel');
    newTab.textContent = 'New';
    root.querySelector('[role=tablist]').append(newTab);
    root.insertAdjacentHTML('beforeend', '<section role="tabpanel" id="new-settings-panel">New panel</section>');
    SiteKit.enhance(root);
    newTab.click();

    return {
      generatedAssociation: Boolean(generatedId) && association === tabs[1].id,
      unrelatedWrites, writes,
      selectedAndFocused: selected === tabs[1] && focused === tabs[1] && visiblePanel === generatedPanel,
      changeEvents: changes.length === 2 && changes[0] === tabs[1].id && changes[1] === newTab.id,
      newPanel: root.querySelector('[role=tabpanel]:not([hidden])').id,
    };
  });
  expect(result).toEqual({
    generatedAssociation: true,
    unrelatedWrites: 0,
    writes: ['aria-selected', 'aria-selected', 'hidden', 'hidden', 'tabindex', 'tabindex'],
    selectedAndFocused: true,
    changeEvents: true,
    newPanel: 'new-settings-panel',
  });
});

test('combobox reuses filtered visibility while honoring current option labels and disabled state', async ({ page }) => {
  await fixture(page, 'combobox');
  const result = await page.evaluate(() => {
    const root = document.querySelector('.sk-combobox');
    const input = root.querySelector('[role=combobox]');
    const list = root.querySelector('[role=listbox]');
    list.innerHTML = `<li role="option" data-value="card">Card</li>
      <li role="option" data-value="cash">Cash</li>
      <li role="option" data-value="bank">Bank</li>`;
    root.insertAdjacentHTML('beforeend', '<input type="hidden" data-sk-value>');
    SiteKit.dispose(root);
    SiteKit.enhance(root);
    const [card, cash, bank] = list.querySelectorAll('[role=option]');
    const type = value => {
      input.value = value;
      input.dispatchEvent(new Event('input', { bubbles: true }));
    };
    const press = key => input.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
    type('unmatched');
    const emptyMessage = root.querySelector('[role=status]').textContent;
    type('ca');
    const observer = new MutationObserver(() => {});
    observer.observe(list, { subtree: true, attributes: true, attributeFilter: ['hidden'] });
    press('ArrowDown');
    const firstActive = input.getAttribute('aria-activedescendant') === card.id;
    const redundantVisibilityWrites = observer.takeRecords().length;
    observer.disconnect();
    cash.setAttribute('aria-disabled', 'true');
    bank.textContent = 'Cash transfer';
    press('ArrowDown');
    const nextActive = input.getAttribute('aria-activedescendant') === bank.id && !bank.hidden;
    press('Enter');
    return {
      emptyMessage, firstActive, redundantVisibilityWrites, nextActive,
      committed: input.value, selected: bank.getAttribute('aria-selected'),
      value: root.querySelector('[data-sk-value]').value, closed: list.hidden,
    };
  });
  expect(result).toEqual({
    emptyMessage: 'No results', firstActive: true, redundantVisibilityWrites: 0, nextActive: true,
    committed: 'Cash transfer', selected: 'true', value: 'bank', closed: true,
  });
});
