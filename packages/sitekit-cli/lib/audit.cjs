#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const hash = data => crypto.createHash('sha256').update(data).digest('hex');
function hashFile(file, buffer) {
  const fd = fs.openSync(file, 'r');
  try {
    const digest = crypto.createHash('sha256');
    let count;
    while ((count = fs.readSync(fd, buffer, 0, buffer.length, null))) {
      digest.update(buffer.subarray(0, count));
    }
    return digest.digest('hex');
  } finally { fs.closeSync(fd); }
}
function inspect(directory) {
  if (fs.lstatSync(directory).isSymbolicLink()) throw new Error('distribution root must not be a symlink');
  const root = fs.realpathSync(directory);
  const manifestPath = path.join(root, 'sitekit-manifest.json');
  const manifestInfo = fs.lstatSync(manifestPath);
  if (!manifestInfo.isFile() || manifestInfo.size > 4 * 1024 * 1024) throw new Error('manifest must be a regular file of at most 4 MiB');
  const bytes = fs.readFileSync(manifestPath);
  const manifest = JSON.parse(bytes);
  if (manifest?.product !== 'SiteKit' || manifest.distribution !== 'source-vendored' || manifest.schemaVersion !== 1 || !manifest.files || typeof manifest.files !== 'object' || Array.isArray(manifest.files) || !Object.keys(manifest.files).length) throw new Error('unsupported or empty distribution manifest');
  const missing = [], modified = [], extra = [];
  const directories = new Set(), buffer = Buffer.allocUnsafe(64 * 1024);
  for (const [name, expected] of Object.entries(manifest.files)) {
    if (!name || name.includes(':') || name.includes('\\') || path.posix.isAbsolute(name) || name.split('/').some(part => !part || part === '..' || part === '.') || typeof expected !== 'string' || !/^[a-f0-9]{64}$/.test(expected)) throw new Error(`invalid manifest entry: ${name}`);
    let file = root;
    let info;
    const parts = name.split('/');
    for (const [index, part] of parts.entries()) {
      if (index > 0) directories.add(parts.slice(0, index).join('/'));
      file = path.join(file, part);
      info = fs.lstatSync(file, { throwIfNoEntry: false });
      if (!info) break;
      if (info.isSymbolicLink()) throw new Error(`symlink is not a distribution asset: ${name}`);
      if (index < parts.length - 1 && !info.isDirectory()) { info = undefined; break; }
    }
    if (!info) missing.push(name);
    else if (!info.isFile() || hashFile(file, buffer) !== expected) modified.push(name);
  }
  function walk(dir, prefix = '') {
    for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
      const name = prefix + item.name;
      if (item.isSymbolicLink()) throw new Error(`symlink is not a distribution asset: ${name}`);
      if (item.isDirectory()) {
        if (!directories.has(name)) extra.push(name + '/');
        walk(path.join(dir, item.name), name + '/');
      }
      else if (name !== 'sitekit-manifest.json' && !Object.hasOwn(manifest.files, name)) extra.push(name);
    }
  }
  walk(root);
  return { directory: root, version: manifest.version, manifestSha256: hash(bytes), valid: !missing.length && !modified.length && !extra.length, missing, modified, extra, files: manifest.files };
}
function audit(installed, candidate) {
  const current = inspect(installed);
  const result = { installed: current };
  if (candidate) {
    const next = inspect(candidate);
    result.candidate = next;
    result.changes = {
      added: Object.keys(next.files).filter(name => !Object.hasOwn(current.files, name)),
      removed: Object.keys(current.files).filter(name => !Object.hasOwn(next.files, name)),
      changed: Object.keys(next.files).filter(name => Object.hasOwn(current.files, name) && next.files[name] !== current.files[name])
    };
  }
  return result;
}
module.exports = { audit, inspect };
