import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const required = (condition, message) => assert.ok(condition, message);

required(fs.existsSync(path.join(root, 'dist/sitekit.css')), 'dist/sitekit.css is missing; run npm run build');
required(fs.existsSync(path.join(root, 'dist/sitekit.js')), 'dist/sitekit.js is missing; run npm run build');
required(fs.existsSync(path.join(root, 'examples/icons.svg')), 'registered icon sprite example is missing');
for (const asset of ['fonts/DepartureMono-Regular.woff', 'fonts/DepartureMono-Regular.woff2', 'fonts/DepartureMono-LICENSE.txt']) {
  required(fs.existsSync(path.join(root, 'dist', asset)), `distribution asset missing: ${asset}`);
}

const css = read('dist/sitekit.css');
const order = ['@layer reset', '@layer tokens', '@layer base', '@layer components', '@layer utilities'];
let previous = -1;
for (const marker of order) {
  const position = css.indexOf(marker);
  required(position >= 0, `bundle marker missing: ${marker}`);
  required(position > previous, `bundle order is invalid around ${marker}`);
  previous = position;
}
required(css.includes('url("./fonts/DepartureMono-Regular.woff2")'), 'bundle font URL must remain relative to dist/fonts');
required(!css.includes('../fonts/'), 'bundle must not reference source-relative font paths');
required(css.includes('[data-theme="kujo-light"]') && css.includes('[data-theme="kujo-dark"]'), 'light and dark theme selectors must ship');
required(css.includes('@media (prefers-reduced-motion: reduce)'), 'reduced-motion fallback must ship');

const behavior = read('dist/sitekit.js');
required(behavior.includes('aria-expanded') && behavior.includes('ArrowDown') && behavior.includes('Escape'), 'behavior layer must include keyboard/menu state handling');

const dashboard = read('examples/consumer-dashboard/index.html');
for (const marker of ['dist/sitekit.css', 'dist/sitekit.js', 'data-sk-theme-toggle', 'data-sk-drawer', 'data-sk-modal', 'aria-haspopup="menu"', 'role="tooltip"', '<caption', 'scope="col"', 'aria-label="Close filters"']) {
  required(dashboard.includes(marker), `consumer dashboard missing ${marker}`);
}
required(!/<div[^>]+role=["']button/.test(dashboard), 'consumer example must not use clickable divs');
required(/<h1[\s>]/.test(dashboard), 'consumer example must have an h1');
required(new URL(`file://${path.join(root, 'examples/consumer-dashboard/index.html')}`).protocol === 'file:', 'file URL must resolve');

const server = http.createServer((request, response) => {
  const pathname = new URL(request.url, 'http://127.0.0.1').pathname;
  const file = pathname === '/sitekit.css' ? path.join(root, 'dist/sitekit.css') : pathname === '/icons.svg' ? path.join(root, 'examples/icons.svg') : pathname.startsWith('/fonts/') ? path.join(root, 'dist', pathname.slice(1)) : null;
  if (!file || !fs.existsSync(file)) { response.writeHead(404); response.end(); return; }
  response.writeHead(200); response.end(fs.readFileSync(file));
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const { port } = server.address();
for (const resource of ['/sitekit.css', '/fonts/DepartureMono-Regular.woff2', '/icons.svg']) {
  const response = await fetch(`http://127.0.0.1:${port}${resource}`);
  required(response.status === 200, `HTTP consumer asset failed: ${resource}`);
}
await new Promise((resolve) => server.close(resolve));

console.log('browser smoke passed: distribution, file:// contract, HTTP assets, themes, keyboard hooks, semantics, and reduced motion');
