# CyberDrill — Skrypt Prezentacji (10 slajdów)
> Struktura: Seargin PoC template | Czas: ~8–10 minut | Demo na żywo na slajdzie 3

---

## SLAJD 1 — Problem

**Co jest na slajdzie:**

**Nagłówek:** Inżynierowie OT są celem nr 1. Nikt nie szkoli ich z ataków które ich dotyczą.

**3 statystyki (duże cyfry):**
- **+64%** ataków ransomware na firmy przemysłowe w 2025 r. — 3 300 firm zaatakowanych
- **82,6%** maili phishingowych generowanych przez AI — 4,5× skuteczniejsze niż tradycyjny phishing
- **100 mln PLN** kara ekstraordynaryjna + **300%** wynagrodzenia osobista odpowiedzialność zarządu (UKSC 2.0, od 3 kwietnia 2026)

*Źródła: Dragos 2026 OT Cybersecurity Year in Review / KnowBe4 Phishing Threat Trends 2025 / UKSC 2.0*

**Co mówisz:**
> "W 2025 roku Dragos śledził 119 grup ransomware zdolnych do operowania w sieciach OT — rok wcześniej było ich 80. Atakujący przeszli od rozpoznania do mapowania pętli sterowania: rozumieją jak działa SCADA, jakie progi alarmowe są ustawione, skąd idą komendy sterujące.
>
> Jednocześnie 82,6% tych ataków jest generowanych przez AI. Eliminuje to klasyczne czerwone flagi — błędy ortograficzne, dziwna składnia. Mail do inżyniera o aktualizacji firmware SIMATIC S7-1500, napisany perfekcyjną polszczyzną techniczną, jest 4,5 razy skuteczniejszy niż tradycyjny phishing.
>
> I tu jest problem: istniejące platformy szkolą z maili o zablokowanym koncie Microsoft. Operator hali produkcyjnej nie zarządza linią przez Outlook.
>
> Na to nakłada się UKSC 2.0, które weszło w życie 3 kwietnia — 36 dni temu. Nowe prawo wprowadza osobistą odpowiedzialność finansową kierownika: do 300% miesięcznego wynagrodzenia za brak nadzoru nad szkoleniami. Kara ekstraordynaryjna do 100 mln PLN — bez moratorium, od razu. Art. 21.2(g) NIS2 wymaga szkoleń dostosowanych do ról pracowników. Generyczny e-learning nie wystarczy."

---

## SLAJD 2 — Solution

**Co jest na slajdzie:**

**Nagłówek:** CyberDrill

**2 zdania (duży tekst):**
> CyberDrill to platforma symulacji phishingu dla firm przemysłowych — AI generuje unikalny, spersonalizowany scenariusz ataku dla każdej branży i roli zawodowej w czasie rzeczywistym.
> Jedno kliknięcie pracownika zamienia się w natychmiastową edukację z automatycznym raportem NIS2 Art. 21(g) gotowym dla audytora.

**5 branż:** Aerospace · Pharma · Energy · Manufacturing · Fintech

**[screenshot aplikacji — /generate z budującym się mailem]**

**Co mówisz:**
> "CyberDrill w dwóch zdaniach: AI generuje scenariusz phishingowy z terminologią tej konkretnej branży i tej konkretnej roli — nie copywriter raz na rok, ale model językowy w czasie rzeczywistym pod aktualną podatność CVE. Pracownik który kliknie dostaje natychmiastową edukację i quiz, a CISO dostaje raport NIS2 jednym kliknięciem.
>
> Zaraz to pokażę na żywo."

---

## SLAJD 3 — Demo / How it works

**Co jest na slajdzie:**

**Nagłówek:** Jak to działa — na żywo

**Flow (5 kroków):**
```
1. CISO wybiera branżę + rolę
        ↓
2. Gemini Flash streamuje scenariusz (token po tokenie)
        ↓
3. Pracownik klika CTA w podglądzie maila
        ↓
4. /phished: alarm → wskaźniki phishingu → quiz → konfetti
        ↓
5. Dashboard CISO: real-time tracking + NIS2 PDF
```

**Stack:** Next.js 16 · Gemini Flash · Supabase Realtime · Vercel Edge

