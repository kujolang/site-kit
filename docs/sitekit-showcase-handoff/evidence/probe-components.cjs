/* Read-only rendered-source audit. Does not build a showcase or modify library files. */
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');
const AxeBuilder = require('@axe-core/playwright').default;
const root = path.resolve(__dirname, '../../..');
const handoff = path.resolve(__dirname, '..');
(async () => {
  const browser = await chromium.launch();
  try {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  const manifest = JSON.parse(fs.readFileSync(path.join(handoff, 'component-manifest.json')));
  const css = fs.readFileSync(path.join(root, 'dist/sitekit.css'), 'utf8');
  const results = [];
  for (const component of manifest.components) {
    for (const theme of ['kujo-light', 'kujo-dark']) {
      await page.setContent(`<!doctype html><html lang="en" data-theme="${theme}"><head><title>Source audit</title><style>${css}</style></head><body><main><h1>Source audit</h1><div id="audit-host" style="container-type:inline-size">${component.examples[0].html}</div></main></body></html>`);
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.addScriptTag({ path: path.join(root, 'dist/sitekit.js') });
      const layout = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth,
        hiddenButRendered: [...document.querySelectorAll('[hidden]')].filter(e => getComputedStyle(e).display !== 'none' && getComputedStyle(e).visibility !== 'hidden').map(e => ({ tag: e.tagName, class: e.className, id: e.id })) }));
      const a11y = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
      results.push({ slug: component.slug, theme, ...layout,
        violations: a11y.violations.map(v => ({ id: v.id, impact: v.impact, description: v.description, nodes: v.nodes.map(n => ({ html: n.html, failureSummary: n.failureSummary })) })) });
    }
  }
  const containers = [];
  for (const slug of ['bento-grid', 'content-section', 'generator-panel', 'newsletter-signup', 'product-showcase']) {
    const c = manifest.components.find(c => c.slug === slug);
    for (const contained of [false, true]) {
      await page.setViewportSize({ width: 1100, height: 900 });
      await page.setContent(`<style>${css}</style><div style="width:1000px;${contained ? 'container-type:inline-size' : ''}">${c.examples[0].html}</div>`);
      containers.push({ slug, contained, columns: await page.locator('.sk-' + slug).first().evaluate(e => getComputedStyle(e).gridTemplateColumns) });
    }
  }
  const evidence = { auditDate: '2026-09-06', sourceCommit: manifest.sourceCommit,
    methodology: 'Chromium; each dossier standalone HTML example at 390x844 in two themes with an outer inline-size container and dist CSS/JS. axe WCAG tags. Font relative URLs are unresolved in setContent; typography/real-font appearance is NOT established by these probes. No real form submissions or external APIs. Axe violations and overflow are observations, not formal compliance results. Skip-link example includes its own main and may produce an audit-harness nested landmark finding.',
    components: results, containerComparisons: containers };
  fs.writeFileSync(path.join(__dirname, 'component-probes.json'), JSON.stringify(evidence, null, 2) + '\n');
  console.log(JSON.stringify({ cases: results.length, casesWithViolations: results.filter(r => r.violations.length).length, overflowingCases: results.filter(r => r.scrollWidth > r.width + 1).map(r => r.slug + '/' + r.theme), hiddenButRendered: results.filter(r => r.hiddenButRendered.length).map(r => r.slug), containers }));
  await page.goto('https://kujolang.ai', { waitUntil: 'networkidle', timeout: 30000 });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.screenshot({ path: '/tmp/sitekit-kujo-live.png' });
  await page.goto('file://' + path.join(root, 'examples/consumer-dashboard/index.html'));
  await page.screenshot({ path: '/tmp/sitekit-dashboard.png' });
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
