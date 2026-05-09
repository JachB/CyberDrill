# CyberDrill — CLAUDE.md

## Czym jest ten projekt

CyberDrill to platforma do symulacji ataków phishingowych dedykowana firmom przemysłowym. AI generuje spersonalizowane emaile phishingowe pod konkretną branżę i rolę zawodową — inżynierów, techników, operatorów w firmach aerospace, pharma, energy, manufacturing, fintech.

PoC budowany jako zadanie stażowe dla **Seargin** (Gdańsk) — firmy technologicznej której klienci to duże firmy przemysłowe. Prezentacja jako demo na żywo przed rekruterami (~8 minut, jeden ekran).

**Problem:** istniejące platformy security awareness (KnowBe4, Proofpoint) używają generycznych scenariuszy biurowych — inżynier OT się w nich nie odnajduje. Plus dyrektywa **NIS2** (EU) wymaga prawnie regularnych szkoleń, kara do 10M EUR za brak compliance.

CyberDrill rozwiązuje oba: AI generuje scenariusze realistyczne dla branży i roli, plus automatyczny raport NIS2.

---

## Demo flow (krok po kroku)

1. **`/generate`** — wybór branży (Aerospace) i roli (Inżynier Automatyki), klik "Generuj scenariusz"
2. **AI streaming na żywo** — prawa strona buduje maila token-po-tokenie (Gemini 3 Flash przez SSE)
3. **Live preview w przeglądarce** — pełny mail w `<OutlookFrame>` z branżowym templatem. Zero wysyłania, wszystko w jednym oknie
4. **Klik CTA w preview** → `/api/track` → redirect do `/phished` (sekwencyjny reveal: alarm → countup → wskaźniki → lekcja → konfetti)
5. **Live feed pokazuje kliknięcie** — split-screen mini-feed pod formularzem `/generate` (Supabase Realtime), wow moment dla rekrutera
6. **Zmiana branży na Pharma na żywo** — zupełnie inny scenariusz, inna terminologia (LIMS, GMP), inna kolorystyka. **Najważniejszy moment** — pokazuje że AI generuje od zera

---

## Stack technologiczny

- **Next.js 16** — App Router, TypeScript, Edge runtime na `/api/generate`
- **Tailwind CSS v4** — styling, ciemny motyw
- **Gemini 3 Flash** przez `@google/genai` SDK — streaming z `models.generateContentStream`
- **Supabase** — Postgres + Realtime (websocket dla live feedu). **Setup całkowicie przez MCP** (`mcp__supabase__*`)
- **Vercel** — hosting, Edge runtime na `/api/generate` dla niskiej latency
- **canvas-confetti** — konfetti na `/phished` (max 200 cząsteczek, 1.5s, skip przy `prefers-reduced-motion`)
- **Recharts** — wykresy na dashboardzie (lazy load przez `next/dynamic`)
- **jsPDF + jsPDF-autotable** — raport NIS2 z polskim fontem (Roboto/NotoSans embedded)
- **lucide-react** — ikony

**NIE używamy:** Resend, Anthropic SDK, własnego mailera, multi-tenancy, auth, i18n (PL only), pełnej mobile responsywności.

---

## Kluczowe decyzje (po dyskusji z user)

### Produktowe
1. **Resend wycięty** — demo używa wyłącznie live preview w przeglądarce. Brak `/api/send`, brak `RESEND_API_KEY`, brak przycisku "Wyślij"
2. **NIS2 PDF jest prawdziwy** (jsPDF), nie mockup — closing move sprzedaży. Patrz [docs/nis2.md](docs/nis2.md)
3. **Provider AI: Gemini 3 Flash** (nie Claude, nie Anthropic). Klucz `GEMINI_API_KEY`
4. **Landing page** w P4 (po core flow, nie blokuje demo)
5. **Demo timing:** ~8 minut, jeden ekran/laptop

