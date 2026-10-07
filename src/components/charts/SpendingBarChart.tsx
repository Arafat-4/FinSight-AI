import React from 'react';
import { ShoppingBag, Utensils, Plane, Lightbulb, Film, MoreHorizontal } from 'lucide-react';
import { formatINR } from '../../services/dataService';

export interface SpendingCategoryItem {
  name: string;
  percentage: number;
  amount: number;
  color?: string;
}

interface SpendingBarChartProps {
  categories: SpendingCategoryItem[];
  title?: string;
}

export const SpendingBarChart: React.FC<SpendingBarChartProps> = ({
  categories,
  title = 'Top Spending Categories'
}) => {
  const getIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'shopping':
        return <ShoppingBag className="w-4 h-4 text-emerald-800" />;
      case 'food & dining':
        return <Utensils className="w-4 h-4 text-emerald-800" />;
      case 'travel':
        return <Plane className="w-4 h-4 text-amber-700" />;
      case 'utilities':
        return <Lightbulb className="w-4 h-4 text-amber-600" />;
      case 'entertainment':
        return <Film className="w-4 h-4 text-emerald-700" />;
      default:
        return <ShoppingBag className="w-4 h-4 text-slate-700" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-slate-900 tracking-tight">{title}</h3>
        <button
          type="button"
          className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-50 transition-colors"
          aria-label="Options"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {categories.map((cat, idx) => (
          <div key={idx} className="flex items-center justify-between gap-3 text-xs">
            {/* Category info */}
            <div className="flex items-center gap-2.5 w-32 shrink-0">
              <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                {getIcon(cat.name)}
              </div>
              <span className="font-medium text-slate-800 truncate">{cat.name}</span>
            </div>

            {/* Bar progress */}
            <div className="flex-1 flex items-center gap-2.5">
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#064E3B] transition-all duration-500"
                  style={{ width: `${(cat.percentage / 35) * 100}%` }}
                />
              </div>
              <span className="w-9 text-right font-mono font-medium text-slate-500 shrink-0">
                {cat.percentage}%
              </span>
            </div>

            {/* Formatted Currency Amount */}
            <div className="w-24 text-right font-mono tabular-nums font-bold text-slate-900 shrink-0">
              {formatINR(cat.amount)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
