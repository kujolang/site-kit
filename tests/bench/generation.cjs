const {execFileSync}=require('node:child_process');
const runs=Array.from({length:5},()=>JSON.parse(execFileSync(process.execPath,['tests/bench/measure-generation.cjs'],{encoding:'utf8'}).trim().split('\n').at(-1)));
console.log(JSON.stringify({node:process.version,runs,medianMilliseconds:runs.map(r=>r.milliseconds).sort((a,b)=>a-b)[2]},null,2));
