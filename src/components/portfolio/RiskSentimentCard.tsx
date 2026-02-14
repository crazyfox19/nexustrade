import { cn } from '@/lib/utils';
import { AnimatedCounter } from '@/components/shared/AnimatedCounter';

interface DetailRow {
  label: string;
  value: string;
}

interface RiskSentimentCardProps {
  type: 'risk' | 'sentiment';
  score: number;
  maxScore: number;
  label: string;
  details: DetailRow[];
}

const themeMap = {
  risk: {
    text: 'text-semantic-warning',
    bar: 'bg-semantic-warning',
    barBg: 'bg-semantic-warning/20',
    border: 'border-semantic-warning/20',
  },
  sentiment: {
    text: 'text-neon-cyan',
    bar: 'bg-neon-cyan',
    barBg: 'bg-neon-cyan/20',
    border: 'border-neon-cyan/20',
  },
};

export function RiskSentimentCard({
  type,
  score,
  maxScore,
  label,
  details,
}: RiskSentimentCardProps) {
  const theme = themeMap[type];
  const pct = (score / maxScore) * 100;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-baseline gap-1.5">
          <span className={cn('text-3xl font-bold font-mono', theme.text)}>
            <AnimatedCounter value={score} decimals={0} />
          </span>
          <span className="text-sm text-[var(--text-muted)]">/ {maxScore}</span>
        </div>
        <span
          className={cn(
            'text-xs font-semibold px-2.5 py-1 rounded-full border',
            theme.text,
            theme.border,
            type === 'risk' ? 'bg-semantic-warning/10' : 'bg-neon-cyan/10'
          )}
        >
          {label}
        </span>
      </div>
      <div className={cn('h-2 rounded-full mb-5', theme.barBg)}>
        <div
          className={cn('h-full rounded-full transition-all duration-700', theme.bar)}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="space-y-3">
        {details.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-[var(--text-secondary)]">{row.label}</span>
            <span className="font-medium text-[var(--text-primary)]">{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
