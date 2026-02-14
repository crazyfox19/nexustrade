import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { TickerBar } from './TickerBar';

export function MainLayout() {
  const location = useLocation();
  const showTickerBar = location.pathname === '/';

  return (
    <div className="flex h-screen overflow-hidden bg-nexus-body">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

        {showTickerBar && <TickerBar />}
      </div>
    </div>
  );
}
