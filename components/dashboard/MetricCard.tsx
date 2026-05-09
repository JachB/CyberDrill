'use client';

import { useEffect, useState } from 'react';
import type { LucideIcon } from 'lucide-react';

interface Props {
  label: string;
  value: number;
  suffix?: string;
  hint?: string;
  Icon?: LucideIcon;
  tone?: 'accent' | 'danger' | 'warning' | 'success';
}

const TONE_MAP: Record<NonNullable<Props['tone']>, string> = {
  accent: 'var(--color-accent)',
  danger: 'var(--color-danger)',
  warning: 'var(--color-warning)',
  success: 'var(--color-success)',
};

export function MetricCard({ label, value, suffix = '', hint, Icon, tone = 'accent' }: Props) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const duration = 1200;
    const id = setInterval(() => {
      const progress = Math.min((Date.now() - start) / duration, 1);
      setDisplay(Math.round(value * progress));
      if (progress >= 1) clearInterval(id);
    }, 30);
    return () => clearInterval(id);
  }, [value]);

  return (
    <div className="p-5 rounded-lg bg-[color:var(--color-surface)] border border-[color:var(--color-border)]">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs uppercase tracking-wide text-[color:var(--color-muted)]">{label}</span>
        {Icon && <Icon className="w-4 h-4" style={{ color: `var(${TONE_MAP[tone].slice(4, -1)})` }} />}
      </div>
      <div className="text-3xl font-bold" style={{ color: `var(${TONE_MAP[tone].slice(4, -1)})` }}>
        {display.toLocaleString('pl-PL')}{suffix}
      </div>
      {hint && <div className="mt-1.5 text-xs text-[color:var(--color-muted)]">{hint}</div>}
    </div>
  );
}
