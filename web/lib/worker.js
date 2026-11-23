export const EXPECTED_AGENT_IDS = ['arrival-gpt', 'edu-gpt', 'toolmaker-gpt', 'job-gpt', 'community-gpt'];

export function getWorkerOrigin() {
  const raw = process.env.CLOUDFLARE_API_BASE_URL?.trim();
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash) return null;
    if (!url.hostname.endsWith('.workers.dev') || url.hostname === 'workers.dev') return null;
    if (url.pathname !== '/' && url.pathname !== '') return null;
    return url.origin;
  } catch { return null; }
}

export const noStore = { 'Cache-Control': 'no-store, max-age=0', 'Content-Type': 'application/json; charset=utf-8', 'X-Content-Type-Options': 'nosniff' };
export function json(body,status=200) { return Response.json(body,{status,headers:noStore}); }
export async function fetchWorker(origin,path,options={}) {
  return fetch(`${origin}${path}`,{...options,redirect:'error',cache:'no-store',signal:AbortSignal.timeout(8000)});
}
