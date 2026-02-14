import { cn } from '@/lib/utils';

interface SkeletonLoaderProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export function SkeletonLoader({ className, variant = 'rectangular', width, height }: SkeletonLoaderProps) {
  return (
    <div
      className={cn(
        'animate-shimmer bg-[var(--bg-surface)]',
        variant === 'circular' && 'rounded-full',
        variant === 'text' && 'rounded h-4',
        variant === 'rectangular' && 'rounded-lg',
        className
      )}
      style={{ width, height }}
    />
  );
}
