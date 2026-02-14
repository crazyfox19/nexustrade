import { GlassCard } from '@/components/shared/GlassCard';
import { PillBadge } from '@/components/shared/PillBadge';
import { SparklineChart } from './SparklineChart';
import { WatchlistStar } from './WatchlistStar';
import { formatCurrency, formatPercentage } from '@/lib/formatters';
import type { MarketAsset } from '@/types';

interface MarketCardProps {
  asset: MarketAsset;
  isWatchlisted: boolean;
  onToggleWatchlist: () => void;
}

export function MarketCard({ asset, isWatchlisted, onToggleWatchlist }: MarketCardProps) {
  return (
    <GlassCard hover={false} className="!p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0"
            style={{ backgroundColor: asset.iconColor }}
          >
            {asset.symbol.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-semibold text-[var(--text-primary)]">{asset.symbol}</p>
            <p className="text-[11px] text-[var(--text-muted)]">{asset.name}</p>
          </div>
        </div>
        <WatchlistStar active={isWatchlisted} onClick={onToggleWatchlist} />
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-lg font-bold font-mono text-[var(--text-primary)]">
            {formatCurrency(asset.price)}
          </p>
          <PillBadge variant={asset.change24h >= 0 ? 'profit' : 'loss'}>
            {formatPercentage(asset.change24h)}
          </PillBadge>
        </div>
        <SparklineChart
          data={asset.sparklineData}
          color={asset.change24h >= 0 ? '#22C55E' : '#EF4444'}
          width={64}
          height={28}
        />
      </div>
    </GlassCard>
  );
}
