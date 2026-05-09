import { streamScenario, buildScenarioFromEvents } from '@/lib/ai';
import { validateScenario } from '@/lib/ai-validator';
import { getIndustry, INDUSTRIES } from '@/lib/industries';
import { getFallbackQuiz } from '@/lib/quiz-fallback';
import { createServerSupabase } from '@/lib/supabase';
import type { IndustryId, StreamEvent } from '@/types/scenario';

export const runtime = 'edge';

export async function POST(req: Request) {
  let body: { industry?: string; role?: string };
  try {
    body = await req.json();
  } catch {
    return new Response('Invalid JSON', { status: 400 });
  }

  const { industry, role } = body;
  if (!industry || !role) {
    return new Response('Missing industry or role', { status: 400 });
  }

  if (!(industry in INDUSTRIES)) {
    return new Response(`Unknown industry: ${industry}`, { status: 400 });
  }

  const industryConfig = getIndustry(industry as IndustryId);
  if (!industryConfig.roles.find((r) => r.id === role)) {
    return new Response(`Unknown role for ${industry}: ${role}`, { status: 400 });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const events: StreamEvent[] = [];

      const send = (event: StreamEvent) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
      };

      try {
        for await (const event of streamScenario(industry as IndustryId, role)) {
          events.push(event);
          send(event);
        }

        const scenario = buildScenarioFromEvents(events);
        const validation = validateScenario(scenario, industryConfig);

        if (!validation.valid) {
          console.warn('[generate] validation failed:', validation.errors);
        }

        // Quiz fallback — jeśli AI wygenerowało <3 pytań, dopełniamy hardcodowanymi
        if (!scenario.quiz || scenario.quiz.length < 3) {
          const fallback = getFallbackQuiz(industry as IndustryId);
          const existing = scenario.quiz ?? [];
          scenario.quiz = [...existing, ...fallback].slice(0, 3);
          // emit do klienta dla spójności UI
          for (const q of scenario.quiz.slice(existing.length)) {
            send({ type: 'quiz', payload: q });
          }
        }

        const token = crypto.randomUUID().replace(/-/g, '');

        const supabase = createServerSupabase();
        const { error } = await supabase.from('campaigns').insert({
          industry,
          role,
          scenario_json: scenario,
          token,
        });

        if (error) {
          console.error('[generate] supabase insert error:', error);
          send({ type: 'error', payload: 'Failed to save campaign' });
        } else {
          send({ type: 'done', payload: { token } });
        }
      } catch (err) {
        console.error('[generate] stream error:', err);
        send({ type: 'error', payload: err instanceof Error ? err.message : String(err) });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}
