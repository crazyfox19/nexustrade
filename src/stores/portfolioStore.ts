import { create } from 'zustand';
import type { AssetHolding, AllocationItem, PerformancePoint, TimeRange } from '@/types';
import { mockPerformanceData, mockAllocationData, mockHoldings } from '@/data/mockPortfolio';

interface PortfolioState {
  totalEquity: number;
  availableBalance: number;
  buyingPower: number;
  marginHealth: number;
  marginUsed: number;
  marginLimit: number;
  dailyChange: number;
  avgEntry: number;
  realizedPnL: number;
  holdings: AssetHolding[];
  riskScore: number;
  allocationData: AllocationItem[];
  performanceData: PerformancePoint[];
  timeRange: TimeRange;
  setTimeRange: (range: TimeRange) => void;
  sentimentScore: number;
  sentimentLabel: string;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  totalEquity: 240500.0,
  availableBalance: 84120.45,
  buyingPower: 336481.80,
  marginHealth: 942,
  marginUsed: 12400,
  marginLimit: 150000,
  dailyChange: 4.25,
  avgEntry: 228410.0,
  realizedPnL: 12090.0,
  holdings: mockHoldings,
  riskScore: 64,
  allocationData: mockAllocationData,
  performanceData: mockPerformanceData,
  timeRange: '1D',
  setTimeRange: (range) => set({ timeRange: range }),
  sentimentScore: 78,
  sentimentLabel: 'Highly Bullish',
}));
