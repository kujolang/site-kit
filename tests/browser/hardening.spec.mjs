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
