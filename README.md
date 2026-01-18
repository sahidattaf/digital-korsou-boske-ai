# Digital Kòrsou – Boske di AI

**AI ku Raís den Pueblo**

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Papiamentu First](https://img.shields.io/badge/Language-Papiamentu%20First-orange.svg)](#)
[![Cloudflare Workers](https://img.shields.io/badge/Platform-Cloudflare%20Workers-blue.svg)](#)

---

## Kiko ta Boske di AI?

The **Boske di AI** (AI Forest) is a community-rooted artificial intelligence ecosystem designed for Curaçao. Each AI agent is symbolized by a native tree or natural element from the island, creating a digital forest where technology grows from cultural soil.

This is not just software. This is a digital movement.

---

## Vision

> *Empower the people of Curaçao with accessible, human-centered AI that respects culture, language, and community values.*

**Papiamentu is a first-class language.** Every agent speaks the mother tongue before any other.

---

## The Forest Ecosystem

### Universal Arrival GPT – The Landing Point
The entry portal to the ecosystem. Symbolically arrives from the sky and roots itself in the island. Routes users to the right agent in Papiamentu, Dutch, English, or Spanish.

### The Trees (AI Agents)

| Tree | Agent | Domain | Description |
|------|-------|--------|-------------|
| Kenepa | **EduGPT** | Education | Learning support for students, teachers, parents |
| Watapana | **TrahaGPT** | Employment | Job search, CV building, career guidance |
| Divi-divi | **KultuGPT** | Culture & Heritage | Language, history, traditions, music |
| Kadushi | **SaluGPT** | Health & Wellness | Mental health, medical info, healthy living |
| Manzalina | **LeiGPT** | Legal & Ethics | Rights, legal procedures, civic information |
| Palu di Sia | **NegoshiGPT** | Business | Entrepreneurship, local business support |
| Tamarein | **SosialGPT** | Social Support | Community aid, subsidies, social services |
| Kibrahacha | **EkoGPT** | Sustainability | Environment, recycling, green initiatives |

### The Roots (Infrastructure)

| Component | Function |
|-----------|----------|
| **Orchestrator** | Central router connecting all agents |
| **Language Core** | Papiamentu NLP, translations, terminology |
| **Knowledge Base** | Notion databases, local datasets, structured info |
| **API Layer** | Cloudflare Workers endpoints |

---

## Architecture

```
                    ┌─────────────────────┐
                    │   Universal Arrival │
                    │        GPT          │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │    Orchestrator     │
                    │   (Central Router)  │
                    └──────────┬──────────┘
                               │
        ┌──────────────────────┼──────────────────────┐
        │          │           │           │          │
   ┌────▼────┐ ┌───▼───┐ ┌────▼────┐ ┌────▼────┐ ┌───▼───┐
   │ EduGPT  │ │TrahaGPT│ │KultuGPT │ │ SaluGPT │ │ ...   │
   │ Kenepa  │ │Watapana│ │Divi-divi│ │ Kadushi │ │       │
   └────┬────┘ └───┬───┘ └────┬────┘ └────┬────┘ └───┬───┘
        │          │           │           │          │
        └──────────┴───────────┼───────────┴──────────┘
                               │
                    ┌──────────▼──────────┐
                    │   Knowledge Base    │
                    │  (Notion + Datasets)│
                    └─────────────────────┘
```

---

## Repository Structure

```
digital-korsou-boske-ai/
│
├── README.md                    # This file
├── LICENSE                      # MIT License
├── CONTRIBUTING.md              # Contribution guidelines
│
├── agents/                      # AI Agent definitions
│   ├── arrival/                 # Universal Arrival GPT
│   │   ├── arrival-gpt.md
│   │   └── prompts/
│   ├── education/               # EduGPT – Kenepa
│   │   ├── edu-gpt.md
│   │   └── prompts/
│   ├── employment/              # TrahaGPT – Watapana
│   │   ├── traha-gpt.md
│   │   └── prompts/
│   ├── culture/                 # KultuGPT – Divi-divi
│   │   ├── kultu-gpt.md
│   │   └── prompts/
│   ├── health/                  # SaluGPT – Kadushi
│   │   ├── salu-gpt.md
│   │   └── prompts/
│   ├── legal/                   # LeiGPT – Manzalina
│   │   ├── lei-gpt.md
│   │   └── prompts/
│   ├── business/                # NegoshiGPT – Palu di Sia
│   │   ├── negoshi-gpt.md
│   │   └── prompts/
│   ├── social/                  # SosialGPT – Tamarein
│   │   ├── sosial-gpt.md
│   │   └── prompts/
│   └── sustainability/          # EkoGPT – Kibrahacha
│       ├── eko-gpt.md
│       └── prompts/
│
├── orchestrator/                # Central routing system
│   ├── router.md
│   ├── intent-detection.md
│   └── prompts/
│
├── language/                    # Papiamentu language resources
│   ├── dictionary/              # Papiamentu terminology
│   ├── grammar/                 # Grammar rules and patterns
│   ├── translations/            # Translation pairs
│   └── nlp/                     # NLP processing configs
│
├── knowledge/                   # Knowledge base content
│   ├── education/               # Educational datasets
│   ├── government/              # Government info, procedures
│   ├── culture/                 # Cultural knowledge
│   ├── health/                  # Health information
│   └── business/                # Business resources
│
├── api/                         # Cloudflare Workers API
│   ├── src/
│   │   ├── index.ts             # Main entry point
│   │   ├── routes/              # API routes
│   │   ├── handlers/            # Request handlers
│   │   └── utils/               # Utilities
│   ├── wrangler.toml            # Cloudflare config
│   └── package.json
│
├── brand/                       # Visual identity
│   ├── logo/                    # Logo files
│   ├── colors.md                # Color palette
│   ├── typography.md            # Font guidelines
│   └── assets/                  # Images, icons
│
├── docs/                        # Documentation
│   ├── getting-started.md       # Quick start guide
│   ├── architecture.md          # System architecture
│   ├── deployment.md            # Deployment guide
│   ├── agents/                  # Agent-specific docs
│   └── api/                     # API documentation
│
├── notion/                      # Notion integration
│   ├── schemas/                 # Database schemas
│   ├── templates/               # Page templates
│   └── sync/                    # Sync configurations
│
├── tests/                       # Test suites
│   ├── agents/                  # Agent tests
│   ├── api/                     # API tests
│   └── language/                # Language processing tests
│
└── scripts/                     # Utility scripts
    ├── setup.sh                 # Initial setup
    ├── deploy.sh                # Deployment script
    └── sync-notion.sh           # Notion sync
```

---

## Core Principles

### 1. Language First
Papiamentu is not a translation—it is the primary language. Every interaction begins in the mother tongue.

### 2. Human Before Tech
AI supports people, it does not replace them. Technology serves the community, not the other way around.

### 3. Community Driven
Built for schools, barrios, local businesses, and every person on the island. Designed with input from the people.

### 4. Open & Modular
Easy to extend, adapt, and contribute to. New agents can be planted in the forest.

### 5. Culturally Rooted
Every symbol, name, and metaphor comes from Curaçao. The digital reflects the physical.

---

## Technology Stack

| Layer | Technology |
|-------|------------|
| **AI Models** | OpenAI GPT-4 / GPT-4o / Compatible providers |
| **API & Hosting** | Cloudflare Workers |
| **Knowledge Base** | Notion API, Markdown files |
| **Language Processing** | Custom Papiamentu NLP layer |
| **Frontend** | Web components (future) |
| **Database** | Cloudflare D1 / KV |

---

## Quick Start

### Prerequisites
- Node.js 18+
- Cloudflare account
- OpenAI API key
- Notion API key (optional)

### Installation

```bash
# Clone the repository
git clone https://github.com/sahidattaf/digital-korsou-boske-ai.git
cd digital-korsou-boske-ai

# Install dependencies
cd api && npm install

# Configure environment
cp .env.example .env
# Edit .env with your API keys

# Run locally
npm run dev
```

### Deploy to Cloudflare

```bash
# Login to Cloudflare
npx wrangler login

# Deploy
npm run deploy
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/chat` | Main chat endpoint |
| POST | `/api/chat/edu` | Direct to EduGPT |
| POST | `/api/chat/traha` | Direct to TrahaGPT |
| GET | `/api/agents` | List available agents |
| GET | `/api/health` | Health check |

### Example Request

```bash
curl -X POST https://api.digitalkorsou.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Bon dia! Mi ta buska yudansa ku mi tarea di skol.",
    "language": "pap"
  }'
```

---

## Contributing

We welcome contributors who respect:

- **Cultural context** – Understand Curaçao before coding
- **Language accuracy** – Papiamentu is precious, treat it carefully
- **Ethical AI use** – No harmful applications

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-agent`)
3. Make your changes
4. Submit a pull request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

## Roadmap

### Phase 1: Foundation
- [x] Repository structure
- [x] Core documentation
- [ ] EduGPT agent (Kenepa)
- [ ] Universal Arrival GPT
- [ ] Basic API infrastructure

### Phase 2: Growth
- [ ] TrahaGPT agent (Watapana)
- [ ] KultuGPT agent (Divi-divi)
- [ ] Orchestrator implementation
- [ ] Notion integration

### Phase 3: Forest
- [ ] All 8 agents operational
- [ ] Public API launch
- [ ] Community feedback integration
- [ ] Mobile-friendly interface

### Phase 4: Ecosystem
- [ ] Third-party agent support
- [ ] Multi-island expansion
- [ ] Advanced Papiamentu NLP
- [ ] Voice interface

---

## Community

- **Website:** [digitalkorsou.com](https://digitalkorsou.com) (coming soon)
- **Contact:** digitalkorsou@proton.me
- **Location:** Kòrsou, Caribbean

---

## License

This project is licensed under the MIT License – see [LICENSE](LICENSE) for details.

---

## Acknowledgments

- The people of Curaçao
- Local educators, businesses, and community leaders
- Open source AI community
- Everyone who believes AI should grow like a tree: slowly, rooted, and for everyone

---

<p align="center">
  <strong>🌳 AI ku Raís den Pueblo 🌳</strong><br>
  <em>Digital Kòrsou Taskforce</em>
</p>
