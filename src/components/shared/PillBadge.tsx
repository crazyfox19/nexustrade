import { cn } from '@/lib/utils';

type PillVariant = 'profit' | 'loss' | 'warning' | 'info' | 'neutral' | 'cyan' | 'purple' | 'custom';

interface PillBadgeProps {
  children: React.ReactNode;
  variant?: PillVariant;
  className?: string;
  customColor?: string;
}

const variantStyles: Record<PillVariant, string> = {
  profit: 'bg-semantic-profit/15 text-semantic-profit border-semantic-profit/30',
  loss: 'bg-semantic-loss/15 text-semantic-loss border-semantic-loss/30',
  warning: 'bg-semantic-warning/15 text-semantic-warning border-semantic-warning/30',
  info: 'bg-semantic-info/15 text-semantic-info border-semantic-info/30',
  neutral: 'bg-semantic-neutral/15 text-semantic-neutral border-semantic-neutral/30',
  cyan: 'bg-neon-cyan/15 text-neon-cyan border-neon-cyan/30',
  purple: 'bg-neon-purple/15 text-neon-purple border-neon-purple/30',
  custom: '',
};

export function PillBadge({ children, variant = 'neutral', className, customColor }: PillBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider border',
        variantStyles[variant],
        className
      )}
      style={customColor ? {
        backgroundColor: `${customColor}20`,
        color: customColor,
        borderColor: `${customColor}40`,
      } : undefined}
    >
      {children}
    </span>
  );
}
