const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.resolve(__dirname, '..');
const read = (file) => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const text = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const packageInfo = read('package.json');
const hash = (content) => crypto.createHash('sha256').update(content).digest('hex');
const kebab = (value) => String(value).replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/_/g, '-').toLowerCase();
const flat = (object, prefix = []) => Object.entries(object).flatMap(([key, value]) => {
  if (key === '$schema' || key === 'name' || key === 'description') return [];
  if (value && typeof value === 'object' && 'value' in value) return [[prefix.concat(key).map(kebab).join('-'), String(value.value)]];
  return value && typeof value === 'object' ? flat(value, prefix.concat(key)) : [];
});
const resolve = (value) => String(value).replace(/\{([^}]+)\}/g, (_, key) => `var(--sk-${key.split('.').map(kebab).join('-')})`);

function generateCss() {
  const lines = ['@layer tokens {', '  :root {'];
  for (const [key, value] of flat(read('tokens/core.json'))) lines.push(`    --sk-${key}: ${value};`);
  for (const [key, value] of flat(read('tokens/semantic.json'))) lines.push(`    --sk-${key}: ${resolve(value)};`);
  lines.push('  }', '}');
  fs.writeFileSync(path.join(root, 'css/generated/tokens.css'), `${lines.join('\n')}\n`);

  const themes = ['@layer tokens {'];
  for (const file of fs.readdirSync(path.join(root, 'tokens/themes')).filter((name) => name.endsWith('.json')).sort()) {
    const theme = read(`tokens/themes/${file}`);
    themes.push(`  [data-theme="${theme.name}"] {`);
    for (const [key, value] of flat(theme.tokens)) themes.push(`    --sk-${key}: ${resolve(value)};`);
    themes.push('  }');
  }
  themes.push('}');
  fs.writeFileSync(path.join(root, 'css/generated/themes.css'), `${themes.join('\n')}\n`);

  const components = fs.readdirSync(path.join(root, 'components'))
    .filter((name) => fs.existsSync(path.join(root, 'components', name, `${name}.css`)))
    .sort()
    .map((name) => text(`components/${name}/${name}.css`).trim())
    .join('\n\n');
  fs.writeFileSync(path.join(root, 'css/generated/components.css'), `${components}\n`);
  console.log('generated css');
}

