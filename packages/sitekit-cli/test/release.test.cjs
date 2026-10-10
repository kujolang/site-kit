'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');
const { execFileSync } = require('node:child_process');
const { unpack, hash, version, getRelease, download } = require('../lib/release.cjs');
const repo = path.resolve(__dirname, '../../..');
execFileSync(process.execPath, [path.join(repo, 'scripts/release-archive')]);
const v = require('../../../package.json').version;
const archive = fs.readFileSync(path.join(repo, `artifacts/release/sitekit-v${v}.tar.gz`));
function changeHeader(mutator) {
  const bytes = zlib.gunzipSync(archive), block = bytes.subarray(0, 512);
  mutator(block);
  block.fill(32, 148, 156);
  const sum = block.reduce((a, b) => a + b, 0).toString(8).padStart(7, '0') + '\0';
  block.write(sum, 148, 8, 'ascii');
  return zlib.gzipSync(bytes);
}
test('real SiteKit release archive verifies both manifests', () => {
  const release = unpack(archive, v);
  assert.equal(release.version, v);
  assert.equal(release.files.get('sitekit.css').equals(fs.readFileSync(path.join(repo, 'dist/sitekit.css'))), true);
});
test('reject traversal, absolute paths, links, corrupt headers and wrong versions', () => {
  for (const name of ['../escape', '/absolute', `sitekit-v${v}/dist/../evil`, `sitekit-v${v}/dist/C:evil`]) {
    assert.throws(() => unpack(changeHeader(b => { b.fill(0, 0, 100); b.write(name); }), v), /Unsafe/);
  }
  for (const type of ['1', '2', 'x', 'g']) assert.throws(() => unpack(changeHeader(b => b.write(type, 156)), v), /Unsupported/);
  const corrupted = zlib.gunzipSync(archive); corrupted[0] ^= 1;
  assert.throws(() => unpack(zlib.gzipSync(corrupted), v), /corrupt/);
  assert.throws(() => unpack(archive, '99.0.0'), /Unsafe/);
});
test('reject truncation, duplicate paths and manifest tampering', () => {
  const bytes = zlib.gunzipSync(archive);
  assert.throws(() => unpack(zlib.gzipSync(bytes.subarray(0, -1024)), v), /Truncated/);
  const size = parseInt(bytes.subarray(124, 136).toString(), 8);
  const first = bytes.subarray(0, 512 + Math.ceil(size / 512) * 512);
  assert.throws(() => unpack(zlib.gzipSync(Buffer.concat([first, bytes])), v), /Duplicate/);
  const tampered = Buffer.from(bytes); tampered[512] ^= 1;
  assert.throws(() => unpack(zlib.gzipSync(tampered), v), /hash mismatch/);
});
test('exact stable versions only', () => {
  assert.equal(version('v1.2.3'), '1.2.3');
  for (const value of ['latest', '^1.0.0', '1.0', '01.0.0', '1.0.0-beta.1', '1.0.0+build', '../../bad']) assert.throws(() => version(value));
});
function server({ sum, prerelease = false, missing = false } = {}) {
  const name = `sitekit-v${v}.tar.gz`, base = `https://github.com/kujolang/site-kit/releases/download/v${v}/`;
  return async url => {
    if (url.includes('api.github.com')) return new Response(JSON.stringify({ tag_name: 'v' + v, prerelease, draft: false, assets: missing ? [] : [name, name + '.sha256'].map(name => ({ name, browser_download_url: base + name })) }));
    if (url.endsWith('.sha256')) return new Response(sum ?? `${hash(archive)}  ${name}\n`);
    return new Response(archive);
  };
}
test('published release selection, checksums, missing assets, prereleases and HTTP failures', async () => {
  assert.equal((await getRelease(v, server())).version, v);
  assert.equal((await getRelease(undefined, server())).version, v);
  await assert.rejects(getRelease(v, server({ sum: 'wrong' })), /checksum/);
  await assert.rejects(getRelease(v, server({ missing: true })), /missing/);
  await assert.rejects(getRelease(v, server({ prerelease: true })), /stable/);
  await assert.rejects(getRelease(v, async () => new Response('failure', { status: 403 })), /403/);
  await assert.rejects(download('fixture', 2, undefined, async () => new Response('three')), /size limit/);
});
