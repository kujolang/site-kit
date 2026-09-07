const assert=require('node:assert/strict');
const {validateContract}=require('../../scripts/generate-contracts');
const fs=require('node:fs');
const base=JSON.parse(fs.readFileSync('components/tabs/tabs.schema.json'));
const css=fs.readFileSync('components/tabs/tabs.css','utf8');
for(const mutate of [s=>s.requiredFields.push('missing'),s=>s.propertyContracts.tabs.type='bad',s=>s.examples[0].props.tabs='invalid',s=>s.variantContracts.line={kind:'alias',aliasOf:'missing'},s=>s.propertyContracts.tabs.required=false,s=>s.examples[0].props.tabs=[{}]]){
 const s=structuredClone(base);mutate(s);assert.throws(()=>validateContract(s,s.examples,css));
}
console.log('contradictory fields, invalid examples/items/types and broken variant references rejected');
