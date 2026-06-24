import { PILOT_AGENTS } from './agents';
import { createFallbackResponse } from './orchestrator';
import type { ChatRequest, Env, ErrorResponse } from './types';

const MAX_MESSAGE_LENGTH = 4000;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function jsonResponse<TBody>(body: TBody, init: ResponseInit = {}): Response {
  return Response.json(body, {
    ...init,
    headers: {
      ...corsHeaders,
      ...init.headers,
    },
  });
}

function errorResponse(error: string, status: number, details?: string): Response {
  const body: ErrorResponse = details ? { error, details } : { error };

  return jsonResponse(body, { status });
}

async function parseChatRequest(request: Request): Promise<ChatRequest | Response> {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return errorResponse('Invalid JSON', 400);
  }

  if (!body || typeof body !== 'object') {
    return errorResponse('Missing message', 400);
  }

  const maybeBody = body as Partial<ChatRequest>;

  if (typeof maybeBody.message !== 'string' || maybeBody.message.trim().length === 0) {
    return errorResponse('Missing message', 400);
  }

  if (maybeBody.message.length > MAX_MESSAGE_LENGTH) {
    return errorResponse(
      'Message too long',
      413,
      `Maximum length is ${MAX_MESSAGE_LENGTH} characters`
    );
  }

  return {
    message: maybeBody.message.trim(),
    language: maybeBody.language,
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      if (url.pathname === '/api/health' && request.method === 'GET') {
        return jsonResponse({
          status: 'ok',
          environment: env.ENVIRONMENT ?? 'development',
        });
      }

      if (url.pathname === '/api/agents' && request.method === 'GET') {
        return jsonResponse({ agents: PILOT_AGENTS });
      }

      if (url.pathname === '/api/chat' && request.method === 'POST') {
        const parsed = await parseChatRequest(request);

        if (parsed instanceof Response) {
          return parsed;
        }

        const response = createFallbackResponse(
          parsed.message,
          parsed.language,
          Boolean(env.OPENAI_API_KEY)
        );

        return jsonResponse(response);
      }

      return errorResponse('Not found', 404);
    } catch {
      return errorResponse('Internal server error', 500);
    }
  },
};
