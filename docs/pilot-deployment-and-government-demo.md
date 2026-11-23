# Digital Kòrsou — 90-day pilot deployment and government demo plan

Status: **proposal for review**, not a deployed system or government-approved partnership.
Owner: Digital Kòrsou / GPT Innovation by Attaf.
Scope: **Only 5 pilot agents**. No additions during the pilot.

## Canonical architecture

```text
WhatsApp / browser
  -> Universal Arrival GPT (language, intent, consent, routing)
  -> Cloudflare Worker API (repo: api/, /api/chat)
  -> one of EduGPT / ToolMakerGPT / JobGPT / CommunityGPT
  -> curated knowledge (future; no live NotebookLM integration claimed)
  -> privacy-minimized aggregate pilot metrics (future Google Sheets integration)
```

- **ChatGPT private plugin**: `digital-korsou-pilot-skills` v0.1.0, installed privately in ChatGPT. It stores reusable operating instructions and QA guidance. **Do not commit its full ZIP to the public repo, expose private references, or deploy it as a Vercel server.** This document only records compatible public pilot requirements.
- **Cloudflare**: Retain `api/` Worker as the pilot routing/backend baseline; `wrangler.toml` has development, staging, and production environments. No production credentials belong in Git.
- **Vercel**: Optional separately developed **web frontend**, not a replacement for the Worker. Link an explicitly selected Vercel project and Git branch only after verifying the project, repository, domain, build and environment settings. Use a preview deployment before any production release.
- **Knowledge**: NotebookLM-curated documents may guide approved content but do not imply a direct API connection.
- **Metrics**: Google Sheets is the proposed pilot KPI sink; do not claim that telemetry or Sheets syncing is live.
- **Privacy**: No secret keys, personal profiles, chat transcripts, government correspondence or student records in the public repo or frontend. Keep a human review/consent process and aggregate or minimize data.
- **Pilot discipline**: All instructions are advisory; no legal/medical advice, guaranteed outcome, or autonomous government outreach.

## Existing API contract (inspect before changes)

- `GET /api/health`
- `GET /api/agents`
- `POST /api/chat`
- Local routing and safe fallback work without `OPENAI_API_KEY`.
- Current README explicitly lists **no frontend, no persistence, no rate limiting, and no Notion/database-backed retrieval**.
- Test existing Worker endpoints in staging before integrating a frontend. Verify allowed CORS origins, request size limits and safe error behavior.

## Government demo — 30-minute meeting agenda

| Min | Segment | Evidence / demonstration |
| --- | --- | --- |
| 0–3 | Introduction | Independent project, Curaçao goals, 90-day pilot boundaries |
| 3–7 | Local need and governance | Papiamentu-first, privacy, teacher/community oversight |
| 7–17 | Live guided demo | Arrival -> EduGPT -> ToolMakerGPT -> JobGPT -> CommunityGPT, with synthetic prompts |
| 17–22 | 90-day implementation | Foundation, Launch & Learn, Iterate & Expand; no added agents |
| 22–26 | Measurement | Routed requests, comprehension feedback, completed workshop activities, safety cases, latency and escalations |
| 26–30 | Questions and next steps | Ask for exploratory owner/contact, review process, potential pilot venue |

## Five safe demonstration prompts

1. **Universal Arrival:** "Bon dia, mi no sa kua tipo di yudansa mi mester. Bo por guia mi?"
2. **EduGPT (Kenepa):** "Splika kon energía solar ta traha na Papiamentu pa un alumno di skol."
3. **ToolMakerGPT (Kadushi):** "Yudami traha un checklist pa un negoshi chikí registrá su ordennan sin kolektá dato sensitiv."
4. **JobGPT (Apeldam):** "Duna mi un modelo di CV pa un trabou di front desk; no inventa oferta di trabou."
5. **CommunityGPT (Pueblo):** "Kon un bario por organisá un taller di AI ku partisipashon voluntario?"

Use fictional examples only. If an answer requires current facts or a verified institution, state the limits and propose how to verify.

## Evaluation gates before public demo

- [ ] Exact demo branch, API environment and frontend project identified
- [ ] Five-agent routing verified; fallback works for unknown intent
- [ ] 5 Papiamentu, 3 bilingual, 2 privacy/safety and 2 unknown-answer tests completed
- [ ] No personal data or secrets in sample payloads and logs
- [ ] Source provenance and government-neutral claims reviewed
- [ ] Preview accessible to authorized reviewers; no accidental production promotion
- [ ] Human operator and rollback path ready

## Government contact handling

An introductory email and follow-up Executive One-Pager were sent to OWCS in November 2026. Sending does **not** imply receipt, endorsement or meeting acceptance. Do not publish the email thread or attach internal plugin files. Any outreach to MEO or BPD/DID requires an appropriate contact and review.

## Recommended next implementation

1. Stabilize the existing Cloudflare Worker and its tests (including 12 QA cases).
2. Build a small Papiamentu-first frontend compatible with the documented API; create a Vercel **preview** on a reviewed branch.
3. Add opt-in, anonymous or aggregated pilot metrics only after governance and data-flow review.
