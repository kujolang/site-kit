const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');
const root = path.resolve(__dirname, '../../..');
(async () => {
  const browser = await chromium.launch();
  try {
    const context = await browser.newContext();
    const page = await context.newPage();
    const css = fs.readFileSync(path.join(root, 'dist/sitekit.css'), 'utf8');
    const samples = JSON.parse(fs.readFileSync(path.join(__dirname, '../component-manifest.json'))).components;
    const rows = [];
    for (const width of [390, 700, 1000]) for (const contained of [false, true]) {
      await page.setViewportSize({ width, height: 900 });
      await page.setContent(`<style>${css}</style><div style="${contained ? 'container-type:inline-size' : ''}">${samples.find(c => c.slug === 'bento-grid').examples[0].html}</div>`);
      rows.push({ width, contained, ...await page.locator('.sk-bento-grid').evaluate(e => ({ columns: getComputedStyle(e).gridTemplateColumns, scrollWidth: document.documentElement.scrollWidth, width: document.documentElement.clientWidth })) });
    }
    await page.setContent(`<style>${css}</style><button class="sk-button" type="button" aria-label="Close"><span class="sk-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18"/></svg></span></button>`);
    const icon = await page.locator('.sk-button').evaluate(e => ({ buttonBackground: getComputedStyle(e).backgroundColor, buttonText: getComputedStyle(e).color, iconColor: getComputedStyle(e.querySelector('.sk-icon')).color, stroke: getComputedStyle(e.querySelector('path')).stroke }));
    const report = { sourceCommit: 'c0d199e06bc926e29de87b7cd983ee3d54db9cda', browser: 'Chromium', date: '2026-09-06', bentoGrid: rows, primaryButtonIcon: icon };
    fs.writeFileSync(path.join(__dirname, 'focused-findings.json'), JSON.stringify(report, null, 2) + '\n');
    console.log(JSON.stringify(report));
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
