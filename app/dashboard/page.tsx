'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Shield, Plus, Users, MousePointerClick, Flag, AlertTriangle } from 'lucide-react';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { LiveFeed } from '@/components/dashboard/LiveFeed';
import { DepartmentTable } from '@/components/dashboard/DepartmentTable';
import { NIS2ExportButton } from '@/components/dashboard/NIS2ExportButton';
import { ImpactCard } from '@/components/dashboard/ImpactCard';
import { NIS2Coverage } from '@/components/dashboard/NIS2Coverage';
import { AchievementsWidget } from '@/components/dashboard/AchievementsWidget';
import { copy } from '@/lib/copy';
import { SUMMARY_METRICS } from '@/lib/dashboard-data';

const TrendChart = dynamic(() => import('@/components/dashboard/TrendChart').then((m) => m.TrendChart), {
  ssr: false,
  loading: () => <div className="h-72 rounded-lg bg-[color:var(--color-surface)] border border-[color:var(--color-border)]" />,
});

export default function DashboardPage() {
  const m = SUMMARY_METRICS;
  return (
    <div className="flex-1 flex flex-col">
      <header className="border-b border-[color:var(--color-border)] px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[color:var(--color-accent)]" />
            <span className="font-semibold text-[color:var(--color-text)]">{copy.brand.name}</span>
          </Link>
          <div className="text-xs text-[color:var(--color-muted)]">
            {copy.dashboard.company} · {copy.dashboard.lastCampaignLabel}{' '}
            <span className="text-[color:var(--color-text)]">07.05.2026</span>
          </div>
          <Link
            href="/generate"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[color:var(--color-accent)] text-[color:var(--color-bg)] text-sm font-medium hover:bg-[color:var(--color-accent-hover)] transition-colors"
          >
            <Plus className="w-4 h-4" />
            {copy.dashboard.newCampaign}
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 space-y-6">
        <h1 className="text-2xl font-semibold text-[color:var(--color-text)]">
          {copy.dashboard.title}
        </h1>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label={copy.dashboard.metrics.phishProne}
            value={m.phishProne}
            suffix="%"
            tone="success"
            Icon={AlertTriangle}
            hint="Kampania z 22.04.2026"
          />
          <MetricCard
            label={copy.dashboard.metrics.sent}
            value={m.sent}
            tone="accent"
            Icon={Users}
            hint="Łącznie 247 pracowników"
          />
          <MetricCard
            label={copy.dashboard.metrics.clicked}
            value={m.clicked}
            tone="danger"
            Icon={MousePointerClick}
            hint={`${Math.round((m.clicked / m.sent) * 100)}% z wysłanych`}
          />
          <MetricCard
            label={copy.dashboard.metrics.reported}
            value={m.reported}
            tone="success"
            Icon={Flag}
            hint={`${Math.round((m.reported / m.sent) * 100)}% prawidłowo zgłosiło`}
          />
        </div>

        <ImpactCard />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TrendChart />
          </div>
          <div className="space-y-6">
            <LiveFeed limit={6} />
            <AchievementsWidget />
          </div>
        </div>

        <DepartmentTable />

        <NIS2Coverage />

        <div className="flex justify-end pt-2">
          <NIS2ExportButton />
        </div>
      </main>
    </div>
  );
}
