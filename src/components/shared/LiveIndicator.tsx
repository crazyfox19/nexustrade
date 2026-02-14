import { cn } from '@/lib/utils';

interface LiveIndicatorProps {
  label?: string;
  color?: 'green' | 'red' | 'cyan';
  className?: string;
}

const colorMap = {
  green: 'bg-semantic-profit',
  red: 'bg-semantic-loss',
  cyan: 'bg-neon-cyan',
};

export function LiveIndicator({ label = 'Live', color = 'green', className }: LiveIndicatorProps) {
  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <span className={cn('w-2 h-2 rounded-full animate-pulse-dot', colorMap[color])} />
      <span className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-secondary)]">
        {label}
      </span>
    </div>
  );
}
