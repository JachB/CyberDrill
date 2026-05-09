import type { IndustryConfig } from '@/types/scenario';

const FEW_SHOT_EXAMPLE_ENERGY = `META: sender_name="Siemens Energy Grid Cybersecurity", sender_email="alerts@siemens-energy-cert.eu", subject="[KRYTYCZNE] Wymagana aktualizacja firmware sterownika PLC — Linia 7"
BODY: Szanowny Inżynierze Utrzymania,
BODY: W ramach rutynowego audytu bezpieczeństwa systemu SCADA HMI wykryliśmy że sterownik PLC obsługujący Linię 7 dyspozytorni OSD w Tauron Dystrybucja S.A. posiada nieaktualną wersję firmware (rev. 4.2.1) zawierającą podatność CVE-2024-49549 dotyczącą protokołu IEC 61850 — umożliwia zdalne wykonanie kodu przez sieć Profinet bez uwierzytelnienia.
BODY: Aktualizacja musi zostać wykonana w ciągu 48 godzin. Niezastosowanie się może skutkować zatrzymaniem sekcji rozdzielczej i koniecznością zgłoszenia incydentu zgodnie z Art. 21(b) dyrektywy NIS2 oraz UKSC 2.0.
BODY: Prosimy o niezwłoczne potwierdzenie pobrania pakietu aktualizacyjnego za pomocą poniższego linku autoryzacyjnego powiązanego z Państwa numerem kontraktu SRV-2024-TAU-0881.
DATA: sterownik="SIMATIC S7-1500 CPU 1516-3 PN/DP", linia="L7-OSD-23A", deadline="48h", status="KRYTYCZNY — CVE-2024-49549"
CTA: text="Pobierz aktualizację firmware", color="red"
INDICATOR: target="domain", text="Domena look-alike: siemens-energy-cert.eu nie jest oficjalną domeną Siemens (siemens.com). Atakujący rejestruje podobnie wyglądające domeny żeby uśpić czujność."
INDICATOR: target="urgency", text="Sztuczna presja czasowa: '48 godzin' i etykieta 'KRYTYCZNY' to klasyczna technika urgency mająca skłonić do działania bez weryfikacji z przełożonym."
INDICATOR: target="data", text="Choć CVE-2024-49549 jest realną podatnością Siemens, żaden prawdziwy alert Siemens nie żąda pobrania patcha przez link w emailu — aktualizacje idą przez Industry Online Support (support.industry.siemens.com)."
EDU: Aktualizacje firmware sterowników PLC są koordynowane przez dział utrzymania ruchu z integratorem systemu — nigdy przez link w emailu. Prawdziwy Siemens komunikuje się przez oficjalne portale i kanały integratora, nie przez domeny look-alike.
QUIZ: question="Który element jest najmocniejszym wskaźnikiem phishingu w tym mailu?", a="Profesjonalny język techniczny", b="Domena nadawcy siemens-energy-cert.eu zamiast siemens.com", c="Wzmianka o protokole IEC 61850", correct="b"
QUIZ: question="Co powinieneś zrobić jako pierwszy krok?", a="Kliknąć link żeby zweryfikować podatność", b="Odpisać do nadawcy z prośbą o szczegóły", c="Skontaktować się z integratorem SCADA przez znany kanał", correct="c"
QUIZ: question="Jak zweryfikować prawdziwość alertu Siemens?", a="Wpisać adres z maila w przeglądarkę", b="Zalogować się na support.industry.siemens.com przez zapisaną zakładkę", c="Odpisać na maila z prośbą o potwierdzenie", correct="b"`;

