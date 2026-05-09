'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
  Shield,
  ArrowRight,
  Check,
  Users,
  BarChart3,
  FileText,
  Plane,
  FlaskConical,
  Zap,
  Factory,
  Landmark,
  MousePointerClick,
  AlertTriangle,
} from 'lucide-react';
import { copy } from '@/lib/copy';

// ── Animation variants ──────────────────────────────────────────────────────

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const staggerFast = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

// ── Static data ─────────────────────────────────────────────────────────────

const INDUSTRY_CARDS = [
  { label: 'Aerospace',     Icon: Plane,        color: '#3B82F6', bg: 'rgba(59,130,246,0.1)',  terms: 'FADEC · EASA · DO-178C' },
  { label: 'Pharma',        Icon: FlaskConical, color: '#22C55E', bg: 'rgba(34,197,94,0.1)',   terms: 'LIMS · GMP · batch record' },
  { label: 'Energy',        Icon: Zap,          color: '#EAB308', bg: 'rgba(234,179,8,0.1)',   terms: 'SCADA · PLC · IEC 61850' },
  { label: 'Manufacturing', Icon: Factory,      color: '#F97316', bg: 'rgba(249,115,22,0.1)',  terms: 'MES · OEE · CNC G-code' },
  { label: 'Fintech',       Icon: Landmark,     color: '#6366F1', bg: 'rgba(99,102,241,0.1)',  terms: 'SWIFT · KYC · FIX protocol' },
];

