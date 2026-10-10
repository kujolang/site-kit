'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync, spawnSync } = require('node:child_process');
const engine = require('../lib/project.cjs');
const { hash } = require('../lib/release.cjs');
const { inspect } = require('../lib/audit.cjs');
const cli = path.resolve(__dirname, '../bin/sitekit.cjs');
function payload(version = '1.1.0') {
  const files = new Map([['sitekit.css', Buffer.from('/* ' + version + ' */')], ['sitekit.js', Buffer.from('/* runtime */')], ['fonts/license.txt', Buffer.from('license')]]);
  const manifest = { schemaVersion: 1, product: 'SiteKit', distribution: 'source-vendored', version, files: Object.fromEntries([...files].map(([name, bytes]) => [name, hash(bytes)])) };
  const bytes = Buffer.from(JSON.stringify(manifest));
  files.set('sitekit-manifest.json', bytes);
  return { version, manifestSha256: hash(bytes), archiveSha256: 'a'.repeat(64), source: 'fixture', files };
}
function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'sitekit-test-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const dir = path.join(root, 'public', 'sitekit');
  for (const [name, bytes] of payload().files) { fs.mkdirSync(path.dirname(path.join(dir, name)), { recursive: true }); fs.writeFileSync(path.join(dir, name), bytes); }
  return { root, dir };
}
function tree(root) {
  const result = {};
  function walk(dir) { for (const item of fs.readdirSync(dir, { withFileTypes: true })) { const file = path.join(dir, item.name); if (item.isDirectory()) walk(file); else result[path.relative(root, file)] = hash(fs.readFileSync(file)); } }
  walk(root); return result;
}
test('adoption, nested status and read-only latest/exact checks', async t => {
  const { root, dir } = fixture(t);
  engine.init(root);
  assert.equal(engine.status(dir).version, '1.1.0');
  const baseline = tree(root);
  const result = await engine.upgrade(root, { check: true, target: '1.2.0' }, async target => { assert.equal(target, '1.2.0'); return payload('1.2.0'); });
  assert.equal(result.changes, true);
  assert.deepEqual(tree(root), baseline);
  assert.equal(fs.existsSync(path.join(root, '.sitekit')), false);
});
test('upgrade preserves HTML and fonts, rollback retains both versions', async t => {
  const { root, dir } = fixture(t); engine.init(root, 'public/sitekit');
  fs.writeFileSync(path.join(root, 'index.html'), '<link href="public/sitekit/sitekit.css">');
  const result = await engine.upgrade(root, {}, async () => payload('1.2.0'));
  assert.equal(engine.status(root).version, '1.2.0');
  assert.equal(fs.readFileSync(path.join(dir, 'fonts/license.txt'), 'utf8'), 'license');
  assert.equal(fs.readFileSync(path.join(root, 'index.html'), 'utf8'), '<link href="public/sitekit/sitekit.css">');
  assert.equal(inspect(path.join(root, result.backup)).version, '1.1.0');
  const restored = engine.rollback(root, result.transaction);
  assert.equal(engine.status(root).version, '1.1.0');
  assert.equal(inspect(path.join(root, restored.backup)).version, '1.2.0');
});
test('modified, missing, extra files and empty directories are never replaced', async t => {
  for (const mode of ['modified', 'missing', 'extra', 'directory', 'manifest']) {
    const { root, dir } = fixture(t); engine.init(root);
    if (mode === 'modified') fs.appendFileSync(path.join(dir, 'sitekit.css'), 'local edit');
    if (mode === 'missing') fs.unlinkSync(path.join(dir, 'sitekit.js'));
    if (mode === 'extra') fs.writeFileSync(path.join(dir, 'custom.css'), 'local');
    if (mode === 'directory') fs.mkdirSync(path.join(dir, 'custom'));
    if (mode === 'manifest') { const m = JSON.parse(fs.readFileSync(path.join(dir, 'sitekit-manifest.json'))); m.version = '1.1.1'; fs.writeFileSync(path.join(dir, 'sitekit-manifest.json'), JSON.stringify(m)); }
    const before = tree(root);
    await assert.rejects(engine.upgrade(root, {}, async () => payload('1.2.0')), /changes|differs/);
    assert.deepEqual(tree(root), before);
  }
});
test('version policies and same-version identity', async t => {
  const { root } = fixture(t); engine.init(root);
  assert.equal((await engine.upgrade(root, {}, async () => payload())).action, 'unchanged');
  await assert.rejects(engine.upgrade(root, {}, async () => payload('1.0.0')), /downgrade/i);
  await assert.rejects(engine.upgrade(root, {}, async () => payload('2.0.0')), /Major/);
  const changed = payload(); changed.manifestSha256 = 'b'.repeat(64);
  await assert.rejects(engine.upgrade(root, {}, async () => changed), /Same version/);
  await engine.upgrade(root, { allowMajor: true }, async () => payload('2.0.0'));
  await engine.upgrade(root, { allowDowngrade: true }, async () => payload('1.1.0'));
  assert.equal(engine.status(root).version, '1.1.0');
});
for (const point of ['staged', 'backed-up', 'promoted', 'locked']) test(`recovery after interruption at ${point}`, async t => {
  const { root } = fixture(t); engine.init(root);
  await assert.rejects(engine.upgrade(root, {}, async () => payload('1.2.0'), phase => { if (phase === point) throw new Error('interrupted'); }), /interrupted/);
  engine.recover(root);
  assert.equal(engine.status(root).version, '1.1.0');
  assert.equal(engine.status(root).recoveryRequired, false);
});
test('recovery preserves edits made after interrupted promotion', async t => {
  const { root, dir } = fixture(t); engine.init(root);
  await assert.rejects(engine.upgrade(root, {}, async () => payload('1.2.0'), phase => { if (phase === 'promoted') throw new Error('interrupted'); }));
  fs.appendFileSync(path.join(dir, 'sitekit.css'), 'local change');
  await assert.rejects(async () => engine.recover(root), /Files changed/);
  assert.match(fs.readFileSync(path.join(dir, 'sitekit.css'), 'utf8'), /local change/);
});
test('concurrent asset edits are detected before moving the original', async t => {
  const { root, dir } = fixture(t); engine.init(root);
  await assert.rejects(engine.upgrade(root, {}, async () => payload('1.2.0'), phase => { if (phase === 'staged') fs.appendFileSync(path.join(dir, 'sitekit.css'), 'changed'); }), /changes/);
  assert.match(fs.readFileSync(path.join(dir, 'sitekit.css'), 'utf8'), /changed/);
});
test('exclusive process lock and recovery reject a live owner', async t => {
  const { root } = fixture(t); engine.init(root);
  fs.mkdirSync(path.join(root, '.sitekit'));
  fs.writeFileSync(path.join(root, '.sitekit/busy.json'), JSON.stringify({ pid: process.pid, host: os.hostname() }));
  await assert.rejects(engine.upgrade(root, {}, async () => payload('1.2.0')), /EEXIST/);
  assert.throws(() => engine.recover(root), /still running/);
});
test('init refuses ambiguous discovery and traversal', t => {
  const { root, dir } = fixture(t);
  fs.cpSync(dir, path.join(root, 'second'), { recursive: true });
  assert.throws(() => engine.init(root), /found 2/);
  assert.throws(() => engine.init(root, '../outside'), /non-hidden|Unsafe/);
});
test('symlink installations and metadata are refused', { skip: process.platform === 'win32' }, t => {
  const { root, dir } = fixture(t);
  fs.symlinkSync(dir, path.join(root, 'linked'));
  assert.throws(() => engine.init(root, 'linked'), /Symlink/);
  engine.init(root, 'public/sitekit');
  fs.renameSync(path.join(root, 'sitekit.lock.json'), path.join(root, 'real-lock'));
  fs.symlinkSync(path.join(root, 'real-lock'), path.join(root, 'sitekit.lock.json'));
  assert.throws(() => engine.status(root), /Symlink/);
});
test('CLI errors are machine readable and optional pack invokes shared engine', t => {
  const { root } = fixture(t);
  execFileSync(process.execPath, [cli, 'init'], { cwd: root });
  const error = spawnSync(process.execPath, [cli, 'status', '--unknown', '--json'], { cwd: root, encoding: 'utf8' });
  assert.equal(error.status, 1); assert.match(JSON.parse(error.stdout).error, /Unknown option/);
  const success = JSON.parse(execFileSync(process.execPath, [cli, 'status', '--kujo'], { cwd: root, encoding: 'utf8' }));
  assert.equal(success.status, 'pass');
  execFileSync(process.execPath, [cli, 'kujo', 'install'], { cwd: root });
  const copied = path.join(root, '.kujo/packs/sitekit/cli/bin/sitekit.cjs');
  assert.equal(JSON.parse(execFileSync(process.execPath, [copied, 'status', '--json'], { cwd: root })).version, '1.1.0');
  if (process.env.KUJO) {
    const report = JSON.parse(execFileSync(process.env.KUJO, ['sitekit', 'status', '--json'], { cwd: root, encoding: 'utf8' }));
    assert.equal(report.status, 'pass');
    const failed = spawnSync(process.env.KUJO, ['sitekit', 'upgrade', 'not-a-version', '--json'], { cwd: root, encoding: 'utf8' });
    assert.equal(failed.status, 1);
    assert.match(JSON.parse(failed.stdout).checks[0].message, /exact stable version/);
    const human = execFileSync(process.env.KUJO, ['sitekit', 'status'], { cwd: root, encoding: 'utf8' });
    assert.match(human, /SiteKit|sitekit/);
  }
});
test('recovery after process exit clears stale lock and restores absent target', t => {
  const { root } = fixture(t); engine.init(root);
  const candidate = payload('1.2.0');
  const encoded = { ...candidate, files: [...candidate.files].map(([name, bytes]) => [name, bytes.toString('base64')]) };
  const script = `const engine = require(${JSON.stringify(require.resolve('../lib/project.cjs'))}); const candidate = ${JSON.stringify(encoded)}; candidate.files = new Map(candidate.files.map(([n,b])=>[n,Buffer.from(b,'base64')])); engine.upgrade(${JSON.stringify(root)}, {}, async()=>candidate, phase=>{ if(phase==='backed-up') process.exit(99); });`;
  const child = spawnSync(process.execPath, ['-e', script]);
  assert.equal(child.status, 99);
  assert.equal(fs.existsSync(path.join(root, '.sitekit/busy.json')), true);
  engine.recover(root);
  assert.equal(engine.status(root).version, '1.1.0');
  assert.equal(fs.existsSync(path.join(root, '.sitekit/busy.json')), false);
});

test('automatic adoption discovers the common public/vendor directory', t => {
  const { root, dir } = fixture(t);
  fs.mkdirSync(path.join(root, 'public/vendor'));
  fs.renameSync(dir, path.join(root, 'public/vendor/sitekit'));
  assert.equal(engine.init(root).directory, 'public/vendor/sitekit');
});