const FEW_SHOT_EXAMPLE_MANUFACTURING = `META: sender_name="Siemens MES Support Center", sender_email="license-alerts@siemens-mes-eu.com", subject="[PILNE] Wygaśnięcie licencji SIMATIC IT Production Suite — Linia 3 · Volkswagen Poznań"
BODY: Szanowny Panie Inżynierze,
BODY: System monitorowania wykrył że licencja SIMATIC IT Production Suite (nr LIC-2024-PL-7743) przypisana do stanowiska OEE Monitor — Hala C, Linia 3 wygasa o 23:59 dnia 09.05.2026. Brak odnowienia spowoduje automatyczne wyłączenie modułu raportowania OEE i Andon Board, co uniemożliwi śledzenie wskaźników TPM na zmianie nocnej.
BODY: Zgodnie z umową serwisową SLA-PL-2023-0441, odnowienie wymaga weryfikacji tożsamości administratora systemu MES. Prosimy o pilne działanie — czas reakcji SLA wynosi 4 godziny.
DATA: licencja="LIC-2024-PL-7743", produkt="SIMATIC IT Production Suite v2.2", lokalizacja="Hala C — Linia 3", deadline="09.05.2026 23:59", status="WYGASA"
CTA: text="Odnów licencję MES →", color="red"
INDICATOR: target="domain", text="Domena siemens-mes-eu.com to look-alike — prawdziwe alerty licencyjne Siemens przychodzą z @siemens.com lub przez Industry Online Support (support.industry.siemens.com)."
INDICATOR: target="urgency", text="Termin '23:59 dzisiaj' i '4 godziny SLA' to technika urgency — atakujący liczą że nie zdążysz zweryfikować przez dział IT."
INDICATOR: target="data", text="Numery licencji w stylu 'LIC-2024-PL-7743' i numery umów SLA brzmią realistycznie, ale nie możesz ich zweryfikować bez logowania do portalu producenta przez znany adres."
EDU: Siemens wysyła powiadomienia o wygaśnięciu licencji przez portal Industry Online Support — system który znasz z pracy. Żaden prawdziwy alert nie prosi o weryfikację tożsamości przez link w emailu zewnętrznym.
QUIZ: question="Jak zweryfikować alert licencyjny Siemens?", a="Kliknąć link w emailu i zalogować się", b="Zalogować się na support.industry.siemens.com przez zapisaną zakładkę", c="Zadzwonić pod numer z maila", correct="b"
QUIZ: question="Który element jest najsilniejszym wskaźnikiem phishingu?", a="Termin ważności licencji", b="Domena nadawcy siemens-mes-eu.com", c="Numer umowy SLA", correct="b"
QUIZ: question="Co zrobisz jeśli nie jesteś pewny maila?", a="Otworzysz link żeby sprawdzić", b="Zignornujesz go", c="Zgłosisz do działu IT zanim klikniesz", correct="c"`;

const TARGETS_DESCRIPTION = `Dostępne wartości pola target (wybierz najlepiej pasujące dla każdego INDICATOR):
- "domain" — gdy wskaźnik dotyczy podejrzanej domeny nadawcy (look-alike, zła końcówka)
- "sender" — gdy chodzi o nazwę nadawcy (np. nieautentyczna jednostka, brak takiego działu)
- "subject" — gdy chodzi o temat (np. wykrzyknik, nadmierna pilność w temacie)
- "urgency" — gdy treść wywiera sztuczną presję czasową ("48h", "natychmiast")
- "cta" — gdy podejrzany jest sam przycisk akcji (kolor, tekst, host docelowy)
- "data" — gdy podejrzane są dane w tabeli (fałszywy numer certyfikatu, niezweryfikowany CVE, sztuczny status)
- "tone" — gdy chodzi o ton wiadomości (groźba, nietypowy język, błędy stylistyczne)`;

