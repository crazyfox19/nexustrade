import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Wallet, ShieldCheck } from 'lucide-react';
import { PageWrapper } from '@/components/shared/PageWrapper';
import { StatCard } from '@/components/shared/StatCard';
import { GlassCard } from '@/components/shared/GlassCard';
import { LiveIndicator } from '@/components/shared/LiveIndicator';
import { ToggleGroup } from '@/components/shared/ToggleGroup';
import { PerformanceChart } from '@/components/dashboard/PerformanceChart';
import { HoldingsSummaryTable } from '@/components/dashboard/HoldingsSummaryTable';
import { AllocationDonut } from '@/components/dashboard/AllocationDonut';
import { QuickGlanceCard } from '@/components/dashboard/QuickGlanceCard';
import { usePortfolioStore, useTradesStore, useAlertsStore } from '@/stores';
import { containerVariants, itemVariants } from '@/lib/motion';
import { TIME_RANGES, ROUTES } from '@/lib/constants';
import type { TimeRange } from '@/types';

export default function DashboardPage() {
  const portfolio = usePortfolioStore();
  const trades = useTradesStore();
  const alerts = useAlertsStore();

  const dailyPnL = portfolio.totalEquity * (portfolio.dailyChange / 100);

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
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">Dashboard</h2>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Portfolio overview and market summary
          </p>
        </motion.div>

        {/* Row 1: Stat Cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <StatCard
            title="Total Equity"
            value={portfolio.totalEquity}
            prefix="$"
            decimals={2}
            icon={DollarSign}
            badge={`+${portfolio.dailyChange}%`}
            badgeColor="text-semantic-profit"
          />
          <StatCard
            title="Daily P/L"
            value={dailyPnL}
            prefix="$"
            decimals={2}
            icon={TrendingUp}
            valueColor="text-semantic-profit"
          />
          <StatCard
            title="Available Balance"
            value={portfolio.availableBalance}
            prefix="$"
            decimals={2}
            icon={Wallet}
          />
          <StatCard
            title="Buying Power"
            value={portfolio.buyingPower}
            prefix="$"
            decimals={2}
            icon={ShieldCheck}
            badge="4x leverage"
            badgeColor="text-neon-cyan"
          />
        </motion.div>

        {/* Row 2: Performance Chart */}
        <motion.div variants={itemVariants}>
          <GlassCard hover={false}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <h3 className="text-base font-semibold text-[var(--text-primary)]">
                  Portfolio Performance
                </h3>
                <LiveIndicator />
              </div>
              <ToggleGroup
                options={TIME_RANGES}
                value={portfolio.timeRange}
                onChange={(v) => portfolio.setTimeRange(v as TimeRange)}
              />
            </div>
            <PerformanceChart data={portfolio.performanceData} />
          </GlassCard>
        </motion.div>

        {/* Row 3: Holdings + Allocation */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-3 gap-4"
        >
          <GlassCard hover={false} className="lg:col-span-2">
            <h3 className="text-base font-semibold text-[var(--text-primary)] mb-4">
              Holdings ({portfolio.holdings.length} assets)
            </h3>
            <HoldingsSummaryTable holdings={portfolio.holdings} />
          </GlassCard>

          <GlassCard hover={false}>
            <h3 className="text-base font-semibold text-[var(--text-primary)] mb-4">
              Allocation
            </h3>
            <AllocationDonut data={portfolio.allocationData} />
          </GlassCard>
        </motion.div>

        {/* Row 4: Quick Glance Cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <QuickGlanceCard
            title="Win Rate"
            value={trades.summaryStats.winRate}
            suffix="%"
            color="green"
            subtitle={`${trades.summaryStats.profitFactor}x profit factor`}
          />
          <QuickGlanceCard
            title="Risk Score"
            value={portfolio.riskScore}
            suffix="/100"
            decimals={0}
            color="orange"
            progress={portfolio.riskScore}
          />
          <QuickGlanceCard
            title="Market Sentiment"
            value={portfolio.sentimentScore}
            suffix="/100"
            decimals={0}
            color="cyan"
            progress={portfolio.sentimentScore}
            subtitle={portfolio.sentimentLabel}
          />
          <QuickGlanceCard
            title="Unread Alerts"
            value={alerts.unreadCount}
            decimals={0}
            color="red"
            linkTo={ROUTES.ALERTS}
          />
        </motion.div>
      </motion.div>
    </PageWrapper>
  );
}
