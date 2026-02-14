import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import { PageWrapper } from '@/components/shared/PageWrapper';
import { StatCard } from '@/components/shared/StatCard';
import { GlassCard } from '@/components/shared/GlassCard';
import { LiveIndicator } from '@/components/shared/LiveIndicator';
import { ToggleGroup } from '@/components/shared/ToggleGroup';
import { EquityCurve } from '@/components/analytics/EquityCurve';
import { WinLossChart } from '@/components/analytics/WinLossChart';
import { PnLBarChart } from '@/components/analytics/PnLBarChart';
import { PerformanceMetrics } from '@/components/analytics/PerformanceMetrics';
import { usePortfolioStore, useTradesStore } from '@/stores';
import { containerVariants, itemVariants } from '@/lib/motion';
import { TIME_RANGES } from '@/lib/constants';
import { formatCurrency, formatPnL } from '@/lib/formatters';
import type { TimeRange } from '@/types';

export default function AnalyticsPage() {
  const portfolio = usePortfolioStore();
  const { trades, summaryStats } = useTradesStore();

  const filledTrades = useMemo(
    () => trades.filter((t) => t.status === 'Filled'),
    [trades]
  );

  const bestTrade = useMemo(
    () => filledTrades.reduce((best, t) => (t.pnl > best.pnl ? t : best), filledTrades[0]),
    [filledTrades]
  );

  const worstTrade = useMemo(
    () => filledTrades.reduce((worst, t) => (t.pnl < worst.pnl ? t : worst), filledTrades[0]),
    [filledTrades]
  );

  const { wins, losses } = useMemo(() => {
    let w = 0;
    let l = 0;
    filledTrades.forEach((t) => {
      if (t.pnl > 0) w++;
      else l++;
    });
    return { wins: w, losses: l };
  }, [filledTrades]);

  const pnlByInstrument = useMemo(() => {
    const map = new Map<string, number>();
    filledTrades.forEach((t) => {
      map.set(t.instrument, (map.get(t.instrument) || 0) + t.pnl);
    });
    return Array.from(map.entries())
      .map(([instrument, pnl]) => ({ instrument, pnl }))
      .sort((a, b) => b.pnl - a.pnl);
  }, [filledTrades]);

  const cancelledCount = trades.length - filledTrades.length;
  const filledRate = ((filledTrades.length / trades.length) * 100).toFixed(1);

  const avgWin = useMemo(() => {
    const winTrades = filledTrades.filter((t) => t.pnl > 0);
    return winTrades.length > 0
      ? winTrades.reduce((sum, t) => sum + t.pnl, 0) / winTrades.length
      : 0;
  }, [filledTrades]);

  const avgLoss = useMemo(() => {
    const lossTrades = filledTrades.filter((t) => t.pnl <= 0);
    return lossTrades.length > 0
      ? lossTrades.reduce((sum, t) => sum + t.pnl, 0) / lossTrades.length
      : 0;
  }, [filledTrades]);

  const metricsData = [
    { label: 'Win Rate', value: `${summaryStats.winRate}%`, color: 'text-semantic-profit' },
    { label: 'Profit Factor', value: `${summaryStats.profitFactor}x`, color: 'text-neon-cyan' },
    { label: 'Total Net P/L', value: formatPnL(summaryStats.totalNetPnL), color: 'text-semantic-profit' },
    { label: 'Avg Trade Duration', value: summaryStats.avgDuration },
    { label: 'Total Trades', value: `${trades.length}` },
    { label: 'Filled Rate', value: `${filledRate}%` },
    {
      label: 'Best Trade',
      value: bestTrade ? `${formatPnL(bestTrade.pnl)} (${bestTrade.instrument})` : '—',
      color: 'text-semantic-profit',
    },
    {
      label: 'Worst Trade',
      value: worstTrade ? `${formatPnL(worstTrade.pnl)} (${worstTrade.instrument})` : '—',
      color: 'text-semantic-loss',
    },
    { label: 'Avg Win', value: formatCurrency(avgWin), color: 'text-semantic-profit' },
    { label: 'Avg Loss', value: formatCurrency(avgLoss), color: 'text-semantic-loss' },
  ];

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
            Analytics Overview
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Real-time performance metrics and predictive modeling
          </p>
        </motion.div>

        {/* Row 1: Key Metric Cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <StatCard
            title="Total Return"
            value={portfolio.dailyChange}
            suffix="%"
            decimals={2}
            icon={TrendingUp}
            valueColor="text-semantic-profit"
            subtitle={formatCurrency(portfolio.totalEquity)}
          />
          <StatCard
            title="Best Trade"
            value={bestTrade?.pnl ?? 0}
            prefix="$"
            decimals={2}
            icon={ArrowUpRight}
            badge={bestTrade?.instrument ?? ''}
            badgeColor="text-semantic-profit"
            valueColor="text-semantic-profit"
          />
          <StatCard
            title="Worst Trade"
            value={Math.abs(worstTrade?.pnl ?? 0)}
            prefix="-$"
            decimals={2}
            icon={ArrowDownRight}
            badge={worstTrade?.instrument ?? ''}
            badgeColor="text-semantic-loss"
            valueColor="text-semantic-loss"
          />
          <StatCard
            title="Total Trades"
            value={trades.length}
            decimals={0}
            icon={Activity}
            subtitle={`${filledTrades.length} filled, ${cancelledCount} cancelled`}
          />
        </motion.div>

        {/* Row 2: Equity Curve */}
        <motion.div variants={itemVariants}>
          <GlassCard hover={false}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <h3 className="text-base font-semibold text-[var(--text-primary)]">
                  Portfolio Growth
                </h3>
                <LiveIndicator />
              </div>
              <ToggleGroup
                options={TIME_RANGES}
                value={portfolio.timeRange}
                onChange={(v) => portfolio.setTimeRange(v as TimeRange)}
              />
            </div>
            <EquityCurve data={portfolio.performanceData} />
          </GlassCard>
        </motion.div>

        {/* Row 3: Distribution Charts */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4"
        >
          <GlassCard hover={false}>
            <h3 className="text-base font-semibold text-[var(--text-primary)] mb-4">
              Win/Loss Distribution
            </h3>
            <WinLossChart
              wins={wins}
              losses={losses}
              winRate={summaryStats.winRate}
            />
          </GlassCard>

          <GlassCard hover={false}>
            <h3 className="text-base font-semibold text-[var(--text-primary)] mb-4">
              P/L by Instrument
            </h3>
            <PnLBarChart data={pnlByInstrument} />
          </GlassCard>
        </motion.div>

        {/* Row 4: Performance Metrics */}
        <motion.div variants={itemVariants}>
          <GlassCard hover={false}>
            <h3 className="text-base font-semibold text-[var(--text-primary)] mb-4">
              Performance Metrics
            </h3>
            <PerformanceMetrics metrics={metricsData} />
          </GlassCard>
        </motion.div>
      </motion.div>
    </PageWrapper>
  );
}
