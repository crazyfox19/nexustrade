import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { GlassCard } from '@/components/shared/GlassCard';
import { AnimatedCounter } from '@/components/shared/AnimatedCounter';

interface QuickGlanceCardProps {
  title: string;
  value: number;
  suffix?: string;
  decimals?: number;
  subtitle?: string;
  color?: 'green' | 'orange' | 'cyan' | 'red';
  progress?: number;
  linkTo?: string;
}

const colorMap = {
  green: {
    text: 'text-semantic-profit',
    bar: 'bg-semantic-profit',
    barBg: 'bg-semantic-profit/20',
  },
  orange: {
    text: 'text-semantic-warning',
    bar: 'bg-semantic-warning',
    barBg: 'bg-semantic-warning/20',
  },
  cyan: {
    text: 'text-neon-cyan',
    bar: 'bg-neon-cyan',
    barBg: 'bg-neon-cyan/20',
  },
  red: {
    text: 'text-semantic-loss',
    bar: 'bg-semantic-loss',
    barBg: 'bg-semantic-loss/20',
  },
};

export function QuickGlanceCard({
  title,
  value,
  suffix = '',
  decimals = 1,
  subtitle,
  color = 'cyan',
  progress,
  linkTo,
}: QuickGlanceCardProps) {
  const colors = colorMap[color];

  const content = (
    <GlassCard className="relative">
      <span className="text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)]">
        {title}
      </span>
      <div className={cn('text-2xl font-bold font-mono tabular-nums mt-2', colors.text)}>
        <AnimatedCounter value={value} decimals={decimals} />
        {suffix}
      </div>
      {progress !== undefined && (
        <div className={cn('h-1.5 rounded-full mt-3', colors.barBg)}>
          <div
            className={cn('h-full rounded-full transition-all duration-700', colors.bar)}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      )}
      {subtitle && (
        <p className="text-xs mt-2 text-[var(--text-secondary)]">{subtitle}</p>
      )}
    </GlassCard>
  );

  if (linkTo) {
    return (
      <Link to={linkTo} className="block hover:ring-1 hover:ring-neon-cyan/20 rounded-xl transition-all">
        {content}
      </Link>
    );
  }

  return content;
}
