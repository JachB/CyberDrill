import type { Scenario, IndustryConfig } from '@/types/scenario';
import { copy } from '@/lib/copy';

interface Props {
  scenario: Partial<Scenario>;
  industry: IndustryConfig;
  trackUrl?: string;
}

const CTA_COLOR_MAP: Record<NonNullable<Scenario['cta']>['color'], string> = {
  red: '#DC2626',
  orange: '#EA580C',
  blue: '#2563EB',
};

export function EmailTemplate({ scenario, industry, trackUrl }: Props) {
  const primary = industry.primaryColor;
  const ctaColor = scenario.cta ? CTA_COLOR_MAP[scenario.cta.color] : primary;
  const senderInitial = scenario.meta?.sender_name?.charAt(0).toUpperCase() ?? '?';

  return (
    <div className="space-y-5">
      <header
        data-flag="sender"
        className="flex items-center gap-3 pb-4 border-b border-zinc-200"
      >
        <div
          style={{ backgroundColor: primary }}
          className="w-10 h-10 rounded flex items-center justify-center text-white font-bold text-sm"
        >
          {senderInitial}
        </div>
        <div className="min-w-0">
          <div className="font-semibold text-sm" style={{ color: primary }}>
            {scenario.meta?.sender_name ?? '…'}
          </div>
          <div className="text-xs text-zinc-500 truncate" data-flag="domain">
            {scenario.meta?.sender_email ?? '…'}
          </div>
        </div>
      </header>

      {scenario.meta?.subject && (
        <div data-flag="subject" className="text-sm font-semibold text-zinc-800 -mt-2">
          {scenario.meta.subject}
        </div>
      )}

      {(scenario.body_paragraphs?.length ?? 0) > 0 && (
        <div data-flag="urgency" className="border-l-4 border-red-600 pl-4 py-1">
          <div className="text-xs uppercase tracking-wide font-semibold text-red-600">
            Wymagana akcja
          </div>
        </div>
      )}

      <div data-flag="tone" className="space-y-3 text-sm leading-relaxed text-zinc-800">
        {scenario.body_paragraphs?.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      {(scenario.data_table?.length ?? 0) > 0 && (
        <table data-flag="data" className="w-full text-sm border border-zinc-200 rounded overflow-hidden">
          <tbody>
            {scenario.data_table?.map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-zinc-50' : 'bg-white'}>
                <td className="px-3 py-2 font-medium text-zinc-600 capitalize w-1/3">
                  {row.label.replace(/_/g, ' ')}
                </td>
                <td className="px-3 py-2 text-zinc-900">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {scenario.cta && (
        <div className="pt-2">
          <a
            data-flag="cta"
            href={trackUrl ?? '#'}
            style={{ backgroundColor: ctaColor }}
            className="inline-block px-6 py-3 rounded text-white font-medium hover:opacity-90 transition-opacity"
          >
            {scenario.cta.text}
          </a>
        </div>
      )}

      <footer className="pt-6 border-t border-zinc-200 text-xs text-zinc-500 space-y-1">
        <div>{industry.label} Security Division · ul. Przykładowa 12, 00-001 Warszawa</div>
        <div className="flex gap-3">
          <span className="hover:underline cursor-pointer">{copy.emailFrame.privacyPolicy}</span>
          <span className="hover:underline cursor-pointer">{copy.emailFrame.unsubscribe}</span>
        </div>
      </footer>
    </div>
  );
}
