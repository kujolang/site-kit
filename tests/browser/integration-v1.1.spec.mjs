import { test, expect } from '@playwright/test';

test('explicit hero slots preserve content layout and legacy heroes retain their fallback', async ({ page }) => {
  await page.goto('/examples/component-lab/');
  await page.setContent(`<link rel="stylesheet" href="/dist/sitekit.css">
    <section class="sk-hero" data-sk-hero-slots="explicit"><div class="sk-hero__inner"><h1>Title</h1><div class="sk-hero__actions"><button>Action</button></div><div id="content">Terminal content</div></div></section>
    <section class="sk-hero"><div class="sk-hero__inner"><h2>Legacy</h2><div id="legacy">Action</div></div></section>
    <section class="sk-hero"><div class="sk-hero__inner"><div class="override">Consumer override</div></div></section>
    <style>@layer components { .sk-hero .sk-hero__inner > div.override { display: block; } }</style>`);
  await expect(page.locator('#content')).toHaveCSS('display', 'block');
  await expect(page.locator('.sk-hero__actions')).toHaveCSS('display', 'flex');
  await expect(page.locator('#legacy')).toHaveCSS('display', 'flex');
  await expect(page.locator('.override')).toHaveCSS('display', 'block');
  for (const width of [320, 390, 768]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});

test('legacy bzby palette and saved preference require explicit compatibility opt-in', async ({ page }) => {
  await page.goto('/examples/component-lab/');
  await page.evaluate(() => localStorage.setItem('sk-theme', 'bzby'));
  await page.setContent(`<html data-theme="kujo-light" data-sk-legacy-bzby><head><link rel="stylesheet" href="/dist/sitekit.css"><link rel="stylesheet" href="/dist/compat/bzby.css"></head><body></body></html>`);
  await page.addScriptTag({ url: '/dist/sitekit.js' });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'bzby');
  await expect(page.locator('html')).toHaveCSS('--sk-surface-page', '#fffaf0');
  await page.goto('/examples/component-lab/');
  await expect(page.locator('html')).not.toHaveAttribute('data-theme', 'bzby');
});
