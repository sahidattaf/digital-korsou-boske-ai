import { EXPECTED_AGENT_IDS, fetchWorker, getWorkerOrigin, json } from '../lib/worker.js';
export async function GET() {
  const origin=getWorkerOrigin();
  if (!origin) return json({ available:false, mode:'simulation', reason:'worker_not_configured' });
  try {
    const [health,agents]=await Promise.all([
      fetchWorker(origin,'/api/health'),
      fetchWorker(origin,'/api/agents')
    ]);
    if (!health.ok || !agents.ok) throw new Error('Worker health failed');
    const h=await health.json();
    const a=await agents.json();
    const ids=a?.agents?.map?.(agent=>agent?.id);
    if (h?.status!=='ok' || !Array.isArray(ids) ||
        ids.length!==EXPECTED_AGENT_IDS.length ||
        EXPECTED_AGENT_IDS.some(id=>!ids.includes(id))) throw new Error('Worker contract mismatch');
    return json({available:true,mode:'worker',agentCount:5});
  } catch {
    return json({available:false,mode:'simulation',reason:'worker_not_verified'});
  }
}
