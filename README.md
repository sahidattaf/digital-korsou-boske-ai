# Digital Korsou - Boske di AI

**AI ku Rais den Pueblo**

Digital Korsou is a Papiamentu-first AI platform concept for Curacao. This repository now contains a minimal Cloudflare Worker baseline that can route chat requests to a small pilot set of agents without requiring a live model provider.

## Current Status

This repo is an early working baseline, not a complete production AI product.

Currently implemented:

- Cloudflare Worker API in `api/`
- `GET /api/health`
- `GET /api/agents`
- `POST /api/chat`
- `OPTIONS` CORS preflight handling
- Request validation for invalid JSON, missing messages, and oversized messages
- Local language detection, intent classification, and agent selection
- Safe local responses when `OPENAI_API_KEY` is not configured
- TypeScript, ESLint, Prettier, and Vitest configuration
- API tests for the implemented endpoints

Not implemented yet:

- Real OpenAI responses
- Persistent conversation memory
- Notion or database-backed knowledge retrieval
- User accounts or rate limiting
- Frontend UI
- Direct per-agent chat routes such as `/api/chat/edu`

## Pilot Agents

Only these five pilot agents are part of the runnable API baseline:

| Agent | Role | Current behavior |
| --- | --- | --- |
| Universal Arrival GPT | Welcome and routing | Default/fallback router |
| EduGPT | Education support | Selected for school, homework, study, and learning intents |
| ToolMakerGPT | Tool and workflow support | Selected for forms, templates, checklists, and practical tools |
| JobGPT | Work and career support | Selected for jobs, CVs, interviews, and career intents |
| CommunityGPT | Community support navigation | Selected for social services, neighborhood, family, and public-support intents |

Older Markdown files in `agents/` describe broader ecosystem ideas. They are useful concept notes, but they are not all active API agents.

## API

### `GET /api/health`

Returns Worker health and environment metadata.

```json
{
  "status": "ok",
  "environment": "development"
}
```

### `GET /api/agents`

Returns the five pilot agents from `api/src/agents.ts`.

### `POST /api/chat`

Request:

```json
{
  "message": "Bon dia! Mi ta buska yudansa ku mi tarea di skol.",
  "language": "pap"
}
```

Response when no `OPENAI_API_KEY` is configured:

```json
{
  "response": "Bon dia! Mi ta konekta bo ku EduGPT...",
  "agent": {
    "id": "edu-gpt",
    "name": "EduGPT"
  },
  "language": "pap",
  "intent": "education",
  "mode": "local"
}
```

Validation:

- Invalid JSON returns `400`
- Missing or empty `message` returns `400`
- Messages over 4000 characters return `413`

## Development

Prerequisites:

- Node.js 18+
- pnpm
- Cloudflare account for deployment
- OpenAI API key only when real model responses are added

Install and run:

```bash
cd api
pnpm install
pnpm run dev
```

Quality checks:

```bash
cd api
pnpm run typecheck
pnpm run lint
pnpm run test
pnpm run format:check
```

Deploy:

```bash
cd api
npx wrangler login
pnpm run deploy
```

Secrets should be configured with Wrangler, not committed:

```bash
cd api
npx wrangler secret put OPENAI_API_KEY
```

## Repository Structure

```text
digital-korsou-boske-ai/
├── api/
│   ├── src/
│   │   ├── agents.ts
│   │   ├── index.ts
│   │   ├── orchestrator.ts
│   │   └── types.ts
│   ├── tests/
│   │   └── index.test.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── vitest.config.ts
│   └── wrangler.toml
├── agents/              # Concept notes, not all active API agents
├── brand/               # Brand notes
├── docs/                # Supporting documentation
├── language/            # Language notes
└── orchestrator/        # Concept notes for routing
```

## Roadmap

Near-term:

- Add real OpenAI integration behind the existing typed chat response
- Add rate limiting and safer production CORS configuration
- Add structured prompt files for only the five pilot agents
- Add deployment documentation once production settings are chosen

Later:

- Knowledge retrieval from curated local data
- Conversation persistence
- Frontend UI
- Expanded agent ecosystem after the pilot is validated

## Contributing

Contributions should keep Papiamentu and Curacao context central. Language and cultural content should be reviewed by native speakers or trusted local reviewers whenever possible.

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT. See [LICENSE](LICENSE).
