'use client';

import Link from 'next/link';
import { Mail, Loader2, AlertCircle, BarChart3 } from 'lucide-react';
import { OutlookFrame } from '@/components/email-templates/OutlookFrame';
import { EmailTemplate } from '@/components/email-templates/EmailTemplate';
import { copy } from '@/lib/copy';
import { getIndustry } from '@/lib/industries';
import type { IndustryId, Scenario } from '@/types/scenario';
import type { StreamStatus } from '@/lib/use-scenario-stream';

interface Props {
  scenario: Partial<Scenario>;
  status: StreamStatus;
  token: string | null;
  error: string | null;
  industryId: IndustryId | null;
}

export function LivePreview({ scenario, status, token, error, industryId }: Props) {
  if (status === 'idle') {
    return <Empty />;
  }

  if (status === 'error') {
    return <ErrorState message={error ?? 'Unknown error'} />;
  }

  if (!industryId) {
    return <Empty />;
  }

  const industry = getIndustry(industryId);
  const trackUrl = token ? `/api/track?token=${token}` : undefined;

  return (
    <div className="space-y-3">
      <StatusBar status={status} />
      <OutlookFrame
        senderName={scenario.meta?.sender_name}
        senderEmail={scenario.meta?.sender_email}
        subject={scenario.meta?.subject}
      >
        <EmailTemplate scenario={scenario} industry={industry} trackUrl={trackUrl} />
      </OutlookFrame>
    </div>
  );
}

function Empty() {
  return (
    <div className="rounded-lg border border-dashed border-[color:var(--color-border)] p-12 text-center">
      <Mail className="w-10 h-10 mx-auto text-[color:var(--color-muted)] mb-3" />
      <p className="text-sm text-[color:var(--color-muted)]">{copy.generate.preview.empty}</p>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="rounded-lg border border-[color:var(--color-danger)] bg-[color:var(--color-danger)]/10 p-6">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-[color:var(--color-danger)] shrink-0 mt-0.5" />
        <div>
          <div className="font-medium text-[color:var(--color-text)]">{copy.toast.error}</div>
          <div className="text-sm text-[color:var(--color-muted)] mt-1 break-all">{message}</div>
        </div>
      </div>
    </div>
  );
}

function StatusBar({ status }: { status: StreamStatus }) {
  if (status === 'streaming') {
    return (
      <div className="flex items-center gap-2 text-sm text-[color:var(--color-muted)]">
        <Loader2 className="w-4 h-4 animate-spin text-[color:var(--color-accent)]" />
        <span>{copy.generate.preview.streaming}</span>
      </div>
    );
  }
  if (status === 'ready') {
    return (
      <div className="flex items-center justify-between">
        <div className="text-sm text-[color:var(--color-success)]">
          ✓ {copy.generate.preview.ready}
        </div>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[color:var(--color-border)] text-xs text-[color:var(--color-muted)] hover:text-[color:var(--color-text)] hover:border-[color:var(--color-accent)] transition-colors"
        >
          <BarChart3 className="w-3.5 h-3.5" />
          Dashboard CISO →
        </Link>
      </div>
    );
  }
  return null;
}
