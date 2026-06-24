import { getAgentByIntent } from './agents';
import type { AgentMetadata, ChatResponse, Intent, LanguageCode } from './types';

const PAPIAMENTU_MARKERS = [
  'bon dia',
  'bon tardi',
  'bon nochi',
  'danki',
  'mi ta',
  'bo',
  'boso',
  'skol',
  'trabou',
  'yudansa',
  'komunidat',
];

const DUTCH_MARKERS = ['goedemorgen', 'dank je', 'school', 'werk', 'baan', 'hulp'];
const SPANISH_MARKERS = ['hola', 'gracias', 'trabajo', 'escuela', 'ayuda', 'comunidad'];

const INTENT_KEYWORDS: Record<Intent, readonly string[]> = {
  education: [
    'school',
    'skol',
    'homework',
    'tarea',
    'study',
    'studia',
    'teacher',
    'maestro',
    'student',
    'lesson',
    'math',
    'matematika',
  ],
  toolmaking: [
    'tool',
    'template',
    'form',
    'checklist',
    'workflow',
    'automate',
    'build',
    'make',
    'traha un',
    'document',
  ],
  jobs: ['job', 'jobs', 'work', 'trabou', 'career', 'cv', 'resume', 'interview', 'solicit', 'baan'],
  community: [
    'community',
    'komunidat',
    'neighborhood',
    'bario',
    'family',
    'familia',
    'support',
    'subsidy',
    'social',
    'help center',
  ],
  arrival: [],
};

export function detectLanguage(message: string, requestedLanguage?: LanguageCode): LanguageCode {
  if (requestedLanguage && requestedLanguage !== 'unknown') {
    return requestedLanguage;
  }

  const normalized = message.toLowerCase();

  if (PAPIAMENTU_MARKERS.some((marker) => normalized.includes(marker))) {
    return 'pap';
  }

  if (DUTCH_MARKERS.some((marker) => normalized.includes(marker))) {
    return 'nl';
  }

  if (SPANISH_MARKERS.some((marker) => normalized.includes(marker))) {
    return 'es';
  }

  return 'en';
}

export function classifyIntent(message: string): Intent {
  const normalized = message.toLowerCase();
  const rankedIntents = (Object.keys(INTENT_KEYWORDS) as Intent[])
    .filter((intent) => intent !== 'arrival')
    .map((intent) => ({
      intent,
      score: INTENT_KEYWORDS[intent].filter((keyword) => normalized.includes(keyword)).length,
    }))
    .sort((left, right) => right.score - left.score);

  const bestMatch = rankedIntents[0];

  return bestMatch && bestMatch.score > 0 ? bestMatch.intent : 'arrival';
}

export function selectAgent(intent: Intent): AgentMetadata {
  return getAgentByIntent(intent);
}

export function createFallbackResponse(
  message: string,
  requestedLanguage?: LanguageCode,
  mode: ChatResponse['mode'] = 'local'
): ChatResponse {
  const language = detectLanguage(message, requestedLanguage);
  const intent = classifyIntent(message);
  const agent = selectAgent(intent);
  const response = buildLocalResponse(agent, language);

  return {
    response,
    agent: {
      id: agent.id,
      name: agent.name,
      role: agent.role,
    },
    language,
    intent,
    mode,
  };
}

function buildLocalResponse(agent: AgentMetadata, language: LanguageCode): string {
  if (language === 'pap') {
    return `Bon dia! Mi ta konekta bo ku ${agent.name}. E baseline lokal a rekonose e tema, pero e konekshon ku modelo AI real ainda no ta aktivo.`;
  }

  if (language === 'nl') {
    return `Bon dia! Ik verbind je met ${agent.name}. Deze lokale baseline heeft je onderwerp herkend, maar echte AI-modelantwoorden zijn nog niet actief.`;
  }

  if (language === 'es') {
    return `Bon dia! Te conecto con ${agent.name}. Esta base local reconocio el tema, pero las respuestas reales del modelo de IA todavia no estan activas.`;
  }

  return `Bon dia! I am routing you to ${agent.name}. This local baseline recognized the topic, but real AI model responses are not active yet.`;
}
