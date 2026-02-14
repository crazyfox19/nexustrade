import { PageWrapper } from '@/components/shared/PageWrapper';

export default function SupportPage() {
  return (
    <PageWrapper>
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">Support Center</h2>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Search 500+ articles, system documentation, or contact a specialist</p>
        </div>
        <div className="glass-card p-8 flex items-center justify-center min-h-[400px]">
          <p className="text-[var(--text-muted)]">Support content coming in Phase 2</p>
        </div>
      </div>
    </PageWrapper>
  );
}
