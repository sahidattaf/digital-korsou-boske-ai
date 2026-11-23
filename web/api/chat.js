import { fetchWorker, getWorkerOrigin, json, EXPECTED_AGENT_IDS } from '../lib/worker.js';
const LANGUAGES = new Set(['pap', 'en', 'nl', 'es']);
export async function POST(request) {
  const origin=getWorkerOrigin();
  if (!origin) return json({error:'Live Worker is not configured. Use the clearly marked simulation.'},503);
  const contentType=request.headers.get('content-type')??'';
  if (!contentType.toLowerCase().includes('application/json')) return json({error:'Use application/json'},415);
  let body;
  try { body=await request.json(); } catch { return json({error:'Invalid JSON'},400); }
  if (!body || typeof body.message!=='string' || !body.message.trim()) return json({error:'Message required'},400);
  if (body.message.length>4000) return json({error:'Message too long'},413);
  if (typeof body.language!=='string'||!LANGUAGES.has(body.language)) return json({error:'Unsupported language'},400);
  try {
    const response=await fetchWorker(origin,'/api/chat',{
      method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({message:body.message.trim(),language:body.language})
    });
    if (!response.ok) return json({error:'Worker unavailable'},502);
    const data=await response.json();
    if (typeof data?.response!=='string' || !EXPECTED_AGENT_IDS.includes(data?.agent?.id) ||
        typeof data.agent.name!=='string' || !['local','openai','fallback'].includes(data.mode))
      return json({error:'Worker contract mismatch'},502);
    return json({response:data.response,agent:{id:data.agent.id,name:data.agent.name},language:data.language,intent:data.intent,mode:data.mode});
  } catch {return json({error:'Worker unavailable'},502);}
}
