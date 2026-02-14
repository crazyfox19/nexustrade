import { ChevronUp, ChevronDown } from 'lucide-react';
import type { AssetHolding } from '@/types';
import { formatCurrency, formatPercentage } from '@/lib/formatters';
import { PillBadge } from '@/components/shared/PillBadge';
import { cn } from '@/lib/utils';

type SortColumn = 'symbol' | 'quantity' | 'price' | 'value' | 'allocation' | 'change24h';

interface HoldingsTableProps {
  holdings: AssetHolding[];
  sortColumn: string;
  sortDir: 'asc' | 'desc';
  onSort: (column: SortColumn) => void;
}

function SortHeader({
  label,
  column,
  active,
  dir,
  onSort,
  className,
}: {
  label: string;
  column: SortColumn;
  active: boolean;
  dir: 'asc' | 'desc';
  onSort: (col: SortColumn) => void;
  className?: string;
}) {
  return (
    <th
      className={cn(
        'py-3 px-2 text-[11px] font-medium uppercase tracking-wider text-[var(--text-muted)] cursor-pointer select-none hover:text-[var(--text-secondary)] transition-colors',
        className
      )}
      onClick={() => onSort(column)}
    >
      <div className={cn('flex items-center gap-1', className?.includes('text-right') && 'justify-end')}>
        <span>{label}</span>
        <div className="flex flex-col -space-y-1">
          <ChevronUp
            className={cn(
              'w-3 h-3',
              active && dir === 'asc' ? 'text-neon-cyan' : 'text-[var(--text-muted)]/30'
            )}
          />
          <ChevronDown
            className={cn(
              'w-3 h-3',
              active && dir === 'desc' ? 'text-neon-cyan' : 'text-[var(--text-muted)]/30'
            )}
          />
        </div>
      </div>
    </th>
  );
}

export function HoldingsTable({ holdings, sortColumn, sortDir, onSort }: HoldingsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--bg-glass-border)]">
            <SortHeader label="Asset" column="symbol" active={sortColumn === 'symbol'} dir={sortDir} onSort={onSort} className="text-left" />
            <SortHeader label="Quantity" column="quantity" active={sortColumn === 'quantity'} dir={sortDir} onSort={onSort} className="text-right hidden md:table-cell" />
            <SortHeader label="Price" column="price" active={sortColumn === 'price'} dir={sortDir} onSort={onSort} className="text-right" />
            <SortHeader label="Value" column="value" active={sortColumn === 'value'} dir={sortDir} onSort={onSort} className="text-right" />
            <SortHeader label="Alloc%" column="allocation" active={sortColumn === 'allocation'} dir={sortDir} onSort={onSort} className="text-right hidden sm:table-cell" />
            <SortHeader label="24h Change" column="change24h" active={sortColumn === 'change24h'} dir={sortDir} onSort={onSort} className="text-right" />
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
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
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
              <td className="py-3 px-2 text-right font-mono text-[var(--text-secondary)] hidden md:table-cell">
                {h.quantity.toLocaleString('en-US', { maximumFractionDigits: 4 })}
              </td>
              <td className="py-3 px-2 text-right font-mono text-[var(--text-primary)]">
                {formatCurrency(h.price)}
              </td>
              <td className="py-3 px-2 text-right font-mono text-[var(--text-primary)]">
                {formatCurrency(h.value)}
              </td>
              <td className="py-3 px-2 text-right text-[var(--text-secondary)] hidden sm:table-cell">
                {h.allocation.toFixed(1)}%
              </td>
              <td className="py-3 px-2 text-right">
                <PillBadge variant={h.change24h >= 0 ? 'profit' : 'loss'}>
                  {formatPercentage(h.change24h)}
                </PillBadge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
