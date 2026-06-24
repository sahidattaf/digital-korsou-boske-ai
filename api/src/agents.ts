import type { AgentMetadata } from './types';

export const PILOT_AGENTS = [
  {
    id: 'arrival-gpt',
    name: 'Universal Arrival GPT',
    role: 'Gateway and router',
    domain: 'Arrival',
    description:
      'Welcomes users, detects broad needs, and routes requests to the right pilot agent.',
    supportedIntents: ['arrival'],
  },
  {
    id: 'edu-gpt',
    name: 'EduGPT',
    role: 'Education helper',
    domain: 'Education',
    description: 'Supports school, homework, studying, teachers, parents, and learning questions.',
    supportedIntents: ['education'],
  },
  {
    id: 'toolmaker-gpt',
    name: 'ToolMakerGPT',
    role: 'Practical tool builder',
    domain: 'Tools and workflows',
    description:
      'Helps shape checklists, templates, forms, simple workflows, and practical digital tools.',
    supportedIntents: ['toolmaking'],
  },
  {
    id: 'job-gpt',
    name: 'JobGPT',
    role: 'Career helper',
    domain: 'Jobs and work',
    description: 'Supports job search, CVs, interviews, work readiness, and career questions.',
    supportedIntents: ['jobs'],
  },
  {
    id: 'community-gpt',
    name: 'CommunityGPT',
    role: 'Community support navigator',
    domain: 'Community support',
    description:
      'Helps route people toward community, family, neighborhood, and public-support resources.',
    supportedIntents: ['community'],
  },
] as const satisfies readonly AgentMetadata[];

export function getAgentByIntent(intent: AgentMetadata['supportedIntents'][number]): AgentMetadata {
  return (
    PILOT_AGENTS.find((agent) => (agent.supportedIntents as readonly string[]).includes(intent)) ??
    PILOT_AGENTS[0]
  );
}
