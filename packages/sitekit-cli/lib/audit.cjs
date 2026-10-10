#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const hash = data => crypto.createHash('sha256').update(data).digest('hex');
function inspect(directory) {
  if (fs.lstatSync(directory).isSymbolicLink()) throw new Error('distribution root must not be a symlink');
  const root = fs.realpathSync(directory);
  const manifestPath = path.join(root, 'sitekit-manifest.json');
  if (fs.lstatSync(manifestPath).isSymbolicLink()) throw new Error('manifest must not be a symlink');
  const bytes = fs.readFileSync(manifestPath);
  const manifest = JSON.parse(bytes);
  if (manifest.product !== 'SiteKit' || manifest.distribution !== 'source-vendored' || manifest.schemaVersion !== 1 || !manifest.files || typeof manifest.files !== 'object' || Array.isArray(manifest.files) || !Object.keys(manifest.files).length) throw new Error('unsupported or empty distribution manifest');
  const missing = [], modified = [], extra = [];
  for (const [name, expected] of Object.entries(manifest.files)) {
    if (!name || name.includes(':') || name.includes('\\') || path.posix.isAbsolute(name) || name.split('/').some(part => !part || part === '..' || part === '.') || typeof expected !== 'string' || !/^[a-f0-9]{64}$/.test(expected)) throw new Error(`invalid manifest entry: ${name}`);
    let file = root;
    let absent = false;
    for (const part of name.split('/')) {
      file = path.join(file, part);
      if (!fs.existsSync(file)) { absent = true; break; }
      if (fs.lstatSync(file).isSymbolicLink()) throw new Error(`symlink is not a distribution asset: ${name}`);
    }
    if (absent) missing.push(name);
    else if (!fs.statSync(file).isFile() || hash(fs.readFileSync(file)) !== expected) modified.push(name);
  }
  function walk(dir, prefix = '') {
    for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
      const name = prefix + item.name;
      if (item.isSymbolicLink()) throw new Error(`symlink is not a distribution asset: ${name}`);
      if (item.isDirectory()) {
        if (!Object.keys(manifest.files).some(file => file.startsWith(name + '/'))) extra.push(name + '/');
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
