'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { copy } from '@/lib/copy';
import { OutlookFrame } from '@/components/email-templates/OutlookFrame';
import { EmailTemplate } from '@/components/email-templates/EmailTemplate';
import type { Indicator, IndustryConfig, Scenario } from '@/types/scenario';

interface Box {
  idx: number;
  target: string;
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Props {
  scenario: Scenario;
  industry: IndustryConfig;
  indicators: Indicator[];
}

export function AnnotatedEmailReveal({ scenario, industry, indicators }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [visibleCount, setVisibleCount] = useState(0);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const recalc = () => {
      const containerRect = container.getBoundingClientRect();
      const found: Box[] = [];
      const seen = new Set<string>();

      indicators.forEach((ind, idx) => {
        // Wybierz pierwszy nieistniejący element żeby unikać kolizji jeśli AI zwróci 2× ten sam target
        const candidates = container.querySelectorAll(`[data-flag="${ind.target}"]`);
        let el: Element | null = null;
        for (const c of Array.from(candidates)) {
          const key = `${ind.target}:${c.outerHTML.length}`;
          if (!seen.has(key)) {
            el = c;
            seen.add(key);
            break;
          }
        }
        if (!el) el = candidates[0] ?? null;
        if (!el) return;

        const r = (el as HTMLElement).getBoundingClientRect();
        found.push({
          idx,
          target: ind.target,
          text: ind.text,
          x: r.left - containerRect.left,
          y: r.top - containerRect.top,
          width: r.width,
          height: r.height,
        });
      });

      setBoxes(found);
    };

    recalc();

    const ro = new ResizeObserver(recalc);
    ro.observe(container);
    window.addEventListener('resize', recalc);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', recalc);
    };
  }, [indicators]);

  useEffect(() => {
    if (visibleCount >= boxes.length) return;
    const id = setTimeout(() => setVisibleCount((c) => c + 1), 1100);
    return () => clearTimeout(id);
  }, [visibleCount, boxes.length]);

  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-[color:var(--color-text)]">
          {copy.phished.indicatorsHeading}
        </h2>
        <p className="text-xs text-[color:var(--color-muted)]">
          Wskaźniki ujawniają się sekwencyjnie z odniesieniem do konkretnego elementu maila.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
        {/* Annotated email mockup */}
        <div ref={containerRef} className="relative">
          <OutlookFrame
            senderName={scenario.meta?.sender_name}
            senderEmail={scenario.meta?.sender_email}
            subject={scenario.meta?.subject}
          >
            <EmailTemplate scenario={scenario} industry={industry} />
          </OutlookFrame>

          {/* Overlay flags */}
          {boxes.slice(0, visibleCount).map((b) => (
            <div
              key={`${b.idx}-${b.target}`}
              className="absolute pointer-events-none flag-overlay transition-opacity duration-500"
              style={{
                left: b.x - 5,
                top: b.y - 5,
                width: b.width + 10,
                height: b.height + 10,
                border: '3px solid #F85149',
                borderRadius: '6px',
              }}
            >
              <div className="absolute -top-3.5 -left-3.5 w-8 h-8 rounded-full bg-[#F85149] text-white text-sm font-bold flex items-center justify-center shadow-lg ring-2 ring-white">
                {b.idx + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Indicator cards (sidebar) */}
        <ul className="space-y-3">
          {boxes.slice(0, visibleCount).map((b) => (
            <li
              key={`card-${b.idx}`}
              className="flex items-start gap-3 p-4 rounded-md bg-[color:var(--color-danger)]/10 border border-[color:var(--color-danger)]/30 transition-all duration-500 animate-in fade-in slide-in-from-right-4"
            >
              <span className="shrink-0 w-7 h-7 rounded-full bg-[color:var(--color-danger)] text-white text-xs font-bold flex items-center justify-center">
                {b.idx + 1}
              </span>
              <div className="space-y-1 min-w-0">
                <span className="inline-block text-[10px] uppercase tracking-wide font-semibold text-[color:var(--color-danger)] px-1.5 py-0.5 rounded bg-[color:var(--color-danger)]/20">
                  {targetLabel(b.target)}
                </span>
                <p className="text-sm text-[color:var(--color-text)] leading-relaxed">{b.text}</p>
              </div>
            </li>
          ))}
          {/* Placeholder for not-yet-revealed items */}
          {indicators.slice(visibleCount).map((ind, i) => (
            <li
              key={`placeholder-${visibleCount + i}`}
              className="flex items-center gap-3 p-4 rounded-md bg-[color:var(--color-surface)]/50 border border-[color:var(--color-border)] opacity-40"
            >
              <span className="shrink-0 w-7 h-7 rounded-full bg-[color:var(--color-border)] text-[color:var(--color-muted)] text-xs font-bold flex items-center justify-center">
                {visibleCount + i + 1}
              </span>
              <span className="text-xs text-[color:var(--color-muted)]">Wskaźnik #{visibleCount + i + 1}…</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const TARGET_LABELS: Record<string, string> = {
  sender: 'Nadawca',
  subject: 'Temat',
  urgency: 'Sztuczna pilność',
  cta: 'Przycisk akcji',
  data: 'Dane w treści',
  domain: 'Domena',
  tone: 'Ton wiadomości',
};

function targetLabel(target: string): string {
  return TARGET_LABELS[target] ?? target;
}
