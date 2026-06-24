import { describe, expect, it } from 'vitest';
import worker from '../src';
import type { Env } from '../src/types';

const env: Env = {
  ENVIRONMENT: 'test',
};

interface AgentsBody {
  agents: Array<{ id: string }>;
}

interface ChatBody {
  agent: { id: string };
  intent: string;
  language: string;
  mode: string;
}

interface ErrorBody {
  error: string;
}

function request(path: string, init?: RequestInit): Request {
  return new Request(`https://example.com${path}`, init);
}

describe('Digital Korsou Worker', () => {
  it('responds to GET /api/health', async () => {
    const response = await worker.fetch(request('/api/health'), env);
    const body = (await response.json()) as { status: string; environment: string };

    expect(response.status).toBe(200);
    expect(body).toEqual({ status: 'ok', environment: 'test' });
  });

  it('responds to GET /api/agents with five pilot agents', async () => {
    const response = await worker.fetch(request('/api/agents'), env);
    const body = (await response.json()) as AgentsBody;

    expect(response.status).toBe(200);
    expect(body.agents).toHaveLength(5);
    expect(body.agents.map((agent) => agent.id)).toEqual([
      'arrival-gpt',
      'edu-gpt',
      'toolmaker-gpt',
      'job-gpt',
      'community-gpt',
    ]);
  });

  it('routes POST /api/chat through the local orchestrator', async () => {
    const response = await worker.fetch(
      request('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: 'Bon dia, mi mester yudansa ku mi tarea di skol.',
        }),
      }),
      env
    );
    const body = (await response.json()) as ChatBody;

    expect(response.status).toBe(200);
    expect(body.agent.id).toBe('edu-gpt');
    expect(body.intent).toBe('education');
    expect(body.language).toBe('pap');
    expect(body.mode).toBe('local');
  });

  it('returns 400 for invalid JSON', async () => {
    const response = await worker.fetch(
      request('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{bad json',
      }),
      env
    );
    const body = (await response.json()) as ErrorBody;

    expect(response.status).toBe(400);
    expect(body.error).toBe('Invalid JSON');
  });

  it('returns 400 when message is missing', async () => {
    const response = await worker.fetch(
      request('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language: 'pap' }),
      }),
      env
    );
    const body = (await response.json()) as ErrorBody;

    expect(response.status).toBe(400);
    expect(body.error).toBe('Missing message');
  });

  it('returns 413 when message is too long', async () => {
    const response = await worker.fetch(
      request('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'a'.repeat(4001) }),
      }),
      env
    );
    const body = (await response.json()) as ErrorBody;

    expect(response.status).toBe(413);
    expect(body.error).toBe('Message too long');
  });

  it('returns 404 for unknown routes', async () => {
    const response = await worker.fetch(request('/api/unknown'), env);
    const body = (await response.json()) as ErrorBody;

    expect(response.status).toBe(404);
    expect(body.error).toBe('Not found');
  });

  it('responds to OPTIONS preflight', async () => {
    const response = await worker.fetch(request('/api/chat', { method: 'OPTIONS' }), env);

    expect(response.status).toBe(200);
    expect(response.headers.get('Access-Control-Allow-Methods')).toContain('POST');
  });
});