**Co mówisz (podczas demo):**
> *(Otwórz /generate)*
> "CISO konfiguruje kampanię — branża Aerospace, rola Inżynier Automatyki."
>
> *(Kliknij Generuj)*
> "Gemini Flash przez Server-Sent Events — mail buduje się na żywo. Parser liniowy składa strukturę: nadawca, treść, wskaźniki phishingu, pytania quizowe."
>
> *(Mail gotowy — pokaż nadawcę)*
> "Ważne: nadawca brzmi jak prawdziwy Siemens — 'Siemens Industrial Cybersecurity Center'. Ale domena to siemens-aerospace-cert.eu, nie siemens.com. To look-alike. To jest właśnie element edukacyjny."
>
> *(Kliknij CTA w mailu)*
> "Klikam — symuluję pracownika który dał się nabrać."
>
> *(Pokaż /phished)*
> "Annotowane wskaźniki — pokazujemy dokładnie które elementy były czerwoną flagą. Quiz sprawdza czy zrozumiał. Po zgłoszeniu — konfetti, pozytywne wzmocnienie."
>
> *(Przełącz na /dashboard)*
> "CISO widzi kliknięcie w LiveFeed w czasie rzeczywistym — Supabase Realtime, WebSocket. I jednym kliknięciem — raport NIS2 Art. 21(g) gotowy dla audytora."

---

## SLAJD 4 — Differentiators

**Co jest na slajdzie:**

**Nagłówek:** Dlaczego nie KnowBe4?

| Cecha | KnowBe4 | Hoxhunt | Keepnet OT-SAT | **CyberDrill** |
|---|---|---|---|---|
| Scenariusze | Statyczna (23k+) + AI selekcja (AIDA) | Adaptacyjna AI | Statyczna (OT) | **Generatywna AI — treść od zera** |
| Język polski | Tłumaczony mechanicznie | Natywny AI | Ograniczony | **Natywny (PL kontekst)** |
| Kontekst IEC 62443 | Ogólny | Brak | Częściowy | **Wbudowany** |
| UKSC 2.0 native | Brak | Brak | Brak | **Wbudowany** |
| Dokumentacja NIS2 | Ręczna | Regionalna | Standardowa | **Automat PDF Art. 21(g)** |
| Czas wdrożenia | Tygodnie | Dni | Dni | **30 minut** |

**Co mówisz:**
> "KnowBe4 ma 23 000 szablonów i własne AI — AIDA — które dobiera który szablon wysłać do której osoby. Ma nawet kilka szablonów z kategorii SCADA. Ale żadna z tych platform nie generuje scenariusza dynamicznie — pod konkretny model PLC który stoi w tej hali, pod podatność CVE sprzed tygodnia, pod realia UKSC 2.0. Operator dostaje generyczny mail, nie atak który wygląda jak wewnętrzna komunikacja jego firmy.
>
> Hoxhunt robi AI i gamifikację, ale skupia się na zachowaniach biurowych — nie ma głębokiego OT ani kontekstu UKSC 2.0.
>
> Keepnet OT-SAT jest najbliżej naszej niszy, ale to statyczna biblioteka — nie generuje w locie pod aktualną podatność CVE, nie ma polskiego zakotwiczenia prawnego.
>
> My jako jedyni: AI generujące w czasie rzeczywistym + polski kontekst UKSC 2.0 + dokumentacja NIS2 jednym kliknięciem."

---

## SLAJD 5 — Target customer

**Co jest na slajdzie:**

**Nagłówek:** Kto kupuje i dlaczego

**3 persony:**

**CISO / Head of IT Security**
Kupuje bo: compliance NIS2 + osobista odpowiedzialność prawna zarządu
Pain: brak dowodów role-based szkoleń OT dla audytora

**Inżynier OT / Technik SCADA**
Używa bo: scenariusze z jego świata (SIMATIC, SCADA, LIMS, FADEC, Modbus)
Pain: generyczne szkolenia IT które go nie dotyczą

**Firma docelowa**
300–2000 pracowników · sektory kluczowe UKSC 2.0
Energia · Produkcja · Pharma · Aerospace · Fintech
Polska — PGE, Tauron, Polpharma, Volkswagen Poznań, PZL Mielec

**Co mówisz:**
> "Dwie ścieżki zakupu. CISO kupuje bo boi się kary i odpowiedzialności osobistej — CyberDrill daje mu dowód dla audytora w 30 minut. Inżynier OT używa bo po raz pierwszy dostaje szkolenie które dotyczy jego pracy.
>
> Target: 300–2000 pracowników, sektory kluczowe UKSC 2.0. W Polsce jest kilkaset firm spełniających te kryteria — właśnie 36 dni temu dostały twarde prawne deadline."

---

## SLAJD 6 — Business model

**Co jest na slajdzie:**

**Nagłówek:** SaaS w PLN — lokalna przewaga

