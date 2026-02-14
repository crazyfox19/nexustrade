import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp } from 'lucide-react';
import { PageWrapper } from '@/components/shared/PageWrapper';
import { StatCard } from '@/components/shared/StatCard';
import { GlassCard } from '@/components/shared/GlassCard';
import { SearchInput } from '@/components/shared/SearchInput';
import { AnimatedCounter } from '@/components/shared/AnimatedCounter';
import { HoldingsTable } from '@/components/portfolio/HoldingsTable';
import { AllocationPieChart } from '@/components/portfolio/AllocationPieChart';
import { PerformanceLineChart } from '@/components/portfolio/PerformanceLineChart';
import { MarginHealthGauge } from '@/components/portfolio/MarginHealthGauge';
import { RiskSentimentCard } from '@/components/portfolio/RiskSentimentCard';
import { usePortfolioStore } from '@/stores';
import { containerVariants, itemVariants } from '@/lib/motion';
import type { AssetHolding } from '@/types';

type SortColumn = 'symbol' | 'quantity' | 'price' | 'value' | 'allocation' | 'change24h';

export default function AssetBreakdownPage() {
  const portfolio = usePortfolioStore();
  const [holdingsSearch, setHoldingsSearch] = useState('');
  const [sortColumn, setSortColumn] = useState<SortColumn>('value');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(column);
      setSortDir('desc');
    }
  };

  const filteredAndSorted = useMemo(() => {
    let result = portfolio.holdings;

    if (holdingsSearch.trim()) {
      const q = holdingsSearch.toLowerCase();
      result = result.filter(
        (h) =>
          h.symbol.toLowerCase().includes(q) || h.name.toLowerCase().includes(q)
      );
    }

    result = [...result].sort((a, b) => {
      const aVal = a[sortColumn as keyof AssetHolding];
      const bVal = b[sortColumn as keyof AssetHolding];
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDir === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      return sortDir === 'asc'
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number);
    });

    return result;
  }, [portfolio.holdings, holdingsSearch, sortColumn, sortDir]);

  const riskPct = portfolio.riskScore;
  const riskLabel =
    riskPct >= 75 ? 'High Risk' : riskPct >= 40 ? 'Moderate Risk' : 'Low Risk';

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
            Portfolio Analysis
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Asset breakdown and risk analysis
          </p>
        </motion.div>

        {/* Row 1: Summary Stats */}
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
            title="Realized P/L"
            value={portfolio.realizedPnL}
            prefix="$"
            decimals={2}
            icon={TrendingUp}
            valueColor="text-semantic-profit"
          />
          <GlassCard hover={false}>
            <span className="text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)]">
              Margin Health
            </span>
            <div className="mt-2">
              <MarginHealthGauge
                score={portfolio.marginHealth}
                maxScore={1000}
                marginUsed={portfolio.marginUsed}
                marginLimit={portfolio.marginLimit}
              />
            </div>
          </GlassCard>
          <GlassCard hover={false}>
            <span className="text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)]">
              Risk Score
            </span>
            <div className="flex items-baseline gap-1 mt-2 mb-3">
              <span className="text-2xl font-bold font-mono text-semantic-warning">
                <AnimatedCounter value={portfolio.riskScore} decimals={0} />
              </span>
              <span className="text-sm text-[var(--text-muted)]">/ 100</span>
            </div>
            <div className="h-1.5 rounded-full bg-semantic-warning/20">
              <div
                className="h-full rounded-full bg-semantic-warning transition-all duration-700"
                style={{ width: `${portfolio.riskScore}%` }}
              />
            </div>
            <p className="text-xs mt-2 text-[var(--text-secondary)]">{riskLabel}</p>
          </GlassCard>
        </motion.div>

        {/* Row 2: Holdings Table */}
        <motion.div variants={itemVariants}>
          <GlassCard hover={false}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <h3 className="text-base font-semibold text-[var(--text-primary)]">
                Holdings ({filteredAndSorted.length} assets)
              </h3>
              <SearchInput
                value={holdingsSearch}
                onChange={setHoldingsSearch}
                placeholder="Search assets..."
                className="sm:w-64"
              />
            </div>
            <HoldingsTable
              holdings={filteredAndSorted}
              sortColumn={sortColumn}
              sortDir={sortDir}
              onSort={handleSort}
            />
          </GlassCard>
        </motion.div>

        {/* Row 3: Allocation + Performance */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4"
        >
          <GlassCard hover={false}>
            <h3 className="text-base font-semibold text-[var(--text-primary)] mb-4">
              Asset Allocation
            </h3>
            <AllocationPieChart
              data={portfolio.allocationData}
              totalEquity={portfolio.totalEquity}
            />
          </GlassCard>

          <GlassCard hover={false}>
            <h3 className="text-base font-semibold text-[var(--text-primary)] mb-2">
              Performance
            </h3>
            <PerformanceLineChart
              data={portfolio.performanceData}
              timeRange={portfolio.timeRange}
              onTimeRangeChange={portfolio.setTimeRange}
            />
          </GlassCard>
        </motion.div>

        {/* Row 4: Risk & Sentiment Analysis */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4"
        >
          <GlassCard hover={false}>
            <h3 className="text-base font-semibold text-[var(--text-primary)] mb-4">
              Risk Analysis
            </h3>
            <RiskSentimentCard
              type="risk"
              score={portfolio.riskScore}
              maxScore={100}
              label={riskLabel}
              details={[
                { label: 'Diversification', value: 'Good' },
                { label: 'Concentration', value: '32.4% BTC' },
                { label: 'Margin Utilization', value: '8.3%' },
                { label: 'Win Rate', value: '68.4%' },
              ]}
            />
          </GlassCard>

          <GlassCard hover={false}>
            <h3 className="text-base font-semibold text-[var(--text-primary)] mb-4">
              Market Sentiment
            </h3>
            <RiskSentimentCard
              type="sentiment"
              score={portfolio.sentimentScore}
              maxScore={100}
              label={portfolio.sentimentLabel}
              details={[
                { label: 'Market Trend', value: 'Uptrend' },
                { label: 'Volatility Index', value: '18.4' },
                { label: 'Fear & Greed', value: '72 (Greed)' },
                { label: 'Social Sentiment', value: 'Bullish' },
              ]}
            />
          </GlassCard>
        </motion.div>
      </motion.div>
    </PageWrapper>
  );
}
