import { cn } from '@/lib/utils';
import { GlassCard } from './GlassCard';
import { AnimatedCounter } from './AnimatedCounter';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  subtitle?: string;
  subtitleColor?: string;
  icon?: LucideIcon;
  badge?: string;
  badgeColor?: string;
  valueColor?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  prefix = '',
  suffix = '',
  decimals = 2,
  subtitle,
  subtitleColor,
  icon: Icon,
  badge,
  badgeColor = 'text-semantic-profit',
  valueColor = 'text-white',
  className,
}: StatCardProps) {
  return (
    <GlassCard className={cn('relative', className)}>
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)]">
          {title}
        </span>
        <div className="flex items-center gap-2">
          {badge && (
            <span className={cn('text-xs font-semibold', badgeColor)}>{badge}</span>
          )}
          {Icon && <Icon className="w-4 h-4 text-[var(--text-muted)]" />}
        </div>
      </div>
      <div className={cn('text-2xl font-bold font-mono tabular-nums', valueColor)}>
        {prefix}
        <AnimatedCounter value={value} decimals={decimals} />
        {suffix}
      </div>
      {subtitle && (
        <p className={cn('text-xs mt-2', subtitleColor || 'text-[var(--text-secondary)]')}>
          {subtitle}
        </p>
      )}
    </GlassCard>
  );
}
