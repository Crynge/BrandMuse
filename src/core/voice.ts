export interface VoiceDNA {
  formality: number;
  humor: number;
  enthusiasm: number;
  expertise: number;
  empathy: number;
  directness: number;
  vocabulary: string[];
  brandName: string;
}

export interface GenerateOptions {
  channel: 'twitter' | 'linkedin' | 'email' | 'blog' | 'ad';
  topic: string;
  keyMessage: string;
  cta?: string;
  tone?: 'professional' | 'casual' | 'urgent' | 'friendly';
}

export interface GenerationResult {
  content: string;
  channel: string;
  toneScore: Record<string, number>;
  compliancePass: boolean;
}

export class BrandMuse {
  private brandDNA: VoiceDNA | null = null;

  constructor(private config: { brandName: string; samples?: string[] }) {}

  async extractVoiceDNA(): Promise<VoiceDNA> {
    this.brandDNA = {
      formality: 0.75,
      humor: 0.2,
      enthusiasm: 0.6,
      expertise: 0.9,
      empathy: 0.5,
      directness: 0.7,
      vocabulary: ['innovative', 'scalable', 'enterprise-grade', 'seamless'],
      brandName: this.config.brandName,
    };
    return this.brandDNA;
  }

  async generate(options: GenerateOptions): Promise<GenerationResult> {
    const dna = this.brandDNA || (await this.extractVoiceDNA());
    const content = this.buildContent(options, dna);
    const toneScore = this.measureTone(content, dna);
    return {
      content,
      channel: options.channel,
      toneScore,
      compliancePass: this.checkCompliance(content, dna),
    };
  }

  async audit(text: string): Promise<{ score: number; violations: string[] }> {
    const dna = this.brandDNA || (await this.extractVoiceDNA());
    const violations: string[] = [];
    if (!dna.vocabulary.some((v) => text.toLowerCase().includes(v.toLowerCase()))) {
      violations.push('No brand vocabulary detected');
    }
    return { score: violations.length === 0 ? 1 : 0.3, violations };
  }

  private buildContent(options: GenerateOptions, dna: VoiceDNA): string {
    const templates: Record<string, string> = {
      twitter: `${options.keyMessage}. ${options.cta || 'Learn more'} #${options.topic.replace(/\s+/g, '')}`,
      linkedin: `We're excited to share: ${options.keyMessage}\n\nOur team has been working hard to deliver ${dna.vocabulary[0] || 'excellence'} solutions.\n\n${options.cta || 'Get in touch to learn more.'}`,
      email: `Subject: ${options.keyMessage}\n\nHi there,\n\n${options.keyMessage}. ${dna.vocabulary[0] || ''}.\n\n${options.cta || 'Reply to learn more.'}\n\nBest,\n${dna.brandName}`,
      blog: `# ${options.keyMessage}\n\nAt ${dna.brandName}, we believe in ${dna.vocabulary.slice(0, 2).join(' and ')}.\n\n${options.topic} is transforming how teams work.\n\n${options.cta || 'Contact us for more.'}`,
      ad: `${options.keyMessage} | ${options.cta || 'Shop Now'} →`,
    };
    return templates[options.channel] || templates.blog;
  }

  private measureTone(text: string, dna: VoiceDNA): Record<string, number> {
    return {
      formality: dna.formality + (text.includes('!') ? -0.1 : 0),
      enthusiasm: text.includes('!') ? dna.enthusiasm + 0.2 : dna.enthusiasm,
      expertise: text.length > 100 ? dna.expertise : dna.expertise - 0.1,
    };
  }

  private checkCompliance(text: string, dna: VoiceDNA): boolean {
    const wordCount = text.split(/\s+/).length;
    return wordCount >= 5 && wordCount <= 500;
  }
}
