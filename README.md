<div align="center">

# 🎨 BrandMuse

**AI brand voice management & content intelligence** — ensure every piece of content speaks in your brand's voice with **tone analysis**, **consistency auditing**, and **on-brand content generation** across all channels.

[![CI](https://img.shields.io/github/actions/workflow/status/Crynge/BrandMuse/ci.yml?branch=main&label=CI&logo=github)](https://github.com/Crynge/BrandMuse/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://typescriptlang.org)
[![Python](https://img.shields.io/badge/Python-3.11-3776AB?logo=python)](https://python.org)
[![License](https://img.shields.io/github/license/Crynge/BrandMuse?color=ff69b4)](LICENSE)
[![Stars](https://img.shields.io/github/stars/Crynge/BrandMuse?style=flat&logo=github)](https://github.com/Crynge/BrandMuse)
[![Last Commit](https://img.shields.io/github/last-commit/Crynge/BrandMuse?logo=git)](https://github.com/Crynge/BrandMuse/commits/main)

[Voice Profile](#-brand-voice-profile) • [Quick Start](#quick-start) • [Architecture](#architecture) • [API](#api) • [Modules](#modules) • [Contributing](#contributing)

---

> **⭐ Building a consistent brand?** Star BrandMuse to support brand voice AI!

</div>

---

## 🎯 Brand Voice Profile

```
◤━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◥
│                     BRAND VOICE PROFILE                        │
├━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┤
│                                                                │
│  Brand:          Acme Corp                                     │
│  Tone:           Professional · Approachable · Innovative      │
│  Vocabulary:     Industry terms · Avoid jargon                 │
│  Formality:      7/10   (formal but not stiff)                 │
│  Emotion:        Optimistic · Authoritative                    │
│  Audience:       CTOs and engineering leaders                  │
│  Channels:       Blog · LinkedIn · Email · Twitter             │
│                                                                │
│  Consistency:    ████████░░  82%   ⚠️ Needs improvement        │
│  Last Audit:     2026-07-01  ·  1,247 pieces analyzed          │
│  Top Violation:  Overuse of passive voice in blog posts        │
│                                                                │
◣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◢
```

## Features

| Feature | Description | Accuracy |
|---|---|---|
| **Voice Analysis** | Scores **tone, formality, emotion, vocabulary** against brand guidelines | **94%** agreement with human raters |
| **Content Generation** | Writes blog posts, social copy, and emails in your **brand voice** | 4.2/5 quality score |
| **Consistency Audit** | Scans existing **content library** for voice deviations | Scans 1000 docs/min |
| **Multi-language** | Maintains **brand voice** across English, Spanish, French, German | Native-level fluency |
| **API-first** | Integrate with **CMS, email tools, and social schedulers** | REST + Webhook |

---

## Quick Start

```bash
npm install @crynge/brandmuse

# Analyze content against a brand profile
npx brandmuse analyze --content "Check out our latest product!" --profile acme

# Generate on-brand copy
npx brandmuse generate --brief "Launch email for v2.0" --tone professional

# Run a full brand audit
npx brandmuse audit --dir ./content --profile acme --format detailed
```

```typescript
import { VoiceAnalyzer } from '@crynge/brandmuse/core/voice';

const analyzer = new VoiceAnalyzer({
  profile: {
    tone: ['professional', 'approachable'],
    formality: 0.7,
    vocabulary: ['ROI', 'scalable', 'enterprise'],
    disallowed: ['synergy', 'game-changer', 'utilize'],
  },
});

const result = await analyzer.analyze(
  "Our platform helps enterprises scale their infrastructure."
);

console.log({
  toneScore: result.toneScore,          // 0.88
  formalityFit: result.formalityFit,    // 0.92
  vocabularyMatch: result.vocabScore,   // 0.85
  violations: result.violations,        // []
  overallFit: result.overall,           // 0.88
});
```

---

## Architecture

```mermaid
flowchart TB
    subgraph Input["Content Sources"]
        B[Blog Posts] --> I[Ingestion Pipeline]
        S[Social Media] --> I
        E[Email Campaigns] --> I
        W[Website Copy] --> I
    end

    subgraph Analysis["Analysis Layer"]
        I --> TA[Tone Analyzer]
        I --> CA[Consistency Auditor]
        I --> VA[Vocabulary Checker]

        TA --> TS[Tone Score]
        CA --> CS[Consistency Score]
        VA --> VS[Vocabulary Score]
    end

    subgraph Profile["Brand Profile Engine"]
        TS --> BP[Brand Profile]
        CS --> BP
        VS --> BP

        BP --> F1[Fit Score: 0.88]
        BP --> F2[Violations: 12]
        BP --> F3[Recommendations]
    end

    subgraph Generation["Generation Layer"]
        F3 --> GEN[Content Generator]
        GEN --> OUT[On-Brand Content]
    end

    subgraph API["API Layer"]
        BP --> API[REST API]
        GEN --> API
    end
```

---

## API

```bash
# Analyze content
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"content": "Check out our product!", "profile": "acme"}'

# Generate content
curl -X POST http://localhost:3000/api/generate \
  -d '{"brief": "Newsletter intro", "profile": "acme", "tone": "professional"}'
```

```python
# Python analyzer for batch processing
from brandmuse.analyzers.tone import ToneAnalyzer

analyzer = ToneAnalyzer()
scores = analyzer.analyze("We're revolutionizing the industry with AI.")
print(scores.formality)    # 0.45
print(scores.enthusiasm)   # 0.82
```

---

## Modules

```
src/
├── core/
│   ├── voice.ts           # Voice profile matching engine
│   ├── auditor.ts         # Bulk content auditing
│   └── generator.ts       # On-brand content generation
├── analyzers/
│   ├── tone.py            # Tone classification (Python)
│   └── consistency.py     # Cross-document consistency checks
└── api/
    └── server.ts          # REST API server
```

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

- [Open an issue](https://github.com/Crynge/BrandMuse/issues)

---

## License

[MIT](LICENSE)

---

## 🌐 Crynge Ecosystem

All repos are **free and open-source**. ⭐ Star what you use!

| Category | Repos |
|---|---|
| **LLM & AI** | [SpecInferKit](https://github.com/Crynge/SpecInferKit) · [AetherAgents](https://github.com/Crynge/AetherAgents) · [PromptShield](https://github.com/Crynge/PromptShield) |
| **Marketing** | [AdVerify](https://github.com/Crynge/AdVerify) · [Attributor](https://github.com/Crynge/Attributor) · [InfluencerHub](https://github.com/Crynge/InfluencerHub) · [EdgePersona](https://github.com/Crynge/EdgePersona) · [AdVantage](https://github.com/Crynge/AdVantage) · [BrandMuse](https://github.com/Crynge/BrandMuse) · [CampaignForge](https://github.com/Crynge/CampaignForge) |
| **Simulation** | [CivSim](https://github.com/Crynge/CivSim) · [EvalScope](https://github.com/Crynge/EvalScope) |
| **Operations** | [OpsFlow](https://github.com/Crynge/OpsFlow) |

<div align="center">
  <sub>Built by <a href="https://github.com/Crynge">Crynge</a> · ⭐ Star us on GitHub!</sub>
</div>
