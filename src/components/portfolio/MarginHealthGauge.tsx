import { cn } from '@/lib/utils';
import { AnimatedCounter } from '@/components/shared/AnimatedCounter';
import { formatCompactCurrency } from '@/lib/formatters';

interface MarginHealthGaugeProps {
  score: number;
  maxScore: number;
  marginUsed: number;
  marginLimit: number;
}

export function MarginHealthGauge({
  score,
  maxScore,
  marginUsed,
  marginLimit,
}: MarginHealthGaugeProps) {
  const pct = (score / maxScore) * 100;
  const barColor =
    pct >= 80 ? 'bg-semantic-profit' : pct >= 50 ? 'bg-semantic-warning' : 'bg-semantic-loss';

  return (
    <div>
      <div className="flex items-baseline gap-1 mb-3">
        <span className="text-2xl font-bold font-mono text-[var(--text-primary)]">
          <AnimatedCounter value={score} decimals={0} />
        </span>
        <span className="text-sm text-[var(--text-muted)]">/ {maxScore}</span>
      </div>
      <div className="h-2 rounded-full bg-[var(--bg-surface)] mb-3">
        <div
          className={cn('h-full rounded-full transition-all duration-700', barColor)}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-[var(--text-muted)]">
          Used: <span className="text-[var(--text-secondary)]">{formatCompactCurrency(marginUsed)}</span>
        </span>
        <span className="text-[var(--text-muted)]">
          Limit: <span className="text-[var(--text-secondary)]">{formatCompactCurrency(marginLimit)}</span>
        </span>
      </div>
    </div>
  );
}
