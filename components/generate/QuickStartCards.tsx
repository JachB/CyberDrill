'use client';

import { Plane, FlaskConical, Zap } from 'lucide-react';
import type { IndustryId } from '@/types/scenario';
import { copy } from '@/lib/copy';
import { getIndustry } from '@/lib/industries';

interface Props {
  onSelect: (industryId: IndustryId, roleId: string) => void;
  disabled: boolean;
}

const PRESETS: Array<{ industryId: IndustryId; roleId: string; Icon: typeof Plane }> = [
  { industryId: 'aerospace', roleId: 'inzynier-automatyki', Icon: Plane },
  { industryId: 'pharma', roleId: 'naukowiec-rd', Icon: FlaskConical },
  { industryId: 'energy', roleId: 'operator-sterowni', Icon: Zap },
];

export function QuickStartCards({ onSelect, disabled }: Props) {
  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-sm font-semibold text-[color:var(--color-text)]">
          {copy.generate.quickStart.heading}
        </h3>
        <p className="text-xs text-[color:var(--color-muted)] mt-1">
          {copy.generate.quickStart.description}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {PRESETS.map(({ industryId, roleId, Icon }) => {
          const industry = getIndustry(industryId);
          const role = industry.roles.find((r) => r.id === roleId);
          return (
            <button
              key={industryId}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(industryId, roleId)}
              className="text-left p-3 rounded-md bg-[color:var(--color-surface)] border border-[color:var(--color-border)] hover:border-[color:var(--color-accent)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon
                className="w-5 h-5 mb-2"
                style={{ color: industry.accentColor }}
              />
              <div className="text-sm font-medium text-[color:var(--color-text)]">
                {industry.label}
              </div>
              <div className="text-xs text-[color:var(--color-muted)] mt-0.5 truncate">
                {role?.label}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
