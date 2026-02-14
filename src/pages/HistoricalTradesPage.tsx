import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Clock, BarChart3 } from 'lucide-react';
import { PageWrapper } from '@/components/shared/PageWrapper';
import { StatCard } from '@/components/shared/StatCard';
import { GlassCard } from '@/components/shared/GlassCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { TradeFilters } from '@/components/history/TradeFilters';
import { TradesTable } from '@/components/history/TradesTable';
import { PaginationControls } from '@/components/history/PaginationControls';
import { useTradesStore } from '@/stores';
import { containerVariants, itemVariants } from '@/lib/motion';
import type { Trade } from '@/types';

export default function HistoricalTradesPage() {
  const {
    trades,
    filters,
    sortBy,
    sortOrder,
    page,
    pageSize,
    summaryStats,
    setFilters,
    setSorting,
    setPage,
    setPageSize,
  } = useTradesStore();

  const filteredAndSorted = useMemo(() => {
    let result = trades;

    // Filter by search query
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.instrument.toLowerCase().includes(q) ||
          t.instrumentName.toLowerCase().includes(q)
      );
    }

    // Filter by type
    if (filters.type !== 'ALL') {
      result = result.filter((t) => t.type === filters.type);
    }

    // Filter by status
    if (filters.status !== 'ALL') {
      result = result.filter(
        (t) => t.status.toUpperCase() === filters.status
      );
    }

    // Sort
    result = [...result].sort((a, b) => {
      const aVal = a[sortBy as keyof Trade];
      const bVal = b[sortBy as keyof Trade];
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortOrder === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      return sortOrder === 'asc'
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number);
    });

    return result;
  }, [trades, filters, sortBy, sortOrder]);

  const totalFiltered = filteredAndSorted.length;
  const paginatedTrades = filteredAndSorted.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

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
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">
            Historical Trade Ledger
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Complete trade history with P/L tracking
          </p>
        </motion.div>

        {/* Row 1: Summary Cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <StatCard
            title="Win Rate"
            value={summaryStats.winRate}
            suffix="%"
            decimals={1}
            icon={Target}
            badge="Strong"
            badgeColor="text-semantic-profit"
          />
          <StatCard
            title="Total Net P/L"
            value={summaryStats.totalNetPnL}
            prefix="$"
            decimals={2}
            icon={TrendingUp}
            valueColor="text-semantic-profit"
          />
          <StatCard
            title="Avg Duration"
            value={0}
            decimals={0}
            icon={Clock}
            subtitle={summaryStats.avgDuration}
          />
          <StatCard
            title="Profit Factor"
            value={summaryStats.profitFactor}
            suffix="x"
            decimals={2}
            icon={BarChart3}
            badge="Profitable"
            badgeColor="text-neon-cyan"
          />
        </motion.div>

        {/* Row 2: Filters */}
        <motion.div variants={itemVariants}>
          <GlassCard hover={false}>
            <TradeFilters
              searchQuery={filters.searchQuery}
              type={filters.type}
              status={filters.status}
              timePeriod={filters.timePeriod}
              onSearchChange={(q) => setFilters({ searchQuery: q })}
              onTypeChange={(t) => {
                setFilters({ type: t as 'ALL' | 'BUY' | 'SELL' });
                setPage(1);
              }}
              onStatusChange={(s) => {
                setFilters({ status: s as 'ALL' | 'FILLED' | 'CANCELLED' });
                setPage(1);
              }}
              onTimePeriodChange={(p) => setFilters({ timePeriod: p as 'ALL' | '30D' | '90D' | 'YTD' })}
            />
          </GlassCard>
        </motion.div>

        {/* Row 3: Trades Table */}
        <motion.div variants={itemVariants}>
          <GlassCard hover={false}>
            <h3 className="text-base font-semibold text-[var(--text-primary)] mb-4">
              Trades ({totalFiltered})
            </h3>
            {paginatedTrades.length > 0 ? (
              <TradesTable
                trades={paginatedTrades}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSort={setSorting}
              />
            ) : (
              <EmptyState
                title="No trades found"
                description="Try adjusting your filters to see more results."
              />
            )}
          </GlassCard>
        </motion.div>

        {/* Row 4: Pagination */}
        {totalFiltered > 0 && (
          <motion.div variants={itemVariants}>
            <PaginationControls
              page={page}
              pageSize={pageSize}
              total={totalFiltered}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
            />
          </motion.div>
        )}
      </motion.div>
    </PageWrapper>
  );
}
