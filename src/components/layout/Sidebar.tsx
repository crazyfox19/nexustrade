import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAV_ITEMS, BOTTOM_NAV_ITEMS, SIDEBAR_EXPANDED_WIDTH, SIDEBAR_COLLAPSED_WIDTH } from '@/lib/constants';
import { useUIStore } from '@/stores';
import { useAlertsStore } from '@/stores';

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar, sidebarOpen, closeSidebar } = useUIStore();
  const unreadCount = useAlertsStore((s) => s.unreadCount);
  const location = useLocation();

  return (
    <>
      {/* Mobile backdrop — only when sidebar is open on small screens */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      <motion.aside
        className={cn(
          // Mobile: fixed, off-screen by default, slides in when open
          'fixed left-0 top-0 h-full z-50 bg-nexus-tertiary border-r border-[var(--bg-glass-border)] flex flex-col',
          'transition-transform duration-300 ease-in-out',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          // Desktop: in-flow, always visible, no translate
          'lg:relative lg:z-auto lg:translate-x-0'
        )}
        animate={{ width: sidebarCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_EXPANDED_WIDTH }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="h-16 flex items-center px-4 border-b border-[var(--bg-glass-border)]">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-neon-green/20 flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-neon-green" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </div>
            {!sidebarCollapsed && (
              <motion.span
                className="text-sm font-bold whitespace-nowrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <span className="text-white">NEXUS</span>
                <span className="text-neon-green">TRADR</span>
              </motion.span>
            )}
          </div>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1 px-2">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              const isAlerts = item.label === 'Alerts';

              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={closeSidebar}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 relative group',
                      isActive
                        ? 'bg-neon-cyan/10 text-neon-cyan'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
                    )}
                  >
                    {isActive && (
                      <motion.div
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r-full bg-neon-cyan"
                        layoutId="sidebar-active"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!sidebarCollapsed && (
                      <motion.span
                        className="whitespace-nowrap"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.05 }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                    {isAlerts && unreadCount > 0 && (
                      <span className={cn(
                        'flex items-center justify-center rounded-full bg-neon-cyan text-nexus-body text-[10px] font-bold',
                        sidebarCollapsed ? 'absolute -top-0.5 -right-0.5 w-4 h-4' : 'ml-auto w-5 h-5'
                      )}>
                        {unreadCount}
                      </span>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="py-4 px-2 border-t border-[var(--bg-glass-border)]">
          <ul className="space-y-1">
            {BOTTOM_NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={closeSidebar}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'bg-neon-cyan/10 text-neon-cyan'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]'
                    )}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!sidebarCollapsed && (
                      <motion.span
                        className="whitespace-nowrap"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.05 }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>

          {/* Collapse toggle — desktop only */}
          <button
            onClick={toggleSidebar}
            className="hidden lg:flex w-full items-center gap-3 px-3 py-2.5 mt-2 rounded-lg text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] transition-all duration-200"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-5 h-5 flex-shrink-0" />
            ) : (
              <>
                <ChevronLeft className="w-5 h-5 flex-shrink-0" />
                <span className="whitespace-nowrap">Collapse</span>
              </>
            )}
          </button>
        </div>
      </motion.aside>
    </>
  );
}
