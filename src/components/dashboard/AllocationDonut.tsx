import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import type { AllocationItem } from '@/types';
import { formatCurrency } from '@/lib/formatters';

interface AllocationDonutProps {
  data: AllocationItem[];
}

export function AllocationDonut({ data }: AllocationDonutProps) {
  return (
    <div>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={80}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-3 space-y-2">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[var(--text-secondary)]">{item.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[var(--text-muted)] text-xs">{item.percentage}%</span>
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