| Tier | Cena (orientacyjna) | Co obejmuje |
|---|---|---|
| **Basic** | ~200 PLN/user/rok | AI generation, live preview, NIS2 PDF |
| **Pro** | ~400 PLN/user/rok | Spear phishing, analytics, multi-kampania |
| **Enterprise** | Custom | + Ekspert OT onboarding, asset inventory, SLA |
| **White-label MSSP** | Revenue share | Partner dystrybucji (np. Seargin) |

**Koszty infra (zweryfikowane, 5000 users):**
Gemini Flash ~300 PLN + Vercel ~240 PLN + Supabase ~100 PLN = **~640 PLN/mies.**

**Co mówisz:**
> "Cennik w PLN — KnowBe4 fakturuje w USD, co przy dużych kontraktach jest problemem dla polskich CFO.
>
> Koszty techniczne są bardzo niskie: Gemini Flash to ~3 dolary za milion tokenów. Przy 5000 scenariuszach miesięcznie — niecałe 300 PLN. To jest dźwignia AI-first.
>
> White-label dla MSSP — Seargin jako partner dystrybucji ma naturalną pozycję: portfel klientów przemysłowych, relacje z CISO."

---

## SLAJD 7 — Roadmap

**Co jest na slajdzie:**

**Nagłówek:** PoC dziś — produkt za 3 miesiące

**Co jest w PoC (teraz):**
✓ AI generation (Gemini Flash, streaming SSE)
✓ Live preview w przeglądarce
✓ Click tracking + Supabase Realtime
✓ /phished: annotowane wskaźniki + quiz + gamifikacja
✓ Dashboard CISO z LiveFeed
✓ NIS2 PDF (Art. 21.2g)
✓ 5 branż × 3 role = 15 profili

**Timeline post-PoC:**
```
Q3 2026   SMS/vishing simulation · fallback template library (50+ szablonów)
Q4 2026   Risk score per pracownik · LDAP/AD · spear phishing per person
2027      Threat intel feed · microlearning 5-day · voice deepfake simulation
```

**Co mówisz:**
> "PoC który zobaczyliście to działający produkt — nie mockup. Wszystkie funkcje działają end-to-end.
>
> Q3 2026 — multi-channel: grupy takie jak PYROXENE łączą phishing mailowy z vishingiem głosowym AI. Jeśli inżynier dostaje mail o awarii PLC i chwilę później dzwoni 'głos szefa' deepfake, skuteczność ataku rośnie do niemal 100%. Musimy to symulować.
>
> Q4 — spear phishing per pracownik z integracją LDAP/AD i historią kliknięć.
>
> 2027 — threat intel feed: automatyczna replikacja świeżych ataków OT jako scenariusze w dniu zero."

---

## SLAJD 8 — Effort estimate

**Co jest na slajdzie:**

**Nagłówek:** MVP w 3 miesiące — team 3 osoby

**Team:**
| Rola | Czas | Uwaga |
|---|---|---|
| Senior Full-stack Dev | 1 etat | Next.js + AI integration |
| Junior Full-stack Dev | 1 etat | Feature development, testy, UI |
| Ekspert OT | 0.25 etatu | Walidacja "złotych promptów", słowniki branżowe |
| DevOps / Security | 0.25 etatu | Vercel, Supabase, RLS, multi-tenant |

**Stack (zweryfikowany):**
Next.js 16 · TypeScript · Gemini Flash · Supabase Postgres + Realtime · Vercel Edge · Tailwind CSS v4

**Kluczowa dźwignia:**
> AI-first development: 1 senior + Claude Code = wydajność 3-osobowego teamu devops

**Timeline MVP (multi-tenant, auth, produkcja):**
- Tydzień 1–2: Auth + multi-tenancy + RLS
- Tydzień 3–4: Template library (50 scenariuszy z ekspertem OT)
- Tydzień 5–8: Risk score, LDAP/AD, analytics
- Tydzień 9–12: Testy pilotowe z pierwszym klientem, iteracja

**Co mówisz:**
> "3 miesiące do MVP produkcyjnego z teamem 4 osób — to jest realne przy modelu AI-first. Senior prowadzi architekturę i AI integration, junior przyspiesza delivery na frontendzie i testach.
>
> Krytyczny zasób to ekspert OT na ćwierć etatu — ktoś kto zna IEC 62443, potrafi czytać Asset Inventory i waliduje czy AI nie halucynuje protokołów. To jest moat którego KnowBe4 nie może skopiować w tydzień.
>
> PoC kosztował zero infra — Vercel free tier, Supabase free tier. MVP na produkcji: ~640 PLN miesięcznie przy 5000 użytkownikach."

