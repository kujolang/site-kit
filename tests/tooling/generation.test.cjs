const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const root = path.resolve(__dirname, '../..');

test('generation reads each source once, preserves bytes, and reloads between invocations', () => {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'sitekit-generation-'));
  try {
    for (const name of ['components', 'tokens', 'package.json']) fs.cpSync(path.join(root, name), path.join(temporary, name), { recursive: true });
    for (const name of ['scripts', 'docs/sitekit-gap-closure', 'examples/component-lab']) fs.mkdirSync(path.join(temporary, name), { recursive: true });
    fs.copyFileSync(path.join(root, 'scripts/generate-contracts'), path.join(temporary, 'scripts/generate-contracts'));
    fs.copyFileSync(path.join(root, 'scripts/sitekit-behavior.js'), path.join(temporary, 'scripts/sitekit-behavior.js'));
    const outputs = ['docs/sitekit-gap-closure/component-manifest.json', 'docs/sitekit-gap-closure/token-manifest.json', 'docs/sitekit-gap-closure/search-records.json', 'examples/component-lab/contracts.js'];
    const program = `
      const fs = require('node:fs');
      const assert = require('node:assert/strict');
      const { generate } = require('./scripts/generate-contracts');
      const original = fs.readFileSync;
      const reads = new Map();
      fs.readFileSync = function(file, ...args) {
        reads.set(String(file), (reads.get(String(file)) || 0) + 1);
        return original.call(this, file, ...args);
      };
      generate();
      assert.equal(Math.max(...reads.values()), 1, 'source read amplification returned');
      fs.readFileSync = original;
      const outputs = ${JSON.stringify(outputs)};
      for (const file of outputs) assert.deepEqual(fs.readFileSync(file), fs.readFileSync(${JSON.stringify(root)} + '/' + file), file);
      const pkg = JSON.parse(fs.readFileSync('package.json'));
      pkg.version = '1.0.1'; fs.writeFileSync('package.json', JSON.stringify(pkg));
      generate();
      const manifest = JSON.parse(fs.readFileSync(outputs[0]));
      assert.equal(manifest.libraryVersion, '1.0.1');
      assert(manifest.components.every(c => c.version === '1.0.1'));
      fs.writeFileSync('tokens/core.json', '{invalid');
      assert.throws(() => generate(), SyntaxError, 'later invalid input must not use stale cache');
    `;
    execFileSync(process.execPath, ['-e', program], { cwd: temporary, stdio: 'pipe' });
  } finally { fs.rmSync(temporary, { recursive: true, force: true }); }
});
