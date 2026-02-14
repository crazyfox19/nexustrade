import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { PerformancePoint } from '@/types';
import { formatCurrency, formatDate } from '@/lib/formatters';

interface EquityCurveProps {
  data: PerformancePoint[];
}

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: PerformancePoint }>;
}) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;
  return (
    <div className="glass-card px-3 py-2 !border-neon-cyan/30 shadow-[0_0_12px_rgba(0,212,255,0.15)]">
      <p className="text-[11px] text-[var(--text-secondary)]">{formatDate(point.date)}</p>
      <p className="text-sm font-semibold text-white">{formatCurrency(point.value)}</p>
    </div>
  );
}

export function EquityCurve({ data }: EquityCurveProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
        <defs>
          <linearGradient id="equityCyanGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00D4FF" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#00D4FF" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          stroke="rgba(255,255,255,0.04)"
          strokeDasharray="3 3"
          vertical={false}
        />
        <XAxis
          dataKey="date"
          tickFormatter={(d: string) => {
            const date = new Date(d);
            return `${date.getMonth() + 1}/${date.getDate()}`;
          }}
          tick={{ fill: '#475569', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
          tick={{ fill: '#475569', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          width={50}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#00D4FF"
          strokeWidth={2}
          fill="url(#equityCyanGradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
