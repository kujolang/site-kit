import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const excluded = new Set(['.git', '.lens', '.workcell', 'artifacts', 'node_modules', 'playwright-report', 'test-results']);

function walk(directory = root) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (excluded.has(entry.name)) return [];
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) return walk(absolute);
    return entry.isFile() && entry.name.endsWith('.md') ? [path.relative(root, absolute)] : [];
  });
}

function markdownFiles() {
  try {
    return execFileSync('git', ['ls-files', '*.md'], { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })
      .trim()
      .split('\n')
      .filter(Boolean);
  } catch {
    return walk().sort();
  }
}

const markdown = markdownFiles();
const broken = [];

for (const file of markdown) {
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  for (const match of source.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g)) {
    let target = match[1].trim().replace(/^<|>$/g, '').split(/\s+["']/)[0];
    if (!target || target.startsWith('#') || /^(https?:|mailto:|tel:|data:)/i.test(target)) continue;
    target = decodeURIComponent(target.split('#')[0].split('?')[0]);
    const absolute = target.startsWith('/') ? path.join(root, target) : path.resolve(root, path.dirname(file), target);
    if (!fs.existsSync(absolute)) broken.push(`${file}: ${match[1]}`);
  }
}

assert.deepEqual(broken, [], `broken local Markdown links:\n${broken.join('\n')}`);
console.log(`Markdown link audit passed: ${markdown.length} files, zero broken local links`);
