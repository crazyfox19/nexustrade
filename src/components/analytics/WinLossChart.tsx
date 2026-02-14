import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface WinLossChartProps {
  wins: number;
  losses: number;
  winRate: number;
}

const COLORS = ['#22C55E', '#EF4444'];

export function WinLossChart({ wins, losses, winRate }: WinLossChartProps) {
  const data = [
    { name: 'Wins', value: wins },
    { name: 'Losses', value: losses },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <ResponsiveContainer width={220} height={220}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
              strokeWidth={0}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-white">{winRate.toFixed(1)}%</span>
          <span className="text-[11px] text-[var(--text-muted)]">Win Rate</span>
        </div>
      </div>

      <div className="flex items-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-semantic-profit" />
          <span className="text-xs text-[var(--text-secondary)]">
            Wins ({wins})
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-semantic-loss" />
          <span className="text-xs text-[var(--text-secondary)]">
            Losses ({losses})
          </span>
        </div>
      </div>
    </div>
  );
}
