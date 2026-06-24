import type { AgentMetadata, ChatRequest, ChatResponse } from './types';

const OPENAI_CHAT_COMPLETIONS_URL = 'https://api.openai.com/v1/chat/completions';
const OPENAI_MODEL = 'gpt-4o-mini';
const OPENAI_TIMEOUT_MS = 8000;

interface OpenAIChatMessage {
  role: 'system' | 'user';
  content: string;
}

interface OpenAIChatChoice {
  message?: {
    content?: string | null;
  };
}

interface OpenAIChatResponse {
  choices?: OpenAIChatChoice[];
}

export interface OpenAIChatInput {
  apiKey: string;
  request: ChatRequest;
  fallback: ChatResponse;
}

export async function createOpenAIChatResponse(input: OpenAIChatInput): Promise<ChatResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), OPENAI_TIMEOUT_MS);

  try {
    const response = await fetch(OPENAI_CHAT_COMPLETIONS_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${input.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        temperature: 0.4,
        max_tokens: 450,
        messages: buildMessages(
          input.request.message,
          input.fallback.agent,
          input.fallback.language
        ),
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error('OpenAI request failed');
    }

    const data = (await response.json()) as OpenAIChatResponse;
    const content = data.choices?.[0]?.message?.content?.trim();

    if (!content) {
      throw new Error('OpenAI response was empty');
    }

    return {
      ...input.fallback,
      response: content,
      mode: 'openai',
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

function buildMessages(
  userMessage: string,
  agent: Pick<AgentMetadata, 'name' | 'role'>,
  language: ChatResponse['language']
): OpenAIChatMessage[] {
  return [
    {
      role: 'system',
      content: buildSystemPrompt(agent, language),
    },
    {
      role: 'user',
      content: userMessage,
    },
  ];
}

function buildSystemPrompt(
  agent: Pick<AgentMetadata, 'name' | 'role'>,
  language: ChatResponse['language']
): string {
  return [
    `You are ${agent.name}, ${agent.role} for Digital Korsou in Curacao.`,
    'Be warm, concise, culturally grounded, and practical.',
    'Use Papiamentu first when appropriate; otherwise answer in the user language.',
    'Only support the current user request. Do not store or ask for unnecessary personal data.',
    'If the request needs professional, legal, medical, or emergency help, give safe general guidance and suggest a qualified local professional.',
    `Detected language: ${language}.`,
  ].join(' ');
}
