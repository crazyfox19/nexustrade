import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { cardHoverVariants } from '@/lib/motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function GlassCard({ children, className, hover = true, onClick }: GlassCardProps) {
  if (!hover) {
    return (
      <div className={cn('glass-card p-5', className)} onClick={onClick}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={cn('glass-card p-5 cursor-default', className)}
      variants={cardHoverVariants}
      initial="rest"
      whileHover="hover"
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
