import { useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';
import { NAV_ITEMS, BOTTOM_NAV_ITEMS } from '@/lib/constants';
import { useSettingsStore } from '@/stores';

const allNavItems = [...NAV_ITEMS, ...BOTTOM_NAV_ITEMS];

function getPageTitle(pathname: string): string {
  if (pathname === '/') return 'Portfolio Overview';
  const item = allNavItems.find((i) => i.path === pathname);
  return item?.label || 'Not Found';
}

export function Header() {
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);
  const profile = useSettingsStore((s) => s.profile);

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-nexus-secondary border-b border-[var(--bg-glass-border)] flex-shrink-0">
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold text-[var(--text-primary)]">{pageTitle}</h1>
        {location.pathname === '/' && (
          <p className="text-xs text-[var(--text-secondary)]">
            Welcome back, Alex. Your assets are performing{' '}
            <span className="text-semantic-profit">+4.2%</span> better today.
          </p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Search assets..."
            className="w-56 h-9 pl-9 pr-3 rounded-lg bg-[var(--bg-glass)] border border-[var(--bg-glass-border)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-neon-cyan/50 transition-colors"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-[var(--text-primary)]">{profile.displayName}</p>
            <p className="text-[11px] text-[var(--text-secondary)]">{profile.tier}</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center ring-2 ring-neon-cyan/30">
            <span className="text-sm font-bold text-white">
              {profile.displayName.split(' ').map((n) => n[0]).join('')}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
