'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowLeft, AlertTriangle, ExternalLink,
  Building2, Calendar, MapPin,
  Database, Globe, Search, Users,
  ArrowRight, Lock, CircleCheck, CircleX, FileText,
} from 'lucide-react';

// ── animation ────────────────────────────────────────────────────────────────

const ease = [0.25, 0.46, 0.45, 0.94] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.09 } } };

// ── KGHM logo ────────────────────────────────────────────────────────────────

function KGHMLogo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: 'h-6', md: 'h-8', lg: 'h-12' };
  return (
    <div className={`inline-flex items-center gap-1 ${sizes[size]}`}>
      <div className="h-full aspect-[3/1] bg-[#C00000] flex items-center justify-center px-2 rounded-sm">
        <span className="text-white font-black tracking-widest" style={{ fontSize: size === 'lg' ? 22 : size === 'md' ? 14 : 10 }}>KGHM</span>
      </div>
      <div className="flex flex-col justify-center leading-tight">
        <span className="text-[color:var(--color-text)] font-semibold" style={{ fontSize: size === 'lg' ? 11 : 8 }}>Polska Miedź</span>
        <span className="text-[color:var(--color-muted)]" style={{ fontSize: size === 'lg' ? 9 : 7 }}>S.A.</span>
      </div>
    </div>
  );
}

// ── Siemens logo ─────────────────────────────────────────────────────────────

