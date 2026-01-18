/**
 * Digital Kòrsou – Boske di AI
 * Main API Entry Point
 */

export interface Env {
  OPENAI_API_KEY: string;
  NOTION_API_KEY?: string;
  ENVIRONMENT: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Routes
    try {
      // Health check
      if (path === '/api/health') {
        return Response.json(
          { status: 'ok', environment: env.ENVIRONMENT },
          { headers: corsHeaders }
        );
      }

      // List agents
      if (path === '/api/agents') {
        return Response.json(
          {
            agents: [
              { id: 'edu-gpt', name: 'EduGPT', tree: 'Kenepa', domain: 'Education' },
              { id: 'traha-gpt', name: 'TrahaGPT', tree: 'Watapana', domain: 'Employment' },
              { id: 'kultu-gpt', name: 'KultuGPT', tree: 'Divi-divi', domain: 'Culture' },
              { id: 'salu-gpt', name: 'SaluGPT', tree: 'Kadushi', domain: 'Health' },
              { id: 'lei-gpt', name: 'LeiGPT', tree: 'Manzalina', domain: 'Legal' },
              { id: 'negoshi-gpt', name: 'NegoshiGPT', tree: 'Palu di Sia', domain: 'Business' },
              { id: 'sosial-gpt', name: 'SosialGPT', tree: 'Tamarein', domain: 'Social' },
              { id: 'eko-gpt', name: 'EkoGPT', tree: 'Kibrahacha', domain: 'Environment' },
            ],
          },
          { headers: corsHeaders }
        );
      }

      // Main chat endpoint
      if (path === '/api/chat' && request.method === 'POST') {
        const body = await request.json() as { message: string; language?: string };

        // TODO: Implement orchestrator routing and agent responses
        return Response.json(
          {
            response: 'Bon dia! Digital Kòrsou ta bini pronto. Danki pa bo interes!',
            agent: 'arrival-gpt',
            language: body.language || 'pap',
          },
          { headers: corsHeaders }
        );
      }

      // 404 for unknown routes
      return Response.json(
        { error: 'Not found', path },
        { status: 404, headers: corsHeaders }
      );
    } catch (error) {
      return Response.json(
        { error: 'Internal server error' },
        { status: 500, headers: corsHeaders }
      );
    }
  },
};
