const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync, execFileSync } = require('node:child_process');
const root = path.resolve(__dirname, '../..');

test('generated check catches untracked, staged, modified and nondeterministic output', () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'sitekit-drift-'));
  const git = (...args) => execFileSync('git', args, { cwd: directory, stdio: 'pipe' });
  const check = () => spawnSync(process.execPath, ['scripts/check-generated'], { cwd: directory, encoding: 'utf8' });
  try {
    fs.mkdirSync(path.join(directory, 'scripts')); fs.mkdirSync(path.join(directory, 'dist'));
    fs.copyFileSync(path.join(root, 'scripts/check-generated'), path.join(directory, 'scripts/check-generated'));
    fs.writeFileSync(path.join(directory, 'scripts/build'), "require('node:fs').writeFileSync('dist/bundle.css', 'stable');\n");
    fs.writeFileSync(path.join(directory, 'scripts/snapshot-components'), '// fixture has no snapshot\n');
    fs.writeFileSync(path.join(directory, 'dist/bundle.css'), 'stable');
    fs.writeFileSync(path.join(directory, '.gitignore'), 'dist/*.tmp\n');
    git('init', '-q'); git('add', '.'); git('-c', 'user.name=SiteKit Test', '-c', 'user.email=test@example.invalid', 'commit', '-qm', 'baseline');
    assert.equal(check().status, 0);
    fs.writeFileSync(path.join(directory, 'unrelated.txt'), 'unrelated');
    assert.equal(check().status, 0, 'unrelated changes are not generated drift');
    fs.writeFileSync(path.join(directory, 'dist/ignored.tmp'), 'ignored');
    assert.notEqual(check().status, 0, 'ignored generated files must not evade drift detection');
    fs.unlinkSync(path.join(directory, 'dist/ignored.tmp'));
    fs.writeFileSync(path.join(directory, 'dist/new.css'), 'new');
    let result = check(); assert.notEqual(result.status, 0); assert.match(result.stderr, /dist\/new\.css/);
    git('add', 'dist/new.css'); result = check(); assert.notEqual(result.status, 0); assert.match(result.stderr, /dist\/new\.css/);
    git('reset', '-q', 'HEAD', '--', 'dist/new.css'); fs.unlinkSync(path.join(directory, 'dist/new.css'));
    fs.writeFileSync(path.join(directory, 'scripts/build'), "require('node:fs').writeFileSync('dist/bundle.css', 'changed');\n");
    result = check(); assert.notEqual(result.status, 0); assert.match(result.stderr, /dist\/bundle\.css/);
    fs.writeFileSync(path.join(directory, 'scripts/build'), "const fs=require('node:fs'); fs.appendFileSync('dist/bundle.css', 'x');\n");
    result = check(); assert.notEqual(result.status, 0); assert.match(result.stderr, /generation is not deterministic/);
    fs.writeFileSync(path.join(directory, 'scripts/build'), 'process.exit(7);\n');
    assert.notEqual(check().status, 0, 'failed generator must propagate failure');
  } finally { fs.rmSync(directory, { recursive: true, force: true }); }
});
