#!/usr/bin/env python3
"""Reproduce source extractions for this dossier; never generates a website.

Run from any directory. Authored judgments live in audit-notes.json. Regex-derived
observations are deliberately not treated as a CSS parser or API implementation.
"""
from pathlib import Path
from html.parser import HTMLParser
import hashlib
import html
import json
import re
import subprocess

OUT = Path(__file__).resolve().parent
ROOT = OUT.parents[1]
NOTES = json.loads((OUT / 'audit-notes.json').read_text())
subprocess.run(['git', 'diff', '--quiet', NOTES['sourceCommit'], '--', 'components', 'tokens', 'css', 'scripts', 'schemas', 'recipes', 'layouts', 'examples', 'tests', 'standards', '.github', 'package.json', 'package-lock.json', 'README.md', 'DESIGN.md', 'CHANGELOG.md', 'AGENTS.md', 'playwright.config.mjs', 'docs/components.md', 'docs/launch-checklist.md', 'dist'], cwd=ROOT, check=True)

def read(path):
    return (ROOT / path).read_text()

def write_json(path, data):
    (OUT / path).write_text(json.dumps(data, indent=2, ensure_ascii=False) + '\n')

def kebab(text):
    return re.sub(r'([a-z0-9])([A-Z])', r'\1-\2', text).replace('_', '-').lower()

def flatten(obj, prefix=()):
    for key, value in obj.items():
        if key in ['$schema', 'name', 'description']:
            continue
        if isinstance(value, dict) and 'value' in value:
            yield '.'.join(prefix + (key,)), str(value['value'])
        elif isinstance(value, dict):
            yield from flatten(value, prefix + (key,))

def variable(key):
    return '--sk-' + '-'.join(kebab(p) for p in key.split('.'))

def rules(css):
    # Source selectors/declarations, not computed-style assertions.
    return [{'selector': re.sub(r'\s+', ' ', m[0]).strip(), 'declarations': re.sub(r'\s+', ' ', m[1]).strip()}
            for m in re.findall(r'([^{}]+)\{([^{}]*)\}', css)]

class Markup(HTMLParser):
    def __init__(self, source):
        super().__init__()
        self.elements = []
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        self.elements.append({'tag': tag, 'attributes': dict(attrs)})

    handle_startendtag = handle_starttag

def safe_example(slug, template):
    """Authored slot values; this only produces inert HTML documentation examples."""
    uid = 'demo-' + slug
    values = {'label': NOTES['components'][slug]['use'], 'heading': 'Build with SiteKit',
              'body': 'Semantic HTML, local assets, and reusable styles.',
              'title': 'Review changes', 'brand': 'SiteKit', 'legal': 'SiteKit · MIT',
              'caption': 'HTML example', 'code': '&lt;button class="sk-button" type="button"&gt;Save&lt;/button&gt;',
              'id': uid, 'name': 'project', 'help': 'Use a short project name.',
              'nav': '<a href="#main">Overview</a>', 'links': '<a href="#main">Documentation</a>',
              'actions': '<button class="sk-button" type="button">Continue</button>',
              'rows': '<div><dt>Version</dt><dd>1.0.0</dd></div>',
              'tabs': '<button id="' + uid + '-tab" type="button" role="tab" aria-selected="true" aria-controls="' + uid + '-panel">Overview</button>',
              'panel': 'Panel content; additional tab behavior is consumer-owned.',
              'items': '<article><h3>Source contracts</h3><p>Inspectable component metadata.</p></article>'}
    if slug == 'command-strip':
        values['items'] = '<span>Version 1.0.0</span><span>Source-vendored</span>'
    result = re.sub(r'\{\{([^}]+)\}\}', lambda m: values[m[1]], template).strip()
    if slug == 'label':
        result += '\n<input id="label-example" name="project" type="text">'
    if slug == 'skip-link':
        result += '\n<main id="main" tabindex="-1"><h1>Page content</h1></main>'
    return result

