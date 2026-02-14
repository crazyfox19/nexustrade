import type { PerformancePoint, AllocationItem, AssetHolding } from '@/types';

export const mockPerformanceData: PerformancePoint[] = [
  { date: '2023-09-24', timestamp: 1695571200000, value: 210000 },
  { date: '2023-09-25', timestamp: 1695657600000, value: 212400 },
  { date: '2023-09-26', timestamp: 1695744000000, value: 208900 },
  { date: '2023-09-27', timestamp: 1695830400000, value: 215200 },
  { date: '2023-09-28', timestamp: 1695916800000, value: 218700 },
  { date: '2023-09-29', timestamp: 1696003200000, value: 216300 },
  { date: '2023-09-30', timestamp: 1696089600000, value: 219800 },
  { date: '2023-10-01', timestamp: 1696176000000, value: 221500 },
  { date: '2023-10-02', timestamp: 1696262400000, value: 218200 },
  { date: '2023-10-03', timestamp: 1696348800000, value: 222800 },
  { date: '2023-10-04', timestamp: 1696435200000, value: 225100 },
  { date: '2023-10-05', timestamp: 1696521600000, value: 223400 },
  { date: '2023-10-06', timestamp: 1696608000000, value: 226900 },
  { date: '2023-10-07', timestamp: 1696694400000, value: 224200 },
  { date: '2023-10-08', timestamp: 1696780800000, value: 227500 },
  { date: '2023-10-09', timestamp: 1696867200000, value: 229800 },
  { date: '2023-10-10', timestamp: 1696953600000, value: 228100 },
  { date: '2023-10-11', timestamp: 1697040000000, value: 231400 },
  { date: '2023-10-12', timestamp: 1697126400000, value: 229700 },
  { date: '2023-10-13', timestamp: 1697212800000, value: 232900 },
  { date: '2023-10-14', timestamp: 1697299200000, value: 230500 },
  { date: '2023-10-15', timestamp: 1697385600000, value: 233800 },
  { date: '2023-10-16', timestamp: 1697472000000, value: 231200 },
  { date: '2023-10-17', timestamp: 1697558400000, value: 234500 },
  { date: '2023-10-18', timestamp: 1697644800000, value: 236800 },
  { date: '2023-10-19', timestamp: 1697731200000, value: 235100 },
  { date: '2023-10-20', timestamp: 1697817600000, value: 237400 },
  { date: '2023-10-21', timestamp: 1697904000000, value: 235800 },
  { date: '2023-10-22', timestamp: 1697990400000, value: 238200 },
  { date: '2023-10-23', timestamp: 1698076800000, value: 236700 },
  { date: '2023-10-24', timestamp: 1698163200000, value: 240500, change: 1.6 },
];

export const mockAllocationData: AllocationItem[] = [
  { name: 'Crypto Assets', value: 108225, percentage: 45, color: '#00D4FF' },
  { name: 'Tech Stocks', value: 72150, percentage: 30, color: '#7C3AED' },
  { name: 'Forex (EUR/USD)', value: 60125, percentage: 25, color: '#22C55E' },
];

export const mockHoldings: AssetHolding[] = [
  {
    id: 'btc-usd', symbol: 'BTC/USD', name: 'Bitcoin',
    allocation: 32.4, targetAllocation: 130, price: 64281.90,
    change24h: 1.82, value: 77938.00, quantity: 1.2125, iconColor: '#F59E0B',
  },
  {
    id: 'aapl', symbol: 'AAPL', name: 'Apple Inc.',
    allocation: 14.8, targetAllocation: 115, price: 189.43,
    change24h: -0.45, value: 35594.00, quantity: 187.9, iconColor: '#94A3B8',
  },
  {
    id: 'tsla', symbol: 'TSLA', name: 'Tesla Inc.',
    allocation: 8.2, targetAllocation: 110, price: 174.60,
    change24h: 3.14, value: 19721.00, quantity: 112.9, iconColor: '#94A3B8',
  },
  {
    id: 'eth-usd', symbol: 'ETH/USD', name: 'Ethereum',
    allocation: 18.5, targetAllocation: 120, price: 3421.10,
    change24h: -0.4, value: 44497.00, quantity: 13.0, iconColor: '#7C3AED',
  },
  {
    id: 'eur-usd', symbol: 'EUR/USD', name: 'Euro/US Dollar',
    allocation: 25.0, targetAllocation: 100, price: 1.0842,
    change24h: 0.05, value: 60125.00, quantity: 55450.0, iconColor: '#22C55E',
  },
  {
    id: 'sol-usd', symbol: 'SOL/USD', name: 'Solana',
    allocation: 1.1, targetAllocation: 105, price: 38.44,
    change24h: 19.56, value: 2625.00, quantity: 68.3, iconColor: '#22C55E',
  },
];
