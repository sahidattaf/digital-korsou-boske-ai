# Digital Kòrsou — Boske di AI | Five-agent pilot web demo

This is an independent **90-day pilot** demonstration, not an official government service and not an approved deployment.

## Frontend and backend

- **Vercel** serves `web/public/` and server-side routes in `web/api/`.
- **Cloudflare Workers** remains the existing backend in repository `api/`, with `GET /api/health`, `GET /api/agents` and `POST /api/chat`.
- **ChatGPT private skills plugin** stays private in the ChatGPT account. Do not commit its ZIP, private references, credentials, ministry correspondence or student data.
- The frontend begins in **simulation mode**: keyword routing matches the five existing Worker intents. Simulated replies are labeled and are not AI-generated.
- If a Worker URL has been verified and configured, the UI offers a manually selected live mode. Vercel functions proxy requests server-side; no Worker URL or API secret needs to be exposed in browser JavaScript.

## Five-agent boundary

Universal Arrival GPT, EduGPT (Kenepa), ToolMakerGPT (Kadushi), JobGPT (Apeldam), CommunityGPT (Pueblo). No sixth agent is introduced during this pilot.

## Vercel preview setup

1. Use a **dedicated project** linked to `sahidattaf/digital-korsou-boske-ai`.
2. Root directory: `web`. Framework preset: Other / none. Static output directory: `public` if required by deployment settings.
3. Deploy from `feat/vercel-pilot-preview` as a **Preview**, with Vercel Authentication enabled. Do **not** merge into `main`, promote, or deploy to Production.
4. `CLOUDFLARE_API_BASE_URL` is optional and must be a verified `https://<worker>.<account>.workers.dev` origin (no path). Set **Preview-only**, directly in Vercel. Never commit or paste API keys.
5. Before switching on live mode, verify Worker health, all five agent IDs, rate limits, access controls, error handling and privacy. The existing Worker currently lacks rate limiting and uses permissive CORS.
6. Test with synthetic messages only. Never enter names, contact details, government records or student data.

## Local test commands

```sh
cd web
npm run check
npm test
```

QA coverage: 5 Papiamentu cases, 3 bilingual, 2 privacy/safety and 2 unknown-answer routing cases, plus endpoint fallback and agent count checks. A production or public launch requires additional security, browser, accessibility and governance review.

## Pilot meeting

Use `docs/pilot-deployment-and-government-demo.md` on the separate draft PR #5 for a proposed 30-minute government agenda. No official meeting or government endorsement is implied.
