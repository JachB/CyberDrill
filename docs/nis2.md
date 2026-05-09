# NIS2 Compliance Export — pełna specyfikacja

## Decyzja: prawdziwy PDF, nie mockup

**Rób prawdziwy PDF** — to jest łatwiejsze niż się wydaje i robi ogromne wrażenie na demo. Biblioteka jsPDF + jsPDF-autotable w Next.js generuje PDF w 50-80 linijkach kodu. To nie jest tygodniowa robota.

**Dlaczego warto zrobić prawdziwy a nie mockup:**
Rekruter kliknie przycisk "Eksportuj raport NIS2" i dostanie prawdziwy PDF który się pobiera. To jest różnica między "pokazuję screenshot jak będzie wyglądać" a "kliknij i pobierz". Drugi wariant zawsze wygrywa. Poza tym to jest jeden z kluczowych differentiatorów produktu — jeśli na demo jest mockup, traci na wiarygodności.

---

## Co zawiera raport NIS2 (realny zakres na PoC)

### Strona 1 — Nagłówek raportu
Logo CyberDrill, nazwa organizacji (np. "Demo Sp. z o.o."), data wygenerowania, okres raportowania, numer raportu.

### Strona 1-2 — Podsumowanie executive
Łączna liczba pracowników objętych szkoleniem, liczba przeprowadzonych kampanii, ogólny phish-prone % na początku vs na końcu okresu, procentowa poprawa. Duże liczby, czytelny layout.

### Strona 2-3 — Mapowanie do NIS2 Artykuł 21(g)
Tabela: wymóg prawny z NIS2 → co CyberDrill robi żeby go spełnić → dowód (daty kampanii, liczby).

| Wymóg NIS2 Art. 21(g) | Co robimy | Dowód |
|---|---|---|
| Regularne szkolenia security awareness | Przeprowadzono 3 kampanie | Daty: 15.02, 18.03, 22.04.2026 |
| Pokrycie wszystkich pracowników | 5 działów, 247 pracowników | Lista działów z % pokrycia |
| Dokumentacja i raportowanie | Niniejszy raport | Data wygenerowania, wersja |

### Strona 3-4 — Wyniki kampanii
Tabela kampanii z datą, nazwą, liczbą wysłanych, kliknięć, zgłoszeń, phish-prone %. Wykres trendu phish-prone % (jako tabela danych jeśli wykres w PDF jest za trudny).

### Strona 4 — Ranking działów
Tabela. Kolumny: Dział, Pracownicy, Kliknięcia %, Zgłoszenia %, Risk Score.

### Strona ostatnia — Podpis i disclaimer
> "Raport wygenerowany automatycznie przez CyberDrill v1.0. Dane na podstawie przeprowadzonych symulacji phishingowych zgodnie z wymogami NIS2 Artykuł 21(g) i polskiej ustawy UKSC z 3 kwietnia 2026."

---

## Jak to technicznie zrobić

API route `/api/report` pobiera dane z Supabase (lub seed data), buduje strukturę i generuje PDF przez jsPDF + jsPDF-autotable. Plik wraca jako blob, przeglądarka go pobiera. Całość ~50-80 linii kodu w `lib/pdf-report.ts`.

**Polski font:** jsPDF domyślnie nie obsługuje polskich znaków (ą, ę, ł, ó, ś, ż, ź, ć, ń). Trzeba osadzić font:
- Roboto (otwarty, dobry dla biznesowego)
- NotoSans (Google, pełen zestaw)

Konwersja TTF → base64 przez online tool albo `jspdf` doc + `addFileToVFS()` + `addFont()`.

**Render wykresu w PDF:** najprościej tabela danych. Jeśli czas: można wyrenderować Recharts do SVG → PNG przez canvas → embed w PDF jako image.

---

## Jak wygląda na demo

Rekruter jest na dashboardzie. Klika przycisk "Eksportuj raport NIS2 — PDF". Loading spinner przez 2 sekundy. PDF się pobiera. Rekruter otwiera — widzi profesjonalny dokument z jego "firmą", datami kampanii, wynikami i mapowaniem do artykułu 21(g).

**Mówisz:**
> "To jest dokument który CISO wysyła audytorowi. Jeden klik zamiast tygodnia pracy."

**To jest closing move sprzedaży.**
