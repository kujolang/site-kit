import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const json = (file) => JSON.parse(read(file));
const pkg = json('package.json');
const version = pkg.version;

assert.match(version, /^1\.\d+\.\d+$/, 'package.json must define a stable v1 version');
assert.equal(json('package-lock.json').version, version, 'lockfile version is inconsistent');
assert.equal(json('package-lock.json').packages[''].version, version, 'lockfile root version is inconsistent');
assert.match(read('README.md'), new RegExp(`version-${version.replaceAll('.', '\\.')}-`), 'README version badge is inconsistent');
assert.match(read('CHANGELOG.md'), new RegExp(`^## \\[${version.replaceAll('.', '\\.')}\\] - \\d{4}-\\d{2}-\\d{2}$`, 'm'), 'CHANGELOG release entry is inconsistent');
assert.match(read('layouts/changelog.html'), new RegExp(`<h2>${version.replaceAll('.', '\\.')}</h2>`), 'changelog layout is inconsistent');
assert.equal(json('dist/sitekit-manifest.json').version, version, 'distribution manifest is inconsistent');
assert.match(read('dist/README.md'), new RegExp(`SiteKit ${version.replaceAll('.', '\\.')}`), 'distribution README is inconsistent');
assert.equal(json('tests/visual/component-snapshot.json').sitekitVersion, version, 'component snapshot is inconsistent');
assert.match(read('scripts/release-archive'), /sitekit-v\$\{pkg\.version\}/, 'release archive name must derive from package.json');

console.log(`version consistency passed: ${version}`);
