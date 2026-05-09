# Architektura — generowanie maila, streaming, baza danych

## Model generowania maila — 6 warstw (serce produktu)

To jest najważniejszy mechanizm w aplikacji. Bez tych 6 warstw email wygląda jak generyczny "AI output", a nie jak prawdziwy korporacyjny mail z branży.

### Warstwa 1: System prompt po polsku z twardymi regułami
Model dostaje rolę analityka tworzącego realistyczny phishing dla konkretnej branży i roli. Reguły:
- Pisz po polsku biznesowym
- Używaj terminologii inżynierskiej
- Stwórz wiarygodnego nadawcę
- Zastosuj jedną technikę manipulacji: urgency / authority / fear
- NIE używaj prawdziwych marek
- Zwróć WYŁĄCZNIE format strukturalny (linie z prefixami, nie JSON, nie HTML)

### Warstwa 2: Few-shot examples
1-2 przykłady prawdziwych polskich maili korporacyjnych w prompcie (alert od dostawcy SCADA, info o certyfikacie GMP). Model naśladuje styl zamiast wymyślać od zera. **To jest największa różnica między "AI-generated" a "wygląda jak prawdziwy mail".**

### Warstwa 3: Branżowy kontekst dynamicznie wstrzykiwany
Z `lib/industries.ts` per branża pobieramy:
- **Słownik terminów** (15 terminów per branża, np. Aerospace: EASA Part-145, FADEC, FBW, DO-178C, audyt avioniki / Pharma: LIMS, GMP, walidacja CSV, batch record, deviation / Energy: SCADA HMI, RTU, IEC 61850, dyspozytornia OSD / Manufacturing: MES, OEE, CNC G-code, andon, Industry 4.0 / Fintech: SWIFT MT103, KYC, FIX protocol, settlement T+2)
- **3 fikcyjnych nadawców** z wzorcem domeny (`security-{vendor}.{tld}`, gdzie `tld ∈ {com, eu, pl}`)
- **3 typowe scenariusze** (wygaśnięcie certyfikatu / aktualizacja firmware / weryfikacja dostępu)
- **Profil emocjonalny roli** (inżynier reaguje na techniczne deadliny i autorytet regulacyjny; naukowiec na compliance audyt; operator na alarmy systemowe)

### Warstwa 4: Strukturalny output (format liniowy z prefixami)
AI emituje linie:
```
META: sender_name="AeroSystems Security Division", sender_email="security-cert@aerosystems-portal.com", subject="[PILNE] Wygaśnięcie certyfikatu systemu FADEC"
BODY: Szanowny Inżynierze,
BODY: Podczas rutynowego audytu wykryliśmy że certyfikat EASA Part-145...
BODY: Aby uniknąć zatrzymania linii produkcyjnej, prosimy o natychmiastową aktywację.
DATA: certyfikat="CERT-AERO-2024-7843", linia="A350-XWB", deadline="48h", status="KRYTYCZNY"
CTA: text="Aktywuj certyfikat teraz", color="red"
INDICATOR: Fałszywa domena nadawcy — aerosystems-portal.com nie istnieje w rejestrach dostawców EASA.
INDICATOR: Presja czasowa — "48 godzin" i "KRYTYCZNY" to klasyczne techniki manipulacji urgency.
INDICATOR: Podejrzany URL — link prowadzi do nieznanej domeny zamiast oficjalnego portalu vendora.
EDU: Certyfikaty systemów awioniki są odnawiane przez dział IT i koordynowane z EASA, nigdy przez email od zewnętrznego dostawcy.
```

### Warstwa 5: Walidator outputu (`lib/ai-validator.ts`)
Przed zwróceniem klientowi sprawdza:
- Wszystkie pola obecne (META, ≥2 BODY, DATA, CTA, ≥3 INDICATOR, EDU)? Brak → retry raz.
- Email nadawcy ma format `słowo@słowo.tld`?
- Body zawiera ≥2 terminy z branżowego słownika? (heurystyka jakości)
- Brak angielskich pasków (>3 EN stop-words: "Click", "urgent", "verify", "your account") → retry.
- Po retry: zwracamy mimo wszystko (lepiej coś niż 500), logujemy do telemetry.

### Warstwa 6: Renderowanie w branżowym templacie
`<OutlookFrame>` (uniwersalna ramka klienta pocztowego — nagłówek Od/Do/Temat) + `<{Industry}Template>` (kolory, logo placeholder, układ):
- Header z fikcyjnym logo (kolorowy prostokąt z nazwą)
- Czerwona ramka alertu po lewej z kontekstem urgency
- Akapity body
- Tabela `data` ze statusem KRYTYCZNY/PILNY
- Duży CTA button w branżowym kolorze, link do `/api/track?token=xxx`
- Stopka z fikcyjnym adresem, telefonem, "Polityka prywatności / Rezygnacja"

**Szablony są dopracowane raz, AI tylko wypełnia treścią. 90% iluzji "prawdziwego maila" pochodzi z templatów, 10% z AI.** Bez tej proporcji jakość waha się run-to-run.

