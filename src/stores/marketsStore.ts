import { create } from 'zustand';
import type { MarketAsset, AssetClass, MarketViewMode } from '@/types';
import { mockMarketAssets } from '@/data/mockMarkets';

interface MarketsState {
  assets: MarketAsset[];
  totalAssets: number;
  watchlist: string[];
  category: 'all' | AssetClass;
  viewMode: MarketViewMode;
  searchQuery: string;
  volatilityFilter: number;
  priceRange: { min: number; max: number };
  topGainer: { asset: string; change: number };
  topLoser: { asset: string; change: number };
  volume24h: number;
  toggleWatchlist: (assetId: string) => void;
  setCategory: (cat: 'all' | AssetClass) => void;
  setViewMode: (mode: MarketViewMode) => void;
  setSearchQuery: (query: string) => void;
  setVolatilityFilter: (val: number) => void;
  setPriceRange: (range: { min: number; max: number }) => void;
}

export const useMarketsStore = create<MarketsState>((set) => ({
  assets: mockMarketAssets,
  totalAssets: 842,
  watchlist: ['btc-usd', 'eth-usd', 'aapl', 'tsla', 'eur-usd', 'sol-usd', 'nvda', 'gold', 'spy', 'amzn', 'googl', 'msft'],
  category: 'all',
  viewMode: 'standard',
  searchQuery: '',
  volatilityFilter: 50,
  priceRange: { min: 0, max: 100000 },
  topGainer: { asset: 'SOL/USD', change: 14.2 },
  topLoser: { asset: 'XRP/USD', change: -5.8 },
  volume24h: 1240000000,
  toggleWatchlist: (assetId) =>
    set((state) => ({
      watchlist: state.watchlist.includes(assetId)
        ? state.watchlist.filter((id) => id !== assetId)
        : [...state.watchlist, assetId],
    })),
  setCategory: (category) => set({ category }),
  setViewMode: (viewMode) => set({ viewMode }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setVolatilityFilter: (volatilityFilter) => set({ volatilityFilter }),
  setPriceRange: (priceRange) => set({ priceRange }),
}));
