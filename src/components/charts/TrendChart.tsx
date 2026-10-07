import React, { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { formatCompactINR, formatINR } from '../../services/dataService';

interface TrendDataPoint {
  date: string;
  count: number;
  amount: number;
}

interface TrendChartProps {
  data: TrendDataPoint[];
  title?: string;
}

export const TrendChart: React.FC<TrendChartProps> = ({
  data,
  title = 'Transaction Trend'
}) => {
  const [activePoint, setActivePoint] = useState<TrendDataPoint | null>(null);

  const maxCount = 2000;
  const maxAmount = 450000;
  const chartHeight = 220;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
        <h3 className="text-base font-bold text-slate-900 tracking-tight">{title}</h3>

        <div className="flex items-center gap-5 text-xs font-medium">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#064E3B]" />
            <span className="text-slate-600">Transaction Count</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]" />
            <span className="text-slate-600">Transaction Amount</span>
          </div>
          <button
            type="button"
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-50 transition-colors ml-1"
            aria-label="Options"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* SVG Chart with Dual-Axis Grid */}
      <div className="relative w-full">
        <svg
          viewBox="0 0 700 240"
          className="w-full h-auto overflow-visible select-none"
          preserveAspectRatio="none"
        >
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
            const y = chartHeight - pct * (chartHeight - 40);
            return (
              <g key={idx}>
                <line
                  x1="50"
                  y1={y}
                  x2="650"
                  y2={y}
                  stroke="#F1F5F9"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                {/* Left Axis Labels (Transaction Count) */}
                <text
                  x="42"
                  y={y + 4}
                  textAnchor="end"
                  fontSize="10"
                  fill="#94A3B8"
                  fontFamily="monospace"
                >
                  {Math.round(pct * maxCount).toLocaleString()}
                </text>
                {/* Right Axis Labels (Amount) */}
                <text
                  x="658"
                  y={y + 4}
                  textAnchor="start"
                  fontSize="10"
                  fill="#94A3B8"
                  fontFamily="monospace"
                >
                  {formatCompactINR(pct * maxAmount)}
                </text>
              </g>
            );
          })}

          {/* Bar Chart (Transaction Count in Emerald Green) */}
          {data.map((item, index) => {
            const xCenter = 95 + index * 90;
            const barWidth = 26;
            const barHeight = (item.count / maxCount) * (chartHeight - 40);
            const yPos = chartHeight - barHeight;

            return (
              <g
                key={index}
                className="cursor-pointer transition-opacity hover:opacity-90"
                onMouseEnter={() => setActivePoint(item)}
                onMouseLeave={() => setActivePoint(null)}
              >
                <rect
                  x={xCenter - barWidth / 2}
                  y={yPos}
                  width={barWidth}
                  height={barHeight}
                  rx="4"
                  fill="#064E3B"
                  className="transition-all duration-200"
                />
                {/* X-Axis Tick Label */}
                <text
                  x={xCenter}
                  y={chartHeight + 18}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#64748B"
                  fontWeight="500"
                >
                  {item.date}
                </text>
              </g>
            );
          })}

          {/* Golden Line & Point overlay (Transaction Amount) */}
          <path
            d={data
              .map((item, index) => {
                const x = 95 + index * 90;
                const y = chartHeight - (item.amount / maxAmount) * (chartHeight - 40);
                return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
              })
              .join(' ')}
            fill="none"
            stroke="#D4AF37"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {data.map((item, index) => {
            const x = 95 + index * 90;
            const y = chartHeight - (item.amount / maxAmount) * (chartHeight - 40);
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="5"
                fill="#FFFFFF"
                stroke="#D4AF37"
                strokeWidth="2.5"
                className="cursor-pointer hover:r-6 transition-all"
                onMouseEnter={() => setActivePoint(item)}
                onMouseLeave={() => setActivePoint(null)}
              />
            );
          })}
        </svg>

        {/* Hover Tooltip */}
        {activePoint && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-3.5 py-2 rounded-xl shadow-xl border border-slate-700 pointer-events-none flex items-center gap-4 z-20">
            <span className="font-semibold text-emerald-400">{activePoint.date}</span>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Transactions:</span>
              <span className="font-mono tabular-nums font-bold text-white">
                {activePoint.count.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Amount:</span>
              <span className="font-mono tabular-nums font-bold text-[#F3E5AB]">
                {formatINR(activePoint.amount)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