---

## Strategia AI streamingu (Gemini 3 Flash)

- Provider: **Gemini 3 Flash** przez `@google/genai` SDK z `models.generateContentStream({ model: 'gemini-3-flash', ... })`.
- Można alternatywnie użyć `responseSchema` (structured output) do gwarancji JSON-a — ale to **blokuje token-by-token streaming**. Zostajemy przy formacie liniowym z prefixami żeby zachować "typing effect" w live preview.
- Parser server-side w `lib/ai-parser.ts` przyjmuje strumień tekstu z Gemini (chunki tekstowe), emituje SSE eventy `{type, payload}` do klienta.
- Klient ma `useScenarioStream(industry, role)` hook który aktualizuje stan przyrostowo.
- **Brak fallbacku** gdy AI padnie — świadoma decyzja. Pre-warm endpointu 30s przed demo (`curl /api/generate`) zmniejsza ryzyko cold start.
- Klucz: `GEMINI_API_KEY` w `.env.local`.

---

## Przepływ danych podczas demo

1. `/generate` POST → `/api/generate` (Edge runtime) → Gemini 3 Flash streaming → server parsuje `META:/BODY:/DATA:/CTA:/INDICATOR:/EDU:` → SSE do klienta → `LivePreview` renderuje przyrostowo. Po zakończeniu streamu klient robi POST do Supabase z pełnym `scenario_json` + losowym `token`. Token wraca do klienta.
2. `LivePreview` renderuje pełny mail w `<OutlookFrame>` + branżowym `<{Industry}Template>`. CTA = `<a href="/api/track?token=xxx">`.
3. Rekruter klika CTA → `/api/track` aktualizuje `clicked_at + status='clicked'` w Supabase → redirect 302 do `/phished?token=xxx`.
4. Supabase Realtime pushuje UPDATE do `LiveFeed` na `/dashboard` (otwartym w drugiej zakładce LUB w mini-feedzie pod formularzem `/generate`).
5. `/phished` SSR-fetchuje `scenario_json` po tokenie, przekazuje `phishing_indicators[]` + `education_text` do komponentu sekwencyjnego reveal.
6. Klik "Zgłoś phishing" → POST `/api/track?action=report` → `reported_at + status='reported'` → konfetti + toast.
7. Powrót do `/dashboard` → klik "Eksportuj NIS2" → `lib/pdf-report.ts` zbiera dane z Supabase, generuje PDF, `download`.

---

## Schemat bazy danych

```sql
create table campaigns (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  industry text not null,
  role text not null,
  scenario_json jsonb not null,
  token text unique not null,
  clicked_at timestamptz,
  reported_at timestamptz,
  status text default 'sent'        -- 'sent' | 'clicked' | 'reported'
);
alter publication supabase_realtime add table campaigns;
-- RLS off dla anon (PoC, dokumentowane)
```

Na potrzeby PoC jedna tabela wystarczy. Token to random string który trafia do CTA w live preview.

---

## Supabase: setup całkowicie przez MCP

**Wszystkie operacje Supabase idą przez MCP (`mcp__supabase__*`)**, nie przez ręczne klikanie w panelu:
- Tworzenie projektu / schemy → MCP
- Migracje (CREATE TABLE, ALTER PUBLICATION) → MCP
- Seed data (8 tygodni kampanii + ostatnie eventy) → MCP
- Konfiguracja Realtime publication → MCP
- Pobieranie connection stringów do `.env.local` → MCP

Application code w Next.js nadal używa **`@supabase/supabase-js`** dla:
- Subskrypcji Realtime z klienta (`LiveFeed.tsx`)
- Server-side inserts/queries z route handlers (`/api/generate`, `/api/track`)

Pierwsza akcja w P1b: autentykacja MCP do Supabase, utworzenie projektu, zaaplikowanie schemy.

---

## Zmienne środowiskowe (.env.local)

```
GEMINI_API_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

(`ANTHROPIC_API_KEY` i `RESEND_API_KEY` ze starszych iteracji spec są usunięte — używamy Gemini, bez Resend.)

---

## API routes

**`/api/generate`** — POST, **Edge runtime**. Przyjmuje `{ industry, role }`. Buduje prompt dla Gemini 3 Flash (system prompt + few-shot + branżowy kontekst ze słownika), wywołuje API ze streamingiem, zwraca **SSE eventy** sparsowane z formatu liniowego.

**`/api/track`** — GET. Przyjmuje `?token=xxx` (opcjonalnie `?action=report`). Zapisuje kliknięcie/zgłoszenie w Supabase — triggering Supabase Realtime które pushuje event do dashboardu. Redirect na `/phished?token=xxx`.

**`/api/report`** — POST. Generuje raport NIS2 compliance jako prawdziwy PDF przez jsPDF (patrz [docs/nis2.md](nis2.md)). **NIE jest mockupem** — pobiera prawdziwe dane z Supabase i zwraca blob.
