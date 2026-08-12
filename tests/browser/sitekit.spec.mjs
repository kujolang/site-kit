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

async function loadBehaviorFixture(page, markup) {
  await page.goto('/examples/consumer-dashboard/index.html');
  await page.setContent(`<!doctype html><html lang="en" data-theme="kujo-light"><body>${markup}</body></html>`);
  await page.addScriptTag({ url: '/dist/sitekit.js' });
}

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

test.describe('progressive behavior regressions', () => {
  test('repeated enhancement does not duplicate event handlers', async ({ page }) => {
    await loadBehaviorFixture(page, '<div class="sk-dropdown-menu"><button type="button" aria-haspopup="menu" aria-expanded="false">Actions</button><ul role="menu" hidden><li role="none"><button role="menuitem" type="button">Run</button></li></ul></div>');
    await page.evaluate(() => window.SiteKit.enhance());
    const trigger = page.getByRole('button', { name: 'Actions' });
    await trigger.click();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  test('generated relationship IDs never collide with existing document IDs', async ({ page }) => {
    await loadBehaviorFixture(page, '<div id="sk-menu-1"></div><div class="sk-dropdown-menu"><button type="button" aria-haspopup="menu" aria-expanded="false">Actions</button><ul role="menu" hidden><li role="none"><button role="menuitem" type="button">Run</button></li></ul></div>');
    const ids = await page.locator('[id]').evaluateAll((elements) => elements.map((element) => element.id));
    expect(new Set(ids).size).toBe(ids.length);
  });

  test('focus traps ignore controls hidden by an ancestor', async ({ page }) => {
    await loadBehaviorFixture(page, '<dialog class="sk-modal" data-sk-modal open><div hidden><button id="hidden-control" type="button">Hidden</button></div><button id="first-visible" type="button">First</button><button id="last-visible" type="button">Last</button></dialog>');
    await page.locator('#last-visible').focus();
    await page.keyboard.press('Tab');
    await expect(page.locator('#first-visible')).toBeFocused();
  });

  test('ArrowUp opens a menu and focuses its last item', async ({ page }) => {
    await loadBehaviorFixture(page, '<div class="sk-dropdown-menu"><button type="button" aria-haspopup="menu" aria-expanded="false">Actions</button><ul role="menu" hidden><li role="none"><button role="menuitem" type="button">First</button></li><li role="none"><button role="menuitem" type="button">Last</button></li></ul></div>');
    const trigger = page.getByRole('button', { name: 'Actions' });
    await trigger.focus();
    await page.keyboard.press('ArrowUp');
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByRole('menuitem', { name: 'Last' })).toBeFocused();
  });

  test('tooltip stays visible while either hover or focus remains active', async ({ page }) => {
    await loadBehaviorFixture(page, '<span class="sk-tooltip"><button type="button">Info</button><span role="tooltip" hidden>Help</span></span><button type="button">After</button>');
    const trigger = page.getByRole('button', { name: 'Info' });
    const tooltip = page.getByRole('tooltip');
    await trigger.hover();
    await trigger.focus();
    await page.getByRole('button', { name: 'After' }).focus();
    await expect(tooltip).toBeVisible();
    await page.mouse.move(0, 0);
    await expect(tooltip).toBeHidden();
  });

  test('every modal opener targeting the same dialog works', async ({ page }) => {
    await loadBehaviorFixture(page, '<button type="button" data-sk-modal-open="shared-modal">Open first</button><button type="button" data-sk-modal-open="shared-modal">Open second</button><dialog id="shared-modal" data-sk-modal><button type="button" data-sk-modal-close>Close</button></dialog>');
    await page.getByRole('button', { name: 'Open second' }).click();
    await expect(page.locator('#shared-modal')).toHaveAttribute('open', '');
  });

  test('every drawer opener targeting the same drawer works', async ({ page }) => {
    await loadBehaviorFixture(page, '<button type="button" data-sk-drawer-open="shared-drawer">Open first</button><button type="button" data-sk-drawer-open="shared-drawer">Open second</button><aside id="shared-drawer" data-sk-drawer hidden aria-hidden="true"><button type="button" data-sk-drawer-close>Close</button></aside>');
    const second = page.getByRole('button', { name: 'Open second' });
    await second.click();
    await expect(page.locator('#shared-drawer')).toHaveAttribute('aria-hidden', 'false');
    await page.getByRole('button', { name: 'Close' }).click();
    await expect(second).toBeFocused();
  });

  test('each drawer controls the scrim in its own shell', async ({ page }) => {
    await loadBehaviorFixture(page, '<button type="button" data-sk-drawer-open="drawer-one">Open one</button><button type="button" data-sk-drawer-open="drawer-two">Open two</button><div class="sk-drawer-shell" id="shell-one"><div class="sk-drawer-scrim" hidden></div><aside id="drawer-one" data-sk-drawer hidden><button type="button">One</button></aside></div><div class="sk-drawer-shell" id="shell-two"><div class="sk-drawer-scrim" hidden></div><aside id="drawer-two" data-sk-drawer hidden><button type="button">Two</button></aside></div>');
    await page.getByRole('button', { name: 'Open two' }).click();
    await expect(page.locator('#shell-one .sk-drawer-scrim')).toHaveAttribute('hidden', '');
    await expect(page.locator('#shell-two .sk-drawer-scrim')).not.toHaveAttribute('hidden', '');
  });

  test('a valid persisted theme is restored during enhancement', async ({ page }) => {
    await page.goto('/examples/consumer-dashboard/index.html');
    await page.evaluate(() => window.localStorage.setItem('sk-theme', 'kujo-dark'));
    await page.setContent('<!doctype html><html lang="en" data-theme="kujo-light"><body><button type="button" data-sk-theme-toggle>Theme</button></body></html>');
    await page.addScriptTag({ url: '/dist/sitekit.js' });
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'kujo-dark');
  });

  test('theme selectors and toggles stay synchronized', async ({ page }) => {
    await loadBehaviorFixture(page, '<select data-sk-theme-select aria-label="Theme"><option value="kujo-light">Light</option><option value="kujo-dark">Dark</option></select><button type="button" data-sk-theme-toggle>Theme</button>');
    const select = page.locator('select[data-sk-theme-select]');
    const toggle = page.locator('[data-sk-theme-toggle]');
    await select.selectOption('kujo-dark');
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');
    await expect(toggle).toHaveAttribute('aria-label', 'Switch to light theme');
    await toggle.click();
    await expect(select).toHaveValue('kujo-light');
  });
});
