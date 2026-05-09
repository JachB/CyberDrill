import { DEPARTMENTS } from '@/lib/dashboard-data';
import { copy } from '@/lib/copy';

const TONE_COLORS: Record<string, { bar: string; text: string }> = {
  red: { bar: '#F85149', text: 'text-[color:var(--color-danger)]' },
  amber: { bar: '#D29922', text: 'text-[color:var(--color-warning)]' },
  green: { bar: '#2EA043', text: 'text-[color:var(--color-success)]' },
};

export function DepartmentTable() {
  return (
    <div className="rounded-lg bg-[color:var(--color-surface)] border border-[color:var(--color-border)]">
      <div className="px-5 py-3 border-b border-[color:var(--color-border)]">
        <h3 className="text-sm font-semibold text-[color:var(--color-text)]">
          {copy.dashboard.departments.heading}
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-[color:var(--color-muted)]">
              <Th>{copy.dashboard.departments.columns.name}</Th>
              <Th align="right">{copy.dashboard.departments.columns.employees}</Th>
              <Th align="right">{copy.dashboard.departments.columns.clicks}</Th>
              <Th align="right">{copy.dashboard.departments.columns.reports}</Th>
              <Th>{copy.dashboard.departments.columns.risk}</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[color:var(--color-border)]">
            {DEPARTMENTS.map((dept) => {
              const colors = TONE_COLORS[dept.tone];
              return (
                <tr key={dept.name} className={dept.tone === 'red' ? 'bg-[color:var(--color-danger)]/5' : ''}>
                  <Td>
                    <span className="font-medium text-[color:var(--color-text)]">{dept.name}</span>
                  </Td>
                  <Td align="right" className="text-[color:var(--color-muted)]">{dept.employees}</Td>
                  <Td align="right" className={colors.text}>{dept.clickRate}%</Td>
                  <Td align="right" className="text-[color:var(--color-muted)]">{dept.reportRate}%</Td>
                  <Td>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-32 rounded-full bg-[color:var(--color-border)] overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${dept.riskScore}%`, background: colors.bar }}
                        />
                      </div>
                      <span className={`text-xs ${colors.text}`}>{dept.riskScore}</span>
                    </div>
                  </Td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Th({ children, align = 'left' }: { children: React.ReactNode; align?: 'left' | 'right' }) {
  return (
    <th className={`px-5 py-3 font-medium ${align === 'right' ? 'text-right' : 'text-left'}`}>{children}</th>
  );
}

function Td({
  children,
  align = 'left',
  className = '',
}: {
  children: React.ReactNode;
  align?: 'left' | 'right';
  className?: string;
}) {
  return (
    <td className={`px-5 py-3 ${align === 'right' ? 'text-right' : 'text-left'} ${className}`}>{children}</td>
  );
}
