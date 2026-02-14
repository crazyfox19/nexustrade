import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import type { AllocationItem } from '@/types';
import { formatCurrency } from '@/lib/formatters';

interface AllocationPieChartProps {
  data: AllocationItem[];
  totalEquity: number;
}

export function AllocationPieChart({ data, totalEquity }: AllocationPieChartProps) {
  return (
    <div>
      <div className="relative">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="text-[11px] text-[var(--text-muted)] uppercase tracking-wider">Total</p>
            <p className="text-lg font-bold font-mono text-[var(--text-primary)]">
              {formatCurrency(totalEquity, 'USD', 0)}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 space-y-2.5">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[var(--text-secondary)]">{item.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[var(--text-muted)] text-xs font-medium">{item.percentage}%</span>
              <span className="font-mono text-[var(--text-primary)]">
                {formatCurrency(item.value)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
