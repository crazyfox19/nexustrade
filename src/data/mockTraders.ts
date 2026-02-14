import type { TraderProfile } from '@/types';

export const mockTraders: TraderProfile[] = [
  {
    id: 'trader-001', name: 'Alex "Crypto" Chen', avatar: '',
    badge: 'VERIFIED', badgeColor: '#22C55E', subtitle: 'Master Scalper',
    roi30d: 145.2, riskScore: 4, followers: '2.4k',
    sparklineData: [20, 25, 22, 30, 35, 32, 40, 45, 42, 50, 55, 60],
    isFollowing: false,
  },
  {
    id: 'trader-002', name: 'Sarah Volatility', avatar: '',
    badge: 'ELITE', badgeColor: '#3B82F6', subtitle: 'Swing Specialist',
    roi30d: 82.9, riskScore: 2, followers: '1.8k',
    sparklineData: [30, 32, 35, 33, 38, 40, 42, 41, 45, 48, 50, 52],
    isFollowing: false,
  },
  {
    id: 'trader-003', name: 'Marco Polo', avatar: '',
    badge: 'AGGRESSIVE', badgeColor: '#F59E0B', subtitle: 'Altcoin Hunter',
    roi30d: 210.5, riskScore: 8, followers: '5.1k',
    sparklineData: [10, 20, 15, 35, 25, 45, 30, 55, 40, 65, 50, 70],
    isFollowing: false,
  },
  {
    id: 'trader-004', name: 'Elena Sterling', avatar: '',
    badge: 'TOP 1%', badgeColor: '#EF4444', subtitle: 'Forex Master',
    roi30d: 12.4, riskScore: 1, followers: '12k',
    sparklineData: [40, 41, 42, 41, 43, 44, 43, 45, 44, 46, 45, 47],
    isFollowing: false,
  },
];
