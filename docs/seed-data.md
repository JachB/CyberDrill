# Seed data — fikcyjne ale realistyczne dane demo

Bez seed data dashboard wygląda pusto i zabija wrażenie "prawdziwego produktu". Przy pierwszym uruchomieniu aplikacja wypełnia bazę Supabase fikcyjnymi danymi które wyglądają jak 8 tygodni prawdziwego użycia.

**Setup przez MCP** — funkcja seedująca w `lib/seed.ts` generuje dane z datami zankowanymi do `now() - interval`, nie hardcoded. Dzięki temu seed data zawsze wygląda "świeżo".

---

## Kampanie do zaseedowania

| Nazwa kampanii | Wysłane | Kliknięcia (%) | Zgłoszenia |
|---|---|---|---|
| Certyfikat PLC — Linia 7 | 47 | 14 (29.8%) | 8 |
| Aktualizacja LIMS Q2 | 31 | 6 (19.4%) | 12 |
| Alert firmware SCADA | 52 | 4 (7.7%) | 21 |

---

## Działy do leaderboardu

| Dział | Phish-prone % | Punkty | Kolor |
|---|---|---|---|
| Dział Produkcji | 34% | 847 | czerwony |
| Dział R&D | 22% | 1203 | żółty |
| Dział Zakupów | 19% | 1456 | żółty |
| Dział Inżynierii | 11% | 2134 | zielony |
| Dział IT | 8% | 2891 | zielony |

---

## Trend phish-prone % przez 8 tygodni (wykres)

| Tydzień | % |
|---|---|
| T1 | 34% |
| T2 | 31% |
| T3 | 28% |
| T4 | 24% |
| T5 | 21% |
| T6 | 17% |
| T7 | 14% |
| T8 | 11% |

Linia idzie w dół — to jest narracja "CyberDrill działa".

---

## Live feed — ostatnie eventy (zaseedowane)

Wyglądają jak sprzed kilku minut:
- 3 min temu — Dział Produkcji — Jan K. — kliknął link
- 12 min temu — Dział IT — Anna M. — zgłosiła phishing (+100 pkt)
- 28 min temu — Dział Zakupów — Piotr W. — kliknął link
- 45 min temu — Dział R&D — Marta S. — zgłosiła phishing (+100 pkt)

Gdy rekruter kliknie CTA w live preview podczas demo — jego event pojawia się na żywo na górze feed przez Supabase Realtime (zarówno w mini-feedzie pod formularzem `/generate`, jak i na pełnym `/dashboard`). Nowe eventy wpadają z animacją slide-in.

---

## Branże i przykładowe scenariusze

Pełne dane (słowniki terminów, fikcyjnych nadawców, role) są w `lib/industries.ts`. Tutaj skrót do referencji.

### Aerospace — technik/inżynier
**Scenariusze:** wygaśnięcie certyfikatu systemu sterowania, aktualizacja firmware sterownika, weryfikacja dostępu do systemu awioniki.
**Fikcyjni nadawcy:** AeroSystems Security, FlightControl Services, AvioTech Certification.

### Pharma — naukowiec/operator
**Scenariusze:** aktualizacja systemu LIMS, reset hasła do bazy substancji, weryfikacja certyfikatu GMP.
**Fikcyjni nadawcy:** LabControl Systems, PharmaCert Authority, BioProcess Security.

### Energy — operator/technik
**Scenariusze:** aktualizacja firmware PLC, alert systemu SCADA, weryfikacja dostępu do sterowni.
**Fikcyjni nadawcy:** GridControl Services, PowerSystems Security, EnergyCert Division.

### Manufacturing — operator/inżynier
**Scenariusze:** aktualizacja oprogramowania maszyny CNC, certyfikat systemu MES, reset dostępu do linii produkcyjnej.
**Fikcyjni nadawcy:** MachineControl Systems, ProducTech Security, ManufactCert.

### Fintech — analityk/developer
**Scenariusze:** wygaśnięcie tokenu API, aktualizacja certyfikatu SSL, weryfikacja dostępu do systemu tradingowego.
**Fikcyjni nadawcy:** SecureFinance Portal, FinTech Auth Services, TradeCert Division.
