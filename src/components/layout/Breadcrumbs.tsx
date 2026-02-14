import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav className={cn('flex items-center gap-1.5 text-xs', className)}>
      {items.map((item, index) => (
        <div key={item.label} className="flex items-center gap-1.5">
          {index > 0 && <ChevronRight className="w-3 h-3 text-[var(--text-muted)]" />}
          {item.href ? (
            <Link
              to={item.href}
              className="uppercase tracking-wider font-medium text-neon-cyan hover:text-neon-cyan/80 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="uppercase tracking-wider font-medium text-[var(--text-muted)]">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
