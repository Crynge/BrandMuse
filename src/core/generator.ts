import { BrandMuse, GenerateOptions, GenerationResult } from './voice';

export class ContentGenerator {
  constructor(private muse: BrandMuse) {}

  async batchGenerate(options: GenerateOptions[]): Promise<GenerationResult[]> {
    const results: GenerationResult[] = [];
    for (const opt of options) {
      results.push(await this.muse.generate(opt));
    }
    return results;
  }

  async generateForAllChannels(
    topic: string,
    keyMessage: string,
    cta?: string
  ): Promise<Map<string, GenerationResult>> {
    const channels: GenerateOptions['channel'][] = ['twitter', 'linkedin', 'email', 'blog', 'ad'];
    const results = new Map<string, GenerationResult>();
    for (const channel of channels) {
      const result = await this.muse.generate({ channel, topic, keyMessage, cta });
      results.set(channel, result);
    }
    return results;
  }
}
