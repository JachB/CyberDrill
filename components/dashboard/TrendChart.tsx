'use client';

import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { WEEKLY_TREND } from '@/lib/dashboard-data';
import { copy } from '@/lib/copy';

export function TrendChart() {
  return (
    <div className="p-5 rounded-lg bg-[color:var(--color-surface)] border border-[color:var(--color-border)]">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-[color:var(--color-text)]">{copy.dashboard.chart.heading}</h3>
        <p className="text-xs text-[color:var(--color-muted)] mt-0.5">{copy.dashboard.chart.yLabel}</p>
      </div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={WEEKLY_TREND} margin={{ top: 8, right: 16, bottom: 0, left: -16 }}>
            <CartesianGrid stroke="#30363D" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="week" stroke="#8B949E" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#8B949E" fontSize={12} tickLine={false} axisLine={false} domain={[0, 40]} unit="%" />
            <Tooltip
              contentStyle={{
                background: '#161B22',
                border: '1px solid #30363D',
                borderRadius: '6px',
                color: '#E6EDF3',
                fontSize: 12,
              }}
              labelStyle={{ color: '#8B949E' }}
              formatter={(value) => [`${value}%`, 'Phish-prone']}
            />
            <Line
              type="monotone"
              dataKey="phishProne"
              stroke="#00D4AA"
              strokeWidth={2.5}
              dot={{ fill: '#00D4AA', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
