import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { MainLayout } from '@/components/layout/MainLayout';

const DashboardPage = lazy(() => import('@/pages/DashboardPage'));
const HistoricalTradesPage = lazy(() => import('@/pages/HistoricalTradesPage'));
const AssetBreakdownPage = lazy(() => import('@/pages/AssetBreakdownPage'));
const AnalyticsPage = lazy(() => import('@/pages/AnalyticsPage'));
const LiveMarketsPage = lazy(() => import('@/pages/LiveMarketsPage'));
const CopyTradingPage = lazy(() => import('@/pages/CopyTradingPage'));
const AlertsPage = lazy(() => import('@/pages/AlertsPage'));
const SettingsPage = lazy(() => import('@/pages/SettingsPage'));
const SupportPage = lazy(() => import('@/pages/SupportPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-2 border-neon-cyan border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export function AppRouter() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<MainLayout />}>
          <Route index element={<Suspense fallback={<PageLoader />}><DashboardPage /></Suspense>} />
          <Route path="/portfolio" element={<Suspense fallback={<PageLoader />}><AssetBreakdownPage /></Suspense>} />
          <Route path="/trade" element={<Suspense fallback={<PageLoader />}><LiveMarketsPage /></Suspense>} />
          <Route path="/history" element={<Suspense fallback={<PageLoader />}><HistoricalTradesPage /></Suspense>} />
          <Route path="/analytics" element={<Suspense fallback={<PageLoader />}><AnalyticsPage /></Suspense>} />
          <Route path="/copy-trading" element={<Suspense fallback={<PageLoader />}><CopyTradingPage /></Suspense>} />
          <Route path="/alerts" element={<Suspense fallback={<PageLoader />}><AlertsPage /></Suspense>} />
          <Route path="/settings" element={<Suspense fallback={<PageLoader />}><SettingsPage /></Suspense>} />
          <Route path="/support" element={<Suspense fallback={<PageLoader />}><SupportPage /></Suspense>} />
          <Route path="*" element={<Suspense fallback={<PageLoader />}><NotFoundPage /></Suspense>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
