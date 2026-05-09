import type { IndustryId, QuizQuestion } from '@/types/scenario';

const GENERIC: QuizQuestion[] = [
  {
    question: 'Który element jest najmocniejszym wskaźnikiem phishingu?',
    a: 'Profesjonalny język i terminologia branżowa',
    b: 'Domena nadawcy, która wygląda podobnie do prawdziwej (look-alike)',
    c: 'Logo firmy w nagłówku maila',
    correct: 'b',
  },
  {
    question: 'Co powinieneś zrobić jako pierwszy krok przy podejrzanym mailu?',
    a: 'Kliknąć link żeby zweryfikować jego treść',
    b: 'Odpisać do nadawcy z prośbą o szczegóły',
    c: 'Skontaktować się z działem IT lub integratorem znanym kanałem',
    correct: 'c',
  },
  {
    question: 'Dlaczego sztuczna pilność („48 godzin", „natychmiast") jest red flagiem?',
    a: 'Bo prawdziwe procesy biznesowe rzadko wymagają natychmiastowej akcji bez weryfikacji',
    b: 'Bo polskie prawo zakazuje takich sformułowań',
    c: 'Bo phishing jest zawsze pisany dużymi literami',
    correct: 'a',
  },
];

const PER_INDUSTRY: Record<IndustryId, QuizQuestion[]> = {
  aerospace: [
    {
      question: 'Kto powinien inicjować aktualizację certyfikatu EASA Part-145?',
      a: 'Zewnętrzny dostawca przez maila z presją czasową',
      b: 'Dział jakości we współpracy z autoryzowanym integratorem',
      c: 'Każdy inżynier samodzielnie po otrzymaniu alertu',
      correct: 'b',
    },
  ],
  pharma: [
    {
      question: 'Czy systemy LIMS/GMP są aktualizowane przez maila zewnętrznego dostawcy?',
      a: 'Tak, jeśli mail wygląda profesjonalnie',
      b: 'Nie — wszystkie zmiany przechodzą przez change control i walidację CSV',
      c: 'Tylko w przypadku audytu FDA',
      correct: 'b',
    },
  ],
  energy: [
    {
      question: 'Kto wykonuje aktualizację firmware sterowników PLC w infrastrukturze SCADA?',
      a: 'Każdy operator po otrzymaniu maila',
      b: 'Tylko dział utrzymania ruchu we współpracy z integratorem przez znany kanał',
      c: 'Zewnętrzny dostawca samodzielnie po otrzymaniu alertu',
      correct: 'b',
    },
  ],
  manufacturing: [
    {
      question: 'Jak weryfikować autentyczność alertu o systemie MES?',
      a: 'Sprawdzić czy mail zawiera logo firmy',
      b: 'Skontaktować się z administratorem MES przez wewnętrzny ticket / telefon',
      c: 'Kliknąć link żeby sprawdzić szczegóły',
      correct: 'b',
    },
  ],
  fintech: [
    {
      question: 'Czy SWIFT lub Bloomberg kontaktują się przez maila z linkiem do aktualizacji tokenu?',
      a: 'Tak, to standardowa procedura',
      b: 'Nie — krytyczne zmiany w systemach tradingowych przechodzą przez wewnętrzne kanały IT',
      c: 'Tylko jeśli mail przychodzi z domeny .com',
      correct: 'b',
    },
  ],
};

export function getFallbackQuiz(industryId: IndustryId): QuizQuestion[] {
  return [GENERIC[0], PER_INDUSTRY[industryId][0], GENERIC[1]];
}
