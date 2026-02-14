import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { AssetHolding } from '@/types';
import { formatCurrency, formatPercentage } from '@/lib/formatters';
import { PillBadge } from '@/components/shared/PillBadge';
import { ROUTES } from '@/lib/constants';

interface HoldingsSummaryTableProps {
  holdings: AssetHolding[];
}

export function HoldingsSummaryTable({ holdings }: HoldingsSummaryTableProps) {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--bg-glass-border)]">
              <th className="text-left py-3 px-2 text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)]">
                Asset
              </th>
              <th className="text-right py-3 px-2 text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)] hidden sm:table-cell">
                Price
              </th>
              <th className="text-right py-3 px-2 text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)]">
                24h
              </th>
              <th className="text-right py-3 px-2 text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)] hidden md:table-cell">
                Value
              </th>
              <th className="text-right py-3 px-2 text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)] hidden lg:table-cell">
                Alloc%
              </th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((h) => (
              <tr
                key={h.id}
                className="border-b border-[var(--bg-glass-border)]/50 hover:bg-[var(--bg-surface)]/50 transition-colors"
              >
                <td className="py-3 px-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                      style={{ backgroundColor: h.iconColor + '30', color: h.iconColor }}
                    >
                      {h.symbol.slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                        {h.symbol}
                      </p>
                      <p className="text-[11px] text-[var(--text-muted)] truncate">{h.name}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-2 text-right font-mono text-[var(--text-primary)] hidden sm:table-cell">
                  {formatCurrency(h.price)}
                </td>
                <td className="py-3 px-2 text-right">
                  <PillBadge variant={h.change24h >= 0 ? 'profit' : 'loss'}>
                    {formatPercentage(h.change24h)}
                  </PillBadge>
                </td>
                <td className="py-3 px-2 text-right font-mono text-[var(--text-primary)] hidden md:table-cell">
                  {formatCurrency(h.value)}
                </td>
                <td className="py-3 px-2 text-right text-[var(--text-secondary)] hidden lg:table-cell">
                  {h.allocation.toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-end">
        <Link
          to={ROUTES.PORTFOLIO}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-neon-cyan hover:text-neon-cyan/80 transition-colors"
        >
          View All
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
