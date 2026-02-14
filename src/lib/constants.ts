import {
  LayoutDashboard,
  Briefcase,
  ArrowLeftRight,
  Clock,
  BarChart3,
  Users,
  Bell,
  Settings,
  HelpCircle,
} from "lucide-react";

export const ROUTES = {
  DASHBOARD: "/",
  PORTFOLIO: "/portfolio",
  TRADE: "/trade",
  HISTORY: "/history",
  ANALYTICS: "/analytics",
  COPY_TRADING: "/copy-trading",
  ALERTS: "/alerts",
  SETTINGS: "/settings",
  SUPPORT: "/support",
} as const;

export const NAV_ITEMS = [
  { path: ROUTES.DASHBOARD, label: "Dashboard", icon: LayoutDashboard },
  { path: ROUTES.PORTFOLIO, label: "Portfolio", icon: Briefcase },
  { path: ROUTES.TRADE, label: "Trade", icon: ArrowLeftRight },
  { path: ROUTES.HISTORY, label: "History", icon: Clock },
  { path: ROUTES.ANALYTICS, label: "Analytics", icon: BarChart3 },
  { path: ROUTES.COPY_TRADING, label: "Copy Trading", icon: Users },
  { path: ROUTES.ALERTS, label: "Alerts", icon: Bell },
] as const;

export const BOTTOM_NAV_ITEMS = [
  { path: ROUTES.SETTINGS, label: "Settings", icon: Settings },
  { path: ROUTES.SUPPORT, label: "Support", icon: HelpCircle },
] as const;

export const TIME_RANGES = ["1H", "1D", "1W", "1M", "ALL"] as const;
export const TIME_PERIODS = ["30D", "90D", "YTD", "ALL"] as const;

export const TICKER_ITEMS = [
  { symbol: "ETH/USDT", price: 3421.10, change: -0.4 },
  { symbol: "S&P 500", price: 5432.12, change: 0.12 },
  { symbol: "GOLD", price: 2341.20, change: 0.0 },
  { symbol: "EUR/USD", price: 1.0842, change: 0.05 },
  { symbol: "BTC/USDT", price: 64231.50, change: 2.1 },
] as const;

export const APP_NAME = "NexusTradr";
export const SIDEBAR_EXPANDED_WIDTH = 224;
export const SIDEBAR_COLLAPSED_WIDTH = 64;
export const HEADER_HEIGHT = 64;
export const TICKER_BAR_HEIGHT = 40;