component_paths = sorted((ROOT / 'components').glob('*/*.schema.json'))
assert set(NOTES['components']) == {p.parent.name for p in component_paths}
components = []
all_css = {}
category_names = {}
index = read('docs/components.md')
category = ''
for line in index.splitlines():
    if line.startswith('## '):
        category = line[3:]
    match = re.search(r'`components/([^`]+)`', line)
    if match:
        category_names[match[1]] = category

for path in component_paths:
    slug = path.parent.name
    schema = json.loads(path.read_text())
    base = 'components/' + slug + '/' + slug
    css, template, docs = read(base + '.css'), read(base + '.html'), read(base + '.md')
    all_css[slug] = css
    parsed = Markup(template)
    obs_rules = rules(css)
    selectors = [r['selector'] for r in obs_rules if not r['selector'].startswith('@')]
    note = NOTES['components'][slug]
    raw_variants = sorted(set(re.findall(r'\[data-variant="([^"]+)"\]', css)))
    # Header's variant selectors target descendant Buttons, not Header variants.
    variant_values = raw_variants if slug in ['button', 'badge', 'alert'] else []
    placeholders = sorted(set(re.findall(r'\{\{([^}]+)\}\}', template)))
    actual_tokens = sorted(set(re.findall(r'var\((--sk-[\w-]+)', css)))
    queries = re.findall(r'@(media|container)\s*([^{}]+)', css)
    props = []
    for name, declared_type in schema['props'].items():
        binding = note.get('bindings', {}).get(name)
        if not binding and name in placeholders:
            binding = 'Template {{' + name + '}} placeholder only; consumer must safely render it.'
        props.append({'name': name, 'declaredType': declared_type,
                      'requiredBySchema': name in schema['requiredFields'],
                      'declaredDefault': None, 'binding': binding,
                      'bindingConfidence': 'VERIFIED' if binding else 'UNKNOWN',
                      'playgroundControl': note.get('controls', {}).get(name)})
    states = [{'name': 'default', 'evidence': base + '.html', 'scope': 'source template'}]
    for name, marker in [('hover', ':hover'), ('focus', ':focus-visible'), ('active', ':active'),
                         ('checked', ':checked'), ('disabled', ':disabled'), ('disabled', '[disabled]'),
                         ('selected', 'aria-selected'), ('pressed', 'aria-pressed'), ('busy', 'aria-busy'),
                         ('error', 'data-state="error"'), ('current', 'aria-current')]:
        if marker in css and name not in [x['name'] for x in states]:
            states.append({'name': name, 'evidence': base + '.css', 'scope': 'CSS selector; may target descendants'})
    if note.get('behavior') == 'optional-js':
        states.append({'name': 'open/closed', 'evidence': 'scripts/sitekit-behavior.js', 'scope': 'behavior hook'})
    components.append({
        'slug': slug, 'name': schema['name'], 'category': category_names[slug],
        'primitive': slug in NOTES['primitives'], 'description': schema['description'],
        'descriptionConfidence': 'VERIFIED as schema wording; see purpose for audited boundary',
        'purpose': note['use'], 'avoid': note['avoid'], 'status': note.get('behavior', 'html-css'),
        'public': True, 'export': {'css': 'dist/sitekit.css', 'javascript': 'dist/sitekit.js' if note.get('behavior') == 'optional-js' else None,
                                  'moduleExport': None, 'selector': '.sk-stack-component' if slug == 'stack' else '.sk-' + slug},
        'source': {'schema': base + '.schema.json', 'template': base + '.html', 'css': base + '.css',
                   'documentation': base + '.md', 'examples': 'components/' + slug + '/examples.json'},
        'props': props, 'requiredFields': schema['requiredFields'],
        'requiredFieldsAbsentFromProps': sorted(set(schema['requiredFields']) - set(schema['props'])),
        'slotsDeclared': schema['slots'], 'allowedChildrenDeclared': schema.get('allowedChildren'),
        'templatePlaceholders': placeholders,
        'templateAttributes': parsed.elements,
        'variantsDeclared': schema['variants'], 'variantSelectorsVerified': variant_values,
        'variantCaveat': 'Only selector-backed values or explicitly authored base aliases are offered as controls. Absence of a selector is not proof that an authored composition cannot exist.',
        'sizes': note.get('sizes', []), 'states': states,
        'interaction': note.get('interaction', 'No component-specific shipped JavaScript; links and native descendants retain browser behavior.'),
        'callbacks': [], 'customEvents': [], 'stateOwnership': 'DOM/native state and consumer event handlers; no framework controlled/uncontrolled prop runtime.',
        'dependencies': {'componentsInTemplate': sorted({x for x in re.findall(r'\bsk-([a-z][\w-]*)', template) if x in NOTES['components'] and x != slug}),
                         'externalRuntimeLibraries': [], 'cssVariables': actual_tokens,
                         'declaredTokens': schema['tokenDependencies']},
        'responsive': {'declared': schema['responsive'], 'queriesObserved': [{'type': q[0], 'condition': q[1].strip()} for q in queries],
                       'layoutRules': [r for r in obs_rules if any(x in r['declarations'] for x in ['grid-template', 'flex-wrap', 'overflow', 'inline-size', 'container-type']) and ':focus-visible' not in r['selector']],
                       'review': note.get('responsive', 'Intrinsic behavior follows the recorded CSS rules. No component-specific viewport breakpoint unless listed; schema breakpoint names are not implementation proof.'),
                       'demoRecommended': bool(queries) or slug in NOTES['viewportDemos']},
        'motionRules': [r for r in obs_rules if any(x in r['declarations'] for x in ['transition:', 'animation:', 'scroll-behavior:', 'transform:'])],
        'accessibility': {'rating': note.get('a11yRating', 'acceptable'), 'sourceReview': note.get('a11y', 'Preserve the template native semantics and visible text. Consumer content and composition need page-level verification.'),
                          'schemaClaims': schema['accessibility'], 'formalCompliance': 'UNKNOWN; no certification',
                          'keyboard': note.get('interaction', 'Native links/controls if present; otherwise no custom keyboard interaction.'),
                          'browserBoundary': 'Existing page tests do not exercise every component preview; see evidence/verification.json.'},
        'documentation': {'rating': note.get('documentation', 'minimal'), 'reason': note.get('docReason', 'Purpose and schema pointers exist, but per-prop bindings, actual defaults, complete examples, and behavioral boundaries need authored reference material.')},
        'caveats': note.get('caveats', []) + (['Required fields absent from props: ' + ', '.join(sorted(set(schema['requiredFields']) - set(schema['props'])))] if set(schema['requiredFields']) - set(schema['props']) else []),
        'examples': [{'id': slug + '-minimal', 'confidence': 'PROPOSED source-template instantiation; not proof of full behavior',
                      'html': safe_example(slug, template), 'notes': 'Standalone instance. Replace repeated IDs and associated IDREFs when composing. Schema variants are not automatically rendered.'}],
        'existingExampleMetadata': json.loads(read('components/' + slug + '/examples.json')),
        'related': note.get('related', []),
        'testCoverage': {'static': ['scripts/sitekit.js:validate', 'tests/contract/release-contract.mjs', 'tests/visual/component-snapshot.json'],
                         'behavior': ['tests/browser/sitekit.spec.mjs'] if note.get('behavior') == 'optional-js' else [],
                         'pageReferences': [str(p.relative_to(ROOT)) for p in sorted((ROOT / 'examples').glob('*/index.html')) if re.search(r'\bsk-' + re.escape(slug) + r'(?=[\s".>])', p.read_text())],
                         'limitation': 'Source mention is not rendered preview, state, or assertion coverage.'},
        'playground': {'recommended': note.get('playground', True), 'controls': note.get('controls', {}), 'matrix': slug in NOTES['matrixComponents']},
        'cssRulesObserved': obs_rules,
    })

