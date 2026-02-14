import { PillBadge } from '@/components/shared/PillBadge';
import { SparklineChart } from './SparklineChart';
import { WatchlistStar } from './WatchlistStar';
import { formatCurrency, formatPercentage } from '@/lib/formatters';
import type { MarketAsset } from '@/types';

interface MarketTableProps {
  assets: MarketAsset[];
  watchlist: string[];
  onToggleWatchlist: (id: string) => void;
}

export function MarketTable({ assets, watchlist, onToggleWatchlist }: MarketTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/5">
            <th className="w-10 px-2 py-3" />
            <th className="px-3 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
              Asset
            </th>
            <th className="px-3 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
              Price
            </th>
            <th className="px-3 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
              24h Change
            </th>
            <th className="hidden md:table-cell px-3 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
              Volume
            </th>
            <th className="hidden md:table-cell px-3 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
              Market Cap
            </th>
            <th className="px-3 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
              Trend
            </th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr
              key={asset.id}
              className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors"
            >
              <td className="px-2 py-3">
                <WatchlistStar
                  active={watchlist.includes(asset.id)}
                  onClick={() => onToggleWatchlist(asset.id)}
                />
              </td>
              <td className="px-3 py-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                    style={{ backgroundColor: asset.iconColor }}
                  >
                    {asset.symbol.charAt(0)}
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-[var(--text-primary)]">
                      {asset.symbol}
                    </span>
                    <span className="text-xs text-[var(--text-muted)] ml-1.5 hidden sm:inline">
                      {asset.name}
                    </span>
                  </div>
                </div>
              </td>
              <td className="px-3 py-3 text-right text-sm font-mono text-[var(--text-primary)]">
                {formatCurrency(asset.price)}
              </td>
              <td className="px-3 py-3 text-right">
                <PillBadge variant={asset.change24h >= 0 ? 'profit' : 'loss'}>
                  {formatPercentage(asset.change24h)}
                </PillBadge>
              </td>
              <td className="hidden md:table-cell px-3 py-3 text-right text-sm text-[var(--text-secondary)]">
                {asset.volume}
              </td>
              <td className="hidden md:table-cell px-3 py-3 text-right text-sm text-[var(--text-secondary)]">
                {asset.marketCap || '—'}
              </td>
              <td className="px-3 py-3">
                <div className="flex justify-end">
                  <SparklineChart
                    data={asset.sparklineData}
                    color={asset.change24h >= 0 ? '#22C55E' : '#EF4444'}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
