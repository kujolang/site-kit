// Count payload I/O independently of timings and module loading.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '../..');
const original = fs.readFileSync;
const reads = new Map();
let bytes = 0;
fs.readFileSync = function (file, ...args) {
  const data = original.call(this, file, ...args);
  const relative = path.relative(root, String(file));
  if (relative === 'LICENSE' || relative.startsWith('dist' + path.sep)) {
    reads.set(relative, (reads.get(relative) || 0) + 1);
    bytes += Buffer.byteLength(data);
  }
  return data;
};
try { require('../../scripts/release-archive'); } finally { fs.readFileSync = original; }
const version = require('../../package.json').version;
const archive = fs.readFileSync(path.join(root, 'artifacts/release', `sitekit-v${version}.tar.gz`));
console.log(JSON.stringify({ reads: [...reads.values()].reduce((a, b) => a + b, 0), uniqueFiles: reads.size, maxReads: Math.max(...reads.values()), bytes, archiveBytes: archive.length, sha256: crypto.createHash('sha256').update(archive).digest('hex') }));
