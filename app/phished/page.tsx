import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import { createServerSupabase } from '@/lib/supabase';
import { PhishedFlow } from '@/components/phished/PhishedFlow';
import { copy } from '@/lib/copy';
import type { IndustryId, Scenario } from '@/types/scenario';

export const metadata: Metadata = {
  title: '⚠️ Phishing wykryty — CyberDrill',
};

interface PageProps {
  searchParams: Promise<{ token?: string }>;
}

export default async function PhishedPage({ searchParams }: PageProps) {
  const { token } = await searchParams;

  if (!token) {
    return <NotFound />;
  }

  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from('campaigns')
    .select('industry, role, scenario_json, token, status')
    .eq('token', token)
    .maybeSingle();

  if (error || !data) {
    return <NotFound />;
  }

  return (
    <PhishedFlow
      scenario={data.scenario_json as Scenario}
      industryId={data.industry as IndustryId}
      token={data.token}
      alreadyReported={data.status === 'reported'}
    />
  );
}

function NotFound() {
  return (
    <main className="flex-1 flex items-center justify-center px-6 py-20">
      <div className="max-w-md text-center space-y-4">
        <AlertTriangle className="w-12 h-12 mx-auto text-[color:var(--color-warning)]" />
        <h1 className="text-2xl font-semibold">{copy.errors.notFound}</h1>
        <p className="text-[color:var(--color-muted)]">
          Token kampanii jest nieprawidłowy lub wygasł.
        </p>
        <Link
          href="/generate"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[color:var(--color-accent)] text-[color:var(--color-bg)] font-medium"
        >
          {copy.nav.runDemo}
        </Link>
      </div>
    </main>
  );
}
