import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';

interface AnimatedCounterProps {
  value: number;
  decimals?: number;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  decimals = 2,
  duration = 800,
  className,
}: AnimatedCounterProps) {
  const animatedValue = useAnimatedCounter(value, duration);

  return (
    <span className={className}>
      {animatedValue.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
    </span>
  );
}