function generateDistribution() {
  const dist = path.join(root, 'dist');
  const fonts = path.join(dist, 'fonts');
  fs.rmSync(dist, { recursive: true, force: true });
  fs.mkdirSync(fonts, { recursive: true });
  const base = text('css/base.css').replace(/\.\.\/fonts\//g, './fonts/');
  const bundle = [
    text('css/reset.css'),
    text('css/generated/tokens.css'),
    text('css/generated/themes.css'),
    base,
    text('css/generated/components.css'),
    text('css/utilities.css'),
  ].map((contents) => contents.trim()).join('\n\n');
  fs.writeFileSync(path.join(dist, 'sitekit.css'), `${bundle}\n`);
  fs.copyFileSync(path.join(root, 'scripts/sitekit-behavior.js'), path.join(dist, 'sitekit.js'));
  for (const file of ['DepartureMono-Regular.woff', 'DepartureMono-Regular.woff2', 'DepartureMono-LICENSE.txt']) {
    fs.copyFileSync(path.join(root, 'fonts', file), path.join(fonts, file));
  }
  fs.copyFileSync(path.join(root, 'LICENSE'), path.join(dist, 'LICENSE'));
  fs.writeFileSync(path.join(dist, 'README.md'), `# SiteKit ${packageInfo.version} distribution

This directory is the supported SiteKit v1 source-vendored artifact. Copy it as a unit, load \`sitekit.css\`, and optionally load \`sitekit.js\` for progressive behavior. Keep \`fonts/\` beside the CSS file because the relative font URLs are part of the contract.

The bundle order is reset, tokens, themes, base, components, and utilities. \`LICENSE\` covers SiteKit; \`fonts/DepartureMono-LICENSE.txt\` covers the bundled Departure Mono assets. npm publication is not part of SiteKit v1.
`);
  const files = ['LICENSE', 'README.md', 'sitekit.css', 'sitekit.js', 'fonts/DepartureMono-LICENSE.txt', 'fonts/DepartureMono-Regular.woff', 'fonts/DepartureMono-Regular.woff2'];
  const manifest = {
    schemaVersion: 1,
    product: 'SiteKit',
    version: packageInfo.version,
    distribution: 'source-vendored',
    entrypoints: {
      css: 'sitekit.css',
      javascript: 'sitekit.js',
      fonts: 'fonts/',
    },
    files: Object.fromEntries(files.map((file) => [file, hash(fs.readFileSync(path.join(dist, file)))])),
  };
  fs.writeFileSync(path.join(dist, 'sitekit-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
  console.log('generated dist/sitekit.css and dist/sitekit.js');
}

function generateComponentIndex() {
  const categories = {
    Foundations: ['heading', 'icon', 'link', 'separator', 'skip-link', 'visually-hidden'],
    Actions: ['button', 'dropdown-menu', 'pagination', 'segmented-control'],
    Forms: ['checkbox', 'color-picker', 'combobox', 'date-input', 'date-picker', 'fieldset', 'file', 'file-upload', 'form', 'form-field', 'label', 'radio-button', 'rich-text-editor', 'search-input', 'select', 'slider', 'stepper', 'text-input', 'textarea', 'toggle'],
    Navigation: ['breadcrumbs', 'header', 'navigation', 'tabs', 'tree-view'],
    Overlays: ['drawer', 'modal', 'popover', 'tooltip'],
    Feedback: ['accordion', 'alert', 'empty-state', 'error-state', 'progress-bar', 'progress-indicator', 'skeleton', 'spinner', 'toast'],
    'Data Display': ['avatar', 'badge', 'carousel', 'code-block', 'command-strip', 'ecosystem-map', 'image', 'list', 'metadata-panel', 'rating', 'roadmap', 'stats-bar', 'table', 'video'],
    Commerce: ['checkout-summary', 'pricing-table', 'product-card', 'product-grid', 'product-showcase', 'promo-banner', 'trust-strip'],
    Content: ['bento-grid', 'card', 'content-section', 'cta', 'feature-grid', 'footer', 'hero', 'newsletter-signup', 'partners-strip', 'quote', 'recent-posts', 'resource-links', 'stack', 'team-grid', 'testimonial-rail'],
    Tools: ['generator-panel'],
  };
  const allComponents = fs.readdirSync(path.join(root, 'components')).filter((name) => fs.existsSync(path.join(root, 'components', name, `${name}.schema.json`))).sort();
  const categorized = Object.values(categories).flat();
  const missing = allComponents.filter((name) => !categorized.includes(name));
  const duplicates = categorized.filter((name, index) => categorized.indexOf(name) !== index);
  if (missing.length || duplicates.length) throw new Error(`component index categories invalid; missing: ${missing.join(', ') || 'none'}; duplicates: ${duplicates.join(', ') || 'none'}`);
  const lines = [
    '# SiteKit component index', '',
    `Generated from all ${allComponents.length} component schemas by \`npm run build\` for SiteKit ${packageInfo.version}. Use this index to choose an existing contract before creating a new pattern.`, '',
    '## Selection guidance', '',
    'Use a component when its semantics and behavior match the content. Do not use a component when a native element is clearer, when the surface is only decorative, or when the required keyboard/focus contract cannot be provided. Every component folder contains the schema, template, CSS, docs, and examples.', '',
  ];
  for (const [category, names] of Object.entries(categories)) {
    lines.push(`## ${category}`, '');
    for (const name of names) {
      const file = path.join(root, 'components', name, `${name}.schema.json`);
      if (fs.existsSync(file)) {
        const schema = read(`components/${name}/${name}.schema.json`);
        lines.push(`- **${schema.name}** (\`components/${name}\`): ${schema.description}`);
      }
    }
    lines.push('');
  }
  lines.push(
    '## Behavior-enabled composition', '',
    '- Dropdown Menu + Icon + Button: use a real button with an accessible label; the optional `sitekit.js` layer adds menu focus movement, Escape, outside-click close, and `aria-expanded` state.',
    '- Drawer + Header/Navigation: use a labeled panel, a real close button, and `data-sk-drawer-open` / `data-sk-drawer-close` hooks for optional focus containment.',
    '- Modal + Button: use a native `<dialog>` with `data-sk-modal` and a labeled heading; the optional behavior layer restores focus and traps Tab.',
    '- Popover + Tooltip: use these for contextual information, never for essential content or a replacement for a form label.',
    '- Header + Navigation + Theme: keep landmarks and use `data-sk-theme-toggle` or `data-sk-theme-select` for optional persistence.',
    '- Table + Badge + Metadata Panel: keep table captions and scoped headers; use badges as redundant status labels.', '',
    '## Compatibility boundary', '',
    'SiteKit v1 keeps schemas, semantic templates, generated CSS, layout recipes, responsive contracts, and documented progressive hooks stable. Consumers remain responsible for correct downstream content, framework integration, and accessibility testing of their complete compositions.', '',
  );
  fs.mkdirSync(path.join(root, 'docs'), { recursive: true });
  fs.writeFileSync(path.join(root, 'docs/components.md'), `${lines.join('\n').replace(/\n+$/, '')}\n`);
}

function generateDesign() {
  const dirs = fs.readdirSync(path.join(root, 'components')).filter((name) => fs.existsSync(path.join(root, 'components', name, `${name}.schema.json`))).sort();
  const components = dirs.map((name) => read(`components/${name}/${name}.schema.json`));
  const themes = fs.readdirSync(path.join(root, 'tokens/themes')).filter((file) => file.endsWith('.json')).sort().map((file) => read(`tokens/themes/${file}`));
  const recipes = fs.readdirSync(path.join(root, 'recipes')).filter((file) => file.endsWith('.json')).sort().map((file) => read(`recipes/${file}`));
  const md = [
    '# SiteKit Design System', '',
    `Generated for SiteKit ${packageInfo.version} by scripts/generate-design-md. Edit tokens, components, recipes, and standards first.`, '',
    '## Purpose', '',
    'SiteKit v1 is a stable, AI-readable, human-verifiable design system for accessible, semantic, token-driven websites and web interfaces.', '',
    '## Philosophy', '', '- Clarity, context, and control.', '- Local-first where possible.', '- Agent-readable and human-verifiable.', '- Accessible, semantic, tokenized, modular, and extensible by default.', '',
    '## Consumer Contract', '',
    'Copy or vendor `dist/` as a unit. Use `dist/sitekit.css` as the supported CSS entry point and keep its sibling `fonts/` directory. Add `dist/sitekit.js` only when a consumer opts into behavior enhancement. The bundle is ordered reset, tokens, themes, base, components, utilities and works from `file://` or a local HTTP server. npm registry publication is outside the v1 contract. See [README.md](README.md) and [docs/components.md](docs/components.md).', '',
    '## Stable v1 Scope', '',
    '- Design tokens and bundled themes.',
    '- Component schemas and semantic HTML templates.',
    '- Generated component CSS and layout recipes.',
    '- Documented accessibility, responsive, and progressive-enhancement contracts.',
    '- `dist/sitekit.css`, optional `dist/sitekit.js`, and bundled Departure Mono font assets and license.',
    '- Deterministic generation, validation, and representative static HTML consumers.', '',
    'The v1 promise does not include npm publication, a hosted component service, universal framework compatibility, accessibility certification for arbitrary downstream compositions, unsupported-browser visual parity, or behavior for markup that omits documented hooks.', '',
    '## Optional Behavior', '',
    'Dropdowns, popovers, drawers, modals, tooltips, theme controls, and icon-button contracts are progressive enhancements. Static HTML remains readable without JavaScript. Behavior hooks are documented in each relevant component and in the generated component index.', '',
    '## Visual Identity', '', 'Technical, architectural, command-surface minimalism with high contrast, near-white page foundations, white panels, black linework, no decorative shadows, monospace metadata labels, and square geometry.', '',
    '## Accessibility Standard', '', 'WCAG 2.2 AA is the design and test baseline for SiteKit source components, documented usage, and tested reference compositions. Prefer native HTML before ARIA. Interactive controls require keyboard access, visible focus, and reduced-motion-safe behavior. This is not certification of arbitrary downstream markup.', '',
    '## Semantic HTML Standard', '', 'Use landmarks, ordered headings, real buttons, real links, lists for lists, and tables for tabular data. ARIA only fills gaps that native HTML cannot express.', '',
    '## Token System', '', 'Tokens are split into primitive tokens in tokens/core.json, semantic tokens in tokens/semantic.json, and theme overrides in tokens/themes/*.json. Component CSS consumes semantic tokens and never owns theme values.', '',
    '## Themes', '', ...themes.map((theme) => `- ${theme.name}: ${theme.description}`), '',
    '## Components', '', ...components.map((component) => `- ${component.name}: ${component.description}`), '',
    '## Layout Recipes', '', ...recipes.map((recipe) => `- ${recipe.name}: ${recipe.description}`), '',
    '## Agent Rules', '', '1. Read this file and relevant component schemas before generating UI.', '2. Use existing components before creating new patterns.', '3. Use tokens instead of raw visual values.', '4. Preserve semantic HTML and accessibility behavior.', '5. Run npm run build and npm run lint after changes.', '',
    '## Anti-Patterns', '', '- One-off card styles.', '- Raw hex colors in component CSS.', '- Clickable divs.', '- Skipped heading hierarchy.', '- Inaccessible modals or tabs.', '- Decorative motion without reduced-motion fallback.', '- Generic purple AI gradients or unrelated visual language.', '',
    '## Validation Commands', '', 'npm run format:check', 'npm run build', 'npm run lint', 'npm run validate', 'npm run snapshot', 'npm run smoke', 'npm run browser:test', 'npm run release:check', '',
    '## Extension Process', '', 'Add a component folder with schema, template, CSS, docs, and examples. Add token dependencies to semantic tokens if a visual decision must be themeable. Add or update recipes only after component contracts exist.', '',
  ];
  fs.writeFileSync(path.join(root, 'DESIGN.md'), md.join('\n'));
  generateComponentIndex();
  console.log('generated DESIGN.md and docs/components.md');
}

function validate() {
  const errors = [];
  const json = (file) => { try { return read(file); } catch (error) { errors.push(`${file}: invalid JSON: ${error.message}`); return null; } };
  ['tokens/core.json', 'tokens/semantic.json', 'schemas/token.schema.json', 'schemas/component.schema.json', 'schemas/recipe.schema.json', 'schemas/page.schema.json'].forEach(json);
  for (const file of fs.readdirSync(path.join(root, 'tokens/themes')).filter((name) => name.endsWith('.json'))) json(`tokens/themes/${file}`);
  const componentRoot = path.join(root, 'components');
  const components = fs.readdirSync(componentRoot).filter((name) => fs.statSync(path.join(componentRoot, name)).isDirectory()).sort();
  for (const name of components) {
    for (const suffix of ['schema.json', 'html', 'css', 'md']) if (!fs.existsSync(path.join(componentRoot, name, `${name}.${suffix}`))) errors.push(`components/${name}/${name}.${suffix}: missing`);
    if (!fs.existsSync(path.join(componentRoot, name, 'examples.json'))) errors.push(`components/${name}/examples.json: missing`);
    const schema = json(`components/${name}/${name}.schema.json`);
    json(`components/${name}/examples.json`);
    if (schema) {
      for (const key of ['name', 'description', 'props', 'variants', 'requiredFields', 'accessibility', 'tokenDependencies', 'responsive', 'slots', 'examples']) if (!(key in schema)) errors.push(`components/${name}: schema missing ${key}`);
      if (String(schema.accessibility?.keyboard || '').includes('Interactive')) {
        const css = fs.readFileSync(path.join(componentRoot, name, `${name}.css`), 'utf8');
        if (!css.includes(':focus-visible')) errors.push(`components/${name}: interactive component missing :focus-visible`);
      }
    }
    const css = fs.existsSync(path.join(componentRoot, name, `${name}.css`)) ? fs.readFileSync(path.join(componentRoot, name, `${name}.css`), 'utf8') : '';
    const raw = css.match(/#[0-9a-fA-F]{3,8}\b/g);
    if (raw) errors.push(`components/${name}: raw color value in CSS: ${raw.join(', ')}`);
  }
  const componentSet = new Set(components);
  for (const file of fs.readdirSync(path.join(root, 'recipes')).filter((name) => name.endsWith('.json'))) {
    const recipe = json(`recipes/${file}`);
    if (!recipe) continue;
    if (!fs.existsSync(path.join(root, 'layouts', recipe.layout))) errors.push(`recipes/${file}: missing layout ${recipe.layout}`);
    for (const component of recipe.components || []) if (!componentSet.has(component)) errors.push(`recipes/${file}: unknown component ${component}`);
  }
  for (const file of ['examples/component-lab/index.html', 'examples/kujolang-ai/index.html', 'examples/docs-site/index.html', 'examples/ecommerce-page/index.html', 'examples/personal-site/index.html']) {
    const html = fs.existsSync(path.join(root, file)) ? text(file) : '';
    if (!html) errors.push(`${file}: missing`);
    if (!/<h1[\s>]/.test(html)) errors.push(`${file}: missing h1`);
    if (/<h[3-6][\s>]/.test(html) && !/<h2[\s>]/.test(html)) errors.push(`${file}: possible heading hierarchy skip`);
  }
  if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
  console.log(`component validation passed: ${components.length} components`);
}

function snapshot() {
  const componentRoot = path.join(root, 'components');
  const components = fs.readdirSync(componentRoot).filter((name) => fs.existsSync(path.join(componentRoot, name, `${name}.schema.json`))).sort().map((name) => {
    const schema = read(`components/${name}/${name}.schema.json`);
    const examples = read(`components/${name}/examples.json`);
    return { slug: name, name: schema.name, variants: schema.variants, examples: examples.length };
  });
  fs.writeFileSync(path.join(root, 'tests/visual/component-snapshot.json'), `${JSON.stringify({ sitekitVersion: packageInfo.version, generatedAt: '2026-08-08', componentCount: components.length, components }, null, 2)}\n`);
  console.log(`snapshot written: ${components.length} components`);
}

module.exports = { generateCss, generateDesign, generateDistribution, validate, snapshot };
