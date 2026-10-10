'use strict';
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { execFileSync } = require('node:child_process');
const assert = require('node:assert/strict');
const repo = path.resolve(__dirname, '../../..');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'sitekit-package-'));
// npm's .cmd shim needs a shell on Windows; arguments here are fixed or OS-generated paths.
function npm(args, cwd) { return execFileSync(process.platform === 'win32' ? 'npm.cmd' : 'npm', args, { cwd, encoding: 'utf8', shell: process.platform === 'win32' }); }
try {
  const packed = JSON.parse(npm(['pack', './packages/sitekit-cli', '--pack-destination', tmp, '--json'], repo))[0];
  assert.ok(packed.files.some(f => f.path === 'bin/sitekit.cjs'));
  assert.ok(!packed.files.some(f => f.path.startsWith('test/') || f.path.startsWith('dist/')));
  fs.writeFileSync(path.join(tmp, 'package.json'), '{"private":true}');
  npm(['install', '--ignore-scripts', '--no-audit', '--no-fund', '--save-dev', path.join(tmp, packed.filename)], tmp);
  const cli = path.join(tmp, 'node_modules/@kujolang/sitekit-cli/bin/sitekit.cjs');
  const expected = require('../package.json').version;
  assert.equal(execFileSync(process.execPath, [cli, '--version'], { encoding: 'utf8' }).trim(), expected);
  const bin = path.join(tmp, 'node_modules/.bin', process.platform === 'win32' ? 'sitekit.cmd' : 'sitekit');
  assert.equal(execFileSync(bin, ['--version'], { cwd: tmp, encoding: 'utf8', shell: process.platform === 'win32' }).trim(), expected);
  fs.cpSync(path.join(repo, 'dist'), path.join(tmp, 'public/sitekit'), { recursive: true });
  execFileSync(process.execPath, [cli, 'init', 'public/sitekit'], { cwd: tmp });
  assert.equal(JSON.parse(execFileSync(process.execPath, [cli, 'status', '--json'], { cwd: tmp })).valid, true);
  console.log('Packed npm installation, executable shim, adoption and status passed');
} finally { fs.rmSync(tmp, { recursive: true, force: true }); }