manifest = {'schemaVersion': 1, 'product': 'SiteKit', 'libraryVersion': json.loads(read('package.json'))['version'],
            'sourceCommit': NOTES['sourceCommit'], 'auditDate': '2026-09-06',
            'confidenceLegend': NOTES['confidenceLegend'], 'consumerModel': 'source-vendored semantic HTML/CSS; no runtime schema renderer',
            'components': components, 'primitives': NOTES['primitives'],
            'utilities': NOTES['utilities'], 'runtime': NOTES['runtime'],
            'recipes': [dict(json.loads(p.read_text()), source=str(p.relative_to(ROOT))) for p in sorted((ROOT / 'recipes').glob('*.json'))],
            'layouts': [str(p.relative_to(ROOT)) for p in sorted((ROOT / 'layouts').glob('*.html'))]}
write_json('component-manifest.json', manifest)

core = dict(flatten(json.loads(read('tokens/core.json'))))
semantic = dict(flatten(json.loads(read('tokens/semantic.json'))))
themes = {p.stem: dict(flatten(json.loads(p.read_text())['tokens'])) for p in sorted((ROOT / 'tokens/themes').glob('*.json'))}
defaults = dict(core, **semantic)
def resolve(value, values, seen=()):
    def sub(match):
        key = match[1]
        assert key not in seen and key in values, 'Missing or circular token ' + key
        return resolve(values[key], values, seen + (key,))
    return re.sub(r'\{([^}]+)\}', sub, value)