---

## SLAJD 9 — Risks

**Co jest na slajdzie:**

**Nagłówek:** Znamy ryzyka — mamy odpowiedzi

| Ryzyko | Mitygacja |
|---|---|
| AI hallucinations w terminologii OT | Ekspert OT waliduje "złote prompty" + walidator outputu w kodzie |
| Cold start Gemini (15–30s) | Pre-warm endpoint przed demo / fallback cached scenario |
| Konkurencja doda AI | First-mover UKSC 2.0 native + switching cost po onboardingu OT |
| Skalowanie (auth, multi-tenant) | Świadoma decyzja PoC — RLS Supabase, architektura gotowa |
| AI Act compliance | Szkolenia = low-risk use case, brak wymogów high-risk classification |

**Co mówisz:**
> "Największe ryzyko to AI hallucinations — model może wygenerować nieistniejący CVE albo błędny numer normy. Mitygujemy dwutorowo: walidator outputu w kodzie sprawdza minimalną liczbę terminów branżowych, a ekspert OT waliduje próbkę 10% scenariuszy.
>
> Konkurencja — KnowBe4 może dodać AI, ale nie może dodać UKSC 2.0 native i polskiej specyfiki w tydzień. Po onboardingu klienta z Asset Inventory — switching cost jest wysoki.
>
> AI Act: symulacje phishingowe to low-risk use case edukacyjny. Żadnych wymogów high-risk classification."

---

## SLAJD 10 — Call to action

**Co jest na slajdzie:**

**Nagłówek:** Co potrzebujemy żeby to uruchomić

**Duży tekst:**
> "1 firma przemysłowa do pilota.
> 1 ekspert OT do walidacji scenariuszy."

**W zamian pilot dostaje:**
✓ Compliance NIS2 Art. 21(g) udokumentowany w 30 minut
✓ Mierzalny spadek phish-prone % po 8 tygodniach
✓ Raport który ląduje na biurku audytora gotowy

**Kontakt:** Jan Bartnicki · janbartnicki2@gmail.com
**Stack:** Next.js 16 · Gemini Flash · Supabase · Vercel
**Demo:** *[link Vercel po deployu]*

**Co mówisz:**
> "Nie szukamy inwestora. Dwie rzeczy: jedna firma przemysłowa jako pilot — i jeden ekspert OT który weryfikuje czy scenariusze są technicznie poprawne.
>
> W zamian pilot dostaje compliance NIS2 udokumentowany w 30 minut, mierzalny wynik po 8 tygodniach, i raport który trafia bezpośrednio do audytora.
>
> Seargin ma w portfelu klientów przemysłowych i rozumie OT. Jesteście naturalnym partnerem — czy jest tu firma z którą moglibyśmy uruchomić pilot? Pytania?"

---

## Awaria AI podczas demo — plan B

Jeśli Gemini nie odpowie w 15s:
1. Otwórz wcześniej wygenerowany URL z tokenem (zapisz przed prezentacją)
2. Powiedz: *"Gemini Edge runtime ma cold start na pierwszym wywołaniu — znane ograniczenie PoC, w produkcji pre-warm endpoint rozwiązuje problem"*
3. Pokaż `/phished` bezpośrednio — cała edukacja i quiz działają normalnie

---

## Kluczowe liczby do zapamiętania

| Liczba | Źródło | Kiedy użyć |
|---|---|---|
| +64% ataków ransomware OT | Dragos 2026 | Slajd 1 |
| 3 300 firm przemysłowych | Dragos 2026 | Slajd 1 |
| 82,6% maili z AI | KnowBe4 Phishing Threat Trends 2025 | Slajd 1 |
| 4,5× skuteczność AI phishingu | KnowBe4 2025 | Slajd 1 |
| 3 kwietnia 2026 — UKSC 2.0 | Prawo.pl / SecIQ | Slajd 1 |
| 300% wynagrodzenia — kara kierownika | UKSC 2.0 | Slajd 1 |
| 100 mln PLN kara ekstraordynaryjna | UKSC 2.0 | Slajd 1 |
| 23 000+ szablonów KnowBe4 | VanRoey / G2 | Slajd 4 |
| ~640 PLN/mies. infra przy 5000 users | Vercel+Supabase+Gemini | Slajd 6, 8 |
| 119 grup ransomware OT w 2025 | Dragos 2026 | Backup / Q&A |
