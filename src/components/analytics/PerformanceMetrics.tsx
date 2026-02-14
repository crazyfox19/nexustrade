import { cn } from '@/lib/utils';

interface MetricRow {
  label: string;
  value: string;
  color?: string;
}

interface PerformanceMetricsProps {
  metrics: MetricRow[];
}

export function PerformanceMetrics({ metrics }: PerformanceMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="flex items-center justify-between py-2.5 border-b border-white/[0.04]"
        >
          <span className="text-sm text-[var(--text-secondary)]">{metric.label}</span>
          <span
            className={cn(
              'text-sm font-semibold font-mono',
              metric.color || 'text-[var(--text-primary)]'
            )}
          >
            {metric.value}
          </span>
        </div>
      ))}
    </div>
  );
}
