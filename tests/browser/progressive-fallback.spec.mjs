import { test, expect } from '@playwright/test';
import fs from 'node:fs';

test('CSS-only widget fallbacks remain readable and native controls usable', async ({ page }) => {
  await page.goto('/health');
  const examples = ['tabs', 'date-picker', 'rich-text-editor', 'tree-view', 'select', 'checkbox'].map(slug => fs.readFileSync(`components/${slug}/example.html`, 'utf8')).join('');
  await page.setContent(`<!doctype html><html lang="en"><head><title>CSS-only reference</title><link rel="stylesheet" href="/dist/sitekit.css"></head><body><main><h1>Native fallbacks</h1>${examples}</main></body></html>`);
  await page.evaluate(() => document.fonts.ready);
  expect(await page.evaluate(() => typeof window.SiteKit)).toBe('undefined');
  for (const panel of await page.locator('[role="tabpanel"]').all()) await expect(panel).toBeVisible();
  await page.locator('input[type="date"]').fill('2028-02-29');
  await expect(page.locator('input[type="date"]')).toHaveValue('2028-02-29');
  await expect(page.locator('.sk-date-picker [role="grid"]')).toBeHidden();
  await expect(page.locator('.sk-rich-text-editor [role="toolbar"]')).toBeHidden();
  await page.locator('[contenteditable]').fill('Native editing works');
  await expect(page.locator('[contenteditable]')).toHaveText('Native editing works');
  for (const link of await page.locator('.sk-tree-view a').all()) await expect(link).toBeVisible();
  const select = page.locator('select').first();
  const value = await select.locator('option').last().evaluate(option => option.value);
  await select.selectOption(value);
  await expect(select).toHaveValue(value);
  await page.locator('input[type="checkbox"]').first().check();
  await expect(page.locator('input[type="checkbox"]').first()).toBeChecked();
});
