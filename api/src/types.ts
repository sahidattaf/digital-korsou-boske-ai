export type LanguageCode = 'pap' | 'en' | 'nl' | 'es' | 'unknown';

export type Intent = 'arrival' | 'education' | 'toolmaking' | 'jobs' | 'community';

export type AgentId = 'arrival-gpt' | 'edu-gpt' | 'toolmaker-gpt' | 'job-gpt' | 'community-gpt';

export interface AgentMetadata {
  id: AgentId;
  name: string;
  role: string;
  domain: string;
  description: string;
  supportedIntents: Intent[];
}

export interface ChatRequest {
  message: string;
  language?: LanguageCode;
}

export interface ChatResponse {
  response: string;
  agent: Pick<AgentMetadata, 'id' | 'name' | 'role'>;
  language: LanguageCode;
  intent: Intent;
  mode: 'local' | 'openai-ready';
}

export interface ErrorResponse {
  error: string;
  details?: string;
}

export interface Env {
  OPENAI_API_KEY?: string;
  NOTION_API_KEY?: string;
  ENVIRONMENT?: string;
}
