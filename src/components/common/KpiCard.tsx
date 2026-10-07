import React from 'react';
import { TrendingUp, TrendingDown, MoreHorizontal } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string;
  change: string;
  isPositive?: boolean;
  trendDirection?: 'up' | 'down';
  timeframe?: string;
  icon: React.ReactNode;
  iconBg?: string;
  isWarning?: boolean;
  onClickDetails?: () => void;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  trendDirection = 'up',
  timeframe = 'vs last month',
  icon,
  iconBg = 'bg-amber-50 text-amber-700',
  isWarning = false,
  onClickDetails
}) => {
  return (
    <div
      onClick={onClickDetails}
      className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-[#D4AF37] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${iconBg}`}>
            {icon}
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500 tracking-wide">{title}</div>
            <div className="text-2xl font-bold text-slate-900 tracking-tight font-mono tabular-nums mt-0.5">
              {value}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (onClickDetails) onClickDetails();
          }}
          className="text-slate-400 hover:text-slate-700 p-1 rounded-md hover:bg-slate-100 transition-colors"
          title="Metric options"
          aria-label={`Options for ${title}`}
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-semibold">
          {trendDirection === 'up' ? (
            <TrendingUp className={`w-3.5 h-3.5 ${isWarning ? 'text-rose-600' : isPositive ? 'text-emerald-600' : 'text-slate-600'}`} />
          ) : (
            <TrendingDown className={`w-3.5 h-3.5 ${isWarning ? 'text-rose-600' : isPositive ? 'text-emerald-600' : 'text-slate-600'}`} />
          )}
          <span className={isWarning ? 'text-rose-600' : isPositive ? 'text-emerald-600' : 'text-slate-600'}>
            {change}
          </span>
          <span className="text-slate-400 font-normal ml-1">{timeframe}</span>
        </div>

        {/* Mini Sparkline Visualization */}
        <div className="w-16 h-6">
          <svg viewBox="0 0 60 20" className="w-full h-full overflow-visible">
            <path
              d={
                isWarning
                  ? 'M 2 16 L 15 14 L 30 15 L 45 8 L 58 4'
                  : 'M 2 18 L 15 12 L 30 14 L 45 6 L 58 3'
              }
              fill="none"
              stroke={isWarning ? '#E11D48' : '#10B981'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
