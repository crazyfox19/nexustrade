export type AssetClass = 'crypto' | 'forex' | 'stocks' | 'indices';
export type MarketViewMode = 'standard' | 'compact';

export interface MarketAsset {
  id: string;
  symbol: string;
  name: string;
  assetClass: AssetClass;
  price: number;
  change24h: number;
  volume: string;
  bid: number;
  ask: number;
  spread?: number;
  marketCap?: string;
  sparklineData: number[];
  iconColor: string;
  isWatchlisted: boolean;
}

export interface MarketTopStat {
  label: string;
  asset: string;
  value: string;
  change: number;
}
