import { create } from 'zustand';
import type { Alert, AlertCategory } from '@/types';
import { mockAlerts } from '@/data/mockAlerts';

interface AlertsState {
  alerts: Alert[];
  unreadCount: number;
  selectedCategory: AlertCategory;
  sortBy: 'most_recent' | 'severity';
  activityVolume: {
    tradeAlerts: number;
    marginEvents: number;
    securitySystem: number;
  };
  notificationSettings: {
    pushEnabled: boolean;
    emailDigests: boolean;
    criticalAudio: boolean;
  };
  markAllRead: () => void;
  acknowledgeAlert: (id: string) => void;
  dismissAlert: (id: string) => void;
  setCategory: (cat: AlertCategory) => void;
  setSortBy: (sort: 'most_recent' | 'severity') => void;
}

export const useAlertsStore = create<AlertsState>((set) => ({
  alerts: mockAlerts,
  unreadCount: 4,
  selectedCategory: 'all',
  sortBy: 'most_recent',
  activityVolume: {
    tradeAlerts: 128,
    marginEvents: 3,
    securitySystem: 12,
  },
  notificationSettings: {
    pushEnabled: true,
    emailDigests: false,
    criticalAudio: true,
  },
  markAllRead: () =>
    set((state) => ({
      alerts: state.alerts.map((a) => ({ ...a, isRead: true })),
      unreadCount: 0,
    })),
  acknowledgeAlert: (id) =>
    set((state) => ({
      alerts: state.alerts.map((a) => (a.id === id ? { ...a, isRead: true } : a)),
      unreadCount: Math.max(0, state.unreadCount - 1),
    })),
  dismissAlert: (id) =>
    set((state) => ({
      alerts: state.alerts.filter((a) => a.id !== id),
    })),
  setCategory: (selectedCategory) => set({ selectedCategory }),
  setSortBy: (sortBy) => set({ sortBy }),
}));
