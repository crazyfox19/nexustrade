export interface AssetHolding {
  id: string;
  symbol: string;
  name: string;
  allocation: number;
  targetAllocation: number;
  price: number;
  change24h: number;
  value: number;
  quantity: number;
  iconColor: string;
}

export interface PerformancePoint {
  date: string;
  timestamp: number;
  value: number;
  change?: number;
}

export interface AllocationItem {
  name: string;
  value: number;
  percentage: number;
  color: string;
}
