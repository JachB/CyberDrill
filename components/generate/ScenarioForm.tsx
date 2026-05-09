'use client';

import { useState } from 'react';
import { Rocket } from 'lucide-react';
import { copy } from '@/lib/copy';
import { INDUSTRY_LIST, getIndustry } from '@/lib/industries';
import type { IndustryId } from '@/types/scenario';

interface Props {
  onSubmit: (industryId: IndustryId, roleId: string) => void;
  isStreaming: boolean;
}

export function ScenarioForm({ onSubmit, isStreaming }: Props) {
  const [industryId, setIndustryId] = useState<IndustryId>('aerospace');
  const [roleId, setRoleId] = useState(getIndustry('aerospace').roles[0].id);

  const industry = getIndustry(industryId);

  const handleIndustryChange = (newId: IndustryId) => {
    setIndustryId(newId);
    setRoleId(getIndustry(newId).roles[0].id);
  };

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(industryId, roleId);
      }}
    >
      <Field label={copy.generate.industryLabel}>
        <select
          value={industryId}
          onChange={(e) => handleIndustryChange(e.target.value as IndustryId)}
          disabled={isStreaming}
          className="w-full px-3 py-2 rounded-md bg-[color:var(--color-surface)] border border-[color:var(--color-border)] text-[color:var(--color-text)] focus:outline-none focus:border-[color:var(--color-accent)] disabled:opacity-50"
        >
          {INDUSTRY_LIST.map((i) => (
            <option key={i.id} value={i.id}>{i.label}</option>
          ))}
        </select>
      </Field>

      <Field label={copy.generate.roleLabel}>
        <select
          value={roleId}
          onChange={(e) => setRoleId(e.target.value)}
          disabled={isStreaming}
          className="w-full px-3 py-2 rounded-md bg-[color:var(--color-surface)] border border-[color:var(--color-border)] text-[color:var(--color-text)] focus:outline-none focus:border-[color:var(--color-accent)] disabled:opacity-50"
        >
          {industry.roles.map((r) => (
            <option key={r.id} value={r.id}>{r.label}</option>
          ))}
        </select>
        <p className="text-xs text-[color:var(--color-muted)] mt-1">
          {industry.roles.find((r) => r.id === roleId)?.description}
        </p>
      </Field>

      <button
        type="submit"
        disabled={isStreaming}
        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-[color:var(--color-accent)] text-[color:var(--color-bg)] font-medium hover:bg-[color:var(--color-accent-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Rocket className="w-4 h-4" />
        {isStreaming ? copy.generate.submitting : copy.generate.submit}
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-[color:var(--color-text)]">{label}</label>
      {children}
    </div>
  );
}
