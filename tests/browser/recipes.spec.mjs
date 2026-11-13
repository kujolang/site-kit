import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
const base = '/dist/recipes/';
const names = ['code-panel', 'catalog-filtering', 'documentation-workspace', 'documentation-reference', 'token-reference'];

async function clipboard(page, deny = false) {
  await page.evaluate(deny => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async text => { if (deny) throw Error('denied'); window.copied = text; } } }), deny);
}

test('recipe code: canonical copy, whitespace, safe formatting and denial', async ({ page }) => {
  await page.goto(base + 'code-panel.html');
  await clipboard(page);
  const panels = page.locator('[data-recipe-code]');
  const original = await panels.nth(1).locator('code').getAttribute('data-source');
  await expect(panels.nth(1).locator('.recipe-syntax-string').first()).toBeVisible();
  expect((await panels.nth(1).locator('code').textContent()).split('\n').length).toBeGreaterThan(3);
  await panels.nth(1).getByRole('button').click();
  expect(await page.evaluate(() => window.copied)).toBe(original);
  await panels.nth(2).getByRole('button').click();
  expect(await page.evaluate(() => window.copied)).toBe('<pre>  first\n    second &amp; third</pre>');
  await clipboard(page, true);
  await panels.first().getByRole('button').click();
  await expect(panels.first().getByRole('status')).toContainText('Copy unavailable');
  await panels.nth(1).locator('summary').focus();
  await page.keyboard.press('Enter');
  await expect(panels.nth(1).locator('details')).not.toHaveAttribute('open');
});

test('recipe lifecycle: idempotence, async disposal and safe token adapters', async ({ page }) => {
  await page.goto(base + 'code-panel.html');
  await page.evaluate(() => {
    const host = document.createElement('section');
    host.id = 'dynamic';
    host.innerHTML = '<figure data-recipe-code><figcaption><span data-recipe-status role="status"></span><button data-recipe-code-copy hidden>Copy dynamic</button></figcaption><pre><code>original</code></pre></figure>';
    document.querySelector('main').append(host);
    window.disposeRecipe = SiteKitRecipes.enhance(host, { format: () => new Promise(resolve => { window.resolveRecipe = resolve; }) });
    SiteKitRecipes.enhance(host);
  });
  await expect.poll(() => page.evaluate(() => typeof window.resolveRecipe)).toBe('function');
  await page.evaluate(() => { window.disposeRecipe(); window.resolveRecipe('late'); });
  await expect(page.locator('#dynamic code')).toHaveText('original');
  await expect(page.locator('#dynamic button')).toBeHidden();
  await page.evaluate(() => {
    window.cleanup2 = SiteKitRecipes.enhance(document.querySelector('#dynamic'), { format: () => '<img src=x onerror="alert(1)">', tokenize: text => [{ text, kind: 'string' }] });
    window.disposeRecipe(); // An old cleanup must not dispose the new owner.
  });
  await expect(page.locator('#dynamic code')).toHaveText('<img src=x onerror="alert(1)">');
  await expect(page.locator('#dynamic img')).toHaveCount(0);
  await expect(page.locator('#dynamic button')).toBeVisible();
  await page.evaluate(() => { window.cleanup2(); SiteKitRecipes.enhance(document.querySelector('#dynamic'), { tokenize: () => [{ text: 'incorrect' }] }); });
  await expect(page.locator('#dynamic [role=status]')).toContainText('formatting unavailable');
  await expect(page.locator('#dynamic code')).toHaveText('original');
});

test('recipe catalogs: combined filtering, independent state, reset and history', async ({ page }) => {
  await page.goto(base + 'catalog-filtering.html');
  const first = page.locator('#components'), second = page.locator('#resources');
  await first.getByRole('combobox', { name: 'Category', exact: true }).selectOption('Forms');
  await first.getByRole('searchbox').fill('input');
  await expect(first.locator('[data-recipe-item]:visible')).toHaveCount(2);
  await second.getByRole('searchbox').fill('theme');
  await expect(second.locator('[data-recipe-item]:visible')).toHaveCount(1);
  await expect(first.locator('[data-recipe-item]:visible')).toHaveCount(2);
  await page.reload();
  await expect(first.getByRole('searchbox')).toHaveValue('input');
  await expect(second.locator('[data-recipe-item]:visible')).toHaveCount(1);
  await first.getByRole('searchbox').fill('no-match');
  await expect(first.locator('[data-recipe-empty]')).toBeVisible();
  await first.getByRole('button', { name: 'Reset', exact: true }).click();
  await expect(first.locator('[data-recipe-item]:visible')).toHaveCount(4);
  await expect(first.getByRole('searchbox')).toBeFocused();
  await page.goBack();
  await expect(first.locator('[data-recipe-empty]')).toBeVisible();
  await page.goForward();
  await expect(first.locator('[data-recipe-item]:visible')).toHaveCount(4);
});

