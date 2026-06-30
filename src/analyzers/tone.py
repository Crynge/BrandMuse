"""NLP-based tone analysis for brand voice."""

import re
from dataclasses import dataclass, field


@dataclass
class ToneProfile:
    formality: float = 0.5
    sentiment: float = 0.0
    enthusiasm: float = 0.3
    analytical: float = 0.5
    confidence: float = 0.5
    markers: dict = field(default_factory=dict)


class ToneAnalyzer:
    def analyze(self, text: str) -> ToneProfile:
        profile = ToneProfile()
        sentences = re.split(r'[.!?]+', text)
        words = text.split()

        exclamation_count = text.count("!")
        question_count = text.count("?")
        avg_word_len = sum(len(w) for w in words) / max(len(words), 1)
        formal_indicators = ["therefore", "however", "furthermore", "nevertheless", "accordingly"]
        enthusiasm_indicators = ["excited", "amazing", "incredible", "thrilled", "love"]

        profile.formality = min(1.0, avg_word_len / 10)
        profile.enthusiasm = min(1.0, exclamation_count / max(len(sentences), 1))
        profile.sentiment = min(1.0, sum(1 for w in words if w.lower() in enthusiasm_indicators) / max(len(words), 1) * 10)
        profile.analytical = min(1.0, sum(1 for w in words if w.lower() in formal_indicators) / max(len(words), 1) * 10)
        profile.confidence = min(1.0, (1 - question_count / max(len(sentences), 1)))

        profile.markers = {
            "exclamation_count": exclamation_count,
            "question_count": question_count,
            "avg_word_length": round(avg_word_len, 2),
            "sentence_count": len(sentences),
        }

        return profile
