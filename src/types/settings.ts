export interface UserProfile {
  displayName: string;
  email: string;
  emailVerified: boolean;
  timezone: string;
  currency: string;
  tier: string;
  avatar?: string;
}

export interface SecuritySettings {
  accountStatus: string;
  twoFactorEnabled: boolean;
  lastLogin: string;
  lastLoginIP: string;
  hardwareKeyConfigured: boolean;
  loginNotifications: boolean;
  withdrawalWhitelist: boolean;
}

export interface NotificationPreference {
  eventType: string;
  email: boolean;
  push: boolean;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: string;
}
