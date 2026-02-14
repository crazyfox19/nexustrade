export type AlertSeverity = 'critical' | 'warning' | 'info' | 'success';
export type AlertCategory = 'all' | 'trade' | 'margin' | 'system';

export interface AlertAction {
  label: string;
  variant: 'primary' | 'secondary' | 'danger';
  onClick?: () => void;
}

export interface Alert {
  id: string;
  severity: AlertSeverity;
  category: AlertCategory;
  title: string;
  message: string;
  timestamp: string;
  source: string;
  isRead: boolean;
  actions?: AlertAction[];
  details?: Record<string, string>;
}
