import { BrandMuse } from './voice';

export interface AuditReport {
  overallScore: number;
  items: AuditItem[];
}

export interface AuditItem {
  text: string;
  brandScore: number;
  violations: string[];
  suggestion?: string;
}

export class ComplianceAuditor {
  constructor(private muse: BrandMuse) {}

  async auditBatch(texts: string[]): Promise<AuditReport> {
    const items: AuditItem[] = [];
    for (const text of texts) {
      const audit = await this.muse.audit(text);
      items.push({
        text: text.slice(0, 100),
        brandScore: audit.score,
        violations: audit.violations,
        suggestion: audit.score < 0.5 ? 'Review brand voice guidelines' : undefined,
      });
    }
    return {
      overallScore: items.reduce((s, i) => s + i.brandScore, 0) / items.length,
      items,
    };
  }
}
