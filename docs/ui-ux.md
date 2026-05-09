# UI/UX — szczegóły każdej strony

To jest projekt stażowy który ma zrobić wrażenie. Każda strona musi wyglądać jak prawdziwy produkt enterprise, nie jak projekt studencki. Inspiracja: Vercel, Linear, Datadog — ciemny motyw, czyste karty, animacje subtelne ale widoczne.

---

## Design system — paleta i konwencje

### Kolory (CSS custom properties w `app/globals.css`)
- Tło: `#0D1117` (`--color-bg`)
- Karty/powierzchnie: `#161B22` (`--color-surface`)
- Druga warstwa powierzchni: `#1C232C` (`--color-surface-2`)
- Akcent główny: `#00D4AA` (`--color-accent`, teal)
- Akcent danger: `#F85149` (`--color-danger`, czerwony)
- Akcent warning: `#D29922` (`--color-warning`, żółty)
- Akcent success: `#2EA043` (`--color-success`, zielony)
- Tekst główny: `#E6EDF3` (`--color-text`)
- Tekst muted: `#8B949E` (`--color-muted`)
- Border: `#30363D` (`--color-border`)

### Strony specjalne
- `/phished` może być bardziej dramatyczna — duży nagłówek, czerwone kolory, żeby zrobiła wrażenie gdy rekruter na nią trafi
- `/dashboard` powinna wyglądać jak prawdziwe narzędzie enterprise — wykresy, tabele, metryki

---

## Strona główna — Landing Page (/)

To jest pierwsza rzecz którą rekruter zobaczy wchodząc na link. Musi od razu komunikować że to jest prawdziwy produkt, nie demo.

**Nawigacja górna:**
Logo CyberDrill po lewej (ikonka tarczy + nazwa). Po prawej: linki "Produkt", "Demo", "Cennik" (niedziałające, tylko wizualne) i przycisk "Uruchom demo" który prowadzi do `/generate`.

**Hero section:**
Duży nagłówek zajmujący pół ekranu — "Phishing który wygląda jak prawdziwy atak. Bo nim jest." Pod spodem jedno zdanie opisu produktu. Dwa przyciski: "Wypróbuj live demo" (teal, główny) i "Zobacz jak działa" (outline, drugorzędny). Po prawej stronie hero — animowany podgląd wygenerowanego maila phishingowego (statyczny mockup który wygląda jak prawdziwy email w kliencie pocztowym).

**Pasek z liczbami (social proof):**
Trzy statystyki w jednej linii:
- "96% incydentów OT zaczyna się od phishingu"
- "74% naruszeń to błąd ludzki"
- "NIS2 obowiązuje od 3 kwietnia 2026"

Mają wyglądać jak liczby z dashboardu, nie jak bullet pointy.

**Sekcja "Jak to działa" (3 kroki):**
Trzy karty poziomo:
1. Wybierz branżę i rolę
2. AI generuje spersonalizowany scenariusz
3. Pracownik klika → uczy się

Każda karta ma ikonkę, krótki tytuł i jedno zdanie opisu.

**Sekcja "Dla kogo":**
Dwie kolumny:
- **CISO** (kupuje, bo NIS2 compliance)
- **Inżynier OT** (używa, bo scenariusze z jego świata)

Karty wyglądają jak profile z avatarem-placeholder i bullet pointami bólu.

**Sekcja branż:**
Pięć logotypów branżowych (ikony + nazwy): Aerospace, Pharma, Energy, Manufacturing, Fintech. Subtelna animacja hover.

**Footer:**
Minimalistyczny. Logo, copyright, linki do GitHub.

Ogólny styl landing page: ciemne tło, sekcje wyraźnie oddzielone. Czysty, nowoczesny, zero stock photos. Wygląda jak strona główna SaaS B2B.

---

## Dashboard CISO (/dashboard)

To jest serce aplikacji i najważniejsza strona z perspektywy wrażenia "to jest prawdziwy produkt".

**Header:**
Nazwa firmy ("Acme Industrial Sp. z o.o."), data ostatniej kampanii, przycisk "Nowa kampania" → `/generate`.

**Cztery karty metryk (animowane liczniki):**
- **Phish-prone %** — duża liczba z kolorowym tłem (zielony <15%, żółty 15-30%, czerwony >30%)
- **Wysłane maile** — total z tej kampanii
- **Kliknięcia** — liczba z procentem w nawiasie
- **Zgłoszone phishing** — liczba pracowników którzy prawidłowo zgłosili

