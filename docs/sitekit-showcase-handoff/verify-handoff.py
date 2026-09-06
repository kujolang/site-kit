#!/usr/bin/env python3
"""Validate dossier coverage and source references; this does not certify components."""
from pathlib import Path
import hashlib,json,re
O=Path(__file__).resolve().parent
R=O.parents[1]
def data(name):return json.loads((O/name).read_text())
m=data('component-manifest.json');t=data('token-manifest.json');routes=data('showcase-routes.json')
slugs={p.parent.name for p in (R/'components').glob('*/*.schema.json')}
assert len(m['components'])==len(slugs)==85
assert {c['slug'] for c in m['components']}==slugs
assert len(set(m['primitives']))==15 and set(m['primitives'])<=slugs
assert len(t['tokens'])==120 and t['counts']=={'core':78,'semantic':42,'total':120}
variables={x['cssVariable'] for x in t['tokens']}
assert len(variables)==120
for c in m['components']:
 assert (O/'component-details'/(c['slug']+'.md')).is_file()
 for p in c['source'].values():assert (R/p).is_file(),p
 assert set(c['dependencies']['cssVariables'])<=variables,c['slug']
 assert not re.search(r'{{[^}]*}}',c['examples'][0]['html']),c['slug']
 assert set(c['related'])<=slugs,c['slug']
 assert c['export']['moduleExport'] is None
 assert c['status']!='optional-js' or c['export']['javascript']=='dist/sitekit.js'
paths=[r['path'] for r in routes['routes']]
assert len(paths)==len(set(paths))
assert all('/components/'+s+'/' in paths for s in slugs)
assert all('/api/components/'+s+'.json' in paths for s in slugs)
source=data('evidence/source-index.json')
for p,digest in source['files'].items():assert hashlib.sha256((R/p).read_bytes()).hexdigest()==digest,p
for i,name in enumerate(['EXECUTIVE-SUMMARY','ARCHITECTURE','COMPONENT-INVENTORY','FOUNDATIONS','COMPONENT-DETAILS','PATTERNS-AND-COMPOSITIONS','ACCESSIBILITY-RESPONSIVE-MOTION','DOCUMENTATION-GAPS','SITEKIT-GAPS','SHOWCASE-IA','INTERACTIVE-DEMO-SPEC','SHOWCASE-DESIGN-BRIEF','IMPLEMENTATION-PLAN','ACCEPTANCE-CRITERIA','OPEN-QUESTIONS']):assert (O/f'{i:02}-{name}.md').is_file()
for p in O.rglob('*.json'):json.loads(p.read_text())
print(json.dumps({'ok':True,'components':85,'primitives':15,'tokens':120,'routes':len(paths),'sourceHashes':len(source['files'])}))