tokens = []
for key, val in defaults.items():
    cssvar = variable(key)
    tokens.append({'name': key, 'cssVariable': cssvar, 'layer': 'core' if key in core else 'semantic',
                   'source': 'tokens/core.json' if key in core else 'tokens/semantic.json',
                   'value': val, 'references': re.findall(r'\{([^}]+)\}', val),
                   'resolvedDefault': resolve(val, defaults),
                   'themes': {theme: {'override': values.get(key), 'resolved': resolve(values.get(key, val), dict(defaults, **values))} for theme, values in themes.items()},
                   'directComponentReferences': [c['slug'] for c in components if cssvar in c['dependencies']['cssVariables']],
                   'baseOrUtilityReference': cssvar in read('css/base.css') + read('css/utilities.css'),
                   'confidence': 'VERIFIED static token resolution; not computed cascade or contrast certification'})
write_json('token-manifest.json', {'schemaVersion': 1, 'sourceCommit': NOTES['sourceCommit'], 'counts': {'core': len(core), 'semantic': len(semantic), 'total': len(tokens)}, 'themes': themes, 'tokens': tokens})

def cell(value):
    if isinstance(value, (list, dict)):
        value = json.dumps(value, ensure_ascii=False)
    return str(value).replace('|', '\\|').replace('\n', ' ')

inventory = ['# Component inventory and coverage', '',
             'VERIFIED: 85 schema-backed public HTML/CSS concepts. The 15 primitives below are an audit classification, not a separately exported package. Six layouts, eight recipes, six utilities and theme enhancement are counted separately.', '',
             'All components have a schema, HTML, CSS, Markdown and examples.json. “Public” means the source contract and bundled styles; there are no per-component JavaScript imports. Every component needs a real showcase demo. API completeness means runtime binding/behavior completeness, not file presence.', '',
             '| Component | Category | Primitive | Exists / public | Docs | Demo | Playground | A11y | Viewport demo | API complete |',
             '| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |']
for c in components:
    inventory.append('| ' + ' | '.join([f"[{c['name']}](component-details/{c['slug']}.md)", c['category'], 'yes' if c['primitive'] else 'no', 'yes / yes', c['documentation']['rating'], 'yes', 'yes' if c['playground']['recommended'] else 'reference only', c['accessibility']['rating'], 'yes' if c['responsive']['demoRecommended'] else 'intrinsic', 'partial/declarative']) + ' |')
inventory += ['', '## Purpose, variants, states, dependencies and status', '',
              'Each linked detail contains the complete audited record and copyable example; the machine manifest carries identical fields. Declared variants are preserved for traceability, never silently promoted to working switches.', '']
for c in components:
    inventory += [f"### {c['name']}", '', f"{c['purpose']} Status: `{c['status']}`. Source: `{c['source']['template']}` and `{c['source']['css']}`.", '',
                  f"Declared variants: {', '.join(c['variantsDeclared'])}. Verified data-variant selectors: {', '.join(c['variantSelectorsVerified']) or 'none'}. CSS/DOM states: {', '.join(x['name'] for x in c['states'])}.", '',
                  f"Dependencies: {', '.join(c['dependencies']['componentsInTemplate']) or 'native HTML and shared CSS foundations'}. Documentation: {c['documentation']['rating']}.", '']