export function buildPrompt(industry: IndustryConfig, roleId: string): string {
  const role = industry.roles.find((r) => r.id === roleId);
  if (!role) {
    throw new Error(`Unknown role ${roleId} for industry ${industry.id}`);
  }

  const sendersList = industry.fictionalSenders
    .map((s) => `- ${s.name} <security@${s.domain}> (look-alike domeny prawdziwych dostawców)`)
    .join('\n');

  return `Jesteś analitykiem cyberbezpieczeństwa tworzącym REALISTYCZNE scenariusze phishingu na potrzeby symulacji szkoleniowych dla pracowników firm przemysłowych. Twoim celem jest wygenerowanie maila który mógłby zostać wysłany do prawdziwej osoby na danym stanowisku w danej branży.

ZASADY (twarde):
1. Pisz wyłącznie po polsku biznesowym/inżynierskim. Bez angielskich pasków.
2. Użyj 2-3 terminów ze słownika branżowego (poniżej).
3. Wybierz nadawcę z listy realistycznych dostawców — domena MUSI być look-alike (podobna do prawdziwej, np. siemens-energy-cert.eu zamiast siemens.com). To kluczowy element edukacyjny.
4. Zastosuj DOKŁADNIE JEDNĄ technikę manipulacji: urgency / authority / fear.
5. NIE używaj prawdziwych pełnych nazw produktów chronionych marką w sposób mylący (np. nie pisz "Office 365"). Imitujesz styl, nie kopiujesz brand assets.
6. Mail musi pasować do profilu emocjonalnego roli.
7. Zwróć WYŁĄCZNIE format strukturalny opisany niżej. Bez wstępu, bez komentarza, bez markdown bloków.

KONTEKST BRANŻY: ${industry.label}

SŁOWNIK TERMINÓW BRANŻOWYCH (użyj 2-3):
${industry.vocabulary.map((v) => `- ${v}`).join('\n')}

REALISTYCZNI NADAWCY (wybierz jednego):
${sendersList}

TYPOWE SCENARIUSZE (wybierz jeden):
${industry.commonScenarios.map((s) => `- ${s}`).join('\n')}

ROLA ODBIORCY: ${role.label}
OPIS ROLI: ${role.description}
PROFIL EMOCJONALNY: ${role.emotionalProfile}

${TARGETS_DESCRIPTION}

FORMAT OUTPUTU — emituj DOKŁADNIE takie linie z prefixami (każda linia osobno, w tej kolejności):

META: sender_name="...", sender_email="...", subject="..."
BODY: <pierwszy akapit>
BODY: <drugi akapit>
BODY: <trzeci akapit, można więcej>
DATA: klucz1="wartość1", klucz2="wartość2", klucz3="wartość3", klucz4="wartość4"
CTA: text="<tekst przycisku>", color="red"
INDICATOR: target="<jedna z wartości powyżej>", text="<wskaźnik phishingu — 1-2 zdania, dlaczego to phishing>"
INDICATOR: target="<inna wartość>", text="<wskaźnik 2>"
INDICATOR: target="<inna wartość>", text="<wskaźnik 3>"
EDU: <2 zdania edukacyjne — jak prawdziwy proces wygląda inaczej>
QUIZ: question="<pytanie 1 sprawdzające zrozumienie>", a="<odpowiedź A>", b="<odpowiedź B>", c="<odpowiedź C>", correct="<a/b/c>"
QUIZ: question="<pytanie 2>", a="...", b="...", c="...", correct="..."
QUIZ: question="<pytanie 3>", a="...", b="...", c="...", correct="..."

Pytania quizowe muszą sprawdzać czy odbiorca zrozumiał DLACZEGO ten konkretny mail to phishing. Każde pytanie ma 3 opcje, jedna poprawna.

KONTEKST PRACODAWCY — typowe firmy w tej branży w Polsce (użyj jako realistyczny kontekst miejsca pracy odbiorcy — np. wspominając linię produkcyjną, dział lub lokalizację charakterystyczną dla tej branży w Polsce; nie impersonuj żadnej z tych firm jako nadawcy):
${industry.polishEmployers.join(', ')}

PRZYKŁADY WZORCOWE (dla referencji stylu i formatu — przeczytaj oba zanim zaczniesz):

Przykład 1 — Energy / Inżynier Utrzymania:
${FEW_SHOT_EXAMPLE_ENERGY}

Przykład 2 — Manufacturing / Inżynier Procesu:
${FEW_SHOT_EXAMPLE_MANUFACTURING}

Teraz wygeneruj nowy scenariusz dla branży ${industry.label} i roli ${role.label}. Zwróć wyłącznie linie z prefixami.`;
}
