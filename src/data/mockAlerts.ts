import type { Alert } from '@/types';

export const mockAlerts: Alert[] = [
  {
    id: 'alert-001', severity: 'critical', category: 'margin',
    title: 'CRITICAL: Margin Maintenance Warning',
    message: 'Your equity has dropped below the maintenance margin requirement for your open positions in BTC/USD. To avoid potential liquidation, please deposit funds or reduce your position size immediately.',
    timestamp: '2023-10-24T10:45:00Z', source: 'ACCOUNT-89021', isRead: false,
    actions: [
      { label: 'DEPOSIT FUNDS', variant: 'danger' },
      { label: 'ADJUST POSITION', variant: 'secondary' },
    ],
  },
  {
    id: 'alert-002', severity: 'info', category: 'trade',
    title: 'Order Fully Executed: Buy AAPL',
    message: 'Your limit buy order for AAPL has been fully executed.',
    timestamp: '2023-10-24T09:30:00Z', source: 'SPOT TRADING', isRead: false,
    details: { ASSET: 'AAPL : NASDAQ', PRICE: '$189.42', QUANTITY: '50.00' },
  },
  {
    id: 'alert-003', severity: 'info', category: 'system',
    title: 'System Maintenance Completed',
    message: 'Weekly database optimization and server patching have been successfully completed. You may notice improved latency in order execution across all derivatives.',
    timestamp: '2023-10-23T02:00:00Z', source: 'INFRASTRUCTURE', isRead: true,
  },
  {
    id: 'alert-004', severity: 'warning', category: 'trade',
    title: 'Price Alert: ETH/USD Below Threshold',
    message: 'ETH/USD has dropped below your set alert price of $3,400. Current price: $3,380.50.',
    timestamp: '2023-10-24T08:15:00Z', source: 'PRICE MONITOR', isRead: false,
  },
  {
    id: 'alert-005', severity: 'success', category: 'trade',
    title: 'Take Profit Triggered: SOL/USD',
    message: 'Your take profit order for SOL/USD at $38.50 has been triggered. Position closed with +19.56% profit.',
    timestamp: '2023-10-22T16:10:00Z', source: 'ORDER ENGINE', isRead: true,
  },
];
