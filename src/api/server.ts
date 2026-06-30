import express from 'express';
import { BrandMuse } from '../core/voice';
import { ContentGenerator } from '../core/generator';
import { ComplianceAuditor } from '../core/auditor';

const app = express();
app.use(express.json());

const muse = new BrandMuse({ brandName: 'BrandMuse' });
const generator = new ContentGenerator(muse);
const auditor = new ComplianceAuditor(muse);

app.post('/api/v1/generate', async (req, res) => {
  const { channel, topic, keyMessage, cta } = req.body;
  const result = await muse.generate({ channel, topic, keyMessage, cta });
  res.json(result);
});

app.post('/api/v1/generate/all', async (req, res) => {
  const { topic, keyMessage, cta } = req.body;
  const results = await generator.generateForAllChannels(topic, keyMessage, cta);
  const obj: Record<string, unknown> = {};
  results.forEach((v, k) => { obj[k] = v; });
  res.json(obj);
});

app.post('/api/v1/audit', async (req, res) => {
  const { texts } = req.body;
  const report = await auditor.auditBatch(texts || []);
  res.json(report);
});

app.get('/api/v1/voice', async (_req, res) => {
  const dna = await muse.extractVoiceDNA();
  res.json(dna);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`BrandMuse API on :${PORT}`));
