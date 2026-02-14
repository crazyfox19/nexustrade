export type TradeType = 'BUY' | 'SELL';
export type TradeDirection = 'LONG' | 'SHORT';
export type TradeStatus = 'Filled' | 'Cancelled' | 'Pending' | 'Partial';

export interface Trade {
  id: string;
  date: string;
  time: string;
  timestamp: number;
  instrument: string;
  instrumentName: string;
  instrumentIcon: string;
  type: TradeType;
  direction: TradeDirection;
  size: number;
  sizeUnit: string;
  entryPrice: number;
  exitPrice: number;
  pnl: number;
  pnlPercentage: number;
  status: TradeStatus;
  fees?: number;
  duration?: string;
}

export interface TradeSummaryStats {
  winRate: number;
  totalNetPnL: number;
  avgDuration: string;
  profitFactor: number;
}