Liczniki animują się od zera przy załadowaniu strony.

**Wykres liniowy:**
Trend phish-prone % przez ostatnie 8 tygodni. Linia idzie w dół (poprawa po szkoleniu). Wizualna narracja "patrzcie, szkolenie działa". Recharts z dynamic import.

**Live feed eventów (prawa kolumna):**
Scrollująca lista ostatnich wydarzeń przez Supabase Realtime. Każdy event ma ikonkę, czas, dział, typ zdarzenia (kliknął link / zgłosił phishing). Nowe eventy wpadają z góry z animacją slide-in. **Gdy rekruter kliknie CTA w live preview podczas demo — jego event pojawia się tutaj na żywo.**

**Tabela działów:**
Ranking od najsłabszego do najsilniejszego. Kolumny: nazwa, pracownicy, % kliknięć, % zgłoszeń, risk score (pasek od czerwonego do zielonego). Wiersz "Dział Produkcji" wyróżniony na czerwono.

**Przycisk "Eksportuj raport NIS2":**
Duży przycisk który **generuje prawdziwy PDF** przez jsPDF (z polskim fontem Roboto/NotoSans embedded). Klik → loading spinner ~2s → PDF się pobiera. Otwierany w Acrobat pokazuje 5 stron. **NIE jest mockupem** — to closing move sprzedaży. Patrz [docs/nis2.md](nis2.md).

Ogólny styl: ciemny motyw, karty z delikatną ramką, wykresy w kolorach teal/czerwony/żółty. Wygląda jak SOC dashboard z Datadog lub Grafany.

---

## Generator scenariusza (/generate)

Nie jest to tylko prosty formularz — wygląda jak narzędzie do uruchamiania kampanii.

**Lewa strona — formularz:**
Tytuł "Nowa kampania phishingowa". Dropdown branży z ikonkami branż. Dropdown roli z opisem każdej roli. Przycisk "Generuj scenariusz" — teal, duży, z ikonką rakiety.

Poniżej — trzy karty "Szybki start" z gotowymi scenariuszami demo (Aerospace, Pharma, Energy). Kliknięcie wypełnia formularz automatycznie i triggeruje generowanie przez AI (zgodnie z normalnym flow, **bez bypassu**).

**Pod formularzem — mini live feed (split-screen):**
Skrócona wersja `LiveFeed.tsx` z `/dashboard` — ostatnie 3-4 eventy. Gdy rekruter kliknie CTA w preview → event pojawia się tutaj W TEJ SAMEJ ZAKŁADCE przez Supabase Realtime. **Eliminuje konieczność otwierania `/dashboard` w drugim tabie podczas demo.**

**Prawa strona — podgląd live:**
Gdy AI generuje scenariusz — animowany podgląd maila buduje się w czasie rzeczywistym (streaming Gemini 3 Flash przez SSE). Pojawia się temat, nadawca, akapity body, tabela danych technicznych. **Wow moment** — rekruter widzi AI w akcji token-po-tokenie.

Po wygenerowaniu — pełny podgląd maila w `<OutlookFrame>` (Od/Do/Temat) wyrenderowany w branżowym `<{Industry}Template>`. **Aktywny CTA button** w mailu prowadzi do `/api/track?token=xxx` → redirect na `/phished`. **Brak przycisku "Wyślij"** — Resend wycięty.

---

## Strona edukacyjna /phished — szczegółowy opis

To jest najważniejsza strona z perspektywy emocjonalnej. Rekruter właśnie kliknął link — jest zaskoczony. Ta strona musi być dramatyczna, angażująca i edukacyjna jednocześnie. **Każdy element pojawia się z animacją — sekwencyjnie, nie wszystko naraz.**

### Krok 1 — Ekran alarmowy (pierwsze 2 sekundy)
Pełnoekranowe ciemne tło. Duża czerwona ikonka tarczy z wykrzyknikiem (pulsuje przez chwilę). Tekst "Dałeś się złapać." — duży, biały, bez owijania w bawełnę. Pod spodem mniejszy: "Ten mail był symulowanym atakiem phishingowym stworzonym przez CyberDrill." Fade-in.

### Krok 2 — Statystyka która uderza (po 2s)
Animowany licznik countup — od 0 do konkretnej liczby: "Właśnie dołączyłeś do 34% pracowników którzy kliknęli ten scenariusz." **Personalizacja** — rekruter czuje że jest częścią statystyki, nie tylko obserwatorem.

