import { cn } from '@/lib/utils';
import { TICKER_ITEMS } from '@/lib/constants';

export function TickerBar() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="h-10 bg-nexus-secondary border-t border-[var(--bg-glass-border)] flex items-center overflow-hidden relative flex-shrink-0">
      <div className="flex items-center gap-1.5 px-4 border-r border-[var(--bg-glass-border)] flex-shrink-0 z-10 bg-nexus-secondary">
        <span className="w-2 h-2 rounded-full bg-semantic-loss animate-pulse-dot" />
        <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">
          Live
        </span>
      </div>

      <div className="flex animate-ticker-scroll whitespace-nowrap">
        {items.map((item, index) => (
          <div key={`${item.symbol}-${index}`} className="flex items-center gap-2 px-6">
            <span className="text-xs font-medium text-[var(--text-secondary)]">{item.symbol}</span>
            <span className="text-xs font-mono font-medium text-[var(--text-primary)]">
              {item.price < 10
                ? `$${item.price.toFixed(4)}`
                : `$${item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
            </span>
            <span
              className={cn(
                'text-[11px] font-medium',
                item.change > 0 ? 'text-semantic-profit'
                  : item.change < 0 ? 'text-semantic-loss'
                  : 'text-[var(--text-secondary)]'
              )}
            >
              {item.change > 0 ? '+' : ''}{item.change.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
