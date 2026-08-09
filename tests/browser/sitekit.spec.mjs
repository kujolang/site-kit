import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const pages = [
  { name: 'component-lab', path: '/examples/component-lab/index.html', heading: 'SiteKit' },
  { name: 'consumer-dashboard', path: '/examples/consumer-dashboard/index.html', heading: 'Repository readiness at a glance.' },
  { name: 'landing-layout', path: '/layouts/landing.html', heading: 'Launch with structure.' },
  { name: 'documentation-layout', path: '/layouts/docs.html', heading: 'Documentation' },
  { name: 'ecommerce-layout', path: '/layouts/ecommerce.html', heading: 'Products' },
];
const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
];
const themes = ['kujo-light', 'kujo-dark'];

for (const fixture of pages) {
  for (const viewport of viewports) {
    for (const theme of themes) {
      test(`${fixture.name} / ${theme} / ${viewport.name}`, async ({ page }) => {
        const failures = [];
        page.on('response', (response) => {
          if (response.url().startsWith('http://127.0.0.1:4173') && response.status() >= 400) failures.push(`${response.status()} ${response.url()}`);
        });
        await page.setViewportSize(viewport);
        await page.emulateMedia({ reducedMotion: 'reduce', colorScheme: theme === 'kujo-dark' ? 'dark' : 'light' });
        await page.goto(fixture.path);
        await page.evaluate((selectedTheme) => { document.documentElement.dataset.theme = selectedTheme; }, theme);
        await expect(page.getByRole('heading', { level: 1, name: fixture.heading })).toBeVisible();
        await expect(page.locator('main')).toBeVisible();
        expect(failures).toEqual([]);
        const layout = await page.evaluate(() => ({
          viewport: document.documentElement.clientWidth,
          scroll: document.documentElement.scrollWidth,
          headings: Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6')).map((heading) => Number(heading.tagName.slice(1))),
        }));
        expect(layout.scroll).toBeLessThanOrEqual(layout.viewport + 1);
        for (let index = 1; index < layout.headings.length; index += 1) expect(layout.headings[index] - layout.headings[index - 1]).toBeLessThanOrEqual(1);
      });
    }
  }
}

test('automated WCAG A and AA scan', async ({ page, browserName }) => {
  test.setTimeout(120_000);
  const scanPages = browserName === 'chromium' ? pages : pages.filter((fixture) => fixture.name === 'consumer-dashboard');
  for (const fixture of scanPages) {
    for (const theme of themes) {
      await page.goto(fixture.path);
      await page.evaluate((selectedTheme) => { document.documentElement.dataset.theme = selectedTheme; }, theme);
      const accessibility = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      expect(accessibility.violations, `${fixture.name} / ${theme}`).toEqual([]);
    }
  }
});

test('dashboard keyboard, focus, state, and dismissal contracts', async ({ page }) => {
  await page.goto('/examples/consumer-dashboard/index.html');
  await page.keyboard.press('Tab');
  const activeTag = await page.locator(':focus').evaluate((element) => element.tagName);
  expect(['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA']).toContain(activeTag);
  const skipLink = page.locator('a[href="#main"]').first();
  await skipLink.focus();
  const focusStyle = await skipLink.evaluate((element) => getComputedStyle(element).outlineStyle);
  expect(focusStyle).not.toBe('none');

  const theme = page.locator('[data-sk-theme-toggle]');
  await theme.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'kujo-dark');
  await expect(theme).toHaveAttribute('aria-pressed', 'true');

  const menu = page.getByRole('button', { name: 'Actions' });
  await menu.focus();
  await page.keyboard.press('ArrowDown');
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator(':focus')).toHaveAttribute('role', 'menuitem');
  await page.keyboard.press('Escape');
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await expect(menu).toBeFocused();

  const drawerOpen = page.getByRole('button', { name: 'Open filters' });
  await drawerOpen.click();
  await expect(page.locator('#filter-drawer')).toHaveAttribute('aria-hidden', 'false');
  await expect(page.getByRole('button', { name: 'Close filters' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.locator('#filter-drawer')).toBeHidden();
  await expect(drawerOpen).toBeFocused();

  const popover = page.getByRole('button', { name: 'Filter guidance' });
  await popover.click();
  await expect(popover).toHaveAttribute('aria-expanded', 'true');
  await popover.press('Escape');
  await expect(popover).toHaveAttribute('aria-expanded', 'false');

  const tooltip = page.getByRole('button', { name: 'What does ready mean?' });
  await tooltip.focus();
  await expect(page.getByRole('tooltip')).toBeVisible();
  await tooltip.press('Escape');
  await expect(page.getByRole('tooltip')).toBeHidden();

  await menu.click();
  await page.getByRole('menuitem', { name: 'Review notes' }).click();
  await expect(page.locator('#review-modal')).toHaveAttribute('open', '');
  await page.keyboard.press('Escape');
  await expect(page.locator('#review-modal')).not.toHaveAttribute('open', '');
});

test('dashboard remains readable without optional JavaScript', async ({ page }) => {
  await page.route('**/dist/sitekit.js', (route) => route.abort());
  await page.goto('/examples/consumer-dashboard/index.html');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByRole('table')).toBeVisible();
  await expect(page.getByLabel('Search repositories')).toBeEditable();
  await expect(page.getByRole('button', { name: 'Open filters' })).toBeEnabled();
});

test('reduced motion and 200 percent text scaling stay usable', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/examples/consumer-dashboard/index.html');
  const duration = await page.locator('.sk-button').first().evaluate((element) => Number.parseFloat(getComputedStyle(element).transitionDuration));
  expect(duration).toBeLessThanOrEqual(0.001);
  await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
  const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
  expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.viewport + 1);
});

test('clean copied distribution works over HTTP and file URLs', async ({ page }) => {
  const relative = '/artifacts/release/clean-consumer/index.html';
  for (const url of [`http://127.0.0.1:4173${relative}`, pathToFileURL(path.join(root, relative)).href]) {
    await page.goto(url);
    await expect(page.getByRole('heading', { name: 'Clean SiteKit consumer' })).toBeVisible();
    await page.getByRole('button', { name: 'Switch to dark theme' }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'kujo-dark');
    await expect(page.locator('svg')).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    const font = await page.getByRole('heading', { level: 1 }).evaluate((element) => getComputedStyle(element).fontFamily);
    expect(font).toContain('Departure Mono');
  }
});
