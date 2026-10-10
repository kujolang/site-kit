'use strict';
const crypto = require('node:crypto');
const zlib = require('node:zlib');
const hash = data => crypto.createHash('sha256').update(data).digest('hex');
function version(input) {
  const v = String(input).replace(/^v/, '');
  if (!/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.test(v) || v.split('.').some(n => !Number.isSafeInteger(Number(n)))) throw new Error('Use an exact stable version, e.g. 1.1.0');
  return v;
}
function safeName(name) {
  return typeof name === 'string' && name.length > 0 && !/[\\:\x00-\x1f]/.test(name) && name.split('/').every(p => p && p !== '.' && p !== '..' && !/[. ]$/.test(p) && !/^(con|prn|aux|nul|com[1-9]|lpt[1-9])(\.|$)/i.test(p));
}
// Deliberately accepts only SiteKit's regular-file ustar release format.
// No filesystem writes occur until the entire archive and both manifests pass.
function unpack(archive, expectedVersion) {
  const bytes = zlib.gunzipSync(archive, { maxOutputLength: 64 * 1024 * 1024 });
  const files = new Map(), folded = new Set();
  let offset = 0, ended = false;
  while (offset + 512 <= bytes.length) {
    const block = bytes.subarray(offset, offset + 512);
    if (block.every(b => b === 0)) {
      if (bytes.length - offset < 1024 || !bytes.subarray(offset).every(b => b === 0)) throw new Error('Invalid tar terminator');
      ended = true; break;
    }
    const field = (start, size) => block.subarray(start, start + size).toString('utf8').replace(/\0.*$/s, '');
    const octal = (start, size) => {
      const value = field(start, size).trim();
      if (!/^[0-7]+$/.test(value)) throw new Error('Invalid tar number');
      return parseInt(value, 8);
    };
    const checksum = block.reduce((sum, byte, index) => sum + (index >= 148 && index < 156 ? 32 : byte), 0);
    if (octal(148, 8) !== checksum || field(257, 6) !== 'ustar' || field(345, 155) || ![0, 48].includes(block[156])) throw new Error('Unsupported or corrupt tar header');
    const name = field(0, 100), prefix = `sitekit-v${expectedVersion}/`;
    if (!safeName(name) || !name.startsWith(prefix)) throw new Error('Unsafe archive path');
    const relative = name.slice(prefix.length), key = relative.toLowerCase();
    if (folded.has(key) || [...folded].some(n => n.startsWith(key + '/') || key.startsWith(n + '/'))) throw new Error('Duplicate or conflicting archive path');
    folded.add(key);
    const size = octal(124, 12);
    offset += 512;
    if (size > bytes.length - offset) throw new Error('Truncated tar entry');
    files.set(relative, bytes.subarray(offset, offset + size));
    offset += Math.ceil(size / 512) * 512;
    if (files.size > 10000) throw new Error('Too many archive entries');
  }
  if (!ended) throw new Error('Truncated tar archive');
  const readManifest = name => {
    const m = JSON.parse(files.get(name)?.toString() || 'null');
    if (!m || m.schemaVersion !== 1 || m.product !== 'SiteKit' || m.distribution !== 'source-vendored' || m.version !== expectedVersion || !m.files || Array.isArray(m.files) || typeof m.files !== 'object') throw new Error(`Invalid ${name}`);
    return m;
  };
  const release = readManifest('release-manifest.json');
  if (Object.keys(release.files).length !== files.size - 1) throw new Error('Incomplete release manifest');
  for (const [name, digest] of Object.entries(release.files)) {
    if (!safeName(name) || name === 'release-manifest.json' || !files.has(name) || hash(files.get(name)) !== digest) throw new Error(`Release hash mismatch: ${name}`);
  }
  const dist = readManifest('dist/sitekit-manifest.json');
  if (!Object.keys(dist.files).length || !dist.files['sitekit.css'] || !dist.files['sitekit.js']) throw new Error('Incomplete distribution');
  for (const [name, digest] of Object.entries(dist.files)) {
    if (!safeName(name) || !files.has('dist/' + name) || hash(files.get('dist/' + name)) !== digest) throw new Error(`Distribution hash mismatch: ${name}`);
  }
  for (const name of files.keys()) {
    if (name.startsWith('dist/') && name !== 'dist/sitekit-manifest.json' && !Object.hasOwn(dist.files, name.slice(5))) throw new Error('Unlisted distribution file');
    if (!name.startsWith('dist/') && !['LICENSE', 'release-manifest.json'].includes(name)) throw new Error('Unexpected release payload');
  }
  return { version: expectedVersion, archiveSha256: hash(archive), manifestSha256: hash(files.get('dist/sitekit-manifest.json')), files: new Map([...files].filter(([n]) => n.startsWith('dist/')).map(([n, b]) => [n.slice(5), b])) };
}
async function download(url, limit, signal, fetcher = fetch) {
  const response = await fetcher(url, { signal, headers: { 'User-Agent': 'sitekit-cli', Accept: 'application/vnd.github+json' } });
  if (!response.ok) throw new Error(`Download failed (${response.status}): ${url}`);
  if (Number(response.headers.get('content-length')) > limit) throw new Error('Download exceeds size limit');
  const chunks = []; let size = 0;
  for await (const chunk of response.body) {
    size += chunk.length;
    if (size > limit) throw new Error('Download exceeds size limit');
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}
async function getRelease(target, fetcher = fetch) {
  const signal = AbortSignal.timeout(15000);
  const selector = target ? `tags/v${version(target)}` : 'latest';
  const release = JSON.parse(await download(`https://api.github.com/repos/kujolang/site-kit/releases/${selector}`, 2 * 1024 * 1024, signal, fetcher));
  const v = version(release.tag_name);
  if (release.draft || release.prerelease || (target && v !== version(target))) throw new Error('Expected a published stable release');
  const name = `sitekit-v${v}.tar.gz`;
  const base = `https://github.com/kujolang/site-kit/releases/download/v${v}/`;
  for (const asset of [name, name + '.sha256']) {
    if (!release.assets?.some(a => a.name === asset && a.browser_download_url === base + asset)) throw new Error(`Release asset missing: ${asset}`);
  }
  const [archive, sum] = await Promise.all([download(base + name, 16 * 1024 * 1024, signal, fetcher), download(base + name + '.sha256', 4096, signal, fetcher)]);
  if (sum.toString().trim() !== `${hash(archive)}  ${name}`) throw new Error('Archive checksum mismatch');
  return { ...unpack(archive, v), source: base + name };
}
module.exports = { hash, version, safeName, unpack, download, getRelease };
