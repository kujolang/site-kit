const fs = require('node:fs');
const path = require('node:path');
const { performance } = require('node:perf_hooks');
const root = process.cwd();
const original = fs.readFileSync;
const reads = new Map();
let bytes = 0;
fs.readFileSync = function(file, ...args) {
  const data = original.call(this, file, ...args);
  const relative = path.relative(root, String(file));
  if (!relative.startsWith('..') && !relative.startsWith('node_modules/') && !relative.startsWith('scripts/')) {
    reads.set(relative, (reads.get(relative) || 0) + 1);
    bytes += Buffer.byteLength(data);
  }
  return data;
};
const start = performance.now();
require('../../scripts/generate-contracts').generate();
console.log(JSON.stringify({milliseconds:performance.now()-start,reads:[...reads.values()].reduce((a,b)=>a+b,0),uniqueFiles:reads.size,bytes,maxReads:Math.max(...reads.values()),maxRSS:process.resourceUsage().maxRSS}));