function SiemensLogo({ size = 'md' }: { size?: 'sm' | 'md' }) {
  return (
    <div className="inline-flex items-center gap-1.5">
      <div className="rounded-sm" style={{ background: '#009999', padding: size === 'sm' ? '2px 6px' : '3px 10px' }}>
        <span className="text-white font-bold tracking-tight" style={{ fontSize: size === 'sm' ? 10 : 13 }}>Siemens</span>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ShowcasePage() {
  return (
    <div className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-text)]">

      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 border-b border-[color:var(--color-border)] bg-[color:var(--color-bg)]/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm text-[color:var(--color-muted)] hover:text-[color:var(--color-text)] transition-colors">
            <ArrowLeft className="w-4 h-4" />
            CyberDrill
          </Link>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--color-accent)] animate-pulse" />
            <span className="text-xs text-[color:var(--color-muted)] font-medium">Enterprise Deep-Target Demo</span>
          </div>
          <Link href="/generate" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[color:var(--color-accent)] text-[color:var(--color-bg)] text-sm font-medium hover:bg-[color:var(--color-accent-hover)] transition-colors">
            Wypróbuj live
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">

        {/* ── Page title ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[color:var(--color-accent)]/10 text-[color:var(--color-accent)] border border-[color:var(--color-accent)]/20 uppercase tracking-wide">
              CyberDrill Pro — Spear Phishing
            </span>
            <span className="text-xs text-[color:var(--color-muted)]">Tak wygląda atak po pełnym audycie OT + OSINT pracownika</span>
          </div>
          <h1 className="text-3xl font-semibold">
            Idealnie skrojony atak —{' '}
            <span className="text-[color:var(--color-accent)]">KGHM Polska Miedź</span>
          </h1>
          <p className="text-[color:var(--color-muted)] max-w-2xl leading-relaxed">
            AI zebrało dane o infrastrukturze OT firmy, profilu pracownika i aktywnych projektach. Poniżej — wiadomość, którą kliknie 9 na 10 inżynierów automatyki.
          </p>
        </motion.div>

        {/* ── Main layout: persona + email ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8 items-start">

          {/* ── LEFT: Persona card ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.15, ease }}
            className="space-y-4"
          >
            {/* Person card */}
            <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] overflow-hidden">
              {/* Header bar z logo KGHM */}
              <div className="px-5 py-4 border-b border-[color:var(--color-border)] flex items-center justify-between">
                <KGHMLogo size="md" />
                <span className="text-[10px] text-[color:var(--color-muted)] bg-[color:var(--color-border)]/50 px-2 py-1 rounded">CEL ATAKU</span>
              </div>

              {/* Avatar + name */}
              <div className="px-5 py-5 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#C00000]/30 to-[#C00000]/10 border-2 border-[#C00000]/30 flex items-center justify-center text-lg font-bold text-[#C00000]">
                    MZ
                  </div>
                  <div>
                    <p className="font-semibold text-[color:var(--color-text)]">Marek Zieliński</p>
                    <p className="text-sm text-[color:var(--color-muted)]">Senior Inżynier Automatyki OT</p>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                      <span className="text-[10px] text-[color:var(--color-muted)]">Aktywny na LinkedIn 2 dni temu</span>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2.5 text-sm">
                  {[
                    { Icon: Building2, label: 'KGHM O/ZG Lubin — Dział Automatyki' },
                    { Icon: MapPin,    label: 'Lubin, Dolnośląskie' },
                    { Icon: Calendar,  label: '12 lat w branży OT / 5 lat w KGHM' },
                  ].map(({ Icon, label }) => (
                    <div key={label} className="flex items-center gap-2.5 text-[color:var(--color-muted)]">
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span className="text-xs">{label}</span>
                    </div>
                  ))}
                </div>

                {/* Tech stack */}
                <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-wide text-[color:var(--color-muted)] font-semibold">Systemy / tech stack</p>
                  <div className="flex flex-wrap gap-1.5">
                    {['SIMATIC S7-1500', 'WinCC V8.0', 'TIA Portal V17', 'Profinet', 'STEP 7', 'SINEMA RC'].map((t) => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-[color:var(--color-border)]/60 text-[color:var(--color-muted)] border border-[color:var(--color-border)]">{t}</span>
                    ))}
                  </div>
                </div>

                {/* Active project */}
                <div className="rounded-lg bg-amber-500/8 border border-amber-500/20 px-3 py-2.5 space-y-1">
                  <p className="text-[10px] uppercase tracking-wide text-amber-400 font-semibold">Aktywny projekt</p>
                  <p className="text-xs text-[color:var(--color-text)] font-medium">Modernizacja systemu sterowania wyciągu WR-1200</p>
                  <p className="text-[10px] text-[color:var(--color-muted)]">Szyb nr 3, O/ZG Lubin · termin Q2 2026 · kontrakt Siemens</p>
                </div>

                {/* Certs */}
                <div className="space-y-1.5">
                  <p className="text-[10px] uppercase tracking-wide text-[color:var(--color-muted)] font-semibold">Certyfikaty</p>
                  {['Siemens Certified — TIA Portal Pro (2023)', 'IEC 62443 Cybersecurity Fundamentals'].map((c) => (
                    <div key={c} className="flex items-center gap-2 text-[10px] text-[color:var(--color-muted)]">
                      <CircleCheck className="w-3 h-3 text-[color:var(--color-success)] shrink-0" />
                      {c}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* OSINT sources */}
            <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] overflow-hidden">
              <div className="px-5 py-3.5 border-b border-[color:var(--color-border)]">
                <p className="text-xs font-semibold text-[color:var(--color-text)] flex items-center gap-2">
                  <Search className="w-3.5 h-3.5 text-[color:var(--color-accent)]" />
                  Źródła danych ataku (OSINT)
                </p>
              </div>
              <div className="divide-y divide-[color:var(--color-border)]">
                {[
                  {
                    Icon: Users,
                    color: '#0077B5',
                    source: 'LinkedIn — profil publiczny',
                    detail: 'Certyfikat TIA Portal V17, projekt WR-1200, kontrakt Siemens',
                  },
                  {
                    Icon: FileText,
                    color: '#C00000',
                    source: 'KGHM Raport Roczny 2024',
                    detail: '"Modernizacja systemów sterowania wyciągów szybowych w O/ZG Lubin"',
                  },
                  {
                    Icon: Globe,
                    color: '#6366F1',
                    source: 'Ogłoszenie KGHM — marzec 2026',
                    detail: '"Wymagana znajomość: SIMATIC S7-1500, WinCC, TIA Portal"',
                  },
                  {
                    Icon: Database,
                    color: '#009999',
                    source: 'Siemens Reference — KGHM',
                    detail: '"Implementacja SIMATIC w O/ZG Lubin — Szyb nr 3"',
                  },
                  {
                    Icon: Users,
                    color: '#EAB308',
                    source: 'SPS Nürnberg 2025 — lista uczestników',
                    detail: 'M. Zieliński — KGHM, sesja "Industry 4.0 in Mining"',
                  },
                ].map(({ Icon, color, source, detail }) => (
                  <div key={source} className="px-5 py-3 space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Icon className="w-3 h-3 shrink-0" style={{ color }} />
                      <span className="text-xs font-medium text-[color:var(--color-text)]">{source}</span>
                    </div>
                    <p className="text-[10px] text-[color:var(--color-muted)] leading-relaxed pl-5">{detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: The email ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="space-y-3"
          >
            {/* Label */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[color:var(--color-danger)]" />
                <span className="text-xs font-semibold text-[color:var(--color-danger)] uppercase tracking-wide">Wiadomość phishingowa</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-[color:var(--color-muted)]">
                <Lock className="w-3 h-3" />
                demo — brak prawdziwego maila
              </div>
            </div>

            {/* Outlook frame */}
            <div className="rounded-xl border border-[color:var(--color-border)] bg-white overflow-hidden shadow-2xl">

              {/* Outlook chrome */}
              <div className="bg-[#0078D4] px-4 py-2 flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  {['#F85149','#EAB308','#2EA043'].map(c => (
                    <div key={c} className="w-3 h-3 rounded-full opacity-80" style={{ background: c }} />
                  ))}
                </div>
                <div className="flex-1 flex items-center gap-2">
                  <span className="text-white/70 text-xs">✉</span>
                  <span className="text-white text-xs font-medium">Outlook — m.zielinski@kghm.com</span>
                </div>
                <KGHMLogo size="sm" />
              </div>

              {/* Email header */}
              <div className="border-b border-gray-200 px-6 py-4 space-y-1.5 bg-gray-50">
                {[
                  { label: 'Od:', value: 'Siemens Industry Services', sub: '<svc-notifications@siemens-services-pl.com>', danger: true },
                  { label: 'Do:', value: 'm.zielinski@kghm.com', sub: '', danger: false },
                  { label: 'Temat:', value: '[PILNE] Weryfikacja certyfikatu TIA Portal V17 — O/ZG Lubin · Deadline: 09.05.2026', sub: '', danger: false },
                  { label: 'Data:', value: 'Czwartek, 7 maja 2026, 08:14', sub: '', danger: false },
                ].map(({ label, value, sub, danger }) => (
                  <div key={label} className="flex gap-3 text-sm">
                    <span className="text-gray-400 w-14 shrink-0 text-right font-medium">{label}</span>
                    <div>
                      <span className={`font-medium ${danger ? 'text-gray-700' : 'text-gray-800'}`}>{value}</span>
                      {sub && (
                        <span className={`ml-1.5 text-xs ${danger ? 'text-[#C00000] font-semibold' : 'text-gray-400'}`}>{sub}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Email body */}
              <div className="bg-white">

                {/* Siemens header bar */}
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between" style={{ background: 'linear-gradient(135deg, #009999 0%, #007777 100%)' }}>
                  <div className="space-y-0.5">
                    <SiemensLogo size="md" />
                    <p className="text-white/70 text-[10px] mt-1">Industry Services · Polska</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/60 text-[10px]">Notification ID</p>
                    <p className="text-white text-xs font-mono font-bold">S7-CERT-PL-2026-3847</p>
                  </div>
                </div>

                {/* Critical alert bar */}
                <div className="mx-6 mt-5 flex items-start gap-3 bg-red-50 border-l-4 border-[#C00000] px-4 py-3 rounded-r-lg">
                  <AlertTriangle className="w-5 h-5 text-[#C00000] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-[#C00000]">Wymagana natychmiastowa akcja — deadline 09.05.2026</p>
                    <p className="text-xs text-red-700 mt-0.5">
                      Wykryto wygasły certyfikat w systemie sterowania. Brak weryfikacji spowoduje dezaktywację zdalnego wsparcia serwisowego Siemens.
                    </p>
                  </div>
                </div>

                {/* Body text */}
                <div className="px-6 py-5 space-y-4">
                  <p className="text-sm text-gray-700">Szanowny Panie Marku,</p>

                  <p className="text-sm text-gray-700 leading-relaxed">
                    W ramach programu <strong>Siemens Industry Asset Management</strong>, podczas rutynowego skanowania infrastruktury powiązanej z projektem <strong className="text-gray-900">modernizacji systemu sterowania WR-1200</strong> w O/ZG Lubin, wykryliśmy certyfikat wymagający pilnej weryfikacji w Państwa środowisku TIA Portal V17.
                  </p>

                  {/* Data table */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden text-sm">
                    <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Szczegóły urządzenia</p>
                    </div>
                    {[
                      { label: 'Urządzenie',      value: 'SIMATIC S7-1500 CPU 1516F-3 PN/DP',       accent: false },
                      { label: 'Nr seryjny',       value: 'S7-1516F-PL-KG2847',                       accent: false },
                      { label: 'Instalacja',       value: 'WR-1200 — System sterowania wyciągu szybowego', accent: false },
                      { label: 'Lokalizacja',      value: 'O/ZG Lubin, Szyb nr 3',                    accent: false },
                      { label: 'Firmware',         value: 'v3.1.1 (podatna — CVE-2024-49521)',         accent: true  },
                      { label: 'Status certyfikatu', value: 'WYGASŁ 02.05.2026',                      accent: true  },
                      { label: 'Termin akcji',     value: '09.05.2026 · 23:59 CET',                    accent: true  },
                    ].map(({ label, value, accent }) => (
                      <div key={label} className="flex justify-between px-4 py-2 border-b last:border-0 border-gray-100">
                        <span className="text-gray-500 text-xs">{label}</span>
                        <span className={`text-xs font-medium ${accent ? 'text-[#C00000] font-bold' : 'text-gray-800'}`}>{value}</span>
                      </div>
                    ))}
                  </div>

                  {/* CVE box */}
                  <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-amber-800 bg-amber-200 px-1.5 py-0.5 rounded font-mono">CVE-2024-49521</span>
                      <span className="text-[10px] text-amber-700 font-semibold">CVSS 9.1 — CRITICAL</span>
                    </div>
                    <p className="text-xs text-amber-800 leading-relaxed">
                      Podatność w SIMATIC S7-1500 firmware &lt;3.1.3 umożliwia zdalne wykonanie kodu przez sieć Profinet bez uwierzytelnienia. Patch dostępny wyłącznie po weryfikacji certyfikatu TIA Portal.
                    </p>
                  </div>

                  <p className="text-sm text-gray-700 leading-relaxed">
                    Aby zastosować aktualizację bezpieczeństwa i przywrócić pełne wsparcie serwisowe Siemens dla projektu <strong>WR-1200</strong>, prosimy o weryfikację licencji przez portal Siemens Industry Online Support:
                  </p>

                  {/* CTA button */}
                  <div className="pt-1">
                    <div
                      className="inline-flex items-center gap-2 px-6 py-3 rounded text-white text-sm font-semibold cursor-pointer select-none"
                      style={{ background: 'linear-gradient(135deg, #009999, #007777)' }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Weryfikuj certyfikat TIA Portal V17 →
                    </div>
                  </div>

                  <p className="text-xs text-gray-400">
                    Link prowadzi do: <span className="font-mono text-[#C00000]">siemens-services-pl.com/cert-verify</span>{' '}
                    <span className="text-gray-400">(zamiast: siemens.com)</span>
                  </p>
                </div>

                {/* Signature */}
                <div className="px-6 pb-5 border-t border-gray-100 pt-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#009999]/15 flex items-center justify-center text-xs font-bold text-[#009999] shrink-0">JN</div>
                    <div className="text-xs text-gray-600 space-y-0.5">
                      <p className="font-semibold text-gray-800">Jakub Nowak</p>
                      <p>Senior Technical Account Manager</p>
                      <p className="text-[#009999]">Siemens Industry Services Sp. z o.o.</p>
                      <p>ul. Żupnicza 11, 03-821 Warszawa</p>
                      <p>Tel: +48 22 870 85 00 · jakub.nowak@siemens-services-pl.com</p>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 text-[10px] text-gray-400">
                  Siemens Industry Services Sp. z o.o. · NIP: 526-000-79-37 · KRS: 0000050965 · Polityka prywatności · Rezygnacja z subskrypcji
                </div>
              </div>
            </div>

            {/* Annotations */}
            <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] overflow-hidden">
              <div className="px-5 py-3.5 border-b border-[color:var(--color-border)]">
                <p className="text-xs font-semibold text-[color:var(--color-text)]">Dlaczego ten mail jest tak niebezpieczny?</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[color:var(--color-border)]">
                {[
                  {
                    color: 'var(--color-danger)',
                    title: '5 czerwonych flag — niewidocznych bez wiedzy OT',
                    items: [
                      'Domena nadawcy: siemens-services-pl.com ≠ siemens.com',
                      'Siemens nie wysyła takich powiadomień e-mailem',
                      'CVE-2024-49521 jest prawdziwy — ale patch nie wymaga maila',
                      'Weryfikacja certyfikatu TIA Portal odbywa się offline',
                      'Link prowadzi do fałszywej domeny',
                    ],
                    Icon: CircleX,
                  },
                  {
                    color: 'var(--color-success)',
                    title: '5 powodów, dla których OT engineer kliknie',
                    items: [
                      'Dokładna nazwa projektu (WR-1200) i lokalizacja (Szyb nr 3)',
                      'Prawidłowy model urządzenia i format numeru seryjnego',
                      'Rzeczywiste CVE z prawdziwym CVSS score 9.1',
                      'Prawdziwy adres Siemens w Warszawie i format NIP',
                      'Deadline 09.05 zbieżny z Q2 terminem projektu',
                    ],
                    Icon: CircleCheck,
                  },
                ].map(({ color, title, items, Icon }) => (
                  <div key={title} className="px-5 py-4 space-y-3">
                    <p className="text-xs font-semibold" style={{ color }}>{title}</p>
                    <ul className="space-y-1.5">
                      {items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-[11px] text-[color:var(--color-muted)]">
                          <Icon className="w-3 h-3 mt-0.5 shrink-0" style={{ color }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="rounded-xl border border-[color:var(--color-accent)] bg-[color:var(--color-accent)]/5 p-8 flex flex-col sm:flex-row items-center justify-between gap-6 cta-border-glow"
        >
          <div className="space-y-1 text-center sm:text-left">
            <p className="font-semibold text-[color:var(--color-text)]">
              Wygeneruj scenariusz dla swojej branży w 30 sekund
            </p>
            <p className="text-sm text-[color:var(--color-muted)]">
              Powyższy przykład to Tier 3 — pełna personalizacja po audycie OT. Live demo pokazuje Tier 1 — AI na podstawie branży i roli.
            </p>
          </div>
          <Link
            href="/generate"
            className="inline-flex shrink-0 items-center gap-2 px-6 py-3 rounded-md bg-[color:var(--color-accent)] text-[color:var(--color-bg)] font-medium hover:bg-[color:var(--color-accent-hover)] transition-colors btn-glow whitespace-nowrap"
          >
            Uruchom live demo
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </main>
    </div>
  );
}
