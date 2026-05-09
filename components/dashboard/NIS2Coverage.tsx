import { Check, Circle, Star } from 'lucide-react';
import { NIS2_ARTICLE_21, NIS2_COVERED_COUNT, NIS2_TOTAL_COUNT } from '@/lib/nis2-articles';

export function NIS2Coverage() {
  return (
    <div className="rounded-lg bg-[color:var(--color-surface)] border border-[color:var(--color-border)] p-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-[color:var(--color-text)] uppercase tracking-wide">
            Pokrycie wymogów NIS2 Art. 21.2
          </h3>
          <p className="text-xs text-[color:var(--color-muted)] mt-0.5">
            Co CyberDrill realnie pokrywa — uczciwa ocena, nie marketing
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-[color:var(--color-accent)]">
            {NIS2_COVERED_COUNT} / {NIS2_TOTAL_COUNT}
          </div>
          <div className="text-xs text-[color:var(--color-muted)]">wymogów</div>
        </div>
      </div>

      <ul className="space-y-1.5">
        {NIS2_ARTICLE_21.map((art) => (
          <li
            key={art.id}
            className={`flex items-start gap-3 px-3 py-2 rounded-md text-sm ${
              art.primary
                ? 'bg-[color:var(--color-accent)]/10 border border-[color:var(--color-accent)]/30'
                : art.covered
                  ? 'bg-[color:var(--color-success)]/5'
                  : 'opacity-60'
            }`}
          >
            <span className="shrink-0 mt-0.5">
              {art.primary ? (
                <Star className="w-4 h-4 text-[color:var(--color-accent)] fill-[color:var(--color-accent)]" />
              ) : art.covered ? (
                <Check className="w-4 h-4 text-[color:var(--color-success)]" />
              ) : (
                <Circle className="w-4 h-4 text-[color:var(--color-muted)]" />
              )}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="font-mono text-xs text-[color:var(--color-muted)]">{art.id}</span>
                <span className={`text-sm ${art.covered ? 'text-[color:var(--color-text)]' : 'text-[color:var(--color-muted)]'}`}>
                  {art.label}
                </span>
                {art.primary && (
                  <span className="text-[10px] uppercase tracking-wide font-bold px-1.5 py-0.5 rounded bg-[color:var(--color-accent)] text-[color:var(--color-bg)]">
                    Primary
                  </span>
                )}
              </div>
              {art.note && (
                <div className="text-xs text-[color:var(--color-muted)] mt-0.5">{art.note}</div>
              )}
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-5 pt-4 border-t border-[color:var(--color-border)] text-xs text-[color:var(--color-muted)] leading-relaxed">
        <strong className="text-[color:var(--color-text)]">{NIS2_COVERED_COUNT} z {NIS2_TOTAL_COUNT}</strong> wymogów pokrywa CyberDrill bezpośrednio.
        Pozostałe wymagają osobnych narzędzi (vulnerability mgmt, MFA, BC/DR, supply chain security).
      </div>
    </div>
  );
}
