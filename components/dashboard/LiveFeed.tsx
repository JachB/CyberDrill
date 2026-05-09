'use client';

import { useEffect, useState } from 'react';
import { Activity, MousePointerClick, Flag } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { relativeTimePl } from '@/lib/format';
import { copy } from '@/lib/copy';

interface FeedEvent {
  id: string;
  type: 'clicked' | 'reported';
  at: string;
  employeeName: string | null;
  department: string | null;
  isLive: boolean;
}

interface Props {
  limit?: number;
  title?: string;
  className?: string;
}

interface CampaignRow {
  id: string;
  clicked_at: string | null;
  reported_at: string | null;
  employee_name: string | null;
  department: string | null;
}

function rowToEvent(row: CampaignRow, isLive = false): FeedEvent {
  const isReported = Boolean(row.reported_at);
  return {
    id: row.id,
    type: isReported ? 'reported' : 'clicked',
    at: (isReported ? row.reported_at : row.clicked_at) ?? new Date().toISOString(),
    employeeName: row.employee_name,
    department: row.department,
    isLive,
  };
}

export function LiveFeed({ limit = 8, title, className = '' }: Props) {
  const [events, setEvents] = useState<FeedEvent[]>([]);
  const [, forceTick] = useState(0);
  const [highlightId, setHighlightId] = useState<string | null>(null);

  useEffect(() => {
    const id = setInterval(() => forceTick((n) => n + 1), 30000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from('campaigns')
        .select('id, clicked_at, reported_at, employee_name, department')
        .not('clicked_at', 'is', null)
        .order('clicked_at', { ascending: false })
        .limit(limit);
      if (cancelled || !data) return;
      setEvents(data.map((row) => rowToEvent(row as CampaignRow)));
    })();
    return () => {
      cancelled = true;
    };
  }, [limit]);

  useEffect(() => {
    const channel = supabase
      .channel('campaigns-live-feed')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'campaigns' },
        (payload) => {
          const row = payload.new as CampaignRow;
          if (!row.clicked_at && !row.reported_at) return;
          const ev = rowToEvent(row, !row.employee_name);
          setEvents((prev) => {
            const without = prev.filter((p) => p.id !== ev.id);
            return [ev, ...without].slice(0, limit);
          });
          setHighlightId(ev.id);
          setTimeout(() => setHighlightId((curr) => (curr === ev.id ? null : curr)), 2500);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [limit]);

  return (
    <div className={`rounded-lg bg-[color:var(--color-surface)] border border-[color:var(--color-border)] ${className}`}>
      <div className="px-4 py-3 border-b border-[color:var(--color-border)] flex items-center gap-2">
        <Activity className="w-4 h-4 text-[color:var(--color-accent)]" />
        <h3 className="text-sm font-semibold text-[color:var(--color-text)]">
          {title ?? copy.dashboard.feed.heading}
        </h3>
      </div>
      <ul className="divide-y divide-[color:var(--color-border)]">
        {events.length === 0 && (
          <li className="px-4 py-6 text-center text-sm text-[color:var(--color-muted)]">
            {copy.dashboard.feed.empty}
          </li>
        )}
        {events.map((ev) => (
          <FeedItem key={ev.id} event={ev} highlighted={highlightId === ev.id} />
        ))}
      </ul>
    </div>
  );
}

function FeedItem({ event, highlighted }: { event: FeedEvent; highlighted: boolean }) {
  const isReported = event.type === 'reported';
  const Icon = isReported ? Flag : MousePointerClick;
  const tone = isReported ? 'var(--color-success)' : 'var(--color-danger)';
  const action = isReported ? copy.dashboard.feed.eventReported : copy.dashboard.feed.eventClicked;
  const employee = event.employeeName ?? 'Live demo · Twoja akcja';
  const department = event.department ?? '—';

  return (
    <li
      className={`px-4 py-3 flex items-start gap-3 transition-colors duration-700 ${
        highlighted || event.isLive ? 'bg-[color:var(--color-accent)]/10' : ''
      }`}
    >
      <Icon className="w-4 h-4 shrink-0 mt-0.5" style={{ color: tone }} />
      <div className="flex-1 min-w-0">
        <div className="text-sm text-[color:var(--color-text)]">
          <span className="font-medium">{employee}</span>
          <span className="text-[color:var(--color-muted)]"> · {department}</span>
        </div>
        <div className="text-xs text-[color:var(--color-muted)] mt-0.5 flex items-center gap-2 flex-wrap">
          <span>
            {action}
            {isReported && <span className="text-[color:var(--color-success)]"> (+100 pkt)</span>}
            {' · '}
            {relativeTimePl(event.at)}
          </span>
          {isReported && (
            <span className="inline-block text-[10px] px-1.5 py-0.5 rounded bg-[color:var(--color-accent)]/15 text-[color:var(--color-accent)] font-medium">
              NIS2 21.2.b
            </span>
          )}
        </div>
      </div>
    </li>
  );
}
