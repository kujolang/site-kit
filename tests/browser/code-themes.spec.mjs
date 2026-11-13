import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
for (const theme of ['kujo-light', 'kujo-dark', 'personal-dark']) {
  test(`Code Block follows the active surface ${theme}`, async ({ page }) => {
    await page.goto('/health');
    await page.setContent(`<!doctype html><html lang="en" data-theme="${theme}"><head><title>Code themes</title><link rel="stylesheet" href="/dist/sitekit.css"></head><body><main><h1>Code themes</h1><figure class="sk-code-block"><figcaption>Source</figcaption><pre><code>const ready = true;</code></pre></figure><div class="sk-card" id="reference">Reference surface</div></main></body></html>`);
    await page.evaluate(() => document.fonts.ready);
    const colors = await page.evaluate(() => {
      const code = getComputedStyle(document.querySelector('.sk-code-block'));
      const card = getComputedStyle(document.querySelector('#reference'));
      return { code: code.backgroundColor, card: card.backgroundColor, text: code.color };
    });
    expect(colors.code).toBe(colors.card);
    expect(colors.code).not.toBe(colors.text);
    expect((await new AxeBuilder({ page }).withRules(['color-contrast']).analyze()).violations).toEqual([]);
  });
}
for (const theme of ['kujo-light', 'kujo-dark', 'personal-dark']) {
  test(`Slider uses the theme accent and native keyboard behavior ${theme}`, async ({ page }) => {
    await page.goto('/health');
    await page.setContent(`<!doctype html><html lang="en" data-theme="${theme}"><head><title>Slider theme</title><link rel="stylesheet" href="/dist/sitekit.css"></head><body><main><h1>Slider theme</h1><div class="sk-slider"><label for="range">Intensity</label><input id="range" type="range" min="0" max="100" value="50"></div><button class="sk-button" id="reference">Action</button></main></body></html>`);
    const slider = page.getByRole('slider');
    const colors = await page.evaluate(() => ({ accent: getComputedStyle(document.querySelector('#range')).accentColor, action: getComputedStyle(document.querySelector('#reference')).backgroundColor }));
    expect(colors.accent).toBe(colors.action);
    await slider.focus();
    await page.keyboard.press('ArrowRight');
    await expect(slider).toHaveValue('51');
  });
}
