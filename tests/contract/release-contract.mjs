import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const json = (file) => JSON.parse(read(file));
const hash = (file) => crypto.createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex');
const pkg = json('package.json');

assert.equal(pkg.private, true, 'SiteKit v1 must remain private on npm');
assert.equal(pkg.license, 'MIT');
assert.equal(pkg.engines.node, '>=20');
assert.equal(pkg.style, 'dist/sitekit.css');
assert.equal(pkg.exports['./sitekit.css'], './dist/sitekit.css');
assert.equal(pkg.exports['./sitekit.js'], './dist/sitekit.js');
assert.equal(pkg.main, undefined, 'do not invent a JavaScript main entry for the CSS-first distribution');
assert.match(read('LICENSE'), /including without limitation the rights[\s\S]*THE SOFTWARE IS PROVIDED "AS IS"/);
assert.ok(fs.existsSync(path.join(root, 'fonts/DepartureMono-LICENSE.txt')));
assert.ok(fs.existsSync(path.join(root, 'dist/fonts/DepartureMono-LICENSE.txt')));
assert.ok(fs.existsSync(path.join(root, 'dist/LICENSE')));

const manifest = json('dist/sitekit-manifest.json');
assert.equal(manifest.version, pkg.version);
assert.equal(manifest.distribution, 'source-vendored');
for (const [file, expected] of Object.entries(manifest.files)) {
  assert.equal(hash(`dist/${file}`), expected, `distribution hash mismatch: ${file}`);
}

const css = read('dist/sitekit.css');
const layers = ['@layer reset', '@layer tokens', '@layer base', '@layer components', '@layer utilities'];
let previous = -1;
for (const layer of layers) {
  const current = css.indexOf(layer);
  assert.ok(current > previous, `CSS layer order is invalid at ${layer}`);
  previous = current;
}
assert.match(css, /url\("\.\/fonts\/DepartureMono-Regular\.woff2"\)/);
assert.doesNotMatch(css, /\.\.\/fonts\//);
assert.match(css, /:focus-visible/);
assert.match(css, /prefers-reduced-motion: reduce/);
assert.match(css, /\[data-theme="kujo-light"\]/);
assert.match(css, /\[data-theme="kujo-dark"\]/);

const behavior = read('dist/sitekit.js');
for (const marker of ['ArrowDown', 'ArrowUp', 'Home', 'End', 'Escape', 'aria-expanded', 'trapFocus', 'data-sk-theme-toggle']) {
  assert.ok(behavior.includes(marker), `progressive behavior missing ${marker}`);
}

const componentRoot = path.join(root, 'components');
const components = fs.readdirSync(componentRoot).filter((name) => fs.statSync(path.join(componentRoot, name)).isDirectory()).sort();
const requiredSchemaFields = ['name', 'description', 'props', 'variants', 'requiredFields', 'accessibility', 'tokenDependencies', 'responsive', 'slots', 'examples'];
for (const name of components) {
  const schema = json(`components/${name}/${name}.schema.json`);
  for (const field of requiredSchemaFields) assert.ok(field in schema, `${name} schema missing ${field}`);
  assert.equal(schema.$schema, '../../schemas/component.schema.json', `${name} schema version/reference changed unexpectedly`);
  const html = read(`components/${name}/${name}.html`);
  assert.doesNotMatch(html, /<(div|span)\b[^>]*\brole=["']button["']/i, `${name} uses a clickable div/span substitute`);
}

const pages = [
  'examples/component-lab/index.html',
  'examples/consumer-dashboard/index.html',
  'layouts/landing.html',
  'layouts/docs.html',
  'layouts/ecommerce.html',
];
for (const file of pages) {
  const html = read(file);
  assert.match(html, /<html\b[^>]*\blang=/i, `${file} has no language`);
  assert.match(html, /<main\b/i, `${file} has no main landmark`);
  assert.match(html, /<h1[\s>]/i, `${file} has no h1`);
  assert.doesNotMatch(html, /<(div|span)\b[^>]*\brole=["']button["']/i, `${file} uses a clickable div/span substitute`);
}

const dashboard = read('examples/consumer-dashboard/index.html');
for (const marker of ['<caption', 'scope="col"', 'scope="row"', 'data-sk-drawer', 'data-sk-modal', 'role="tooltip"', 'aria-haspopup="menu"']) {
  assert.ok(dashboard.includes(marker), `consumer dashboard missing ${marker}`);
}
for (const match of dashboard.matchAll(/<label\b[^>]*for=["']([^"']+)["']/gi)) {
  assert.match(dashboard, new RegExp(`id=["']${match[1]}["']`), `label target is missing: ${match[1]}`);
}
assert.match(read('docs/components.md'), new RegExp(`all ${components.length} component schemas`));
assert.equal((read('docs/components.md').match(/^- \*\*/gm) || []).length, components.length, 'generated component index is incomplete');

console.log(`release contract passed: ${components.length} schemas, ${pages.length} representative pages, distribution hashes and semantics verified`);
