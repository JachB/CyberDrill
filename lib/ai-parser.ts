import type { StreamEvent, Scenario, IndicatorTarget, QuizQuestion } from '@/types/scenario';

const KV_REGEX = /(\w+)="((?:[^"\\]|\\.)*)"/g;

const VALID_TARGETS: IndicatorTarget[] = ['sender', 'subject', 'urgency', 'cta', 'data', 'domain', 'tone'];

function parseKeyValuePairs(input: string): Record<string, string> {
  const result: Record<string, string> = {};
  let match: RegExpExecArray | null;
  KV_REGEX.lastIndex = 0;
  while ((match = KV_REGEX.exec(input)) !== null) {
    result[match[1]] = match[2].replace(/\\"/g, '"');
  }
  return result;
}

function parseLine(line: string): StreamEvent | null {
  const trimmed = line.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith('META:')) {
    const kv = parseKeyValuePairs(trimmed.slice(5));
    if (!kv.sender_name || !kv.sender_email || !kv.subject) return null;
    return {
      type: 'meta',
      payload: {
        sender_name: kv.sender_name,
        sender_email: kv.sender_email,
        subject: kv.subject,
      },
    };
  }

  if (trimmed.startsWith('BODY:')) {
    return { type: 'paragraph', payload: trimmed.slice(5).trim() };
  }

  if (trimmed.startsWith('DATA:')) {
    const kv = parseKeyValuePairs(trimmed.slice(5));
    const events: StreamEvent[] = [];
    for (const [label, value] of Object.entries(kv)) {
      events.push({ type: 'data_row', payload: { label, value } });
    }
    return events.length > 0 ? events[0] : null;
  }

  if (trimmed.startsWith('CTA:')) {
    const kv = parseKeyValuePairs(trimmed.slice(4));
    const color = (kv.color === 'red' || kv.color === 'orange' || kv.color === 'blue') ? kv.color : 'red';
    return {
      type: 'cta',
      payload: { text: kv.text || 'Aktywuj', color },
    };
  }

  if (trimmed.startsWith('INDICATOR:')) {
    const rest = trimmed.slice(10).trim();
    // KV format: target="...", text="..."
    if (rest.includes('target=')) {
      const kv = parseKeyValuePairs(rest);
      const target = (VALID_TARGETS.includes(kv.target as IndicatorTarget) ? kv.target : 'tone') as IndicatorTarget;
      const text = kv.text || rest;
      return { type: 'indicator', payload: { target, text } };
    }
    // Legacy format: plain text — fallback to "tone"
    return { type: 'indicator', payload: { target: 'tone', text: rest } };
  }

  if (trimmed.startsWith('EDU:')) {
    return { type: 'education', payload: trimmed.slice(4).trim() };
  }

  if (trimmed.startsWith('QUIZ:')) {
    const kv = parseKeyValuePairs(trimmed.slice(5));
    if (!kv.question || !kv.a || !kv.b || !kv.c || !kv.correct) return null;
    const correct = (kv.correct === 'a' || kv.correct === 'b' || kv.correct === 'c') ? kv.correct : 'a';
    const quiz: QuizQuestion = {
      question: kv.question,
      a: kv.a,
      b: kv.b,
      c: kv.c,
      correct,
    };
    return { type: 'quiz', payload: quiz };
  }

  return null;
}

export function parseDataLine(line: string): Array<Scenario['data_table'][number]> {
  const trimmed = line.trim();
  if (!trimmed.startsWith('DATA:')) return [];
  const kv = parseKeyValuePairs(trimmed.slice(5));
  return Object.entries(kv).map(([label, value]) => ({ label, value }));
}

export async function* parseStream(
  source: AsyncIterable<string>,
): AsyncGenerator<StreamEvent> {
  let buffer = '';
  for await (const chunk of source) {
    buffer += chunk;
    let newlineIdx: number;
    while ((newlineIdx = buffer.indexOf('\n')) !== -1) {
      const line = buffer.slice(0, newlineIdx);
      buffer = buffer.slice(newlineIdx + 1);

      if (line.trim().startsWith('DATA:')) {
        const rows = parseDataLine(line);
        for (const row of rows) {
          yield { type: 'data_row', payload: row };
        }
        continue;
      }

      const event = parseLine(line);
      if (event) yield event;
    }
  }

  // Flush remaining buffer (last line without newline)
  if (buffer.trim()) {
    if (buffer.trim().startsWith('DATA:')) {
      const rows = parseDataLine(buffer);
      for (const row of rows) {
        yield { type: 'data_row', payload: row };
      }
    } else {
      const event = parseLine(buffer);
      if (event) yield event;
    }
  }
}
