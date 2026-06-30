<div align="center">
  <img src="docs/assets/logo.svg" alt="BrandMuse" width="320">
  <p><strong>AI-Powered Brand Voice Management & Content Intelligence</strong></p>
  <p>Brand voice analysis · multi-channel content generation · compliance auditing · tone optimization</p>

  [![TypeScript](https://img.shields.io/badge/TypeScript-5.4%2B-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Python](https://img.shields.io/badge/Python-3.11%2B-3776AB?logo=python&logoColor=white)](https://python.org)
  [![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
  [![CI](https://github.com/Crynge/BrandMuse/actions/workflows/ci.yml/badge.svg)](https://github.com/Crynge/BrandMuse/actions/workflows/ci.yml)
  [![Code style: prettier](https://img.shields.io/badge/code%20style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
  [![GitHub Stars](https://img.shields.io/github/stars/Crynge/BrandMuse?style=social)](https://github.com/Crynge/BrandMuse)

</div>

---

## Overview

BrandMuse is an AI brand voice platform that helps marketing teams maintain consistent, on-brand communication across every channel. It analyzes existing content to extract brand voice DNA, generates on-brand copy, audits content for voice compliance, and suggests tonal adjustments.

## Key Features

- **Voice DNA extraction** — Analyzes existing content to build a brand voice fingerprint
- **Multi-channel generation** — Creates on-brand content for web, email, social, ads, docs
- **Tone optimization** — Adjusts tone for context while maintaining brand consistency
- **Compliance auditing** — Scans content for brand voice violations and inconsistencies
- **Competitor voice analysis** — Benchmarks your brand voice against competitors

## Architecture

```
Brand Samples → VoiceDNA (extractor) → ContentGenerator → ChannelAdapter
                                         → ComplianceAuditor   → ToneOptimizer
                                           → Unified Brand Dashboard
```

## Quick Start

```bash
npm install
npx tsx src/api/server.ts
```

## Installation

```bash
git clone https://github.com/Crynge/BrandMuse.git
cd BrandMuse
npm install
pip install -e ".[dev]"
```

## Usage

```typescript
import { BrandMuse } from './src/core/voice';

const muse = new BrandMuse({
  brandName: 'Acme Corp',
  samples: ['./samples/brand-voice.txt', './samples/past-emails'],
});

const dna = await muse.extractVoiceDNA();
// { formality: 0.75, humor: 0.2, enthusiasm: 0.6, expertise: 0.9, ... }

const post = await muse.generate({
  channel: 'twitter',
  topic: 'New product launch',
  keyMessage: 'Faster than ever',
  cta: 'Learn more',
});
// "Introducing the fastest Acme ever built. 3x speed. 0 compromises. See what's new →"
```

## Components

| Component | Lang | Role |
|-----------|------|------|
| VoiceDNA | TS | Extracts brand voice fingerprint from samples |
| ContentGenerator | TS | Generates on-brand content per channel |
| ComplianceAuditor | TS | Checks content against brand voice rules |
| ToneAnalyzer | Py | NLP tone analysis and scoring |
| ConsistencyChecker | Py | Cross-channel consistency validation |
