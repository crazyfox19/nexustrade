import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WatchlistStarProps {
  active: boolean;
  onClick: () => void;
  className?: string;
}

export function WatchlistStar({ active, onClick, className }: WatchlistStarProps) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={cn(
        'p-1 rounded transition-colors',
        active
          ? 'text-semantic-warning'
          : 'text-[var(--text-muted)] hover:text-semantic-warning/60',
        className
      )}
    >
      <Star className="w-4 h-4" fill={active ? 'currentColor' : 'none'} />
    </button>
  );
}