(OUT / '02-COMPONENT-INVENTORY.md').write_text('\n'.join(inventory))

details_index = ['# Component details', '', 'Start with the shared API rules, then the per-component records. All 85 components have one record.', '',
                 '## Shared API rules', '',
                 'Schemas are descriptive JSON contracts, not executable prop bindings. There is no templating library, React component tree, TypeScript props package, callback registration API, slot renderer, or automatic variant generator in the distribution. `{{...}}` slots are source notation. Some templates hardcode example content instead. Consumers own escaping, ID uniqueness, loops, child markup, form submission, and application state.', '',
                 'Required means `requiredFields` in source, not browser validation. Defaults in the tables are null when undeclared; template attributes show actual sample values. Native `disabled`, `readonly`, `required`, `value`, `checked`, `input`, `change`, `click`, `submit`, and dialog events remain browser APIs where the chosen element supports them. An `aria-disabled` attribute changes semantics/styles but does not prevent activation.', '',
                 'Slots and allowedChildren are declared vocabulary, not enforced content models. Most array/object entries lack item schemas. Use each copyable example as a standalone starting point and apply the explicit caveats before publishing. Source-derived CSS excerpts are implementation evidence, not a substitute for browser checks.', '',
                 'The status `example-only-js` means the lab contains some related click behavior, not that a complete widget is implemented there. `native` identifies browser-owned control behavior. All examples include every source placeholder; template shortcomings are retained and disclosed rather than silently repaired.', '']
for c in components:
    n = c['slug']
    details_index.append(f"- [{c['name']}](component-details/{n}.md) — {c['category']}; {c['status']}.")
    lines = [f"# {c['name']}", '', f"Category: {c['category']}. Public: HTML/CSS source contract. Status: `{c['status']}`. Primitive: {c['primitive']}.", '',
             '## Purpose and selection', '', c['purpose'], '', 'Avoid: ' + c['avoid'], '',
             '## Source and consumption', '',
             *[f"- {k}: `{v}`" for k, v in c['source'].items()], '',
             f"Load `dist/sitekit.css`; root selector `{c['export']['selector']}`. " + ('Load `dist/sitekit.js` for the hooks below.' if c['status'] == 'optional-js' else 'No component JavaScript export.'), '',
             '## Declared API versus binding', '',
             '| Field | Declared type | Required | Default | Verified binding / uncertainty |', '| --- | --- | --- | --- | --- |']
    for p in c['props']:
        lines.append('| ' + ' | '.join(cell(v) for v in [p['name'], p['declaredType'], p['requiredBySchema'], 'null', p['binding'] or 'UNKNOWN: no automatic binding established; consumer authors markup.']) + ' |')
    lines += ['', 'Required fields: ' + cell(c['requiredFields']) + '.', '',
              'Template placeholders: ' + cell(c['templatePlaceholders']) + '. Declared slots: ' + cell(c['slotsDeclared']) + '.', '',
              'Allowed children (declared only): ' + cell(c['allowedChildrenDeclared']) + '.', '',
              'Callbacks/custom events: none exported. ' + c['stateOwnership'], '',
              '## Variants, sizes and states', '',
              'Declared variants: ' + ', '.join(c['variantsDeclared']) + '.', '',
              'Verified component data-variant selectors: ' + (', '.join(c['variantSelectorsVerified']) or 'none') + '. ' + c['variantCaveat'], '',
              'Explicit size API: ' + (cell(c['sizes']) if c['sizes'] else 'none established; sizing follows CSS/native dimensions.') , '',
              '| State | Scope | Evidence |', '| --- | --- | --- |']
    lines += ['| ' + ' | '.join(cell(s[k]) for k in ['name', 'scope', 'evidence']) + ' |' for s in c['states']]
    lines += ['', '## Interaction and accessibility', '', c['interaction'], '',
              c['accessibility']['rating'].upper() + ': ' + c['accessibility']['sourceReview'], '',
              'No formal WCAG certification. ' + c['accessibility']['browserBoundary'], '',
              '## Responsive behavior', '', c['responsive']['review'], '',
              'Observed queries: ' + cell(c['responsive']['queriesObserved']) + '.', '',
              '```css', '\n'.join(r['selector'] + ' { ' + r['declarations'] + ' }' for r in c['responsive']['layoutRules']), '```', '',
              '## Motion', '', '```css', '\n'.join(r['selector'] + ' { ' + r['declarations'] + ' }' for r in c['motionRules']) or '/* No component animation/transition found. */', '```', '',
              'Global reduced-motion duration override: `css/base.css`. Spinner/skeleton additionally opt in through no-preference queries.', '',
              '## Standalone example', '', 'PROPOSED instantiation of the source template. Include the CSS entrypoint above. Literal IDs must be unique in a complete page. This is an HTML usage example, not a new component implementation.', '',
              '```html', c['examples'][0]['html'], '```', '',
              '## Composition and dependencies', '',
              'Nested SiteKit components: ' + cell(c['dependencies']['componentsInTemplate']) + '. External runtime libraries: none.', '',
              'Related: ' + cell(c['related']) + '.', '',
              'Actual CSS variables: ' + ', '.join('`' + x + '`' for x in c['dependencies']['cssVariables']) + '.', '',
              '## Caveats and documentation', '',
              *['- ' + x for x in c['caveats']], '',
              c['documentation']['rating'].upper() + ': ' + c['documentation']['reason'], '',
              '## Verification coverage', '',
              'Static: component file/field validation and schema snapshot. Optional behavior tests: ' + cell(c['testCoverage']['behavior']) + '.', '',
              'Examples containing references: ' + cell(c['testCoverage']['pageReferences']) + '. ' + c['testCoverage']['limitation'], '',
              '## Proposed showcase controls', '', cell(c['playground']), '']
    (OUT / 'component-details' / (n + '.md')).write_text('\n'.join(lines))