### Krok 3 — Reveal wskaźników phishingu (sekwencyjnie, co 0.8s)
Trzy karty pojawiają się jedna po drugiej z animacją slide-in. Każda karta:
- Numer (01, 02, 03) w dużym kolorze teal
- Tytuł wskaźnika (np. "Fałszywa domena nadawcy")
- Krótkie wyjaśnienie (2 zdania) dlaczego to był sygnał ostrzegawczy
- Ikonka pasująca do wskaźnika (@ dla domeny, zegar dla presji czasowej, itp.)

**Ważne:** te wskaźniki pochodzą z odpowiedzi Gemini 3 Flash (linie `INDICATOR:` w streamie) — są spersonalizowane pod konkretny wygenerowany scenariusz. Trzymane w `scenario_json.indicators[]` w Supabase, fetchowane przez `/phished` po tokenie.

### Krok 4 — Lekcja
Sekcja "Co zrobić następnym razem" z trzema punktami. Każdy ma ikonkę checkmark, animacja jeden po drugim.

### Krok 5 — Gamifikacja (serce strony)

**Element A — Przycisk "Zgłoś phishing":**
Duży zielony "Zgłosiłbym ten mail jako podejrzany". Po kliknięciu: konfetti animacja (canvas-confetti, max 200 cząsteczek, 1.5s, skip jeśli `prefers-reduced-motion`), zielony flash 1s, toast "+100 punktów!", przycisk zmienia się na "Zgłoszono ✓". Nagradza prawidłowe zachowanie — nawet post-factum.

**Element B — Rating trudności scenariusza:**
"Jak trudny był ten phishing?" z pięcioma gwiazdkami. Kliknięcie animuje (scale up, fill kolorem). Po wybraniu kontekstowy feedback:
- 1-2 gwiazdki: "Zgadzamy się — ten scenariusz był zaawansowany"
- 4-5 gwiazdek: "Następnym razem zwróć uwagę na domenę nadawcy."

**Element C — Mini leaderboard kontekstowy:**
"Twój dział w tym tygodniu: #3 z 5 działów. Dział IT jest na #1 — 0% kliknięć w tym miesiącu." Buduje narrację grywalizacji nawet na stronie edukacyjnej.

### Krok 6 — Zamknięcie pętli
Przycisk "Wróć do dashboardu". Obok tekst: "Twój wynik został zapisany. CISO widzi go teraz na dashboardzie w czasie rzeczywistym." — zamyka narrację end-to-end.

### Zasady animacji
**Nigdy nie pokazuj wszystkiego naraz** — sekwencyjny reveal sprawia że użytkownik spędza więcej czasu i faktycznie czyta. Kolory celowo przechodzą od **czerwieni** (alarm) przez **żółty** (uwaga, nauka) do **zieleni** (nagroda, sukces) — psychologiczne przejście podświadomie.

---

## Ogólne zasady UI/UX

**Animacje:** subtelne, funkcjonalne. Liczniki animują się, karty wpadają z fade-in, live feed aktualizuje się płynnie. Żadnych natrętnych animacji.

**Typografia:** jeden font (Geist Sans / systemowy / Inter), dwa rozmiary nagłówków, jasna hierarchia.

**Ikony:** lucide-react. Tarcza dla bezpieczeństwa, mail dla phishingu, wykres dla dashboardu.

**Responsywność:** **desktop-first**. Aplikacja musi wyglądać świetnie na laptopie rekrutera. Na mobile (<768px) single-column stack, tabele scrollują horyzontalnie, dashboardowe karty stackują się pionowo. Mobile **używalny ale nie polerowany**.

**Stany ładowania:** każda akcja która trwa (generowanie AI, generowanie PDF) ma widoczny stan: spinner, skeleton loading lub "AI generuje scenariusz...". Brak feedbacku wygląda jak bug.

**Stany sukcesu:** scenariusz gotowy → toast "Scenariusz gotowy". Zgłoszenie phishing → konfetti + zielony flash + toast "+100 punktów!". Pobranie NIS2 → toast "Raport NIS2 pobrany".

**Toast:** sukces (zielony), błąd (czerwony), info (niebieski). Konsekwentnie.

**Email content (renderowany w `<{Industry}Template>`):** Mail musi być po polsku, używać terminologii branżowej (SCADA, PLC, firmware, LIMS, GMP) i wyglądać jak coś co mogłoby przyjść do inżyniera w jego branży. Adres nadawcy musi być wiarygodny — np. `security-updates@aerosystems-portal.com`.
