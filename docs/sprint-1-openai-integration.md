# Sprint 1: OpenAI Integration

## Goal

Add safe OpenAI integration behind `/api/chat` while preserving the deterministic local fallback from Sprint 0.

Sprint 1 should make the chat endpoint capable of using OpenAI when `OPENAI_API_KEY` is configured, but the Worker must continue to behave safely when the key is absent, invalid, or when OpenAI is unavailable.

## Constraints

- Do not add new agents.
- Keep only the five pilot agents:
  - Universal Arrival GPT
  - EduGPT
  - ToolMakerGPT
  - JobGPT
  - CommunityGPT
- If `OPENAI_API_KEY` is missing, do not crash.
- If OpenAI fails, return the safe local fallback response.
- Keep code typed and testable.
- Keep `/api/chat` request validation from Sprint 0.

## Current Baseline

Sprint 0 provides:

- `GET /api/health`
- `GET /api/agents`
- `POST /api/chat`
- Shared pilot-agent metadata in `api/src/agents.ts`
- Request and response types in `api/src/types.ts`
- Local routing in `api/src/orchestrator.ts`
- Deterministic local fallback responses
- Vitest coverage for core endpoint behavior

## Sprint 1 Issues

### 1. Add OpenAI Chat Adapter

Create a small adapter module that isolates provider-specific logic from the Worker route.

Suggested scope:

- Add `api/src/openai.ts` or `api/src/adapters/openai.ts`.
- Accept typed input from the orchestrator result and chat request.
- Return the existing `ChatResponse` shape or a typed provider result that `index.ts` can convert.
- Use the selected pilot agent as routing context.
- Keep prompts short and explicit.
- Catch provider errors and let `/api/chat` return local fallback.

Acceptance criteria:

- No OpenAI call is attempted when `OPENAI_API_KEY` is missing.
- OpenAI failures do not return 500 for normal provider outages.
- Tests cover configured key, missing key, and simulated provider failure paths.

### 2. Add Environment-Based CORS Policy

Replace always-open CORS with an environment-aware policy.

Suggested scope:

- Keep permissive CORS for local development.
- Add explicit allowed origins for staging and production.
- Read allowed origins from a non-secret environment variable such as `ALLOWED_ORIGINS`.
- Return consistent CORS headers for normal and error responses.

Acceptance criteria:

- Development remains easy to run locally.
- Production can be restricted without code changes.
- OPTIONS preflight remains covered by tests.

### 3. Add Cloudflare Rate Limiting Strategy

Document and/or implement the first production rate limit approach.

Suggested scope:

- Decide whether Sprint 1 uses Cloudflare dashboard rate limiting, Turnstile, Workers KV/Durable Object counters, or a later-phase approach.
- For Sprint 1, prefer a simple documented strategy unless abuse protection must ship immediately.
- Define limits by route, especially `/api/chat`.
- Include how limits differ between development, staging, and production.

Acceptance criteria:

- Production deployment checklist names the rate limiting approach.
- The app has a clear next step before public launch.

### 4. Add Production Deployment Checklist

Create a checklist for deploying the Worker safely.

Suggested scope:

- Wrangler login and deploy steps.
- Required secrets:
  - `OPENAI_API_KEY`
- Required vars:
  - `ENVIRONMENT`
  - `ALLOWED_ORIGINS` if implemented
- Verification commands:
  - `pnpm run typecheck`
  - `pnpm run lint`
  - `pnpm run test`
  - `pnpm run format:check`
- Smoke tests for `/api/health`, `/api/agents`, and `/api/chat`.
- Rollback notes.

Acceptance criteria:

- A maintainer can deploy without guessing which secrets or vars are needed.
- The checklist does not claim features that are not implemented.

### 5. Add Pilot-Agent Test Prompts

Add deterministic prompts that verify routing and fallback behavior for the five pilot agents.

Suggested scope:

- Add test prompts for:
  - Universal Arrival GPT
  - EduGPT
  - ToolMakerGPT
  - JobGPT
  - CommunityGPT
- Include Papiamentu and English examples where useful.
- Use prompts in tests to prevent routing regressions.

Acceptance criteria:

- Each pilot agent has at least one prompt that routes to it.
- Tests verify fallback behavior still works when OpenAI is unavailable.

## Proposed Implementation Order

1. Add pilot-agent prompt fixtures and routing tests.
2. Add OpenAI adapter interface with mocked tests.
3. Wire `/api/chat` to use OpenAI only when `OPENAI_API_KEY` exists.
4. Add provider failure fallback tests.
5. Add environment-based CORS policy.
6. Document production deployment and rate limiting strategy.

## Risks

- Prompt changes could make tests brittle if they assert full model text. Prefer testing routing, response shape, and fallback behavior rather than exact OpenAI prose.
- OpenAI calls from Cloudflare Workers may require dependency and bundle checks before deployment.
- Production CORS and rate limiting decisions need the real frontend/domain plan.

## Definition of Done

- `/api/chat` uses OpenAI only when configured.
- Missing or failing OpenAI returns deterministic local fallback.
- The five pilot agents remain the only active agents.
- Tests cover local fallback, OpenAI success via mock, and OpenAI failure via mock.
- Deployment checklist and rate limiting strategy are documented.
