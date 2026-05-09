export interface DepartmentRow {
  name: string;
  employees: number;
  clickRate: number;
  reportRate: number;
  riskScore: number;
  tone: 'red' | 'amber' | 'green';
}

export const DEPARTMENTS: DepartmentRow[] = [
  { name: 'Dział Produkcji', employees: 84, clickRate: 34, reportRate: 12, riskScore: 78, tone: 'red' },
  { name: 'Dział R&D', employees: 42, clickRate: 22, reportRate: 28, riskScore: 54, tone: 'amber' },
  { name: 'Dział Zakupów', employees: 31, clickRate: 19, reportRate: 22, riskScore: 47, tone: 'amber' },
  { name: 'Dział Inżynierii', employees: 56, clickRate: 11, reportRate: 41, riskScore: 24, tone: 'green' },
  { name: 'Dział IT', employees: 34, clickRate: 8, reportRate: 58, riskScore: 14, tone: 'green' },
];

export const WEEKLY_TREND: Array<{ week: string; phishProne: number }> = [
  { week: 'T1', phishProne: 34 },
  { week: 'T2', phishProne: 31 },
  { week: 'T3', phishProne: 28 },
  { week: 'T4', phishProne: 24 },
  { week: 'T5', phishProne: 21 },
  { week: 'T6', phishProne: 17 },
  { week: 'T7', phishProne: 14 },
  { week: 'T8', phishProne: 11 },
];

export const TOTAL_EMPLOYEES = DEPARTMENTS.reduce((s, d) => s + d.employees, 0);

export const SUMMARY_METRICS = {
  phishProne: 11,
  sent: 247,
  clicked: 28,
  reported: 84,
};
