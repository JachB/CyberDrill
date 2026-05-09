import { GoogleGenAI } from '@google/genai';
import { buildPrompt } from './ai-prompt';
import { parseStream } from './ai-parser';
import { getIndustry } from './industries';
import type { StreamEvent, IndustryId, Scenario } from '@/types/scenario';

const MODEL = 'gemini-3-flash-preview';

export async function* streamScenario(
  industryId: IndustryId,
  roleId: string,
): AsyncGenerator<StreamEvent> {
  const industry = getIndustry(industryId);
  const prompt = buildPrompt(industry, roleId);

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    yield { type: 'error', payload: 'GEMINI_API_KEY not configured' };
    return;
  }

  const ai = new GoogleGenAI({ apiKey });

  const response = await ai.models.generateContentStream({
    model: MODEL,
    contents: prompt,
    config: {
      temperature: 0.85,
      topP: 0.9,
    },
  });

  async function* textStream() {
    for await (const chunk of response) {
      const t = chunk.text;
      if (t) yield t;
    }
  }

  for await (const event of parseStream(textStream())) {
    yield event;
  }
}

export function buildScenarioFromEvents(events: StreamEvent[]): Partial<Scenario> {
  const scenario: Partial<Scenario> = {
    body_paragraphs: [],
    data_table: [],
    indicators: [],
    quiz: [],
  };

  for (const event of events) {
    switch (event.type) {
      case 'meta':
        scenario.meta = event.payload;
        break;
      case 'paragraph':
        scenario.body_paragraphs!.push(event.payload);
        break;
      case 'data_row':
        scenario.data_table!.push(event.payload);
        break;
      case 'cta':
        scenario.cta = event.payload;
        break;
      case 'indicator':
        scenario.indicators!.push(event.payload);
        break;
      case 'education':
        scenario.education_text = event.payload;
        break;
      case 'quiz':
        scenario.quiz!.push(event.payload);
        break;
    }
  }

  return scenario;
}
