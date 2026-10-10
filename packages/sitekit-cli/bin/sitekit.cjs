#!/usr/bin/env node
'use strict';
const { parseArgs } = require('node:util');
const engine = require('../lib/project.cjs');
const kujo = require('../lib/kujo.cjs');
const help = `SiteKit CLI — Node 20+, no Kujo required

sitekit init [asset-directory]     Adopt a complete, unmodified installation
sitekit status                     Verify installed version and local integrity
sitekit upgrade [version] --check   Read-only release comparison
sitekit upgrade [version]           Upgrade to latest or exact stable version
sitekit rollback <transaction>      Restore a retained backup (ID from upgrade)
sitekit recover                    Recover an interrupted update
sitekit kujo install               Install optional project-local Kujo adapter

Options: --json, --help, --version
Upgrade options: --allow-downgrade, --allow-major
Existing HTML asset paths are preserved. Rebuild/test your website after upgrading.
`;
async function main(args = process.argv.slice(2), cwd = process.cwd()) {
  let values = {}, command = args[0] || 'help';
  try {
    const parsed = parseArgs({ args, allowPositionals: true, options: Object.fromEntries(['help', 'version', 'json', 'check', 'allow-downgrade', 'allow-major', 'kujo'].map(name => [name, { type: 'boolean' }])) });
    values = parsed.values;
    const [verb, param, ...rest] = parsed.positionals;
    command = verb || 'help';
    if (values.help || (!verb && !values.version)) { console.log(help); return; }
    if (values.version) { console.log(require('../package.json').version); return; }
    if (rest.length || (!['init', 'upgrade', 'rollback', 'kujo'].includes(command) && param)) throw new Error('Unexpected positional arguments; use --help');
    if (command !== 'upgrade' && (values.check || values['allow-downgrade'] || values['allow-major'])) throw new Error('Upgrade flags require the upgrade command');
    let result;
    if (command === 'init') result = engine.init(cwd, param);
    else if (command === 'status') result = engine.status(cwd);
    else if (command === 'upgrade') result = await engine.upgrade(cwd, { target: param, check: values.check, allowDowngrade: values['allow-downgrade'], allowMajor: values['allow-major'] });
    else if (command === 'rollback' && param) result = engine.rollback(cwd, param);
    else if (command === 'recover') result = engine.recover(cwd);
    else if (command === 'kujo' && param === 'install') result = kujo.install(cwd);
    else throw new Error('Unknown or incomplete command; use --help');
    if (values.kujo) console.log(JSON.stringify(kujo.report(command, result)));
    else if (values.json) console.log(JSON.stringify(result, null, 2));
    else console.log(Object.entries(result).map(([key, value]) => `${key}: ${typeof value === 'object' ? JSON.stringify(value) : value}`).join('\n'));
  } catch (error) {
    if (values.kujo || args.includes('--kujo')) console.log(JSON.stringify(kujo.report(command, null, error)));
    else if (values.json || args.includes('--json')) console.log(JSON.stringify({ error: error.message }));
    else console.error(`SiteKit: ${error.message}`);
    process.exitCode = 1;
  }
}
if (require.main === module) main();
module.exports = { main };
