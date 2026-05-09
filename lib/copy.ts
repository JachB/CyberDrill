export const copy = {
  brand: {
    name: 'CyberDrill',
    tagline: 'Phishing który wygląda jak prawdziwy atak. Bo nim jest.',
    description:
      'Symulacje phishingowe AI dla firm przemysłowych. Spersonalizowane scenariusze pod branżę i rolę. Compliance NIS2 w jednym kliknięciu.',
  },

  nav: {
    product: 'Produkt',
    demo: 'Demo',
    pricing: 'Cennik',
    runDemo: 'Uruchom demo',
  },

  landing: {
    hero: {
      ctaPrimary: 'Wypróbuj live demo',
      ctaSecondary: 'Zobacz jak działa',
    },
    socialProof: [
      { stat: '64%', label: 'wzrostu ataków ransomware na OT (Dragos 2026)' },
      { stat: '82,6%', label: 'maili phishingowych pisanych przez AI (Keepnet 2025)' },
      { stat: '100 mln PLN', label: 'kary za brak compliance (UKSC, od 03.04.2026)' },
    ],
    howItWorks: {
      heading: 'Jak to działa',
      steps: [
        { title: 'Wybierz branżę i rolę', description: 'Aerospace, Pharma, Energy, Manufacturing, Fintech.' },
        { title: 'AI generuje scenariusz', description: 'Spersonalizowany pod terminologię i procesy konkretnej roli.' },
        { title: 'Pracownik klika → uczy się', description: 'Sekwencyjna edukacja z wskaźnikami phishingu i gamifikacją.' },
      ],
    },
    forWhom: {
      heading: 'Dla kogo',
      ciso: {
        title: 'CISO',
        subtitle: 'Kupuje, bo NIS2',
        bullets: [
          'Compliance NIS2 Art. 21(g) w jednym raporcie',
          'Mierzalna poprawa phish-prone % w czasie',
          'Dashboard dla audytorów i zarządu',
        ],
      },
      engineer: {
        title: 'Inżynier OT',
        subtitle: 'Używa, bo scenariusze z jego świata',
        bullets: [
          'Terminologia branżowa (PLC, SCADA, LIMS, MES)',
          'Realistyczne scenariusze, nie generyczny "kliknij tutaj"',
          'Edukacja po kliknięciu zamiast kary',
        ],
      },
    },
    industriesHeading: 'Branże, które obsługujemy',
    footer: {
      copyright: '© 2026 CyberDrill. Wszystkie prawa zastrzeżone.',
    },
  },

  generate: {
    title: 'Nowa kampania phishingowa',
    industryLabel: 'Branża',
    industryPlaceholder: 'Wybierz branżę',
    roleLabel: 'Rola pracownika',
    rolePlaceholder: 'Wybierz rolę',
    submit: 'Generuj scenariusz',
    submitting: 'AI generuje scenariusz…',
    quickStart: {
      heading: 'Szybki start',
      description: 'Gotowe scenariusze demo — kliknięcie wypełnia formularz.',
    },
    preview: {
      empty: 'Wygenerowany mail pojawi się tutaj.',
      streaming: 'AI buduje scenariusz w czasie rzeczywistym…',
      ready: 'Scenariusz gotowy. Kliknij CTA poniżej aby zasymulować phishing.',
    },
    miniFeed: {
      heading: 'Live feed',
      empty: 'Czekamy na pierwsze zdarzenie…',
    },
  },

  emailFrame: {
    fromLabel: 'Od:',
    toLabel: 'Do:',
    subjectLabel: 'Temat:',
    placeholderRecipient: 'pracownik@firma.pl',
    privacyPolicy: 'Polityka prywatności',
    unsubscribe: 'Rezygnacja z subskrypcji',
  },

  phished: {
    alert: {
      heading: 'Dałeś się złapać.',
      subheading: 'Ten mail był symulowanym atakiem phishingowym stworzonym przez CyberDrill.',
    },
    statTemplate: 'Właśnie dołączyłeś do {percent}% pracowników którzy kliknęli ten scenariusz.',
    indicatorsHeading: 'Co powinno było wzbudzić podejrzenia',
    lessonHeading: 'Co zrobić następnym razem',
    lessonBullets: [
      'Zawsze sprawdzaj domenę nadawcy — najedź kursorem na link przed kliknięciem.',
      'Krytyczne aktualizacje systemów technicznych nie przychodzą z zewnętrznych domen.',
      'W razie wątpliwości — skontaktuj się z działem IT przed jakąkolwiek akcją.',
    ],
    reportButton: {
      idle: 'Zgłosiłbym ten mail jako podejrzany',
      pending: 'Zapisuję…',
      done: 'Zgłoszono ✓',
    },
    ratingHeading: 'Jak trudny był ten phishing?',
    ratingFeedback: {
      easy: 'Następnym razem zwróć uwagę na domenę nadawcy i presję czasową.',
      medium: 'Dobra obserwacja — ten scenariusz miał kilka warstw kamuflażu.',
      hard: 'Zgadzamy się — ten scenariusz był zaawansowany. Zawsze warto zwolnić przed kliknięciem.',
    },
    leaderboardTemplate: 'Twój dział w tym tygodniu: #{rank} z {total} działów. Lider: {leader}.',
    backToDashboard: 'Wróć do dashboardu',
    closingNote: 'Twój wynik został zapisany. CISO widzi go teraz na dashboardzie w czasie rzeczywistym.',
    toastReported: '+100 punktów za prawidłową reakcję!',
  },

  dashboard: {
    title: 'Dashboard CISO',
    company: 'Acme Industrial Sp. z o.o.',
    lastCampaignLabel: 'Ostatnia kampania:',
    newCampaign: 'Nowa kampania',
    metrics: {
      phishProne: 'Phish-prone %',
      sent: 'Wysłane maile',
      clicked: 'Kliknięcia',
      reported: 'Zgłoszone phishing',
    },
    chart: {
      heading: 'Trend phish-prone % — ostatnie 8 tygodni',
      yLabel: '% pracowników którzy kliknęli',
      xLabel: 'Tydzień',
    },
    feed: {
      heading: 'Live feed',
      empty: 'Brak ostatnich zdarzeń.',
      eventClicked: 'kliknął link',
      eventReported: 'zgłosił phishing',
    },
    departments: {
      heading: 'Ranking działów',
      columns: {
        name: 'Dział',
        employees: 'Pracownicy',
        clicks: 'Kliknięcia %',
        reports: 'Zgłoszenia %',
        risk: 'Risk Score',
      },
    },
    nis2Button: {
      idle: 'Eksportuj raport NIS2 (PDF)',
      pending: 'Generuję raport…',
    },
  },

  toast: {
    scenarioReady: 'Scenariusz gotowy.',
    reportDownloaded: 'Raport NIS2 pobrany.',
    error: 'Wystąpił błąd. Spróbuj ponownie.',
  },

  errors: {
    aiTimeout: 'AI przekroczyło czas odpowiedzi. Spróbuj ponownie.',
    invalidScenario: 'Otrzymano niekompletny scenariusz. Spróbuj ponownie.',
    notFound: 'Kampania nie została znaleziona.',
  },
} as const;
