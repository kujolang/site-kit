'use strict';
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const read = file => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
function flatten(object, prefix = '', result = {}) {
  for (const [key, value] of Object.entries(object)) {
    if (key === '$schema') continue;
    const name = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object') {
      if ('value' in value) result[name] = value.value;
      else flatten(value, name, result);
    }
  }
  return result;
}
module.exports = function render(template) {
  const core = flatten(read('tokens/core.json'));
  const semantic = flatten(read('tokens/semantic.json'));
  const themes = Object.fromEntries(['kujo-light', 'kujo-dark'].map(theme => [theme, { ...core, ...semantic, ...flatten(read(`tokens/themes/${theme}.json`).tokens) }]));
  const resolve = (name, theme, seen = []) => {
    if (seen.includes(name)) throw new Error(`Circular token ${name}`);
    const value = themes[theme][name];
    if (value === undefined) throw new Error(`Unknown token ${name}`);
    return String(value).replace(/\{([^}]+)\}/g, (_, ref) => resolve(ref, theme, [...seen, name]));
  };
  const components = fs.readdirSync(path.join(root, 'components')).filter(name => fs.existsSync(path.join(root, 'components', name, `${name}.schema.json`))).map(name => read(`components/${name}/${name}.schema.json`));
  const rows = ['code.surface', 'text.primary', 'space.4', 'font.mono'].map(name => {
    const variable = `--sk-${name.replaceAll('.', '-')}`;
    const values = Object.keys(themes).map(theme => {
      const value = resolve(name, theme);
      const swatch = value.startsWith('#') ? `<span class="recipe-swatch" data-theme="${theme}" style="background:${escape(value)}" aria-hidden="true"></span> ` : '';
      return `<td>${swatch}<code>${escape(value)}</code></td>`;
    }).join('');
    const consumers = components.filter(c => c.tokenDependencies.includes(name)).map(c => c.name);
    return `<tr data-recipe-item data-search="${escape(name + ' ' + variable + ' ' + consumers.join(' '))}"><th scope="row">${escape(name)}</th><td><div class="recipe-copy" data-recipe-copy><code data-recipe-value>${variable}</code><button class="sk-button" type="button" hidden aria-label="Copy ${variable}">Copy</button><span role="status" data-recipe-status></span></div></td>${values}<td><details><summary>${consumers.length} direct consumers</summary><ul>${consumers.map(c => `<li>${escape(c)}</li>`).join('')}</ul></details></td></tr>`;
  }).join('\n');
  return template.replace('<!-- TOKEN_ROWS -->', rows);
};
