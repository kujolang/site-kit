import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
for (const theme of ['kujo-light', 'kujo-dark', 'personal-dark']) {
  test(`severity text contrast ${theme}`, async ({ page }) => {
    await page.goto('/health');
    const alerts = ['warning', 'danger', 'success'].map(variant => `<aside class="sk-alert" data-variant="${variant}"><strong>${variant} status</strong><p>Review the reported state.</p></aside>`).join('');
    await page.setContent(`<!doctype html><html lang="en" data-theme="${theme}"><head><title>Severity colors</title><link rel="stylesheet" href="/dist/sitekit.css"></head><body><main><h1>Severity colors</h1>${alerts}</main></body></html>`);
    await page.evaluate(() => document.fonts.ready);
    const result = await new AxeBuilder({ page }).withRules(['color-contrast']).analyze();
    expect(result.violations).toEqual([]);
  });
}
