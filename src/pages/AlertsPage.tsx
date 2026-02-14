import { PageWrapper } from '@/components/shared/PageWrapper';

export default function AlertsPage() {
  return (
    <PageWrapper>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">Alerts & Notifications</h2>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Manage your alerts and notification preferences</p>
        </div>
        <div className="glass-card p-8 flex items-center justify-center min-h-[400px]">
          <p className="text-[var(--text-muted)]">Alerts content coming in Phase 2</p>
        </div>
      </div>
    </PageWrapper>
  );
}
