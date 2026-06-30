import { describe, it, expect } from 'vitest';
import { BrandMuse } from '../src/core/voice';

describe('BrandMuse', () => {
  it('should extract voice DNA', async () => {
    const muse = new BrandMuse({ brandName: 'TestCo' });
    const dna = await muse.extractVoiceDNA();
    expect(dna.brandName).toBe('TestCo');
    expect(dna.formality).toBeGreaterThan(0);
  });

  it('should generate content', async () => {
    const muse = new BrandMuse({ brandName: 'TestCo' });
    const result = await muse.generate({
      channel: 'twitter',
      topic: 'AI Marketing',
      keyMessage: 'AI transforms marketing',
      cta: 'Learn more',
    });
    expect(result.content).toContain('AI transforms marketing');
    expect(result.channel).toBe('twitter');
    expect(typeof result.compliancePass).toBe('boolean');
  });

  it('should audit content', async () => {
    const muse = new BrandMuse({ brandName: 'TestCo' });
    const audit = await muse.audit('Innovative AI solutions');
    expect(audit.score).toBeGreaterThanOrEqual(0);
  });
});
