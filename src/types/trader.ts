export type TraderBadge = 'VERIFIED' | 'ELITE' | 'AGGRESSIVE' | 'TOP 1%' | 'CONSERVATIVE';

export interface TraderProfile {
  id: string;
  name: string;
  avatar: string;
  badge: TraderBadge;
  badgeColor: string;
  subtitle: string;
  roi30d: number;
  riskScore: number;
  followers: string;
  sparklineData: number[];
  isFollowing: boolean;
}
