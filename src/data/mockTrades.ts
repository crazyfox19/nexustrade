import type { Trade } from '@/types';

const baseTrades: Trade[] = [
  {
    id: 'trade-001', date: 'Oct 24, 2023', time: '14:22:10', timestamp: 1698163330000,
    instrument: 'BTC/USD', instrumentName: 'Bitcoin / US Dollar', instrumentIcon: '#F59E0B',
    type: 'BUY', direction: 'LONG', size: 1.45, sizeUnit: 'BTC',
    entryPrice: 34102.50, exitPrice: 35890.12, pnl: 2592.05, pnlPercentage: 5.24, status: 'Filled',
  },
  {
    id: 'trade-002', date: 'Oct 23, 2023', time: '09:15:44', timestamp: 1698058544000,
    instrument: 'ETH/USD', instrumentName: 'Ethereum / US Dollar', instrumentIcon: '#7C3AED',
    type: 'SELL', direction: 'SHORT', size: 12.0, sizeUnit: 'ETH',
    entryPrice: 1842.10, exitPrice: 1895.40, pnl: -639.60, pnlPercentage: -2.89, status: 'Filled',
  },
  {
    id: 'trade-003', date: 'Oct 22, 2023', time: '16:05:12', timestamp: 1697990712000,
    instrument: 'SOL/USD', instrumentName: 'Solana / US Dollar', instrumentIcon: '#22C55E',
    type: 'BUY', direction: 'LONG', size: 250.0, sizeUnit: 'SOL',
    entryPrice: 32.15, exitPrice: 38.44, pnl: 1572.50, pnlPercentage: 19.56, status: 'Filled',
  },
  {
    id: 'trade-004', date: 'Oct 20, 2023', time: '11:30:00', timestamp: 1697801400000,
    instrument: 'AAPL', instrumentName: 'Apple Inc. Equity', instrumentIcon: '#22C55E',
    type: 'SELL', direction: 'SHORT', size: 500.0, sizeUnit: 'Shares',
    entryPrice: 175.20, exitPrice: 175.20, pnl: 0.0, pnlPercentage: 0.0, status: 'Cancelled',
  },
  {
    id: 'trade-005', date: 'Oct 19, 2023', time: '16:45:11', timestamp: 1697733911000,
    instrument: 'TSLA', instrumentName: 'Tesla Inc. Equity', instrumentIcon: '#7C3AED',
    type: 'BUY', direction: 'LONG', size: 100.0, sizeUnit: 'Shares',
    entryPrice: 242.60, exitPrice: 258.12, pnl: 1552.00, pnlPercentage: 6.40, status: 'Filled',
  },
];

function generateTrades(): Trade[] {
  const instruments = [
    { symbol: 'BTC/USD', name: 'Bitcoin / US Dollar', icon: '#F59E0B', unit: 'BTC' },
    { symbol: 'ETH/USD', name: 'Ethereum / US Dollar', icon: '#7C3AED', unit: 'ETH' },
    { symbol: 'SOL/USD', name: 'Solana / US Dollar', icon: '#22C55E', unit: 'SOL' },
    { symbol: 'AAPL', name: 'Apple Inc. Equity', icon: '#22C55E', unit: 'Shares' },
    { symbol: 'TSLA', name: 'Tesla Inc. Equity', icon: '#7C3AED', unit: 'Shares' },
    { symbol: 'NVDA', name: 'NVIDIA Corp. Equity', icon: '#22C55E', unit: 'Shares' },
    { symbol: 'EUR/USD', name: 'Euro / US Dollar', icon: '#3B82F6', unit: 'Lots' },
    { symbol: 'GOOGL', name: 'Alphabet Inc. Equity', icon: '#3B82F6', unit: 'Shares' },
    { symbol: 'AMZN', name: 'Amazon.com Inc. Equity', icon: '#F59E0B', unit: 'Shares' },
    { symbol: 'XRP/USD', name: 'Ripple / US Dollar', icon: '#64748B', unit: 'XRP' },
  ];

  const generated: Trade[] = [];
  let timestamp = 1697647200000;

  for (let i = 6; i <= 248; i++) {
    const inst = instruments[i % instruments.length];
    const isBuy = Math.random() > 0.45;
    const entryPrice = Math.random() * 50000 + 10;
    const pnlPct = (Math.random() - 0.35) * 20;
    const exitPrice = entryPrice * (1 + pnlPct / 100);
    const size = Math.random() * 100 + 1;
    const pnl = (exitPrice - entryPrice) * size * (isBuy ? 1 : -1);
    timestamp -= Math.floor(Math.random() * 86400000);
    const d = new Date(timestamp);

    generated.push({
      id: `trade-${String(i).padStart(3, '0')}`,
      date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
      timestamp,
      instrument: inst.symbol,
      instrumentName: inst.name,
      instrumentIcon: inst.icon,
      type: isBuy ? 'BUY' : 'SELL',
      direction: isBuy ? 'LONG' : 'SHORT',
      size: parseFloat(size.toFixed(2)),
      sizeUnit: inst.unit,
      entryPrice: parseFloat(entryPrice.toFixed(2)),
      exitPrice: parseFloat(exitPrice.toFixed(2)),
      pnl: parseFloat(pnl.toFixed(2)),
      pnlPercentage: parseFloat(pnlPct.toFixed(2)),
      status: Math.random() > 0.08 ? 'Filled' : 'Cancelled',
    });
  }

  return generated;
}

export const mockTrades: Trade[] = [...baseTrades, ...generateTrades()];
