import { create } from 'zustand';
import type { TraderProfile } from '@/types';
import { mockTraders } from '@/data/mockTraders';

type FilterTab = 'top_roi' | 'lowest_risk' | 'most_popular';
type CopyTimeRange = '24H' | '7D' | '30D' | 'ALL';

interface CopyTradingState {
  traders: TraderProfile[];
  platformStats: {
    totalValueCopied: number;
    activeTraders: number;
    avgDailyROI: number;
    globalSuccessRate: number;
  };
  filterTab: FilterTab;
  timeRange: CopyTimeRange;
  searchQuery: string;
  selectedTrader: TraderProfile | null;
  setFilterTab: (tab: FilterTab) => void;
  setTimeRange: (range: CopyTimeRange) => void;
  setSearchQuery: (query: string) => void;
  selectTrader: (trader: TraderProfile | null) => void;
}

export const useCopyTradingStore = create<CopyTradingState>((set) => ({
  traders: mockTraders,
  platformStats: {
    totalValueCopied: 12450800,
    activeTraders: 4128,
    avgDailyROI: 2.45,
    globalSuccessRate: 89.4,
  },
  filterTab: 'top_roi',
  timeRange: '30D',
  searchQuery: '',
  selectedTrader: null,
  setFilterTab: (filterTab) => set({ filterTab }),
  setTimeRange: (timeRange) => set({ timeRange }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  selectTrader: (selectedTrader) => set({ selectedTrader }),
}));
