import { ChevronUp, ChevronDown } from 'lucide-react';
import { PillBadge } from '@/components/shared/PillBadge';
import { formatCurrency, formatPnL, formatDate, formatTime } from '@/lib/formatters';
import { cn } from '@/lib/utils';
import type { Trade, SortOrder } from '@/types';

interface TradesTableProps {
  trades: Trade[];
  sortBy: string;
  sortOrder: SortOrder;
  onSort: (column: string) => void;
}

function SortHeader({
  label,
  column,
  sortBy,
  sortOrder,
  onSort,
  className,
}: {
  label: string;
  column: string;
  sortBy: string;
  sortOrder: SortOrder;
  onSort: (column: string) => void;
  className?: string;
}) {
  const isActive = sortBy === column;
  return (
    <th
      className={cn(
        'px-3 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--text-secondary)] cursor-pointer select-none hover:text-[var(--text-primary)] transition-colors',
        isActive && 'text-neon-cyan',
        className
      )}
      onClick={() => onSort(column)}
    >
      <span className="inline-flex items-center gap-1">
        {label}
        {isActive &&
          (sortOrder === 'asc' ? (
            <ChevronUp className="w-3 h-3" />
          ) : (
            <ChevronDown className="w-3 h-3" />
          ))}
      </span>
    </th>
  );
}

export function TradesTable({ trades, sortBy, sortOrder, onSort }: TradesTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/5">
            <SortHeader label="Date/Time" column="date" sortBy={sortBy} sortOrder={sortOrder} onSort={onSort} />
            <SortHeader label="Instrument" column="instrument" sortBy={sortBy} sortOrder={sortOrder} onSort={onSort} />
            <SortHeader label="Type" column="type" sortBy={sortBy} sortOrder={sortOrder} onSort={onSort} />
            <SortHeader label="Direction" column="direction" sortBy={sortBy} sortOrder={sortOrder} onSort={onSort} className="hidden md:table-cell" />
            <SortHeader label="Size" column="size" sortBy={sortBy} sortOrder={sortOrder} onSort={onSort} className="hidden md:table-cell" />
            <SortHeader label="Entry" column="entryPrice" sortBy={sortBy} sortOrder={sortOrder} onSort={onSort} />
            <SortHeader label="Exit" column="exitPrice" sortBy={sortBy} sortOrder={sortOrder} onSort={onSort} />
            <SortHeader label="P/L" column="pnl" sortBy={sortBy} sortOrder={sortOrder} onSort={onSort} />
            <SortHeader label="Status" column="status" sortBy={sortBy} sortOrder={sortOrder} onSort={onSort} />
          </tr>
        </thead>
        <tbody>
          {trades.map((trade) => (
            <tr
              key={trade.id}
              className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
            >
              <td className="px-3 py-3">
                <div className="text-sm text-[var(--text-primary)]">{formatDate(trade.date)}</div>
                <div className="text-[11px] text-[var(--text-muted)]">{formatTime(trade.date)}</div>
              </td>
              <td className="px-3 py-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                    style={{ backgroundColor: trade.instrumentIcon }}
                  >
                    {trade.instrument.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-[var(--text-primary)]">
                    {trade.instrument}
                  </span>
                </div>
              </td>
              <td className="px-3 py-3">
                <PillBadge variant={trade.type === 'BUY' ? 'cyan' : 'purple'}>
                  {trade.type}
                </PillBadge>
              </td>
              <td className="hidden md:table-cell px-3 py-3 text-sm text-[var(--text-secondary)]">
                {trade.direction}
              </td>
              <td className="hidden md:table-cell px-3 py-3 text-sm font-mono text-[var(--text-secondary)]">
                {trade.size} {trade.sizeUnit}
              </td>
              <td className="px-3 py-3 text-sm font-mono text-[var(--text-primary)]">
                {formatCurrency(trade.entryPrice)}
              </td>
              <td className="px-3 py-3 text-sm font-mono text-[var(--text-primary)]">
                {trade.exitPrice ? formatCurrency(trade.exitPrice) : '—'}
              </td>
              <td className="px-3 py-3">
                <span
                  className={cn(
                    'text-sm font-semibold font-mono',
                    trade.pnl > 0
                      ? 'text-semantic-profit'
                      : trade.pnl < 0
                        ? 'text-semantic-loss'
                        : 'text-[var(--text-secondary)]'
                  )}
                >
                  {formatPnL(trade.pnl)}
                </span>
              </td>
              <td className="px-3 py-3">
                <PillBadge variant={trade.status === 'Filled' ? 'profit' : 'neutral'}>
                  {trade.status}
                </PillBadge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
