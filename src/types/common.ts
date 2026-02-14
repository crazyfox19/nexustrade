export type TimeRange = '1H' | '1D' | '1W' | '1M' | 'ALL';
export type TimePeriod = '30D' | '90D' | 'YTD' | 'ALL';
export type SortOrder = 'asc' | 'desc';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}
