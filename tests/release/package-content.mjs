import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const archive = path.join(root, 'artifacts', 'release', `sitekit-v${pkg.version}.tar.gz`);
const digest = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const runArchive = () => execFileSync(process.execPath, ['scripts/release-archive'], { cwd: root, encoding: 'utf8' });

runArchive();
const first = digest(archive);
runArchive();
assert.equal(digest(archive), first, 'release archive is not byte-for-byte deterministic');

const prefix = `sitekit-v${pkg.version}`;
const expectedArchiveEntries = [
  `${prefix}/LICENSE`,
  `${prefix}/dist/LICENSE`,
  `${prefix}/dist/icons/tabler.svg`,
  `${prefix}/dist/icons/LICENSE.txt`,
  `${prefix}/dist/icons/README.md`,
  `${prefix}/dist/README.md`,
  `${prefix}/dist/sitekit-manifest.json`,
  `${prefix}/dist/sitekit.css`,
  `${prefix}/dist/sitekit.js`,
  `${prefix}/dist/fonts/DepartureMono-LICENSE.txt`,
  `${prefix}/dist/fonts/DepartureMono-Regular.woff`,
  `${prefix}/dist/fonts/DepartureMono-Regular.woff2`,
  `${prefix}/release-manifest.json`,
];
const entries = execFileSync('tar', ['-tzf', archive], { encoding: 'utf8' }).trim().split('\n').sort();
assert.deepEqual(entries, expectedArchiveEntries.sort(), 'release archive contains unexpected or missing files');

const pack = JSON.parse(execFileSync('npm', ['pack', '--dry-run', '--json'], { cwd: root, encoding: 'utf8' }))[0];
const packed = pack.files.map(({ path: file }) => file);
for (const required of ['package.json', 'README.md', 'CHANGELOG.md', 'LICENSE', 'dist/sitekit.css', 'dist/sitekit.js', 'dist/LICENSE', 'dist/fonts/DepartureMono-LICENSE.txt']) {
  assert.ok(packed.includes(required), `npm pack inspection missing ${required}`);
}
for (const file of packed) {
  assert.ok(file === 'package.json' || ['README.md', 'CHANGELOG.md', 'LICENSE'].includes(file) || file.startsWith('dist/'), `npm pack inspection exposed unsupported source: ${file}`);
}

const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'sitekit-release-'));
try {
  execFileSync('tar', ['-xzf', archive, '-C', temporary]);
  const dist = path.join(temporary, prefix, 'dist');
  const consumer = path.join(temporary, 'consumer');
  fs.cpSync(dist, path.join(consumer, 'sitekit'), { recursive: true });
  fs.writeFileSync(path.join(consumer, 'index.html'), '<!doctype html><html lang="en" data-theme="kujo-light"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><link rel="stylesheet" href="./sitekit/sitekit.css"></head><body><main><h1>Clean SiteKit consumer</h1><button class="sk-button" type="button" data-sk-theme-toggle aria-pressed="false">Theme</button><span class="sk-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 4h16v16H4z"/></svg></span></main><script src="./sitekit/sitekit.js" defer></script></body></html>');
  assert.equal(pathToFileURL(path.join(consumer, 'index.html')).protocol, 'file:');
  const css = fs.readFileSync(path.join(consumer, 'sitekit', 'sitekit.css'), 'utf8');
  assert.match(css, /\.\/fonts\/DepartureMono-Regular\.woff2/);
  const server = http.createServer((request, response) => {
    const pathname = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname).replace(/^\//, '');
    const file = path.resolve(consumer, pathname || 'index.html');
    if (!file.startsWith(consumer) || !fs.existsSync(file)) { response.writeHead(404).end(); return; }
    response.writeHead(200).end(fs.readFileSync(file));
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;
  for (const resource of ['index.html', 'sitekit/sitekit.css', 'sitekit/sitekit.js', 'sitekit/fonts/DepartureMono-Regular.woff2']) {
    const response = await fetch(`http://127.0.0.1:${port}/${resource}`);
    assert.equal(response.status, 200, `clean HTTP consumer failed: ${resource}`);
  }
  await new Promise((resolve) => server.close(resolve));
} finally {
  fs.rmSync(temporary, { recursive: true, force: true });
}

console.log(`package content passed: ${expectedArchiveEntries.length} archive files, ${packed.length} npm-pack files, deterministic SHA-256 ${first}`);
