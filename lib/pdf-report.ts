import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ROBOTO_REGULAR_BASE64 } from './fonts/roboto-base64';
import { DEPARTMENTS, WEEKLY_TREND, SUMMARY_METRICS, TOTAL_EMPLOYEES } from './dashboard-data';

const FONT_NAME = 'Roboto';
const COLORS = {
  accent: '#00D4AA',
  text: '#0D1117',
  muted: '#8B949E',
  border: '#D0D7DE',
  danger: '#F85149',
  success: '#2EA043',
  warning: '#D29922',
};

interface ReportInput {
  organizationName?: string;
  reportDate?: Date;
  totalCampaigns?: number;
}

export async function generateNIS2Report(input: ReportInput = {}): Promise<Blob> {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });

  doc.addFileToVFS('Roboto-Regular.ttf', ROBOTO_REGULAR_BASE64);
  doc.addFont('Roboto-Regular.ttf', FONT_NAME, 'normal');
  doc.setFont(FONT_NAME);

  const orgName = input.organizationName ?? 'Acme Industrial Sp. z o.o.';
  const reportDate = input.reportDate ?? new Date();
  const totalCampaigns = input.totalCampaigns ?? 3;
  const reportNumber = `CD-${reportDate.getFullYear()}-${String(reportDate.getMonth() + 1).padStart(2, '0')}-001`;
  const dateStr = reportDate.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric' });

  // ==== STRONA 1: Nagłówek + Executive Summary ====
  doc.setFillColor(COLORS.accent);
  doc.rect(0, 0, 210, 12, 'F');
  doc.setFontSize(10);
  doc.setTextColor('#FFFFFF');
  doc.text('CyberDrill', 15, 8);
  doc.text('Raport NIS2 Compliance', 195, 8, { align: 'right' });

  doc.setTextColor(COLORS.text);
  doc.setFontSize(22);
  doc.text('Raport Compliance NIS2', 15, 30);

  doc.setFontSize(11);
  doc.setTextColor(COLORS.muted);
  doc.text('Symulacje phishingowe i szkolenia security awareness', 15, 38);

  doc.setFontSize(10);
  doc.setTextColor(COLORS.text);
  let y = 52;
  for (const [label, value] of [
    ['Organizacja:', orgName],
    ['Data wygenerowania:', dateStr],
    ['Numer raportu:', reportNumber],
    ['Okres raportowania:', `Q1-Q2 ${reportDate.getFullYear()}`],
  ]) {
    doc.setTextColor(COLORS.muted);
    doc.text(label, 15, y);
    doc.setTextColor(COLORS.text);
    doc.text(value, 60, y);
    y += 6;
  }

  // Executive summary boxes
  y += 8;
  doc.setFontSize(13);
  doc.setTextColor(COLORS.text);
  doc.text('Podsumowanie executive', 15, y);
  y += 8;

  const m = SUMMARY_METRICS;
  const startTrend = WEEKLY_TREND[0].phishProne;
  const endTrend = WEEKLY_TREND[WEEKLY_TREND.length - 1].phishProne;
  const improvement = startTrend - endTrend;

  const cards: Array<[string, string, string]> = [
    ['Pracownicy objęci szkoleniem', String(TOTAL_EMPLOYEES), 'wszystkie działy'],
    ['Przeprowadzone kampanie', String(totalCampaigns), 'w okresie raportowania'],
    ['Phish-prone % (start)', `${startTrend}%`, `na początku okresu`],
    ['Phish-prone % (koniec)', `${endTrend}%`, `poprawa o ${improvement} pp`],
  ];

  const cardW = 88;
  const cardH = 26;
  for (let i = 0; i < cards.length; i++) {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 15 + col * (cardW + 4);
    const cy = y + row * (cardH + 4);
    doc.setDrawColor(COLORS.border);
    doc.setFillColor(248, 249, 251);
    doc.roundedRect(x, cy, cardW, cardH, 2, 2, 'FD');
    doc.setFontSize(8);
    doc.setTextColor(COLORS.muted);
    doc.text(cards[i][0], x + 4, cy + 6);
    doc.setFontSize(18);
    doc.setTextColor(COLORS.accent);
    doc.text(cards[i][1], x + 4, cy + 16);
    doc.setFontSize(8);
    doc.setTextColor(COLORS.muted);
    doc.text(cards[i][2], x + 4, cy + 22);
  }

  // ==== STRONA 2: Mapowanie do NIS2 Art. 21(g) ====
  doc.addPage();
  pageHeader(doc, 'Mapowanie do NIS2 Artykuł 21(g)');

  autoTable(doc, {
    startY: 30,
    head: [['Wymóg NIS2 Art. 21(g)', 'Co CyberDrill robi', 'Dowód']],
    body: [
      [
        'Regularne szkolenia security awareness',
        `Przeprowadzono ${totalCampaigns} kampanie phishingowe`,
        `Daty: 15.02, 18.03, 22.04.${reportDate.getFullYear()}`,
      ],
      [
        'Pokrycie wszystkich pracowników',
        `${DEPARTMENTS.length} działów, ${TOTAL_EMPLOYEES} pracowników`,
        '100% pokrycia (patrz tabela działów)',
      ],
      [
        'Pomiar skuteczności szkoleń',
        'Phish-prone % mierzone tygodniowo',
        `Poprawa ${startTrend}% → ${endTrend}% (${improvement} pp)`,
      ],
      [
        'Dokumentacja i raportowanie',
        'Niniejszy raport wygenerowany automatycznie',
        `Numer: ${reportNumber} | Data: ${dateStr}`,
      ],
      [
        'Edukacja po incydencie',
        'Strona /phished z wskaźnikami i lekcjami',
        'Spersonalizowane wskaźniki AI per scenariusz',
      ],
    ],
    styles: { font: FONT_NAME, fontSize: 9, cellPadding: 3, textColor: COLORS.text },
    headStyles: { fillColor: COLORS.accent, textColor: '#FFFFFF', fontStyle: 'normal' },
    alternateRowStyles: { fillColor: [248, 249, 251] },
  });

  // ==== STRONA 3: Wyniki kampanii + Trend ====
  doc.addPage();
  pageHeader(doc, 'Wyniki kampanii');

  autoTable(doc, {
    startY: 30,
    head: [['Kampania', 'Wysłane', 'Kliknięcia (%)', 'Zgłoszenia', 'Phish-prone %']],
    body: [
      ['Certyfikat PLC — Linia 7', '47', '14 (29.8%)', '8', '29.8%'],
      ['Aktualizacja LIMS Q2', '31', '6 (19.4%)', '12', '19.4%'],
      ['Alert firmware SCADA', '52', '4 (7.7%)', '21', '7.7%'],
    ],
    styles: { font: FONT_NAME, fontSize: 9, cellPadding: 3, textColor: COLORS.text },
    headStyles: { fillColor: COLORS.accent, textColor: '#FFFFFF', fontStyle: 'normal' },
    alternateRowStyles: { fillColor: [248, 249, 251] },
  });

  // Trend table
  const trendY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 12;
  doc.setFontSize(11);
  doc.setTextColor(COLORS.text);
  doc.text('Trend phish-prone % (8 tygodni)', 15, trendY);

  autoTable(doc, {
    startY: trendY + 4,
    head: [WEEKLY_TREND.map((w) => w.week)],
    body: [WEEKLY_TREND.map((w) => `${w.phishProne}%`)],
    styles: { font: FONT_NAME, fontSize: 9, cellPadding: 3, halign: 'center', textColor: COLORS.text },
    headStyles: { fillColor: [240, 242, 245], textColor: COLORS.muted, fontStyle: 'normal' },
  });

  // ==== STRONA 4: Ranking działów ====
  doc.addPage();
  pageHeader(doc, 'Ranking działów');

  autoTable(doc, {
    startY: 30,
    head: [['Dział', 'Pracownicy', 'Kliknięcia %', 'Zgłoszenia %', 'Risk Score']],
    body: DEPARTMENTS.map((d) => [
      d.name,
      String(d.employees),
      `${d.clickRate}%`,
      `${d.reportRate}%`,
      String(d.riskScore),
    ]),
    styles: { font: FONT_NAME, fontSize: 9, cellPadding: 4, textColor: COLORS.text },
    headStyles: { fillColor: COLORS.accent, textColor: '#FFFFFF', fontStyle: 'normal' },
    didParseCell: (data) => {
      if (data.section !== 'body') return;
      const dept = DEPARTMENTS[data.row.index];
      if (data.column.index === 4) {
        if (dept.tone === 'red') data.cell.styles.textColor = COLORS.danger;
        if (dept.tone === 'amber') data.cell.styles.textColor = COLORS.warning;
        if (dept.tone === 'green') data.cell.styles.textColor = COLORS.success;
      }
    },
  });

  // ==== Stopka — disclaimer ====
  const disclaimerY = 250;
  doc.setDrawColor(COLORS.border);
  doc.line(15, disclaimerY, 195, disclaimerY);
  doc.setFontSize(8);
  doc.setTextColor(COLORS.muted);
  const disclaimer =
    'Raport wygenerowany automatycznie przez CyberDrill v1.0. Dane na podstawie przeprowadzonych symulacji phishingowych zgodnie z wymogami NIS2 Artykuł 21(g) i polskiej ustawy UKSC z 3 kwietnia 2026.';
  const lines = doc.splitTextToSize(disclaimer, 180);
  doc.text(lines, 15, disclaimerY + 6);

  return doc.output('blob');
}

function pageHeader(doc: jsPDF, title: string) {
  doc.setFillColor(COLORS.accent);
  doc.rect(0, 0, 210, 12, 'F');
  doc.setFontSize(10);
  doc.setTextColor('#FFFFFF');
  doc.text('CyberDrill', 15, 8);
  doc.text('Raport NIS2 Compliance', 195, 8, { align: 'right' });

  doc.setTextColor(COLORS.text);
  doc.setFontSize(16);
  doc.text(title, 15, 24);
}
