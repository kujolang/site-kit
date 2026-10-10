'use strict';
const fs = require('node:fs');
const path = require('node:path');
const { safePath, exists } = require('./project.cjs');
function install(cwd) {
  const root = fs.realpathSync(cwd), dest = safePath(root, '.kujo/packs/sitekit');
  if (exists(dest)) throw new Error('Kujo SiteKit pack already exists; remove or relocate it before reinstalling');
  fs.mkdirSync(dest, { recursive: true });
  const source = path.resolve(__dirname, '..');
  fs.mkdirSync(path.join(dest, 'cli'));
  for (const name of ['lib', 'bin', 'package.json', 'LICENSE']) fs.cpSync(path.join(source, name), path.join(dest, 'cli', name), { recursive: true, errorOnExist: true, force: false });
  let manifest = 'id: sitekit-cli-extension\nnamespace: sitekit\nname: SiteKit\nversion: 0.1.0\ndescription: Optional standalone SiteKit CLI adapter\ncommands:\n';
  for (const command of ['init', 'status', 'upgrade', 'rollback', 'recover']) {
    manifest += `  - name: ${command}\n    summary: SiteKit ${command}\n    entry: ${command}.kujo\n    safe: ${command === 'status'}\n    writes_files: ${command !== 'status'}\n    runs_processes: true\n    requires_network: ${command === 'upgrade'}\n`;
    const script = `argv := ["node", ".kujo/packs/sitekit/cli/bin/sitekit.cjs", "${command}", "--kujo"]\nincoming := args()\nif len(incoming) == 2 && incoming[1] == "--" { incoming = [] }\nfor arg in incoming { argv = push(argv, arg) }\nlet result := spawn_process(argv, {"timeout_ms": 25000})\nif result.timed_out || result.stdout_truncated || trim(result.stdout) == "" {\n    print(to_json(${JSON.stringify(report(command, null, new Error("SiteKit subprocess failed or timed out; run sitekit status/recover directly")))}))\n} else { print(result.stdout) }\n`;
    fs.writeFileSync(path.join(dest, command + '.kujo'), script, { flag: 'wx' });
  }
  fs.writeFileSync(path.join(dest, 'kujo-pack.yaml'), manifest, { flag: 'wx' });
  return { action: 'kujo-installed', directory: '.kujo/packs/sitekit', message: 'Run kujo sitekit status from this project root. Node and Kujo with spawn_process support are required.' };
}
function report(command, result, error) {
  const status = error ? 'fail' : 'pass';
  return { pack: 'sitekit-cli-extension', namespace: 'sitekit', command, status, summary: { pass: error ? 0 : 1, warn: 0, fail: error ? 1 : 0, skip: 0, info: 0 }, checks: [{ id: `sitekit.${command}`, label: `SiteKit ${command}`, status, severity: error ? 'high' : 'info', observed: error ? undefined : JSON.stringify(result), message: error?.message }] };
}
module.exports = { install, report };