(OUT / '04-COMPONENT-DETAILS.md').write_text('\n'.join(details_index) + '\n')

source_files = sorted({str(p.relative_to(ROOT)) for folder in ['components', 'tokens', 'css', 'scripts', 'schemas', 'recipes', 'layouts', 'examples', 'tests', 'standards', '.github'] for p in (ROOT / folder).rglob('*') if p.is_file()} | {'AGENTS.md', 'README.md', 'DESIGN.md', 'package.json', 'package-lock.json', 'CHANGELOG.md', 'playwright.config.mjs', 'docs/components.md', 'docs/launch-checklist.md', 'dist/sitekit-manifest.json'})
write_json('evidence/source-index.json', {'sourceCommit': NOTES['sourceCommit'], 'method': 'SHA-256 of first-party source and generated contract evidence; vendor and dependency trees excluded.', 'files': {p: hashlib.sha256((ROOT / p).read_bytes()).hexdigest() for p in source_files}})
write_json('evidence/api-discrepancies.json', {
    'requiredFieldsAbsentFromProps': {c['slug']: c['requiredFieldsAbsentFromProps'] for c in components if c['requiredFieldsAbsentFromProps']},
    'variantEvidence': {c['slug']: {'declared': c['variantsDeclared'], 'cssDataVariant': c['variantSelectorsVerified']} for c in components},
    'tokenDependencyDifferences': {c['slug']: {'declaredButNotDirectlyReferenced': sorted(set(variable(x) for x in c['dependencies']['declaredTokens']) - set(c['dependencies']['cssVariables'])), 'directlyReferencedButUndeclared': sorted(set(c['dependencies']['cssVariables']) - set(variable(x) for x in c['dependencies']['declaredTokens']))} for c in components},
    'caution': 'Static differences identify investigation points, not automatic defects: transitive dependencies and base aliases require authored review.'})
print(json.dumps({'components': len(components), 'primitives': len(NOTES['primitives']), 'tokens': len(tokens), 'core': len(core), 'semantic': len(semantic), 'sourceFiles': len(source_files)}))
