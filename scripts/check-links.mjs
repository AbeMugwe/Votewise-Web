import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const roots=["content/civic"];
async function files(dir){const out=[];for(const x of await readdir(dir,{withFileTypes:true})){const p=join(dir,x.name);if(x.isDirectory())out.push(...await files(p));else if(/\.ts$/.test(x.name))out.push(p);}return out;}
const urls=new Set();
for(const root of roots) for(const file of await files(root)){const body=await readFile(file,"utf8");for(const m of body.matchAll(/https?:\/\/[^"'`\s)]+/g)) urls.add(m[0]);}
const failures=[];
for(const url of [...urls].sort()) { let status=0; try { let res=await fetch(url,{method:"HEAD",headers:{"User-Agent":"VoteWiseKenya link checker/1.0"},redirect:"follow",signal:AbortSignal.timeout(15000)}); if(res.status>=400)res=await fetch(url,{headers:{"User-Agent":"Mozilla/5.0 (compatible; VoteWiseKenya/1.0)","Accept":"text/html,application/pdf;q=0.9,*/*;q=0.5"},redirect:"follow",signal:AbortSignal.timeout(20000)}); status=res.status; } catch {} if(status<200||status>=400)failures.push({url,status}); await new Promise(r=>setTimeout(r,250)); }
console.log(JSON.stringify({checked:urls.size,failures},null,2));
process.exitCode=failures.length?1:0;
