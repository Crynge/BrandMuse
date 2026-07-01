[![CI](https://github.com/Crynge/BrandMuse/actions/workflows/ci.yml/badge.svg)](https://github.com/Crynge/BrandMuse/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6)](https://typescriptlang.org)
[![Python](https://img.shields.io/badge/Python-3.11-3776AB)](https://python.org)

# BrandMuse

**AI brand voice management & content intelligence.**

Ensure every piece of content speaks in your brand's voice — consistently, authentically, and at scale. BrandMuse analyzes tone, generates on-brand copy, and audits content against your brand guidelines.

---

## Brand Voice Profile

```
◤━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◥
│                     VOICE PROFILE                            │
│━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                              │
│  Brand:      Acme Corp                                       │
│  Tone:       Professional · Approachable · Innovative       │
│  Vocabulary: Industry terms · Avoid jargon                   │
│  Formality:  7/10 (formal but not stiff)                     │
│  Emotion:    Optimistic · Authoritative                      │
│  Audience:   CTOs and engineering leaders                    │
│                                                              │
|  Consistency Score: ████████░░ 82%  (needs improvement)     |
|                                                              |
◣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━◢
```

## Features

- **Voice Analysis** — Scores tone, formality, emotion, and vocabulary against brand guidelines
- **Content Generation** — Writes blog posts, social copy, and emails in your brand voice
- **Consistency Audit** — Scans existing content library for voice deviations
- **Multi-language** — Maintains brand voice across English, Spanish, French, and German
- **API-first** — Integrate with CMS platforms, email tools, and social schedulers

## Usage

```bash
npm install @crynge/brandmuse

# Analyze a piece of content
npx brandmuse analyze --content "Check out our latest product!" --profile acme

# Generate on-brand copy
npx brandmuse generate --brief "Launch email for v2.0" --tone professional
```

```typescript
import { VoiceAnalyzer } from '@crynge/brandmuse/core/voice';

const analyzer = new VoiceAnalyzer({
  profile: {
    tone: ['professional', 'approachable'],
    formality: 0.7,
    vocabulary: ['ROI', 'scalable', 'enterprise'],
    disallowed: ['synergy', 'game-changer'],
  },
});

const result = await analyzer.analyze(
  "Our platform helps enterprises scale their infrastructure."
);
console.log(result.toneScore);     // 0.88
console.log(result.formalityFit);  // 0.92
console.log(result.violations);    // []
```

## Tone Analyzer (Python)

```python
from brandmuse.analyzers.tone import ToneAnalyzer

analyzer = ToneAnalyzer()
scores = analyzer.analyze("We're revolutionizing the industry with AI.")

print(scores.formality)     # 0.45
print(scores.enthusiasm)    # 0.82
print(scores.authority)     # 0.65
```

## Modules

```
src/
├── core/
│   ├── voice.ts        # Voice profile matching engine
│   ├── auditor.ts      # Bulk content auditing
│   └── generator.ts    # On-brand content generation
├── analyzers/
│   ├── tone.py         # Tone classification (Python)
│   └── consistency.py  # Cross-document consistency checks
└── api/
    └── server.ts       # REST API server
```
