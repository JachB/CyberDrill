// Mapowanie wymogów NIS2 Art. 21.2 do tego co CyberDrill rzeczywiście pokrywa.
// Świadomie pokazujemy uczciwą ocenę — nie jesteśmy silver bullet.

export interface Nis2Article {
  id: string;
  label: string;
  covered: boolean;
  primary?: boolean;
  note?: string;
}

export const NIS2_ARTICLE_21: Nis2Article[] = [
  {
    id: '21.2.a',
    label: 'Polityki analizy ryzyka i bezpieczeństwa systemów informatycznych',
    covered: true,
    note: 'Pomiar ryzyka human-factor przez phish-prone %',
  },
  {
    id: '21.2.b',
    label: 'Obsługa incydentów',
    covered: true,
    note: 'Zgłaszanie podejrzanych maili przez przycisk Report',
  },
  {
    id: '21.2.c',
    label: 'Ciągłość działania, backup, disaster recovery',
    covered: false,
  },
  {
    id: '21.2.d',
    label: 'Bezpieczeństwo łańcucha dostaw',
    covered: false,
  },
  {
    id: '21.2.e',
    label: 'Bezpieczeństwo przy nabywaniu, rozwoju i utrzymaniu systemów',
    covered: false,
  },
  {
    id: '21.2.f',
    label: 'Polityki zarządzania podatnościami',
    covered: false,
  },
  {
    id: '21.2.g',
    label: 'Szkolenia w zakresie cyberbezpieczeństwa',
    covered: true,
    primary: true,
    note: 'Główna funkcja — kampanie phishingowe + edukacja po incydencie',
  },
  {
    id: '21.2.h',
    label: 'Polityki kryptograficzne i kontroli dostępu',
    covered: false,
  },
  {
    id: '21.2.i',
    label: 'Bezpieczeństwo zasobów ludzkich',
    covered: true,
    note: 'Awareness program zgodny z definicją NIS2 art. 21.2.i',
  },
  {
    id: '21.2.j',
    label: 'Rozwiązania uwierzytelniania wieloskładnikowego (MFA)',
    covered: false,
  },
];

export const NIS2_COVERED_COUNT = NIS2_ARTICLE_21.filter((a) => a.covered).length;
export const NIS2_TOTAL_COUNT = NIS2_ARTICLE_21.length;
