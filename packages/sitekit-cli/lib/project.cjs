'use strict';
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { randomUUID } = require('node:crypto');
const { inspect } = require('./audit.cjs');
const { hash, safeName, version, getRelease } = require('./release.cjs');
const CONFIG = 'sitekit.json', LOCK = 'sitekit.lock.json';
const exists = p => { try { fs.lstatSync(p); return true; } catch (e) { if (e.code === 'ENOENT') return false; throw e; } };
function safePath(root, relative) {
  if (!safeName(relative)) throw new Error(`Unsafe project path: ${relative}`);
  let current = root;
  for (const part of relative.split('/')) {
    current = path.join(current, part);
    if (exists(current) && fs.lstatSync(current).isSymbolicLink()) throw new Error(`Symlink refused: ${current}`);
  }
  return current;
}
const read = file => JSON.parse(fs.readFileSync(file, 'utf8'));
function write(file, value, exclusive = false) {
  const bytes = JSON.stringify(value, null, 2) + '\n';
  if (exclusive) { fs.writeFileSync(file, bytes, { flag: 'wx' }); return; }
  const tmp = file + '.' + randomUUID() + '.tmp';
  try {
    fs.writeFileSync(tmp, bytes, { flag: 'wx' });
    fs.renameSync(tmp, file);
  } finally { if (exists(tmp)) fs.unlinkSync(tmp); }
}
function project(cwd) {
  let root = fs.realpathSync(cwd);
  while (!exists(path.join(root, CONFIG))) {
    const parent = path.dirname(root);
    if (parent === root) throw new Error('No sitekit.json found. Run sitekit init [asset-directory] first.');
    root = parent;
  }
  const config = read(safePath(root, CONFIG));
  if (config.schemaVersion !== 1 || typeof config.directory !== 'string' || config.directory.split('/').some(p => p.startsWith('.') || p === 'node_modules')) throw new Error('Unsupported SiteKit configuration');
  const target = safePath(root, config.directory);
  const state = safePath(root, '.sitekit');
  return { root, config, target, state, lock: safePath(root, LOCK) };
}
function snapshot(p) {
  const lock = read(p.lock), installed = inspect(p.target);
  if (lock.schemaVersion !== 1 || lock.directory !== p.config.directory || lock.version !== installed.version || lock.manifestSha256 !== installed.manifestSha256) throw new Error('Installation differs from sitekit.lock.json; reconcile before upgrading');
  version(installed.version);
  if (!installed.valid) throw new Error(`Local asset changes detected: ${JSON.stringify({ modified: installed.modified, missing: installed.missing, extra: installed.extra })}`);
  return { lock, installed };
}
function discover(root) {
  const candidates = []; let count = 0;
  function walk(dir, depth) {
    if (++count > 5000) throw new Error('Discovery limit reached; pass an explicit asset directory');
    if (exists(path.join(dir, 'sitekit-manifest.json'))) { candidates.push(path.relative(root, dir).split(path.sep).join('/')); return; }
    if (depth >= 5) return;
    for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
      if (item.isDirectory() && !item.name.startsWith('.') && !['node_modules', 'vendor', 'coverage'].includes(item.name)) walk(path.join(dir, item.name), depth + 1);
    }
  }
  walk(root, 0);
  return candidates;
}
function init(cwd, directory) {
  const root = fs.realpathSync(cwd);
  if (exists(path.join(root, CONFIG)) || exists(path.join(root, LOCK))) throw new Error('SiteKit is already configured or has partial metadata; inspect it before retrying');
  if (!directory) {
    const candidates = discover(root);
    if (candidates.length !== 1) throw new Error(`Expected one installation; found ${candidates.length}. Run sitekit init <directory>. Candidates: ${candidates.join(', ')}`);
    directory = candidates[0];
  }
  if (directory.split('/').some(p => p.startsWith('.') || p === 'node_modules')) throw new Error('Use a dedicated non-hidden project asset directory');
  const installed = inspect(safePath(root, directory));
  version(installed.version);
  if (!installed.valid) throw new Error('Installation contains missing, modified or extra files; reconcile it before adoption');
  const config = { schemaVersion: 1, directory };
  write(path.join(root, LOCK), { ...config, version: installed.version, manifestSha256: installed.manifestSha256, source: 'adopted-local' }, true);
  try { write(path.join(root, CONFIG), config, true); }
  catch (error) { fs.unlinkSync(path.join(root, LOCK)); throw error; }
  return { action: 'initialized', directory, version: installed.version };
}
function status(cwd) {
  const p = project(cwd);
  const { installed, lock } = snapshot(p);
  return { action: 'status', directory: p.config.directory, version: installed.version, valid: true, source: lock.source, recoveryRequired: exists(path.join(p.state, 'transaction.json')) || exists(path.join(p.state, 'busy.json')) };
}
function acquire(p, recovering = false) {
  fs.mkdirSync(p.state, { recursive: true });
  const busy = safePath(p.root, '.sitekit/busy.json');
  if (recovering && exists(busy)) {
    const owner = read(busy);
    if (owner.host !== os.hostname() || !Number.isSafeInteger(owner.pid) || owner.pid < 1) throw new Error('Cannot prove prior updater stopped; inspect .sitekit/busy.json');
    try { process.kill(owner.pid, 0); throw new Error('An updater is still running'); }
    catch (error) { if (error.code !== 'ESRCH') throw error; }
    fs.unlinkSync(busy);
  }
  write(busy, { pid: process.pid, host: os.hostname() }, true);
  return () => fs.unlinkSync(busy);
}
function same(p, before) {
  safePath(p.root, p.config.directory);
  if (JSON.stringify(read(safePath(p.root, CONFIG))) !== JSON.stringify(p.config)) throw new Error('Configuration changed during operation');
  if (JSON.stringify(snapshot(p).lock) !== JSON.stringify(before.lock)) throw new Error('Installation changed during operation');
}
function paths(p, id) {
  if (!/^[a-f0-9-]{36}$/.test(id)) throw new Error('Invalid transaction identifier');
  const parent = path.posix.dirname(p.config.directory);
  const prefix = parent === '.' ? '' : parent + '/';
  return { stage: safePath(p.root, `${prefix}sitekit-stage-${id}`), backup: safePath(p.root, `${prefix}sitekit-backup-${id}`) };
}
function assertFingerprint(directory, expected) {
  const actual = inspect(directory);
  if (!actual.valid || actual.manifestSha256 !== expected) throw new Error(`Files changed; preserve and reconcile ${directory} before recovery`);
}
function commit(p, before, candidate, files, hook = () => {}) {
  const id = randomUUID(), { stage, backup } = paths(p, id);
  const journalPath = safePath(p.root, '.sitekit/transaction.json');
  const journal = { schemaVersion: 1, id, directory: p.config.directory, before: before.lock, after: candidate };
  write(journalPath, journal, true);
  // Every crash point remains recoverable; never remove the old asset directory.
  fs.mkdirSync(stage);
  for (const [name, data] of files) {
    const dest = safePath(stage, name);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, data, { flag: 'wx' });
  }
  assertFingerprint(stage, candidate.manifestSha256);
  hook('staged');
  same(p, before);
  fs.renameSync(p.target, backup);
  hook('backed-up');
  // Check again after the rename to catch edits racing the first check.
  assertFingerprint(backup, before.lock.manifestSha256);
  fs.renameSync(stage, p.target);
  hook('promoted');
  write(p.lock, candidate);
  hook('locked');
  const history = safePath(p.root, '.sitekit/history');
  fs.mkdirSync(history, { recursive: true });
  write(path.join(history, id + '.json'), journal, true);
  fs.unlinkSync(journalPath);
  return { backup: path.relative(p.root, backup), transaction: id };
}
async function upgrade(cwd, options = {}, releaseProvider = getRelease, hook) {
  const p = project(cwd), before = snapshot(p);
  if (exists(path.join(p.state, 'transaction.json'))) throw new Error('Interrupted transaction: run sitekit recover');
  const release = await releaseProvider(options.target);
  version(release.version);
  const a = before.installed.version.split('.').map(Number), b = release.version.split('.').map(Number);
  const comparison = b[0] - a[0] || b[1] - a[1] || b[2] - a[2];
  const result = { action: 'check', installed: before.installed.version, available: release.version, changes: release.manifestSha256 !== before.installed.manifestSha256, source: release.source };
  if (options.check) return result;
  if (comparison < 0 && !options.allowDowngrade) throw new Error('Downgrade requires --allow-downgrade');
  if (b[0] > a[0] && !options.allowMajor) throw new Error('Major upgrade requires --allow-major');
  if (!comparison && result.changes) throw new Error('Same version has different contents; refusing replacement');
  const releaseLock = { schemaVersion: 1, directory: p.config.directory, version: release.version, manifestSha256: release.manifestSha256, archiveSha256: release.archiveSha256, source: release.source };
  const unlock = acquire(p);
  try {
    if (exists(path.join(p.state, 'transaction.json'))) throw new Error('Interrupted transaction: run sitekit recover');
    same(p, before);
    if (!result.changes) return { ...result, action: 'unchanged' };
    return { ...result, action: 'upgraded', ...commit(p, before, releaseLock, release.files, hook) };
  } finally { unlock(); }
}
function recover(cwd) {
  const p = project(cwd), unlock = acquire(p, true);
  try {
    const file = safePath(p.root, '.sitekit/transaction.json');
    if (!exists(file)) return { action: 'recovered', message: 'No interrupted transaction; stale process lock cleared' };
    const journal = read(file);
    if (journal.schemaVersion !== 1 || journal.directory !== p.config.directory || journal.before.directory !== p.config.directory || journal.after.directory !== p.config.directory) throw new Error('Invalid recovery journal');
    const { stage, backup } = paths(p, journal.id);
    if (exists(backup)) {
      assertFingerprint(backup, journal.before.manifestSha256);
      if (exists(p.target)) {
        assertFingerprint(p.target, journal.after.manifestSha256);
        if (exists(stage)) throw new Error('Both candidate paths exist; manual reconciliation required');
        fs.renameSync(p.target, stage);
      }
      fs.renameSync(backup, p.target);
    } else { assertFingerprint(p.target, journal.before.manifestSha256); }
    write(p.lock, journal.before);
    // Keep any staged/partial candidate for inspection, never recursively delete it.
    fs.unlinkSync(file);
    return { action: 'recovered', version: journal.before.version, retainedCandidate: exists(stage) ? path.relative(p.root, stage) : null };
  } finally { unlock(); }
}
function rollback(cwd, id, hook) {
  const p = project(cwd), before = snapshot(p);
  const { backup } = paths(p, id);
  const receipt = read(safePath(p.root, `.sitekit/history/${id}.json`));
  if (receipt.id !== id || receipt.directory !== p.config.directory) throw new Error('Receipt does not match project');
  assertFingerprint(backup, receipt.before.manifestSha256);
  const installed = inspect(backup), files = new Map();
  for (const name of ['sitekit-manifest.json', ...Object.keys(installed.files)]) files.set(name, fs.readFileSync(path.join(backup, name)));
  const unlock = acquire(p);
  try {
    if (exists(path.join(p.state, 'transaction.json'))) throw new Error('Interrupted transaction: run sitekit recover');
    same(p, before);
    return { action: 'rolled-back', version: installed.version, ...commit(p, before, receipt.before, files, hook) };
  } finally { unlock(); }
}
module.exports = { init, status, upgrade, rollback, recover, project, safePath, exists };
