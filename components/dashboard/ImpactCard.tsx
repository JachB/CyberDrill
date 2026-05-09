'use client';

import { useEffect, useState } from 'react';
import { TrendingDown, ShieldCheck, Coins } from 'lucide-react';
import {
  BREACH_COST_PER_CLICK,
  ANNUAL_LICENSE_COST,
  ESCALATION_PROBABILITY,
  BREACH_COST_SOURCE,
  formatPLN,
} from '@/lib/breach-cost';
import { SUMMARY_METRICS, WEEKLY_TREND, TOTAL_EMPLOYEES } from '@/lib/dashboard-data';

const INDUSTRY = 'manufacturing'; // dashboard reprezentuje "Acme Industrial"

function useCountUp(target: number, durationMs = 1500) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      const progress = Math.min((Date.now() - start) / durationMs, 1);
      setValue(Math.round(target * progress));
      if (progress >= 1) clearInterval(id);
    }, 30);
    return () => clearInterval(id);
  }, [target, durationMs]);
  return value;
}

export function ImpactCard() {
  const cost = BREACH_COST_PER_CLICK[INDUSTRY];
  const clicksNow = SUMMARY_METRICS.clicked;

  // Ile by kosztowało gdyby dziś phish-prone było jak na początku trendu (T1)
  const startTrend = WEEKLY_TREND[0].phishProne; // 34%
  const endTrend = WEEKLY_TREND[WEEKLY_TREND.length - 1].phishProne; // 11%
  const projectedClicksAtStart = Math.round((TOTAL_EMPLOYEES * startTrend) / 100);
  const projectedClicksNow = Math.round((TOTAL_EMPLOYEES * endTrend) / 100);

  const exposureBefore = Math.round(cost * projectedClicksAtStart * ESCALATION_PROBABILITY);
  const exposureAfter = Math.round(cost * projectedClicksNow * ESCALATION_PROBABILITY);
  const savings = exposureBefore - exposureAfter;
  const exposurePotential = Math.round(cost * clicksNow * ESCALATION_PROBABILITY);

  const animatedPotential = useCountUp(exposurePotential);

  const annualSavings = savings * 4;
  const roi = Math.round(annualSavings / ANNUAL_LICENSE_COST);

  return (
    <div className="rounded-lg bg-[color:var(--color-surface)] border border-[color:var(--color-border)] p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-[color:var(--color-text)] uppercase tracking-wide">
            Wpływ biznesowy
          </h3>
          <p className="text-xs text-[color:var(--color-muted)] mt-0.5">
            Koszt potencjalnego incydentu phishingowego dla Twojej organizacji
          </p>
        </div>
        <span className="text-xs px-2 py-1 rounded bg-[color:var(--color-accent)]/10 text-[color:var(--color-accent)] font-medium">
          NIS2 21.2.g
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:divide-x lg:divide-[color:var(--color-border)]">
        {/* Potencjalny koszt */}
        <div className="space-y-2 lg:pr-5">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-[color:var(--color-muted)]">
            <Coins className="w-3.5 h-3.5" />
            Potencjalny koszt incydentu
          </div>
          <div className="text-3xl font-bold text-[color:var(--color-danger)]">
            {formatPLN(animatedPotential)}
          </div>
          <p className="text-xs text-[color:var(--color-muted)] leading-relaxed">
            gdyby choć 1 z {clicksNow} kliknięć trafił na prawdziwy atak ({Math.round(ESCALATION_PROBABILITY * 100)}% prob. eskalacji)
          </p>
        </div>

        {/* Before/After */}
        <div className="space-y-2 lg:px-5">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-[color:var(--color-muted)]">
            <TrendingDown className="w-3.5 h-3.5" />
            Wpływ szkoleń CyberDrill
          </div>
          <div className="space-y-1">
            <div className="flex items-baseline justify-between text-sm">
              <span className="text-[color:var(--color-muted)]">Przed (T1, {startTrend}%)</span>
              <span className="text-[color:var(--color-text)] line-through font-mono">{formatPLN(exposureBefore)}</span>
            </div>
            <div className="flex items-baseline justify-between text-sm">
              <span className="text-[color:var(--color-muted)]">Teraz (T8, {endTrend}%)</span>
              <span className="text-[color:var(--color-text)] font-mono">{formatPLN(exposureAfter)}</span>
            </div>
          </div>
          <div className="mt-2 px-3 py-2 rounded bg-[color:var(--color-success)]/10 border border-[color:var(--color-success)]/30">
            <div className="text-xs uppercase tracking-wide text-[color:var(--color-success)] font-semibold">Oszczędność/kw</div>
            <div className="text-xl font-bold text-[color:var(--color-success)]">{formatPLN(savings)}</div>
          </div>
        </div>

        {/* ROI */}
        <div className="space-y-2 lg:pl-5">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-[color:var(--color-muted)]">
            <ShieldCheck className="w-3.5 h-3.5" />
            Zwrot z inwestycji
          </div>
          <div className="space-y-1 text-sm">
            <div className="flex items-baseline justify-between">
              <span className="text-[color:var(--color-muted)]">Inwestycja CyberDrill</span>
              <span className="text-[color:var(--color-text)] font-mono">{formatPLN(ANNUAL_LICENSE_COST)}/rok</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-[color:var(--color-muted)]">Oszczędność roczna</span>
              <span className="text-[color:var(--color-text)] font-mono">{formatPLN(annualSavings)}</span>
            </div>
          </div>
          <div className="mt-2 px-3 py-2 rounded bg-[color:var(--color-accent)]/10 border border-[color:var(--color-accent)]/30">
            <div className="text-xs uppercase tracking-wide text-[color:var(--color-accent)] font-semibold">ROI</div>
            <div className="text-xl font-bold text-[color:var(--color-accent)]">{roi}× rocznie</div>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-[color:var(--color-border)] text-[10px] text-[color:var(--color-muted)] leading-relaxed">
        Źródło: {BREACH_COST_SOURCE}. Metodologia: clicks × średni koszt incydentu w branży × prawdopodobieństwo eskalacji {Math.round(ESCALATION_PROBABILITY * 100)}%.
      </div>
    </div>
  );
}
