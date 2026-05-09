# Plan budowy — milestones i zakres PoC

## Kolejność budowania

| # | Milestone | Co | Czas |
|---|-----------|-----|------|
| **P0** | Aktualizacja dokumentacji | Spec zgodny z planem (zrobione) | ~30 min |
| **P1a** | Bootstrap projektu | `create-next-app`, Tailwind, struktura katalogów, `lib/copy.ts` (PL stringi), `lib/industries.ts` (słowniki branżowe) | ~2h |
| **P1b** | Supabase via MCP | autentykacja, projekt, migracja schemy, Realtime publication, klucze | ~1h |
| **P1c** | `/api/generate` + Gemini | SDK `@google/genai`, system prompt z few-shot, parser linii, walidator, SSE, Edge runtime | ~4h |
| **P1d** | `/generate` page | Formularz, QuickStart cards, `LivePreview` z SSE, `<OutlookFrame>` + 5 `<{Industry}Template>` | ~1 dzień |
| **P1e** | `/api/track` + `/phished` | Zapis kliknięcia, sekwencyjny reveal (alert → countup → 3 indicators → lekcja → konfetti → rating → leaderboard) | ~1 dzień |
| **P2** | `/dashboard` + Realtime | Seed 8 tygodni, 4 metric cards z countup, Recharts trend, DepartmentTable, LiveFeed (split-screen na `/generate` też) | ~1.5 dnia |
| **P3** | NIS2 PDF | jsPDF + autotable + polski font, strony 1-5, pobieranie blob | ~0.5 dnia |
| **P4** | Landing `/` | Hero, social proof, "Jak działa", "Dla kogo", branże, footer | ~0.5 dnia |
| **P5** | Deploy Vercel | Smoke test demo flow 3x z rzędu, mobile single-column check, pre-warm endpoint | ~0.5 dnia |

**Razem ~5-6 dni** aktywnej budowy. Bufor: +2 dni.

---

## Co NIE jest potrzebne w PoC

- Logowanie i konta użytkowników
- Import CSV pracowników
- Prawdziwa wysyłka maili (Resend wycięty — używamy live preview w przeglądarce)
- Adaptive learning
- Integracja z Teams/Slack
- Multi-tenant (wiele firm)
- i18n / wsparcie dla EN/DE (hardcoded PL teraz, refactor później przez `lib/copy.ts`)
- Pełna mobile responsywność (desktop-first, mobile "działa" w single-column stack)
- Fallback scenariusze gdy AI padnie (świadoma decyzja — Gemini Flash jest niezawodny, ryzyko notowane)

Wszystko powyżej jest w roadmapie na miesiąc 2 i 3 — na demo wystarczy core flow.

**NIS2 export jest PRAWDZIWY PDF, nie mockup** (patrz [docs/nis2.md](nis2.md)).

---

## Kontekst prezentacji

**Firma:** Seargin (Gdańsk) — firma technologiczna, klienci to Airbus, firmy farmaceutyczne, heavy industry, fintech. Mają własny dział cybersecurity.

**Demo:** ~8 minut, jeden ekran/laptop. Rekruter zobaczy live preview wygenerowanego maila w przeglądarce (bez prawdziwej wysyłki) i kliknie CTA w preview — co triggeruje Realtime event widoczny w mini-feedzie.

**Najważniejszy moment:** zmiana branży z Aerospace na Pharma na żywo i zobaczenie zupełnie innego scenariusza generowanego od zera. Aplikacja musi to obsłużyć bezbłędnie.

Aplikacja będzie dostępna publicznie na Vercelu — rekruter może wejść po prezentacji i sprawdzić.

---

## Plan weryfikacji (kiedy gotowe)

1. **Lokalnie:** `npm run dev`, przejść flow trzy razy z rzędu mierząc stoper. Cel ≤ 8 minut.
2. **Symulacja awarii AI:** ustawić `GEMINI_API_KEY` na śmieciowy → potwierdzić zachowanie (brak fallbacku — świadoma decyzja).
3. **Symulacja awarii Realtime:** zatrzymać Supabase project → potwierdzić że `LiveFeed` pokazuje seed + stan "rozłączono", reszta dashboardu działa.
4. **Mobile check:** 375px → potwierdzić że layout się nie psuje (single-column).
5. **PDF:** pobrać raport, otworzyć w Acrobat → wszystkie strony renderują się, polskie znaki OK.
6. **Production smoke:** deploy na Vercel preview → otworzyć z innego komputera → flow działa, Realtime łapie kliknięcie cross-device.
