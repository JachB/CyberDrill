'use client';

import { useCallback, useState } from 'react';
import type { IndustryId, Scenario, StreamEvent } from '@/types/scenario';

export type StreamStatus = 'idle' | 'streaming' | 'ready' | 'error';

interface State {
  scenario: Partial<Scenario>;
  token: string | null;
  status: StreamStatus;
  error: string | null;
}

const INITIAL_SCENARIO: Partial<Scenario> = {
  body_paragraphs: [],
  data_table: [],
  indicators: [],
  quiz: [],
};

export function useScenarioStream() {
  const [state, setState] = useState<State>({
    scenario: {},
    token: null,
    status: 'idle',
    error: null,
  });
  const [industryId, setIndustryId] = useState<IndustryId | null>(null);

  const generate = useCallback(async (industry: IndustryId, role: string) => {
    setIndustryId(industry);
    setState({ scenario: { ...INITIAL_SCENARIO }, token: null, status: 'streaming', error: null });

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ industry, role }),
      });

      if (!response.ok || !response.body) {
        throw new Error(`HTTP ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const messages = buffer.split('\n\n');
        buffer = messages.pop() ?? '';

        for (const message of messages) {
          const dataLine = message.split('\n').find((l) => l.startsWith('data: '));
          if (!dataLine) continue;
          try {
            const event = JSON.parse(dataLine.slice(6)) as StreamEvent;
            applyEvent(setState, event);
          } catch (err) {
            console.warn('SSE parse error', err);
          }
        }
      }
    } catch (err) {
      setState((s) => ({ ...s, status: 'error', error: err instanceof Error ? err.message : String(err) }));
    }
  }, []);

  return { ...state, industryId, generate };
}

function applyEvent(setState: React.Dispatch<React.SetStateAction<State>>, event: StreamEvent) {
  setState((s) => {
    const scenario = { ...s.scenario };
    switch (event.type) {
      case 'meta':
        scenario.meta = event.payload;
        break;
      case 'paragraph':
        scenario.body_paragraphs = [...(scenario.body_paragraphs ?? []), event.payload];
        break;
      case 'data_row':
        scenario.data_table = [...(scenario.data_table ?? []), event.payload];
        break;
      case 'cta':
        scenario.cta = event.payload;
        break;
      case 'indicator':
        scenario.indicators = [...(scenario.indicators ?? []), event.payload];
        break;
      case 'education':
        scenario.education_text = event.payload;
        break;
      case 'quiz':
        scenario.quiz = [...(scenario.quiz ?? []), event.payload];
        break;
      case 'done':
        return { ...s, scenario, token: event.payload.token, status: 'ready' };
      case 'error':
        return { ...s, status: 'error', error: event.payload };
    }
    return { ...s, scenario };
  });
}
