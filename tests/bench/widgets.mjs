import fs from 'node:fs';
import { chromium } from '@playwright/test';

const bundles = process.argv.slice(2);
if (!bundles.length) bundles.push('dist/sitekit.js');
const sources = bundles.map(path => fs.readFileSync(path, 'utf8'));
const browser = await chromium.launch(process.env.SITEKIT_BENCH_CHANNEL ? { channel: process.env.SITEKIT_BENCH_CHANNEL } : {});
const results = bundles.map(bundle => ({ bundle, samples: [] }));

try {
  // Alternate bundle order to reduce warm-up and temperature bias.
  for (let run = 0; run < 8; run++) {
    for (let offset = 0; offset < bundles.length; offset++) {
      const index = (run + offset) % bundles.length;
      const page = await browser.newPage();
      try {
        await page.setContent('<main></main>');
        await page.addScriptTag({ content: sources[index] });
        const sample = await page.evaluate(() => {
          const host = document.querySelector('main');
          const measure = (count, steps, kind) => {
            host.innerHTML = kind === 'tabs'
              ? '<div class="sk-tabs"><div role="tablist">' + Array.from({ length: count }, (_, i) =>
                '<button role="tab" aria-controls="panel-' + i + '">Tab ' + i + '</button>').join('') +
                '</div>' + Array.from({ length: count }, (_, i) =>
                '<section id="panel-' + i + '" role="tabpanel">Panel ' + i + '</section>').join('') + '</div>'
              : '<div class="sk-combobox"><input role="combobox"><ul role="listbox">' + Array.from({ length: count }, (_, i) =>
                '<li role="option">Option ' + i + '</li>').join('') + '</ul></div>';
            const root = host.firstElementChild;
            const start = performance.now();
            SiteKit.enhance(root);
            const enhancement = performance.now() - start;
            const tabs = root.querySelectorAll('[role=tab]');
            const input = root.querySelector('input');
            const interactionStart = performance.now();
            for (let i = 0; i < steps; i++) {
              if (kind === 'tabs') {
                tabs[i % count].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
              } else {
                input.value = 'Option ' + (i % 10);
                input.dispatchEvent(new Event('input', { bubbles: true }));
                input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
                input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
              }
            }
            const interactions = performance.now() - interactionStart;
            if (kind === 'tabs') {
              const selected = steps % count;
              if (root.querySelector('[aria-selected=true]') !== tabs[selected] ||
                  document.activeElement !== tabs[selected] ||
                  root.querySelectorAll('[role=tabpanel]:not([hidden])')[0]?.id !== 'panel-' + selected) {
                throw new Error('Tab selection differs');
              }
            } else if (document.getElementById(input.getAttribute('aria-activedescendant'))?.textContent !== 'Option 10') {
              throw new Error('Combobox selection differs');
            }
            SiteKit.dispose(root);
            return { enhancement, interactions };
          };
          return {
            tabs12: measure(12, 100, 'tabs'),
            tabs200: measure(200, 100, 'tabs'),
            combobox50: measure(50, 32, 'combobox'),
            combobox1000: measure(1000, 32, 'combobox'),
          };
        });
        if (run > 0) results[index].samples.push(sample);
      } finally {
        await page.close();
      }
    }
  }

  const median = values => values.sort((a, b) => a - b)[Math.floor(values.length / 2)];
  for (const result of results) {
    result.medianMs = Object.fromEntries(Object.entries(result.samples[0]).map(([fixture, metrics]) =>
      [fixture, Object.fromEntries(Object.keys(metrics).map(metric =>
        [metric, median(result.samples.map(sample => sample[fixture][metric]))]))]));
  }
  console.log(JSON.stringify({ node: process.version, chromium: browser.version(), results }, null, 2));
} finally {
  await browser.close();
}
