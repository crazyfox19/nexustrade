import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';
import type { PerformancePoint, TimeRange } from '@/types';
import { formatCurrency, formatDate } from '@/lib/formatters';
import { ToggleGroup } from '@/components/shared/ToggleGroup';
import { TIME_RANGES } from '@/lib/constants';

interface PerformanceLineChartProps {
  data: PerformancePoint[];
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
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
    <div className="glass-card px-3 py-2 !border-neon-purple/30 shadow-[0_0_12px_rgba(124,58,237,0.15)]">
      <p className="text-[11px] text-[var(--text-secondary)]">{formatDate(point.date)}</p>
      <p className="text-sm font-semibold text-white">{formatCurrency(point.value)}</p>
    </div>
  );
}

export function PerformanceLineChart({
  data,
  timeRange,
  onTimeRangeChange,
}: PerformanceLineChartProps) {
  const startValue = data.length > 0 ? data[0].value : 0;

  return (
    <div>
      <div className="flex items-center justify-end mb-4">
        <ToggleGroup
          options={TIME_RANGES}
          value={timeRange}
          onChange={(v) => onTimeRangeChange(v as TimeRange)}
        />
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
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
          <ReferenceLine
            y={startValue}
            stroke="rgba(255,255,255,0.1)"
            strokeDasharray="4 4"
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#7C3AED"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: '#7C3AED', stroke: '#fff', strokeWidth: 1 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
