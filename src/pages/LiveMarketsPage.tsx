import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Globe, BarChart3, TrendingUp, TrendingDown, Filter } from 'lucide-react';
import { PageWrapper } from '@/components/shared/PageWrapper';
import { StatCard } from '@/components/shared/StatCard';
import { GlassCard } from '@/components/shared/GlassCard';
import { SearchInput } from '@/components/shared/SearchInput';
import { ToggleGroup } from '@/components/shared/ToggleGroup';
import { EmptyState } from '@/components/shared/EmptyState';
import { MarketTable } from '@/components/markets/MarketTable';
import { MarketCard } from '@/components/markets/MarketCard';
import { useMarketsStore } from '@/stores';
import { containerVariants, itemVariants } from '@/lib/motion';
import { formatCompactCurrency } from '@/lib/formatters';
import { cn } from '@/lib/utils';

const CATEGORIES = ['all', 'crypto', 'stocks', 'forex', 'indices'] as const;
const VIEW_MODES = ['Standard', 'Compact'] as const;

export default function LiveMarketsPage() {
  const {
    assets,
    totalAssets,
    watchlist,
    category,
    viewMode,
    searchQuery,
    topGainer,
    topLoser,
    volume24h,
    toggleWatchlist,
    setCategory,
    setViewMode,
    setSearchQuery,
  } = useMarketsStore();

  const [showWatchlistOnly, setShowWatchlistOnly] = useState(false);

  const filteredAssets = useMemo(() => {
    let result = assets;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.symbol.toLowerCase().includes(q) ||
          a.name.toLowerCase().includes(q)
      );
    }

    if (category !== 'all') {
      result = result.filter((a) => a.assetClass === category);
    }

    if (showWatchlistOnly) {
      result = result.filter((a) => watchlist.includes(a.id));
    }

    return result;
  }, [assets, searchQuery, category, showWatchlistOnly, watchlist]);

  return (
    <PageWrapper>
      <motion.div
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">Live Markets</h2>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Real-time market data and watchlist
          </p>
        </motion.div>

        {/* Row 1: Market Summary Cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <StatCard
            title="Total Assets"
            value={totalAssets}
            decimals={0}
            icon={Globe}
            subtitle="Tracked"
          />
          <StatCard
            title="24h Volume"
            value={volume24h / 1_000_000_000}
            prefix="$"
            suffix="B"
            decimals={2}
            icon={BarChart3}
            subtitle={formatCompactCurrency(volume24h)}
          />
          <StatCard
            title="Top Gainer"
            value={topGainer.change}
            suffix="%"
            decimals={1}
            icon={TrendingUp}
            badge={topGainer.asset}
            badgeColor="text-semantic-profit"
            valueColor="text-semantic-profit"
          />
          <StatCard
            title="Top Loser"
            value={Math.abs(topLoser.change)}
            suffix="%"
            decimals={1}
            icon={TrendingDown}
            badge={topLoser.asset}
            badgeColor="text-semantic-loss"
            valueColor="text-semantic-loss"
          />
        </motion.div>

        {/* Row 2: Controls Bar */}
        <motion.div variants={itemVariants}>
          <GlassCard hover={false}>
            <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3">
              <SearchInput
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search markets..."
                className="w-full sm:w-56"
              />
              <ToggleGroup
                options={CATEGORIES}
                value={category}
                onChange={(v) => setCategory(v as typeof category)}
              />
              <ToggleGroup
                options={VIEW_MODES}
                value={viewMode === 'standard' ? 'Standard' : 'Compact'}
                onChange={(v) => setViewMode(v === 'Standard' ? 'standard' : 'compact')}
              />
              <button
                onClick={() => setShowWatchlistOnly(!showWatchlistOnly)}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border',
                  showWatchlistOnly
                    ? 'bg-neon-cyan/15 text-neon-cyan border-neon-cyan/30'
                    : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border-transparent hover:text-[var(--text-primary)]'
                )}
              >
                <Filter className="w-3.5 h-3.5" />
                Watchlist
              </button>
            </div>
          </GlassCard>
        </motion.div>

        {/* Row 3: Market Assets */}
        <motion.div variants={itemVariants}>
          {filteredAssets.length === 0 ? (
            <GlassCard hover={false}>
              <EmptyState
                title="No assets found"
                description="Try adjusting your filters or search query."
              />
            </GlassCard>
          ) : viewMode === 'standard' ? (
            <GlassCard hover={false}>
              <h3 className="text-base font-semibold text-[var(--text-primary)] mb-4">
                Markets ({filteredAssets.length})
              </h3>
              <MarketTable
                assets={filteredAssets}
                watchlist={watchlist}
                onToggleWatchlist={toggleWatchlist}
              />
            </GlassCard>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {filteredAssets.map((asset) => (
                <MarketCard
                  key={asset.id}
                  asset={asset}
                  isWatchlisted={watchlist.includes(asset.id)}
                  onToggleWatchlist={() => toggleWatchlist(asset.id)}
                />
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </PageWrapper>
  );
}
