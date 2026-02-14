import { PageWrapper } from '@/components/shared/PageWrapper';

export default function CopyTradingPage() {
  return (
    <PageWrapper>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">Copy Trading Hub</h2>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Discover and replicate top-performing trading strategies</p>
        </div>
        <div className="glass-card p-8 flex items-center justify-center min-h-[400px]">
          <p className="text-[var(--text-muted)]">Copy trading content coming in Phase 2</p>
        </div>
      </div>
    </PageWrapper>
  );
}
