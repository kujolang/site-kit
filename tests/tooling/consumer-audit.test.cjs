const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { audit } = require('../../scripts/consumer-audit');
test('consumer audit detects incomplete, modified and mixed distributions without writing', () => {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'sitekit-consumer-'));
  try {
    const current = path.join(temporary, 'current'), next = path.join(temporary, 'next');
    fs.cpSync(path.resolve(__dirname, '../../dist'), current, { recursive: true });
    fs.cpSync(current, next, { recursive: true });
    assert.equal(audit(current, next).installed.valid, true);
    assert.deepEqual(audit(current, next).changes, { added: [], removed: [], changed: [] });
    const manifest = fs.readFileSync(path.join(current, 'sitekit-manifest.json'));
    fs.appendFileSync(path.join(current, 'sitekit.css'), 'changed');
    fs.unlinkSync(path.join(current, 'fonts/DepartureMono-Regular.woff2'));
    fs.writeFileSync(path.join(current, 'stale.css'), 'stale');
    const result = audit(current, next);
    assert.equal(result.installed.valid, false);
    assert.deepEqual(result.installed.modified, ['sitekit.css']);
    assert.deepEqual(result.installed.missing, ['fonts/DepartureMono-Regular.woff2']);
    assert.deepEqual(result.installed.extra, ['stale.css']);
    assert.deepEqual(fs.readFileSync(path.join(current, 'sitekit-manifest.json')), manifest);
    const invalid = JSON.parse(manifest);
    invalid.files['../outside'] = 'a'.repeat(64);
    fs.writeFileSync(path.join(current, 'sitekit-manifest.json'), JSON.stringify(invalid));
    assert.throws(() => audit(current), /invalid manifest entry/);
  } finally { fs.rmSync(temporary, { recursive: true, force: true }); }
});

test('consumer comparison reports changed, added and removed files and rejects linked assets', () => {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'sitekit-compare-'));
  try {
    const current = path.join(temporary, 'current'), next = path.join(temporary, 'next');
    fs.cpSync(path.resolve(__dirname, '../../dist'), current, { recursive: true });
    fs.cpSync(current, next, { recursive: true });
    const manifestPath = path.join(next, 'sitekit-manifest.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath));
    fs.renameSync(path.join(next, 'README.md'), path.join(next, 'NEW.md'));
    manifest.files['NEW.md'] = manifest.files['README.md'];
    delete manifest.files['README.md'];
    fs.appendFileSync(path.join(next, 'sitekit.css'), '\n/* candidate */\n');
    manifest.files['sitekit.css'] = require('node:crypto').createHash('sha256').update(fs.readFileSync(path.join(next, 'sitekit.css'))).digest('hex');
    fs.writeFileSync(manifestPath, JSON.stringify(manifest));
    const report = audit(current, next);
    assert.equal(report.candidate.valid, true);
    assert.deepEqual(report.changes, { added: ['NEW.md'], removed: ['README.md'], changed: ['sitekit.css'] });
    fs.unlinkSync(path.join(next, 'sitekit.css'));
    fs.symlinkSync(path.join(current, 'sitekit.css'), path.join(next, 'sitekit.css'));
    assert.throws(() => audit(next), /symlink is not a distribution asset/);
    const result = require('node:child_process').spawnSync(process.execPath, [path.resolve(__dirname, '../../scripts/consumer-audit'), next], { encoding: 'utf8' });
    assert.equal(result.status, 1);
    assert.match(result.stderr, /symlink/);
  } finally { fs.rmSync(temporary, { recursive: true, force: true }); }
});
