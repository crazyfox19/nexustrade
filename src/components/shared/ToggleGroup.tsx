import { cn } from '@/lib/utils';

interface ToggleGroupProps {
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function ToggleGroup({ options, value, onChange, className }: ToggleGroupProps) {
  return (
    <div className={cn('inline-flex items-center rounded-lg bg-[var(--bg-secondary)] p-0.5', className)}>
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={cn(
            'px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200',
            value === option
              ? 'bg-neon-cyan text-nexus-body shadow-sm'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
