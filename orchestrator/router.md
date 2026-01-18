# Orchestrator – Central Router

**The Root System of the Boske di AI**

---

## Overview

The Orchestrator is the central nervous system of Digital Kòrsou. It connects all agents, routes user requests, and maintains conversation context across the ecosystem.

---

## Core Functions

### 1. Intent Detection
Analyze user input to determine:
- Language preference
- Topic category
- User type (student, professional, etc.)
- Urgency level

### 2. Agent Routing
Match intent to the appropriate specialized agent:

| Intent Category | Target Agent |
|-----------------|--------------|
| Education, learning, school | EduGPT |
| Jobs, career, employment | TrahaGPT |
| Culture, history, language | KultuGPT |
| Health, wellness | SaluGPT |
| Legal, rights | LeiGPT |
| Business, entrepreneurship | NegoshiGPT |
| Social services | SosialGPT |
| Environment | EkoGPT |

### 3. Context Management
- Maintain conversation history
- Pass relevant context to agents
- Handle multi-turn conversations
- Manage agent handoffs

### 4. Fallback Handling
- Handle ambiguous requests
- Request clarification when needed
- Provide general responses when no agent fits

---

## Routing Logic

```
Input → Language Detection → Intent Classification → Agent Selection → Response
```

### Decision Tree

1. **Is language clear?**
   - Yes → Continue
   - No → Default to Papiamentu

2. **Is intent clear?**
   - Yes → Route to agent
   - No → Ask clarifying question

3. **Does single agent fit?**
   - Yes → Route directly
   - No → Present options or use Arrival GPT

---

## API Integration

### Internal Routing Endpoint
```
POST /api/internal/route
```

### Request
```json
{
  "message": "User message",
  "detected_language": "pap",
  "conversation_id": "session-123",
  "context": {}
}
```

### Response
```json
{
  "target_agent": "edu-gpt",
  "confidence": 0.92,
  "context": {
    "intent": "homework_help",
    "subject": "mathematics"
  }
}
```

---

## Implementation Notes

- Use embedding-based intent classification
- Maintain keyword fallbacks for reliability
- Log routing decisions for improvement
- Handle agent unavailability gracefully

---

*Part of Digital Kòrsou – Boske di AI*
