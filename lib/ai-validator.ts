import type { Scenario, IndustryConfig } from '@/types/scenario';

const EN_STOP_WORDS = ['click here', 'urgent action', 'verify your account', 'your account has been', 'dear customer', 'dear user', 'sign in to'];

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateScenario(
  scenario: Partial<Scenario>,
  industry: IndustryConfig,
): ValidationResult {
  const errors: string[] = [];

  if (!scenario.meta?.sender_name) errors.push('Missing sender_name');
  if (!scenario.meta?.sender_email) errors.push('Missing sender_email');
  if (!scenario.meta?.subject) errors.push('Missing subject');

  if (scenario.meta?.sender_email && !/^[\w.+-]+@[\w-]+(\.[\w-]+)+$/.test(scenario.meta.sender_email)) {
    errors.push('Invalid sender_email format');
  }

  if (!scenario.body_paragraphs || scenario.body_paragraphs.length < 2) {
    errors.push('Need at least 2 BODY paragraphs');
  }

  if (!scenario.data_table || scenario.data_table.length === 0) {
    errors.push('Missing DATA rows');
  }

  if (!scenario.cta?.text) errors.push('Missing CTA');

  if (!scenario.indicators || scenario.indicators.length < 3) {
    errors.push('Need at least 3 INDICATORs');
  }

  if (!scenario.education_text) errors.push('Missing EDU');

  // Branżowy słownik — heurystyka jakości (≥2 terminy w body)
  if (scenario.body_paragraphs && scenario.body_paragraphs.length >= 2) {
    const bodyText = scenario.body_paragraphs.join(' ').toLowerCase();
    const matchedTerms = industry.vocabulary.filter((term) =>
      bodyText.includes(term.toLowerCase()),
    );
    if (matchedTerms.length < 2) {
      errors.push(`Body uses only ${matchedTerms.length} industry terms (need ≥2)`);
    }
  }

  // Brak angielskich pasków
  if (scenario.body_paragraphs) {
    const bodyText = scenario.body_paragraphs.join(' ').toLowerCase();
    const matchedEn = EN_STOP_WORDS.filter((w) => bodyText.includes(w));
    if (matchedEn.length > 0) {
      errors.push(`English stop-words found: ${matchedEn.join(', ')}`);
    }
  }

  return { valid: errors.length === 0, errors };
}