const HOW_STEPS = [
  { num: '01', title: copy.landing.howItWorks.steps[0].title, desc: copy.landing.howItWorks.steps[0].description, Icon: Users },
  { num: '02', title: copy.landing.howItWorks.steps[1].title, desc: copy.landing.howItWorks.steps[1].description, Icon: MousePointerClick },
  { num: '03', title: copy.landing.howItWorks.steps[2].title, desc: copy.landing.howItWorks.steps[2].description, Icon: AlertTriangle },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[color:var(--color-bg)]">

      {/* ── Navbar ── */}
      <motion.header
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        className="sticky top-0 z-50 border-b border-[color:var(--color-border)] bg-[color:var(--color-bg)]/90 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold text-[color:var(--color-text)]">
            <Shield className="w-5 h-5 text-[color:var(--color-accent)]" />
            {copy.brand.name}
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-[color:var(--color-muted)]">
            <span className="hover:text-[color:var(--color-text)] cursor-default transition-colors">{copy.nav.product}</span>
            <Link href="/showcase" className="hover:text-[color:var(--color-text)] transition-colors">Case study</Link>
            <span className="hover:text-[color:var(--color-text)] cursor-default transition-colors">{copy.nav.pricing}</span>
          </nav>
          <Link
            href="/generate"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[color:var(--color-accent)] text-[color:var(--color-bg)] text-sm font-medium hover:bg-[color:var(--color-accent-hover)] transition-colors btn-glow"
          >
            {copy.nav.runDemo}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.header>

      <main className="flex-1">

        {/* ── Hero ── */}
        <section className="relative max-w-7xl mx-auto px-6 pt-20 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center overflow-hidden">
          {/* Background grid + ambient glow */}
          <div className="absolute inset-0 bg-grid pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_30%_50%,rgba(0,212,170,0.055)_0%,transparent_70%)] pointer-events-none" />

          {/* Left */}
          <div className="space-y-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[color:var(--color-border)] text-xs text-[color:var(--color-muted)]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--color-accent)] animate-pulse" />
              UKSC w życie od 3 kwietnia 2026 — kary do 100 mln PLN
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease }}
              className="text-4xl lg:text-5xl font-semibold leading-tight text-[color:var(--color-text)]"
            >
              {copy.brand.tagline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.22, ease }}
              className="text-[color:var(--color-muted)] text-lg leading-relaxed max-w-xl"
            >
              {copy.brand.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35, ease }}
              className="flex items-center gap-4 pt-2"
            >
              <Link
                href="/generate"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[color:var(--color-accent)] text-[color:var(--color-bg)] font-medium hover:bg-[color:var(--color-accent-hover)] transition-colors btn-glow"
              >
                {copy.landing.hero.ctaPrimary}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-[color:var(--color-border)] text-[color:var(--color-text)] font-medium hover:bg-[color:var(--color-surface)] transition-colors"
              >
                {copy.landing.hero.ctaSecondary}
              </Link>
            </motion.div>
          </div>

          {/* Right — floating email mockup */}
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.28, ease }}
            className="relative hidden lg:block"
          >
            <div className="absolute -inset-4 bg-[color:var(--color-accent)] opacity-5 rounded-2xl blur-3xl" />
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] overflow-hidden shadow-2xl">
                {/* Fake browser bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-[color:var(--color-border)] bg-[color:var(--color-bg)]">
                  <div className="w-3 h-3 rounded-full bg-[#F85149] opacity-70" />
                  <div className="w-3 h-3 rounded-full bg-[#EAB308] opacity-70" />
                  <div className="w-3 h-3 rounded-full bg-[#2EA043] opacity-70" />
                  <div className="flex-1 mx-4 h-6 rounded bg-[color:var(--color-border)] text-xs flex items-center px-3 text-[color:var(--color-muted)]">
                    cyberdrill.app/generate
                  </div>
                </div>
                {/* Fake email client */}
                <div className="p-4 space-y-3">
                  <div className="space-y-1.5 border-b border-[color:var(--color-border)] pb-3">
                    {[
                      { label: 'Od:',    value: 'security-cert@aerosystems-portal.com' },
                      { label: 'Do:',    value: 'jan.kowalski@acme-aerospace.pl' },
                      { label: 'Temat:', value: '[PILNE] Wygaśnięcie certyfikatu FADEC — 48h' },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex gap-2 text-xs">
                        <span className="text-[color:var(--color-muted)] w-12 shrink-0">{label}</span>
                        <span className="text-[color:var(--color-text)] truncate">{value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-lg overflow-hidden border border-[color:var(--color-border)]">
                    <div className="h-8 bg-[#1E40AF] flex items-center px-4">
                      <span className="text-white text-xs font-semibold tracking-wide">AeroSystems Security Division</span>
                    </div>
                    <div className="flex items-start gap-3 bg-[#F85149]/10 border-l-4 border-[#F85149] px-4 py-3">
                      <AlertTriangle className="w-4 h-4 text-[#F85149] shrink-0 mt-0.5" />
                      <p className="text-xs text-[color:var(--color-text)]">
                        <strong>Wymagana natychmiastowa akcja:</strong> certyfikat systemu FADEC wygaśnie za 48 godzin.
                      </p>
                    </div>
                    <div className="p-4 space-y-3 bg-[color:var(--color-bg)]">
                      <p className="text-xs text-[color:var(--color-muted)] leading-relaxed">
                        Szanowny Inżynierze, podczas rutynowego audytu EASA Part-145 wykryliśmy wygaśnięcie certyfikatu sterownika FADEC dla linii A350-XWB.
                      </p>
                      <div className="rounded border border-[color:var(--color-border)] overflow-hidden">
                        {[
                          { label: 'Certyfikat', value: 'CERT-AERO-2024-7843', danger: false },
                          { label: 'Status',     value: 'KRYTYCZNY',           danger: true  },
                          { label: 'Deadline',   value: '48 godzin',           danger: false },
                        ].map(({ label, value, danger }) => (
                          <div key={label} className="flex justify-between px-3 py-1.5 text-xs border-b last:border-0 border-[color:var(--color-border)]">
                            <span className="text-[color:var(--color-muted)]">{label}</span>
                            <span className={danger ? 'text-[#F85149] font-semibold' : 'text-[color:var(--color-text)]'}>{value}</span>
                          </div>
                        ))}
                      </div>
                      <div className="inline-block px-4 py-2 rounded bg-[#F85149] text-white text-xs font-semibold cursor-default">
                        Aktywuj certyfikat teraz →
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <div className="flex-1 h-px bg-[color:var(--color-border)]" />
                    <span className="text-xs text-[color:var(--color-accent)] font-medium px-2">generowane przez AI w czasie rzeczywistym</span>
                    <div className="flex-1 h-px bg-[color:var(--color-border)]" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ── Social proof stats ── */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="border-y border-[color:var(--color-border)] bg-[color:var(--color-surface)]"
        >
          <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {copy.landing.socialProof.map(({ stat, label }) => (
              <motion.div key={stat} variants={fadeUp} className="space-y-1">
                <p className="text-3xl font-semibold text-[color:var(--color-accent)]">{stat}</p>
                <p className="text-sm text-[color:var(--color-muted)]">{label}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── Showcase teaser ── */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease }}
          className="max-w-7xl mx-auto px-6 py-10"
        >
          <Link href="/showcase" className="group block rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] hover:border-[color:var(--color-accent)] transition-colors overflow-hidden card-hover">
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] items-center gap-4 px-7 py-6">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-[color:var(--color-danger)] animate-pulse" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-[color:var(--color-danger)]">Spear phishing — case study</span>
                </div>
                <p className="text-lg font-semibold text-[color:var(--color-text)]">
                  KGHM Polska Miedź — atak celowany na inżyniera OT
                </p>
                <p className="text-sm text-[color:var(--color-muted)] leading-relaxed">
                  Jak AI tworzy mail który brzmi jak wewnętrzna wiadomość od Siemens — z prawdziwym CVE, numerem seryjnym sterownika i nazwą projektu z OSINT.
                </p>
              </div>
              <div className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-[color:var(--color-border)] text-sm text-[color:var(--color-text)] group-hover:border-[color:var(--color-accent)] group-hover:text-[color:var(--color-accent)] transition-colors">
                Zobacz przykład
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        </motion.section>

        {/* ── How it works ── */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease }}
            className="text-2xl font-semibold text-[color:var(--color-text)] mb-10 text-center"
          >
            {copy.landing.howItWorks.heading}
          </motion.h2>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {HOW_STEPS.map(({ num, title, desc, Icon }) => (
              <motion.div
                key={num}
                variants={fadeUp}
                className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 space-y-4 card-hover hover:border-[color:var(--color-accent)]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-semibold text-[color:var(--color-accent)] opacity-60">{num}</span>
                  <div className="w-10 h-10 rounded-lg bg-[color:var(--color-accent)]/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[color:var(--color-accent)]" />
                  </div>
                </div>
                <h3 className="font-semibold text-[color:var(--color-text)]">{title}</h3>
                <p className="text-sm text-[color:var(--color-muted)] leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── For whom ── */}
        <section className="bg-[color:var(--color-surface)] border-y border-[color:var(--color-border)]">
          <div className="max-w-7xl mx-auto px-6 py-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease }}
              className="text-2xl font-semibold text-[color:var(--color-text)] mb-10 text-center"
            >
              {copy.landing.forWhom.heading}
            </motion.h2>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* CISO */}
              <motion.div variants={fadeUp} className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-8 space-y-4 card-hover hover:border-[color:var(--color-accent)]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[color:var(--color-accent)]/10 flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-[color:var(--color-accent)]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[color:var(--color-text)]">{copy.landing.forWhom.ciso.title}</p>
                    <p className="text-sm text-[color:var(--color-muted)]">{copy.landing.forWhom.ciso.subtitle}</p>
                  </div>
                </div>
                <ul className="space-y-3 pt-2">
                  {copy.landing.forWhom.ciso.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm text-[color:var(--color-text)]">
                      <Check className="w-4 h-4 text-[color:var(--color-accent)] shrink-0 mt-0.5" />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Inżynier OT */}
              <motion.div variants={fadeUp} className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-8 space-y-4 card-hover hover:border-[#F97316]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#F97316]/10 flex items-center justify-center">
                    <Factory className="w-6 h-6 text-[#F97316]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[color:var(--color-text)]">{copy.landing.forWhom.engineer.title}</p>
                    <p className="text-sm text-[color:var(--color-muted)]">{copy.landing.forWhom.engineer.subtitle}</p>
                  </div>
                </div>
                <ul className="space-y-3 pt-2">
                  {copy.landing.forWhom.engineer.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm text-[color:var(--color-text)]">
                      <Check className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── Industries ── */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease }}
            className="text-2xl font-semibold text-[color:var(--color-text)] mb-10 text-center"
          >
            {copy.landing.industriesHeading}
          </motion.h2>
          <motion.div
            variants={staggerFast}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
          >
            {INDUSTRY_CARDS.map(({ label, Icon, color, bg, terms }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5 space-y-3 card-hover hover:border-[color:var(--color-accent)] group"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: bg }}>
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <p className="font-semibold text-sm text-[color:var(--color-text)] group-hover:text-[color:var(--color-accent)] transition-colors">{label}</p>
                <p className="text-xs text-[color:var(--color-muted)] leading-relaxed">{terms}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── CTA banner ── */}
        <section className="max-w-7xl mx-auto px-6 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.65, ease }}
            className="rounded-xl border border-[color:var(--color-accent)] bg-[color:var(--color-accent)]/5 p-10 text-center space-y-6 cta-border-glow"
          >
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[color:var(--color-accent)]/10"
            >
              <FileText className="w-7 h-7 text-[color:var(--color-accent)]" />
            </motion.div>
            <h2 className="text-2xl font-semibold text-[color:var(--color-text)]">
              Gotowy na demo na żywo?
            </h2>
            <p className="text-[color:var(--color-muted)] max-w-xl mx-auto">
              Wygeneruj spersonalizowany scenariusz phishingowy dla swojej branży — bezpośrednio w przeglądarce. Bez konfiguracji, bez rejestracji.
            </p>
            <Link
              href="/generate"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-md bg-[color:var(--color-accent)] text-[color:var(--color-bg)] font-medium hover:bg-[color:var(--color-accent-hover)] transition-colors btn-glow"
            >
              Uruchom live demo
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
        <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2 text-sm text-[color:var(--color-muted)]">
            <Shield className="w-4 h-4 text-[color:var(--color-accent)]" />
            <span className="font-semibold text-[color:var(--color-text)]">{copy.brand.name}</span>
            <span>·</span>
            <span>{copy.landing.footer.copyright}</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-[color:var(--color-muted)]">
            <Link href="/dashboard" className="hover:text-[color:var(--color-text)] transition-colors">Dashboard</Link>
            <Link href="/generate" className="hover:text-[color:var(--color-text)] transition-colors">Generator</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
