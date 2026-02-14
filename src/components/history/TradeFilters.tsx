import { SearchInput } from '@/components/shared/SearchInput';
import { ToggleGroup } from '@/components/shared/ToggleGroup';
import { TIME_PERIODS } from '@/lib/constants';

const TRADE_TYPES = ['ALL', 'BUY', 'SELL'] as const;
const TRADE_STATUSES = ['ALL', 'FILLED', 'CANCELLED'] as const;

interface TradeFiltersProps {
  searchQuery: string;
  type: string;
  status: string;
  timePeriod: string;
  onSearchChange: (query: string) => void;
  onTypeChange: (type: string) => void;
  onStatusChange: (status: string) => void;
  onTimePeriodChange: (period: string) => void;
}

export function TradeFilters({
  searchQuery,
  type,
  status,
  timePeriod,
  onSearchChange,
  onTypeChange,
  onStatusChange,
  onTimePeriodChange,
}: TradeFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3">
      <SearchInput
        value={searchQuery}
        onChange={onSearchChange}
        placeholder="Search instruments..."
        className="w-full sm:w-56"
      />
      <ToggleGroup options={TRADE_TYPES} value={type} onChange={onTypeChange} />
      <ToggleGroup options={TRADE_STATUSES} value={status} onChange={onStatusChange} />
      <ToggleGroup options={TIME_PERIODS} value={timePeriod} onChange={onTimePeriodChange} />
    </div>
  );
}
