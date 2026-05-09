'use client';

import { useEffect, useState } from 'react';
import { AtSign, Clock, Link as LinkIcon, ShieldAlert } from 'lucide-react';
import { copy } from '@/lib/copy';

interface Props {
  indicators: string[];
}

const ICONS = [AtSign, Clock, LinkIcon, ShieldAlert];

export function IndicatorsReveal({ indicators }: Props) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount >= indicators.length) return;
    const id = setTimeout(() => setVisibleCount((c) => c + 1), 800);
    return () => clearTimeout(id);
  }, [visibleCount, indicators.length]);

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-[color:var(--color-text)]">
        {copy.phished.indicatorsHeading}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {indicators.map((text, i) => {
          const Icon = ICONS[i % ICONS.length];
          const visible = i < visibleCount;
          return (
            <article
              key={i}
              className={`p-5 rounded-lg bg-[color:var(--color-surface)] border border-[color:var(--color-border)] transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl font-bold text-[color:var(--color-accent)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <Icon className="w-5 h-5 text-[color:var(--color-muted)]" />
              </div>
              <p className="text-sm text-[color:var(--color-text)] leading-relaxed">{text}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
