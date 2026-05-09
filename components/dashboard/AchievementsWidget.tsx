'use client';

import { useState } from 'react';
import { Target, Shield, Trophy, Zap, Award, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Achievement {
  Icon: LucideIcon;
  title: string;
  description: string;
  unlocked: boolean;
  color: string;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    Icon: Sparkles,
    title: 'Pierwsza kampania',
    description: 'Pierwszy raz wzięłeś udział w symulacji.',
    unlocked: true,
    color: 'var(--color-accent)',
  },
  {
    Icon: Shield,
    title: 'Phish Spotter Lv 1',
    description: '5 prawidłowo zgłoszonych phishingów.',
    unlocked: true,
    color: 'var(--color-success)',
  },
  {
    Icon: Shield,
    title: 'Phish Spotter Lv 2',
    description: '15 prawidłowo zgłoszonych phishingów.',
    unlocked: true,
    color: 'var(--color-success)',
  },
  {
    Icon: Shield,
    title: 'Phish Spotter Lv 3',
    description: '50 prawidłowo zgłoszonych phishingów.',
    unlocked: false,
    color: 'var(--color-muted)',
  },
  {
    Icon: Zap,
    title: 'Bezpieczna seria 7 dni',
    description: '7 dni bez kliknięcia w podejrzany link.',
    unlocked: true,
    color: 'var(--color-warning)',
  },
  {
    Icon: Trophy,
    title: 'Top 10% działu',
    description: 'Twój wynik w top 10% Działu IT.',
    unlocked: true,
    color: 'var(--color-warning)',
  },
];

const TOTAL_POINTS = 847;

export function AchievementsWidget() {
  const [hovered, setHovered] = useState<number | null>(null);
  const unlockedCount = ACHIEVEMENTS.filter((a) => a.unlocked).length;

  return (
    <div className="rounded-lg bg-[color:var(--color-surface)] border border-[color:var(--color-border)] p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-[color:var(--color-text)] flex items-center gap-2">
            <Award className="w-4 h-4 text-[color:var(--color-accent)]" />
            Osiągnięcia zespołu
          </h3>
          <p className="text-xs text-[color:var(--color-muted)] mt-0.5">
            {unlockedCount} z {ACHIEVEMENTS.length} odblokowanych · {TOTAL_POINTS} pkt łącznie w tym kwartale
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {ACHIEVEMENTS.map((ach, i) => {
          const isHovered = hovered === i;
          return (
            <div
              key={i}
              className="relative"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                className={`aspect-square rounded-lg border flex flex-col items-center justify-center gap-1.5 p-2 cursor-help transition-all ${
                  ach.unlocked
                    ? 'border-[color:var(--color-border)] bg-[color:var(--color-surface-2)] hover:border-[color:var(--color-accent)] hover:scale-105'
                    : 'border-[color:var(--color-border)] bg-[color:var(--color-bg)] opacity-30'
                }`}
              >
                <ach.Icon
                  className="w-7 h-7"
                  style={{ color: ach.unlocked ? ach.color : 'var(--color-muted)' }}
                />
                <p className="text-[10px] text-center leading-tight font-medium text-[color:var(--color-text)] line-clamp-2">
                  {ach.title}
                </p>
              </div>
              {isHovered && (
                <div className="absolute z-10 bottom-full left-1/2 -translate-x-1/2 mb-2 w-44 px-3 py-2 rounded bg-[color:var(--color-bg)] border border-[color:var(--color-border)] shadow-xl text-xs text-[color:var(--color-text)] pointer-events-none">
                  <div className="font-semibold mb-0.5">{ach.title}</div>
                  <div className="text-[color:var(--color-muted)]">{ach.description}</div>
                  {!ach.unlocked && (
                    <div className="mt-1 text-[10px] text-[color:var(--color-warning)]">Zablokowane</div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 text-[color:var(--color-muted)]">
          <Target className="w-3.5 h-3.5" />
          Następny cel: Phish Spotter Lv 3 — 50 zgłoszeń
        </div>
        <div className="text-[color:var(--color-accent)] font-medium">+{15} do celu</div>
      </div>
    </div>
  );
}
