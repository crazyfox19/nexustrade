import type { MarketAsset } from '@/types';

function generateSparkline(trend: 'up' | 'down' | 'flat', points = 20): number[] {
  const data: number[] = [];
  let val = 50;
  for (let i = 0; i < points; i++) {
    const drift = trend === 'up' ? 0.5 : trend === 'down' ? -0.5 : 0;
    val += drift + (Math.random() - 0.5) * 5;
    data.push(parseFloat(val.toFixed(2)));
  }
  return data;
}

const baseAssets: MarketAsset[] = [
  {
    id: 'btc-usd', symbol: 'BTC/USD', name: 'Bitcoin', assetClass: 'crypto',
    price: 64120.50, change24h: -2.14, volume: '45.2k BTC',
    bid: 64118.20, ask: 64121.80, marketCap: '$1.26T',
    sparklineData: generateSparkline('up'), iconColor: '#F59E0B', isWatchlisted: true,
  },
  {
    id: 'eth-usd', symbol: 'ETH/USD', name: 'Ethereum', assetClass: 'crypto',
    price: 3450.20, change24h: -1.05, volume: '281.5k ETH',
    bid: 3448.10, ask: 3451.30, marketCap: '$414.5B',
    sparklineData: generateSparkline('down'), iconColor: '#7C3AED', isWatchlisted: true,
  },
  {
    id: 'eur-usd', symbol: 'EUR/USD', name: 'Euro / US Dollar', assetClass: 'forex',
    price: 1.08244, change24h: -0.00, volume: 'Spread: 0.8',
    bid: 1.08243, ask: 1.08245,
    sparklineData: generateSparkline('flat'), iconColor: '#22C55E', isWatchlisted: true,
  },
  {
    id: 'tsla', symbol: 'TSLA', name: 'Tesla, Inc.', assetClass: 'stocks',
    price: 188.10, change24h: -3.10, volume: 'Mkt Cap: $598B',
    bid: 188.05, ask: 188.15, marketCap: '$598B',
    sparklineData: generateSparkline('up'), iconColor: '#94A3B8', isWatchlisted: true,
  },
];

function generateMoreAssets(): MarketAsset[] {
  const extras = [
    { id: 'sol-usd', symbol: 'SOL/USD', name: 'Solana', assetClass: 'crypto' as const, price: 38.44, change: 14.2, iconColor: '#22C55E' },
    { id: 'xrp-usd', symbol: 'XRP/USD', name: 'Ripple', assetClass: 'crypto' as const, price: 0.5842, change: -5.8, iconColor: '#64748B' },
    { id: 'aapl', symbol: 'AAPL', name: 'Apple Inc.', assetClass: 'stocks' as const, price: 182.31, change: -0.42, iconColor: '#94A3B8' },
    { id: 'nvda', symbol: 'NVDA', name: 'NVIDIA Corp.', assetClass: 'stocks' as const, price: 874.12, change: 2.45, iconColor: '#22C55E' },
    { id: 'gold', symbol: 'XAU/USD', name: 'Gold', assetClass: 'forex' as const, price: 2034.40, change: 0.08, iconColor: '#FBBF24' },
    { id: 'spy', symbol: 'SPY', name: 'S&P 500 ETF', assetClass: 'indices' as const, price: 5088.80, change: 0.45, iconColor: '#3B82F6' },
    { id: 'amzn', symbol: 'AMZN', name: 'Amazon.com', assetClass: 'stocks' as const, price: 178.25, change: 1.12, iconColor: '#F59E0B' },
    { id: 'googl', symbol: 'GOOGL', name: 'Alphabet Inc.', assetClass: 'stocks' as const, price: 141.80, change: -0.28, iconColor: '#3B82F6' },
    { id: 'msft', symbol: 'MSFT', name: 'Microsoft Corp.', assetClass: 'stocks' as const, price: 378.91, change: 0.65, iconColor: '#00D4FF' },
    { id: 'ada-usd', symbol: 'ADA/USD', name: 'Cardano', assetClass: 'crypto' as const, price: 0.3241, change: -1.82, iconColor: '#3B82F6' },
    { id: 'doge-usd', symbol: 'DOGE/USD', name: 'Dogecoin', assetClass: 'crypto' as const, price: 0.0812, change: 4.21, iconColor: '#FBBF24' },
    { id: 'gbp-usd', symbol: 'GBP/USD', name: 'British Pound', assetClass: 'forex' as const, price: 1.2184, change: 0.12, iconColor: '#7C3AED' },
    { id: 'jpy-usd', symbol: 'USD/JPY', name: 'US Dollar/Yen', assetClass: 'forex' as const, price: 149.82, change: -0.31, iconColor: '#EF4444' },
    { id: 'meta', symbol: 'META', name: 'Meta Platforms', assetClass: 'stocks' as const, price: 326.49, change: 1.87, iconColor: '#3B82F6' },
    { id: 'nflx', symbol: 'NFLX', name: 'Netflix Inc.', assetClass: 'stocks' as const, price: 412.30, change: -0.95, iconColor: '#EF4444' },
    { id: 'matic-usd', symbol: 'MATIC/USD', name: 'Polygon', assetClass: 'crypto' as const, price: 0.5621, change: 3.44, iconColor: '#7C3AED' },
    { id: 'avax-usd', symbol: 'AVAX/USD', name: 'Avalanche', assetClass: 'crypto' as const, price: 12.84, change: -2.31, iconColor: '#EF4444' },
    { id: 'link-usd', symbol: 'LINK/USD', name: 'Chainlink', assetClass: 'crypto' as const, price: 11.24, change: 5.67, iconColor: '#3B82F6' },
    { id: 'qqq', symbol: 'QQQ', name: 'Nasdaq 100 ETF', assetClass: 'indices' as const, price: 388.42, change: 0.78, iconColor: '#00D4FF' },
    { id: 'dia', symbol: 'DIA', name: 'Dow Jones ETF', assetClass: 'indices' as const, price: 338.15, change: -0.15, iconColor: '#F59E0B' },
  ];

  return extras.map((e) => ({
    id: e.id, symbol: e.symbol, name: e.name, assetClass: e.assetClass,
    price: e.price, change24h: e.change,
    volume: `${(Math.random() * 100).toFixed(1)}M`,
    bid: parseFloat((e.price * 0.9999).toFixed(4)),
    ask: parseFloat((e.price * 1.0001).toFixed(4)),
    sparklineData: generateSparkline(e.change > 0 ? 'up' : e.change < 0 ? 'down' : 'flat'),
    iconColor: e.iconColor,
    isWatchlisted: ['sol-usd', 'nvda', 'gold', 'spy', 'amzn', 'googl', 'msft'].includes(e.id),
  }));
}

export const mockMarketAssets: MarketAsset[] = [...baseAssets, ...generateMoreAssets()];
