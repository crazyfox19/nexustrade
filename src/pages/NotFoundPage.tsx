import { Link } from 'react-router-dom';
import { PageWrapper } from '@/components/shared/PageWrapper';
import { GlassCard } from '@/components/shared/GlassCard';
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <PageWrapper className="flex items-center justify-center min-h-[60vh]">
      <GlassCard className="max-w-md w-full text-center" hover={false}>
        <div className="text-6xl font-bold font-display bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent mb-4">
          404
        </div>
        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Page Not Found</h2>
        <p className="text-sm text-[var(--text-secondary)] mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg gradient-cyan-btn text-nexus-body text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          <Home className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </GlassCard>
    </PageWrapper>
  );
}
