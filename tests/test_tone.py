from analyzers.tone import ToneAnalyzer


class TestToneAnalyzer:
    def test_analyze_formal_text(self):
        analyzer = ToneAnalyzer()
        profile = analyzer.analyze("Therefore, we have determined that the solution is effective.")
        assert profile.formality > 0.5

    def test_analyze_enthusiastic_text(self):
        analyzer = ToneAnalyzer()
        profile = analyzer.analyze("We are thrilled! This is amazing! Incredible results!")
        assert profile.enthusiasm > 0.5

    def test_analyze_confidence(self):
        analyzer = ToneAnalyzer()
        profile = analyzer.analyze("This is the best solution.")
        assert profile.confidence > 0.5