### Architektura streamingu i generowania maila
6. **Format streamingu:** liniowy z prefixami `META:`, `BODY:`, `DATA:`, `CTA:`, `INDICATOR:`, `EDU:`. Parser server-side składa SSE eventy. Token-by-token typing effect zachowany. **NIE używamy** `responseSchema` Gemini bo blokuje token streaming
7. **AI generuje strukturalną treść, NIE surowy HTML.** Aplikacja renderuje w stałym `<{Industry}Template>` (Aerospace=niebieski, Pharma=zielony, Energy=żółty, Manufacturing=pomarańczowy, Fintech=navy). 90% iluzji "prawdziwego maila" z templatów React, 10% z AI
8. **Walidator outputu** (`lib/ai-validator.ts`) sprawdza: kompletność pól, format emaila nadawcy, ≥2 terminy z branżowego słownika w body, brak angielskich pasków. Jeden retry przy niepowodzeniu
9. **Realtime layout: split-screen** — `/generate` ma mini live feed pod formularzem. Bez konieczności drugiej zakładki podczas demo
10. **Brak fallbacku gdy AI padnie** — świadoma decyzja userska. Pre-warm endpointu 30s przed demo zmniejsza ryzyko

### Infrastruktura
11. **Supabase: setup całkowicie przez MCP** (`mcp__supabase__*`). Application code używa `@supabase/supabase-js`. RLS off na `campaigns` dla anon (PoC)
12. **Vercel Edge runtime na `/api/generate`** dla niskiej latency. Pre-warm: `curl /api/generate` 30s przed demo
13. **Daty seed data** ankerowane do `now() - interval`, nie hardcoded

### UX / Frontend
14. **Mobile:** desktop-first. Single column stack na <768px. Mobile używalny ale nie polerowany
15. **i18n:** hardcoded PL teraz, wszystkie stringi UI w `lib/copy.ts` (przygotowanie pod refactor na next-intl, ale next-intl NIE instalujemy w PoC)
16. **QuickStart cards:** tylko wypełniają formularz, AI generuje normalnie. Brak bypassu AI

---

## Mapa dokumentacji

CLAUDE.md = entry point. Szczegóły w `docs/`:

- **[docs/architecture.md](docs/architecture.md)** — model generowania maila (6 warstw), strategia AI streamingu, schemat bazy, Supabase MCP, env vars, API routes
- **[docs/ui-ux.md](docs/ui-ux.md)** — szczegóły każdej strony (landing, dashboard, /generate, /phished), paleta kolorów, ogólne zasady UI/UX
- **[docs/nis2.md](docs/nis2.md)** — pełna spec raportu NIS2 (strony 1-5, mapowanie do Art. 21(g))
- **[docs/seed-data.md](docs/seed-data.md)** — fikcyjne kampanie, działy, trend, live feed, branże
- **[docs/build-plan.md](docs/build-plan.md)** — milestones P0-P5, co NIE potrzebne w PoC, plan weryfikacji

**Reguła:** Read te pliki on-demand kiedy konkretna sekcja jest potrzebna (np. P3 NIS2 → Read `docs/nis2.md`). Nie ładujemy wszystkiego do każdej sesji.

---

## Krytyczne pliki

- `lib/ai.ts` + `lib/ai-prompt.ts` + `lib/ai-parser.ts` + `lib/ai-validator.ts` — serce streamingu
- `lib/industries.ts` — jedyne źródło prawdy o branżach (słowniki, nadawcy, kolory, role)
- `lib/copy.ts` — wszystkie stringi UI po polsku
- `components/email-templates/*` — wizualna spójność maila
- `components/dashboard/LiveFeed.tsx` — Realtime subskrypcja Supabase
- `lib/pdf-report.ts` — closing move (NIS2 PDF)
- `lib/seed.ts` — dashboard wygląda enterprise tylko z seed data

---

## Behavioral guidelines (dla Claude)

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

### 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them — don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

### 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

### 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it — don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

### 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.
