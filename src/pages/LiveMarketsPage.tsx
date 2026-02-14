import { PageWrapper } from '@/components/shared/PageWrapper';

export default function LiveMarketsPage() {
  return (
    <PageWrapper>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">Live Markets</h2>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Real-time market data and watchlist</p>
        </div>
        <div className="glass-card p-8 flex items-center justify-center min-h-[400px]">
          <p className="text-[var(--text-muted)]">Live markets content coming in Phase 2</p>
        </div>
      </div>
    </PageWrapper>
  );
}
