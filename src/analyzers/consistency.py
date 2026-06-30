"""Cross-channel brand consistency checker."""

from dataclasses import dataclass, field
from collections import Counter
import re


@dataclass
class ConsistencyReport:
    overall_score: float
    channel_scores: dict = field(default_factory=dict)
    vocabulary_overlap: float = 0.0
    tone_variance: float = 0.0
    recommendations: list = field(default_factory=list)


class ConsistencyChecker:
    def check(self, channel_texts: dict) -> ConsistencyReport:
        scores = {}
        all_words = Counter()

        for channel, text in channel_texts.items():
            words = set(re.findall(r'\b[a-z]{3,}\b', text.lower()))
            all_words.update(words)
            scores[channel] = min(1.0, len(words) / 50)

        if len(scores) < 2:
            return ConsistencyReport(overall_score=1.0, channel_scores=scores)

        variance = max(scores.values()) - min(scores.values())
        overlap = self._compute_overlap(channel_texts)
        overall = max(0, 1.0 - variance - (1 - overlap) * 0.5)

        recommendations = []
        if variance > 0.3:
            recommendations.append("Tone varies significantly across channels")
        if overlap < 0.5:
            recommendations.append("Shared vocabulary is low — align brand terms")
        if overall < 0.5:
            recommendations.append("Consider a unified brand style guide")

        return ConsistencyReport(
            overall_score=round(overall, 2),
            channel_scores=scores,
            vocabulary_overlap=round(overlap, 2),
            tone_variance=round(variance, 2),
            recommendations=recommendations,
        )

    def _compute_overlap(self, channel_texts: dict) -> float:
        word_sets = []
        for text in channel_texts.values():
            words = set(re.findall(r'\b[a-z]{3,}\b', text.lower()))
            word_sets.append(words)

        if len(word_sets) < 2:
            return 1.0

        intersection = word_sets[0]
        union = word_sets[0]
        for ws in word_sets[1:]:
            intersection = intersection & ws
            union = union | ws

        return len(intersection) / max(len(union), 1)
