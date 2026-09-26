import { test, expect } from '@playwright/test';
import fs from 'node:fs';

async function fixture(page, slug) {
  await page.setContent(`<!doctype html><html lang="en"><head><title>Native state</title></head><body>${fs.readFileSync(`components/${slug}/example.html`, 'utf8')}</body></html>`);
  await page.addScriptTag({ content: fs.readFileSync('dist/sitekit.js', 'utf8') });
}

for (const mode of ['disabled', 'readOnly', 'fieldset']) {
  for (const interaction of ['click', 'keyboard', 'blur']) test(`combobox preserves ${mode} input on ${interaction}`, async ({ page }) => {
    await fixture(page, 'combobox');
    const result = await page.evaluate(({ mode, interaction }) => {
      const root = document.querySelector('.sk-combobox');
      const input = root.querySelector('[role=combobox]');
      const value = document.createElement('input'); value.type = 'hidden'; value.dataset.skValue = ''; value.value = 'button'; root.append(value);
      SiteKit.dispose(root); SiteKit.enhance(root);
      input.focus(); input.value = ''; input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      if (mode === 'fieldset') {
        const fieldset = document.createElement('fieldset'); fieldset.disabled = true; input.before(fieldset); fieldset.append(input);
      } else input[mode] = true;
      // Applications may replace the value while locking an in-flight interaction.
      input.value = 'Locked'; value.value = 'locked';
      const events = [];
      for (const type of ['input', 'change', 'sk:change']) root.addEventListener(type, event => events.push(event.type));
      if (interaction === 'click') root.querySelectorAll('[role=option]')[1].click();
      if (interaction === 'keyboard') input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      if (interaction === 'blur') input.dispatchEvent(new FocusEvent('blur'));
      return { label: input.value, value: value.value, events, expanded: input.getAttribute('aria-expanded') };
    }, { mode, interaction });
    expect(result).toEqual({ label: 'Locked', value: 'locked', events: [], expanded: 'false' });
  });
}

test('readonly combobox stays closed and resumes normal commits when unlocked', async ({ page }) => {
  await fixture(page, 'combobox');
  const input = page.getByRole('combobox');
  await input.evaluate(input => { input.readOnly = true; input.focus(); });
  await page.keyboard.press('ArrowDown');
  await expect(input).toHaveAttribute('aria-expanded', 'false');
  await input.evaluate(input => { input.readOnly = false; });
  await input.fill('Ca'); await page.keyboard.press('ArrowDown'); await page.keyboard.press('Enter');
  await expect(input).toHaveValue('Card');
});

for (const timing of ['initial', 'dynamic']) test(`stepper respects ${timing} disabled fieldset`, async ({ page }) => {
  await fixture(page, 'stepper');
  const result = await page.evaluate(timing => {
    const root = document.querySelector('.sk-stepper'), input = root.querySelector('input');
    const fieldset = document.createElement('fieldset'); fieldset.disabled = true; input.before(fieldset); fieldset.append(input);
    if (timing === 'initial') { SiteKit.dispose(root); SiteKit.enhance(root); }
    let changes = 0; root.addEventListener('change', () => { changes++; });
    root.querySelectorAll('button')[1].click();
    return { value: input.value, changes, disabled: [...root.querySelectorAll('button')].every(button => button.disabled) };
  }, timing);
  expect(result.value).toBe('3'); expect(result.changes).toBe(0);
  if (timing === 'initial') expect(result.disabled).toBe(true);
});

test('native first-legend exception keeps combobox and stepper usable', async ({ page }) => {
  await fixture(page, 'combobox');
  await page.evaluate(() => {
    const root = document.querySelector('.sk-combobox'), fieldset = document.createElement('fieldset'), legend = document.createElement('legend');
    fieldset.disabled = true; root.before(fieldset); fieldset.append(legend); legend.append(root);
  });
  await page.getByRole('combobox').fill('Ca'); await page.keyboard.press('ArrowDown'); await page.keyboard.press('Enter');
  await expect(page.getByRole('combobox')).toHaveValue('Card');
  await fixture(page, 'stepper');
  await page.evaluate(() => {
    const root = document.querySelector('.sk-stepper'), fieldset = document.createElement('fieldset'), legend = document.createElement('legend');
    fieldset.disabled = true; root.before(fieldset); fieldset.append(legend); legend.append(root);
    SiteKit.dispose(root); SiteKit.enhance(root);
  });
  await page.getByRole('button', { name: 'Increase value' }).click();
  await expect(page.locator('input')).toHaveValue('4');
});