test('recipe workspace search preserves article, token copy preserves variable and values', async ({ page }) => {
  await page.goto(base + 'documentation-workspace.html');
  await page.getByRole('searchbox').fill('verify');
  await expect(page.locator('[data-recipe-item]:visible')).toHaveCount(1);
  await expect(page.locator('article section')).toHaveCount(3);
  await page.getByRole('link', { name: 'Verify your page', exact: true }).focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#verify$/);
  await page.goto(base + 'token-reference.html');
  await clipboard(page);
  await page.getByRole('searchbox').fill('--sk-code-surface');
  await expect(page.locator('tbody tr:visible')).toHaveCount(1);
  const row = page.locator('tbody tr:visible');
  await expect(row).toContainText('#ffffff');
  await expect(row).toContainText('#111111');
  await expect(row.locator('.recipe-swatch').nth(0)).toHaveCSS('background-color', 'rgb(255, 255, 255)');
  await expect(row.locator('.recipe-swatch').nth(1)).toHaveCSS('background-color', 'rgb(17, 17, 17)');
  await page.getByRole('button', { name: 'Copy --sk-code-surface', exact: true }).click();
  expect(await page.evaluate(() => window.copied)).toBe('--sk-code-surface');
  await row.locator('summary').click();
  await expect(row.getByText('Code Block', { exact: true })).toBeVisible();
});

for (const theme of ['kujo-light', 'kujo-dark']) {
  test(`recipe accessibility and viewport coverage ${theme}`, async ({ page }, testInfo) => {
    test.setTimeout(180000);
    for (const name of names) {
      await page.goto(base + name + '.html');
      await page.locator('html').evaluate((html, theme) => { html.dataset.theme = theme; }, theme);
      await page.evaluate(() => document.fonts.ready);
      for (const width of [320, 375, 430, 768, 1024, 1440, 1920]) {
        await page.setViewportSize({ width, height: 1000 });
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${name} ${width}`).toBe(true);
      }
      await page.setViewportSize({ width: 1440, height: 1000 });
      expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()).violations, name).toEqual([]);
      if (testInfo.project.name === 'chromium') {
        await page.screenshot({ path: testInfo.outputPath(`${name}-${theme}-desktop.png`), fullPage: true });
        await page.setViewportSize({ width: 320, height: 1000 });
        await page.screenshot({ path: testInfo.outputPath(`${name}-${theme}-mobile.png`), fullPage: true });
      }
      await page.setViewportSize({ width: 320, height: 1000 });
      await page.locator('html').evaluate(html => { html.style.fontSize = '200%'; });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    }
  });
}

test('recipe no-JavaScript fallback and file-vendored consumer', async ({ browser, page }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await context.newPage();
  for (const name of names) {
    await staticPage.goto('http://127.0.0.1:4173' + base + name + '.html');
    await expect(staticPage.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(staticPage.locator('[data-recipe-controls]:visible')).toHaveCount(0);
    await expect(staticPage.locator('[data-recipe-item][hidden]')).toHaveCount(0);
  }
  await context.close();
  const url = pathToFileURL(path.resolve('artifacts/release/clean-consumer/sitekit/recipes/catalog-filtering.html')).href;
  await page.goto(url);
  await page.locator('#components').getByRole('searchbox').fill('input');
  await expect(page.locator('#components [data-recipe-item]:visible')).toHaveCount(2);
});

test('recipe workspace adapts a second built documentation consumer', async ({ page }, testInfo) => {
  await page.goto('/tests/fixtures/documentation-template.html');
  for (const theme of ['kujo-light', 'kujo-dark']) {
    await page.locator('html').evaluate((html, theme) => { html.dataset.theme = theme; }, theme);
    for (const width of [320, 768, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
      await expect(page.getByRole('heading', { name: 'Site configuration', exact: true })).toBeVisible();
      if (testInfo.project.name === 'chromium') await page.screenshot({ path: testInfo.outputPath(`second-consumer-${theme}-${width}.png`), fullPage: true });
    }
    expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
  }
  await page.getByRole('link', { name: 'Core settings', exact: true }).focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#core-settings$/);
  await expect(page.locator('#core-settings')).toBeInViewport();
});
