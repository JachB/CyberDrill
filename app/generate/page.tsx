'use client';

import Link from 'next/link';
import { Shield, ArrowLeft } from 'lucide-react';
import { useScenarioStream } from '@/lib/use-scenario-stream';
import { ScenarioForm } from '@/components/generate/ScenarioForm';
import { QuickStartCards } from '@/components/generate/QuickStartCards';
import { LivePreview } from '@/components/generate/LivePreview';
import { LiveFeed } from '@/components/dashboard/LiveFeed';
import { copy } from '@/lib/copy';

export default function GeneratePage() {
  const { scenario, token, status, error, industryId, generate } = useScenarioStream();
  const isStreaming = status === 'streaming';

  return (
    <div className="flex-1 flex flex-col">
      <header className="border-b border-[color:var(--color-border)] px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2 text-sm text-[color:var(--color-muted)] hover:text-[color:var(--color-text)]">
            <ArrowLeft className="w-4 h-4" />
            {copy.brand.name}
          </Link>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[color:var(--color-accent)]" />
            <span className="font-semibold">{copy.brand.name}</span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8">
        <aside className="space-y-6">
          <div>
            <h1 className="text-xl font-semibold text-[color:var(--color-text)]">
              {copy.generate.title}
            </h1>
          </div>
          <ScenarioForm onSubmit={generate} isStreaming={isStreaming} />
          <div className="border-t border-[color:var(--color-border)] pt-6">
            <QuickStartCards onSelect={generate} disabled={isStreaming} />
          </div>
          <div className="border-t border-[color:var(--color-border)] pt-6">
            <LiveFeed limit={4} title={copy.generate.miniFeed.heading} />
          </div>
        </aside>

        <section>
          <LivePreview
            scenario={scenario}
            status={status}
            token={token}
            error={error}
            industryId={industryId}
          />
        </section>
      </main>
    </div>
  );
}
