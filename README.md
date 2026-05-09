# CyberDrill

**Live demo:** https://cyberdrill-rho.vercel.app/ · **Kod:** https://github.com/JachB/CyberDrill

> Phishing który wygląda jak prawdziwy atak. Bo nim jest.

CyberDrill to platforma symulacji ataków phishingowych dedykowana firmom przemysłowym (aerospace, pharma, energy, manufacturing, fintech). AI generuje spersonalizowane scenariusze pod konkretną branżę i rolę zawodową — w terminologii inżyniera OT, nie generycznego korpomaila. Po kliknięciu pracownik trafia na sekwencyjną edukację z annotowanym overlayem maila, quizem i gamifikacją. CISO widzi wyniki w czasie rzeczywistym i eksportuje raport zgodności **NIS2 Art. 21.2(g)** jednym kliknięciem.

PoC zbudowany jako zadanie stażowe dla **Seargin** (Gdańsk).

---

## Problem

- **64% wzrostu** ataków ransomware na sieci OT w 2025 r. — **3 300 firm przemysłowych** zaatakowanych *(Dragos 2026 OT Cybersecurity Year in Review)*
- **82,6% maili phishingowych** jest generowanych przez AI — 4,5× skuteczniejszy niż tradycyjny phishing *(KnowBe4 Phishing Threat Trends 2025)*
- **UKSC 2.0** obowiązuje od 3 kwietnia 2026 r.: kary do **100 mln PLN** + osobista odpowiedzialność finansowa zarządu do **300% wynagrodzenia miesięcznego**

Istniejące platformy (KnowBe4, Hoxhunt, Keepnet) skupiają się głównie na środowiskach biurowych IT. Nawet jeśli oferują pojedyncze szablony przemysłowe, żadna z nich nie generuje scenariuszy dynamicznie — pod konkretny model PLC, podatności charakterystyczne dla danej sieci OT i realia polskiego rynku (UKSC 2.0). Inżynier obsługujący SIMATIC S7-1500 dostaje mail o zablokowanym koncie Microsoft.

---

## Rozwiązanie

AI (Gemini Flash) generuje unikalny phishing realistyczny dla konkretnej branży i roli, używa look-alike domen prawdziwych dostawców (Siemens, Honeywell, Veeva, ABB, Schneider Electric). Po kliknięciu serwuje annotowaną edukację z quizem, punktami i raportowaniem do dashboardu CISO w czasie rzeczywistym.

---

## Live demo

> **Vercel:** https://cyberdrill-rho.vercel.app/

Lokalnie (~3 min setup):

```bash
npm install
cp .env.example .env.local   # uzupełnij klucze — patrz sekcja niżej
npm run dev
```

Otwórz `http://localhost:3000`.

### Zmienne środowiskowe (`.env.example`)

```
GEMINI_API_KEY=              # Google AI Studio → makersuite.google.com
NEXT_PUBLIC_SUPABASE_URL=    # Project URL z Supabase dashboard
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=   # Settings → API → service_role (tylko server-side)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> **Ważne przed demo:** Pierwsze wywołanie Gemini na cold Edge runtime może trwać 15–30s. Pre-warm: `curl -X POST [URL]/api/generate -H "Content-Type: application/json" -d '{"industry":"aerospace","role":"inzynier_automatyki"}'` na 30s przed startem demo.

---

## Architektura

```mermaid
graph LR
  U[Pracownik] --> FE[Next.js 16 App Router]
  FE -->|POST /api/generate| EDGE[Edge Function]
  EDGE -->|generateContentStream| GEMINI[Gemini Flash API]
  GEMINI -.->|SSE chunks| EDGE
  EDGE -->|SSE events| FE
  EDGE -->|INSERT campaign| DB[(Supabase Postgres)]
  U -->|click CTA| TRACK[api/track]
  TRACK -->|UPDATE clicked_at| DB
  TRACK -->|302| PHISHED[phished - overlay + quiz]
  DB -.->|Realtime| FEED[LiveFeed dashboard]
  DASH[Dashboard CISO] --> PDF[NIS2 PDF Art.21.2g]
```

### Przepływ danych — sekwencja

```mermaid
sequenceDiagram
  participant U as Pracownik
  participant FE as Frontend
  participant API as /api/generate
  participant AI as Gemini Flash
  participant DB as Supabase

  U->>FE: wybór branży + roli
  FE->>API: POST {industry, role}
  API->>AI: generateContentStream(prompt)
  AI-->>API: text chunks (streaming)
  API-->>FE: SSE events (META, BODY, INDICATOR, QUIZ, EDU)
  FE->>FE: render inkrementalny — typing effect
  API->>DB: INSERT campaign(token, scenario_json)
  API-->>FE: SSE done(token)
  U->>FE: klik CTA w podglądzie maila
  FE->>API: GET /api/track?token=...
  API->>DB: UPDATE clicked_at
  API-->>U: 302 → /phished?token=...
  U->>FE: annotated overlay + quiz + lekcja
  U->>FE: klik "Zgłoś phishing"
  FE->>API: GET /api/track?token=...&action=report
  API->>DB: UPDATE reported_at, status='reported'
  DB-->>FE: Realtime broadcast → LiveFeed
