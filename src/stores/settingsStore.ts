import { create } from 'zustand';
import type { UserProfile, SecuritySettings, NotificationPreference } from '@/types';

interface SettingsState {
  profile: UserProfile;
  security: SecuritySettings;
  notifications: NotificationPreference[];
  updateProfile: (data: Partial<UserProfile>) => void;
  toggleSecurity: (key: keyof SecuritySettings) => void;
  toggleNotification: (eventType: string, channel: 'email' | 'push') => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  profile: {
    displayName: 'Alex Sterling',
    email: 'alex.sterling@tradenexus.io',
    emailVerified: true,
    timezone: '(GMT-05:00) Eastern Time (US & Canada)',
    currency: 'USD - United States Dollar',
    tier: 'PRO TRADER',
    avatar: '',
  },
  security: {
    accountStatus: 'FULLY VERIFIED',
    twoFactorEnabled: true,
    lastLogin: '2 Hours Ago',
    lastLoginIP: '192.168.1.1',
    hardwareKeyConfigured: false,
    loginNotifications: true,
    withdrawalWhitelist: false,
  },
  notifications: [
    { eventType: 'Trade Execution', email: true, push: true },
    { eventType: 'Price Alerts', email: false, push: true },
    { eventType: 'Margin Warnings', email: true, push: true },
    { eventType: 'System Updates', email: true, push: false },
    { eventType: 'Security Alerts', email: true, push: true },
    { eventType: 'Newsletter', email: false, push: false },
  ],
  updateProfile: (data) =>
    set((state) => ({ profile: { ...state.profile, ...data } })),
  toggleSecurity: (key) =>
    set((state) => {
      const val = state.security[key];
      if (typeof val !== 'boolean') return state;
      return { security: { ...state.security, [key]: !val } };
    }),
  toggleNotification: (eventType, channel) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.eventType === eventType ? { ...n, [channel]: !n[channel] } : n
      ),
    })),
}));
