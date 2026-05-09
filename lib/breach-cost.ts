import type { IndustryId } from '@/types/scenario';

// Średni koszt incydentu phishingowego per branża (PLN)
// Bazowane na: IBM Cost of Data Breach Report 2024, ENISA NIS2 Impact Study,
// raporty branżowe ISA/IEC, dane PIE (Polski Instytut Ekonomiczny)
export const BREACH_COST_PER_CLICK: Record<IndustryId, number> = {
  aerospace: 150_000, // AOG (Aircraft On Ground) ~$10K-150K/h × 4h średnio
  pharma: 220_000, // batch contamination 500K-2M per batch, średnia
  energy: 310_000, // grid disruption + regulatory fines NIS2
  manufacturing: 95_000, // line stoppage 4h × średnia stawka godzinowa
  fintech: 450_000, // data breach EU avg per IBM 2024
};

// Roczny koszt licencji CyberDrill (PLN) — założenie biznesowe
export const ANNUAL_LICENSE_COST = 280_000;

// Prawdopodobieństwo eskalacji kliknięcia do faktycznego incydentu
export const ESCALATION_PROBABILITY = 0.12;

export const BREACH_COST_SOURCE =
  'IBM Cost of Data Breach Report 2024 + ENISA NIS2 Impact Study';

/**
 * Oblicza potencjalny kwartalny koszt incydentów dla danej liczby kliknięć.
 * Założenie: kwartalna ekspozycja = clicks × cost × P(eskalacja).
 */
export function calculateQuarterlyExposure(
  industryId: IndustryId,
  clicksPerQuarter: number,
): number {
  return Math.round(
    BREACH_COST_PER_CLICK[industryId] * clicksPerQuarter * ESCALATION_PROBABILITY,
  );
}

export function formatPLN(amount: number): string {
  if (amount >= 1_000_000) {
    return `${(amount / 1_000_000).toFixed(1).replace('.', ',')}M PLN`;
  }
  if (amount >= 1_000) {
    return `${Math.round(amount / 1_000)}K PLN`;
  }
  return `${amount} PLN`;
}