```

---

## Stack technologiczny

- **Next.js 16** (App Router, TypeScript, Edge runtime na `/api/generate`)
- **Tailwind CSS v4** (dark theme, CSS custom properties)
- **Gemini Flash** przez `@google/genai` SDK — streaming SSE, structured output via line-prefix parser
- **Supabase** — Postgres + Realtime (WebSocket dla LiveFeed na `/generate` i `/dashboard`)
- **framer-motion** — animacje landing page, whileInView, stagger variants
- **Recharts** (dynamic import, lazy load) — wykres trendu phish-prone %
- **jsPDF + jspdf-autotable** — raport NIS2 z polskim fontem (Roboto embedded, ~700KB)
- **canvas-confetti** — gamifikacja na `/phished` po zgłoszeniu phishingu
- **lucide-react** — ikony

---

## Znane ograniczenia (zakres PoC)

| Ograniczenie | Co to znaczy w praktyce |
|---|---|
| **Brak logowania** | Baza kampanii jest otwarta — ktokolwiek zna token kampanii, może odczytać jej dane. Celowa decyzja, żeby PoC był prosty w obsłudze. |
| **Dashboard na fikcyjnych danych** | Wykresy i statystyki na dashboardzie CISO dotyczą wymyślonej firmy "Acme Industrial Sp. z o.o." — aplikacja nie zbiera jeszcze danych z prawdziwych kampanii w skali. |
| **Tylko po polsku** | Cały interfejs jest po polsku i nie ma przełącznika języka. Struktura jest przygotowana pod wielojęzyczność, ale nie jest to priorytet PoC. |
| **Zoptymalizowany pod komputer** | Na telefonie strona działa, ale nie jest dopracowana wizualnie — to jest demo na jednym ekranie, nie aplikacja mobilna. |
| **Brak sprawdzania konfiguracji przy starcie** | Jeśli klucze API w pliku `.env` są błędne, aplikacja nie poinformuje o tym od razu — błąd pojawi się dopiero w trakcie generowania scenariusza. |
| **Brak automatycznego retry** | Gdy Gemini nie odpowie (np. przy cold starcie), użytkownik widzi komunikat błędu bez możliwości ponowienia. Uruchomienie endpointu 30s przed demo eliminuje to ryzyko. |
| **Raport PDF generowany w przeglądarce** | Font potrzebny do polskich znaków (~700 KB) jest ładowany po stronie użytkownika. W wersji produkcyjnej PDF powinien powstawać na serwerze. |
| **Brak ochrony przed nadużyciami** | Endpoint generujący scenariusze nie ma limitów zapytań — PoC zakłada kontrolowane środowisko demo, a nie ruch publiczny. |
| **Kliknięcie = złapany** | Symulacja kończy się w momencie kliknięcia linku — tak działa większość platform tego typu (m.in. KnowBe4 w trybie domyślnym). Wariant z fałszywą stroną logowania jest zaplanowany w roadmapie. |
| **Zimny start AI** | Pierwsze wywołanie Gemini po dłuższej przerwie może trwać 15–30 sekund. Przed demo warto "rozgrzać" endpoint wysyłając jedno zapytanie testowe. |

---

## Roadmap (post-PoC)

1. **Biblioteka szablonów** — gotowe scenariusze oparte na prawdziwych atakach OT, które AI dostosowuje do klienta zamiast generować od zera przy każdym żądaniu
2. **Spersonalizowane ataki per pracownik** — integracja z Active Directory, historia kliknięć i indywidualny wskaźnik ryzyka dla każdego użytkownika
3. **Wiele kanałów ataku** — symulacje phishingu przez SMS, Microsoft Teams i fałszywe połączenia głosowe z deepfake'iem głosu przełożonego
4. **Fałszywa strona logowania** — po kliknięciu pracownik trafia na podrobioną stronę logowania (M365, Okta) — opcjonalny tryb dla zaawansowanych kampanii
5. **Automatyczne śledzenie nowych zagrożeń** — integracja z bazami threat intelligence, która automatycznie tworzy scenariusze na podstawie świeżych ataków OT wykrytych w sieci

---

## Twórca

**Jan Bartnicki** · staż Seargin 2026 · Next.js + Gemini Flash + Supabase
