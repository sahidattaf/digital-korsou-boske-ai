import test from 'node:test';
import assert from 'node:assert/strict';
import {agents,simulateRoute} from '../public/routing.js';
import {GET} from '../api/status.js';
import {POST} from '../api/chat.js';
test('exact five pilot agents',()=>{
 assert.deepEqual(agents.map(a=>a.id),['arrival-gpt','edu-gpt','toolmaker-gpt','job-gpt','community-gpt']);
});
const cases=[
 ['PAP arrival','Bon dia, mi no sa kiko ta e siguiente paso','arrival-gpt'],
 ['PAP education','Mi ta buska yudansa ku mi tarea di skol','edu-gpt'],
 ['PAP tools','Yudami traha un checklist pa negoshi','toolmaker-gpt'],
 ['PAP jobs','Mi ta buska trabou i mester un CV','job-gpt'],
 ['PAP community','Nos komunidat di bario ta organisá un taller','community-gpt'],
 ['Bilingual job','Bon dia I need a job and a CV','job-gpt'],
 ['Bilingual tools','Please make un checklist pa mi negoshi','toolmaker-gpt'],
 ['Bilingual education','Mi mester school homework help','edu-gpt'],
 ['Privacy no-match','No warda mi password','arrival-gpt'],
 ['Privacy unknown','Mi number di telefòn no mester wordu wardá','arrival-gpt'],
 ['Unknown question','Kiko ta zarpa di lunapark?','arrival-gpt'],
 ['Unknown punctuation','???','arrival-gpt']
];
for(const [name,prompt,expected] of cases)test('routing QA '+name,()=>assert.equal(simulateRoute(prompt).id,expected));
test('status is simulation without Worker',async()=>{
 delete process.env.CLOUDFLARE_API_BASE_URL;
 const response=await GET();assert.equal(response.status,200);
 assert.equal((await response.json()).available,false);
});
test('chat refuses live mode without Worker',async()=>{
 delete process.env.CLOUDFLARE_API_BASE_URL;
 const response=await POST(new Request('https://example.com/api/chat',{
  method:'POST',headers:{'Content-Type':'application/json'},
  body:JSON.stringify({message:'hello',language:'en'})
 }));
 assert.equal(response.status,503);
});
