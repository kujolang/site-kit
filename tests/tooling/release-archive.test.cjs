const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const crypto = require('node:crypto');
const { execFileSync, spawnSync } = require('node:child_process');
const root = path.resolve(__dirname, '../..');

test('release hashes the exact payload buffers, reads once, and fails before publishing incomplete input', () => {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'sitekit-archive-'));
  try {
    for (const name of ['dist', 'LICENSE', 'package.json']) fs.cpSync(path.join(root, name), path.join(temporary, name), { recursive: true });
    fs.mkdirSync(path.join(temporary, 'scripts'));
    fs.copyFileSync(path.join(root, 'scripts/release-archive'), path.join(temporary, 'scripts/release-archive'));
    execFileSync(process.execPath, ['-e', `
      const fs = require('node:fs'), path = require('node:path'), assert = require('node:assert/strict');
      const original = fs.readFileSync, reads = new Map();
      fs.readFileSync = function(file, ...args) {
        const relative = path.relative(process.cwd(), String(file));
        if (relative === 'LICENSE' || relative.startsWith('dist' + path.sep)) {
          reads.set(relative, (reads.get(relative) || 0) + 1);
          assert.equal(reads.get(relative), 1, 'release payload must be read only once: ' + relative);
        }
        return original.call(this, file, ...args);
      };
      require('./scripts/release-archive');
      assert.equal(reads.size, 12);
    `], { cwd: temporary, stdio: 'pipe' });
    const version = JSON.parse(fs.readFileSync(path.join(temporary, 'package.json'))).version;
    const prefix = `sitekit-v${version}`, archive = path.join(temporary, 'artifacts/release', `${prefix}.tar.gz`);
    const before = fs.readFileSync(archive), checksum = fs.readFileSync(`${archive}.sha256`);
    execFileSync('tar', ['-xzf', archive, '-C', temporary]);
    const extracted = path.join(temporary, prefix);
    const manifest = JSON.parse(fs.readFileSync(path.join(extracted, 'release-manifest.json')));
    assert.equal(Object.keys(manifest.files).length, 12);
    for (const [file, expected] of Object.entries(manifest.files)) {
      const data = fs.readFileSync(path.join(extracted, file));
      assert.equal(crypto.createHash('sha256').update(data).digest('hex'), expected, file);
      assert.deepEqual(data, fs.readFileSync(path.join(temporary, file)), file);
    }
    fs.unlinkSync(path.join(temporary, 'dist/sitekit.js'));
    const failure = spawnSync(process.execPath, ['scripts/release-archive'], { cwd: temporary, encoding: 'utf8' });
    assert.notEqual(failure.status, 0);
    assert.match(failure.stderr, /release payload missing: dist\/sitekit.js; run npm run build/);
    assert.deepEqual(fs.readFileSync(archive), before, 'missing input must not overwrite a good archive');
    assert.deepEqual(fs.readFileSync(`${archive}.sha256`), checksum);
  } finally { fs.rmSync(temporary, { recursive: true, force: true }); }
});
