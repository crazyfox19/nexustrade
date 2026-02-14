import { create } from 'zustand';
import type { Trade, TradeSummaryStats, TimePeriod, SortOrder } from '@/types';
import { mockTrades } from '@/data/mockTrades';

interface TradesFilters {
  dateRange: { start: string; end: string };
  timePeriod: TimePeriod;
  searchQuery: string;
  type: 'ALL' | 'BUY' | 'SELL';
  status: 'ALL' | 'FILLED' | 'CANCELLED';
}

interface TradesState {
  trades: Trade[];
  filters: TradesFilters;
  sortBy: string;
  sortOrder: SortOrder;
  page: number;
  pageSize: number;
  totalTrades: number;
  summaryStats: TradeSummaryStats;
  setFilters: (filters: Partial<TradesFilters>) => void;
  setSorting: (column: string) => void;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
}

export const useTradesStore = create<TradesState>((set) => ({
  trades: mockTrades,
  filters: {
    dateRange: { start: '2023-10-01', end: '2023-10-31' },
    timePeriod: '30D',
    searchQuery: '',
    type: 'ALL',
    status: 'ALL',
  },
  sortBy: 'date',
  sortOrder: 'desc',
  page: 1,
  pageSize: 25,
  totalTrades: 248,
  summaryStats: {
    winRate: 68.4,
    totalNetPnL: 48290.44,
    avgDuration: '4h 22m',
    profitFactor: 2.44,
  },
  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
  setSorting: (column) =>
    set((state) => ({
      sortBy: column,
      sortOrder: state.sortBy === column && state.sortOrder === 'asc' ? 'desc' : 'asc',
    })),
  setPage: (page) => set({ page }),
  setPageSize: (pageSize) => set({ pageSize, page: 1 }),
}));
