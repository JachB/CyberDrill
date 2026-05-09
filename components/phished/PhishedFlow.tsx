'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { ShieldAlert, Check, ArrowRight, Trophy } from 'lucide-react';
import { copy } from '@/lib/copy';
import { getIndustry } from '@/lib/industries';
import type { IndustryId, Scenario, Indicator } from '@/types/scenario';
import { StatCountUp } from './StatCountUp';
import { AnnotatedEmailReveal } from './AnnotatedEmailReveal';
import { QuizSection } from './QuizSection';
import { ReportButton } from './ReportButton';
import { StarRating } from './StarRating';

interface Props {
  scenario: Scenario;
  industryId: IndustryId;
  token: string;
  alreadyReported: boolean;
}

const CLICK_RATE_PERCENT = 34;

// Backward-compat: jeśli scenario.indicators jest stringami (stare wpisy w DB),
// znormalizuj do { target: 'tone', text }.
function normalizeIndicators(raw: unknown): Indicator[] {
  if (!Array.isArray(raw)) return [];
  return raw.map((item) => {
    if (typeof item === 'string') return { target: 'tone' as const, text: item };
    if (item && typeof item === 'object' && 'text' in item) {
      const obj = item as Partial<Indicator>;
      return {
        target: (obj.target ?? 'tone') as Indicator['target'],
        text: obj.text ?? '',
      };
    }
    return { target: 'tone' as const, text: String(item) };
  });
}

export function PhishedFlow({ scenario, industryId, token, alreadyReported }: Props) {
  const [step, setStep] = useState(0);
  const industry = getIndustry(industryId);
  const indicators = useMemo(() => normalizeIndicators(scenario.indicators), [scenario.indicators]);
  const quiz = scenario.quiz ?? [];

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 2000),
      setTimeout(() => setStep(2), 3500),
      setTimeout(() => setStep(3), 7500),
      setTimeout(() => setStep(4), 9000),
      setTimeout(() => setStep(5), 12000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const fade = (visible: boolean) =>
    `transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`;

  return (
    <main className="flex-1">
      <section className="relative bg-gradient-to-b from-[color:var(--color-danger)]/15 via-[color:var(--color-danger)]/5 to-transparent py-20 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <ShieldAlert className="w-20 h-20 mx-auto text-[color:var(--color-danger)] animate-pulse" />
          <h1 className="text-4xl md:text-5xl font-bold text-[color:var(--color-text)]">
            {copy.phished.alert.heading}
          </h1>
          <p className="text-base md:text-lg text-[color:var(--color-muted)] max-w-2xl mx-auto">
            {copy.phished.alert.subheading}
          </p>
          <div className="text-xs text-[color:var(--color-muted)] pt-2">
            Branża: {industry.label} · Scenariusz: {scenario.meta?.subject}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-14">
        <section className={fade(step >= 1)}>
          <div className="text-center space-y-3">
            <div className="text-6xl md:text-7xl font-bold text-[color:var(--color-warning)]">
              <StatCountUp target={CLICK_RATE_PERCENT} />%
            </div>
            <p className="text-base text-[color:var(--color-muted)] max-w-xl mx-auto">
              {copy.phished.statTemplate.replace('{percent}', String(CLICK_RATE_PERCENT))}
            </p>
          </div>
        </section>

        {step >= 2 && (
          <div className={fade(true)}>
            <AnnotatedEmailReveal
              scenario={scenario}
              industry={industry}
              indicators={indicators}
            />
            {scenario.education_text && (
              <p className="mt-6 p-4 rounded-md bg-[color:var(--color-surface)]/50 border-l-4 border-[color:var(--color-accent)] text-sm text-[color:var(--color-text)] leading-relaxed">
                {scenario.education_text}
              </p>
            )}
          </div>
        )}

        {step >= 3 && (
          <section className={fade(true)}>
            <h2 className="text-lg font-semibold text-[color:var(--color-text)] mb-4">
              {copy.phished.lessonHeading}
            </h2>
            <ul className="space-y-3">
              {copy.phished.lessonBullets.map((bullet, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-md bg-[color:var(--color-surface)] border border-[color:var(--color-border)]"
                >
                  <Check className="w-5 h-5 text-[color:var(--color-success)] shrink-0 mt-0.5" />
                  <span className="text-sm text-[color:var(--color-text)]">{bullet}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {step >= 4 && quiz.length > 0 && (
          <section className={fade(true)}>
            <QuizSection questions={quiz} />
          </section>
        )}

        {step >= 5 && (
          <section className={`space-y-10 ${fade(true)}`}>
            <div className="flex flex-col md:flex-row md:items-center gap-4 p-6 rounded-lg bg-[color:var(--color-surface)] border border-[color:var(--color-border)]">
              <div className="flex-1 space-y-1">
                <h3 className="text-base font-semibold text-[color:var(--color-text)]">
                  Następnym razem zachowaj się inaczej
                </h3>
                <p className="text-xs text-[color:var(--color-muted)]">
                  {copy.phished.toastReported}
                </p>
              </div>
              <ReportButton token={token} alreadyReported={alreadyReported} />
            </div>

            <StarRating />

            <Leaderboard />

            <div className="pt-8 border-t border-[color:var(--color-border)] flex flex-col md:flex-row md:items-center gap-4 justify-between">
              <p className="text-xs text-[color:var(--color-muted)] max-w-md">
                {copy.phished.closingNote}
              </p>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[color:var(--color-accent)] text-[color:var(--color-bg)] font-medium hover:bg-[color:var(--color-accent-hover)] transition-colors"
              >
                {copy.phished.backToDashboard}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function Leaderboard() {
  const text = copy.phished.leaderboardTemplate
    .replace('{rank}', '3')
    .replace('{total}', '5')
    .replace('{leader}', 'Dział IT — 0% kliknięć w tym miesiącu');

  return (
    <div className="flex items-start gap-3 p-4 rounded-md bg-[color:var(--color-surface)] border border-[color:var(--color-border)]">
      <Trophy className="w-5 h-5 text-[color:var(--color-warning)] shrink-0 mt-0.5" />
      <p className="text-sm text-[color:var(--color-text)]">{text}</p>
    </div>
  );
}
