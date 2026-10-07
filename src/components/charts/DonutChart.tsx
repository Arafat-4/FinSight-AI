import React from 'react';
import { MoreHorizontal } from 'lucide-react';

export interface DonutSegment {
  name: string;
  percentage?: number;
  count?: number;
  color: string;
}

interface DonutChartProps {
  title: string;
  centerValue: string;
  centerLabel: string;
  segments: DonutSegment[];
  showLegendPercentages?: boolean;
}

export const DonutChart: React.FC<DonutChartProps> = ({
  title,
  centerValue,
  centerLabel,
  segments,
  showLegendPercentages = true
}) => {
  // Calculate SVG stroke-dasharray and stroke-dashoffset for each segment
  const radius = 64;
  const circumference = 2 * Math.PI * radius; // ~402.12

  // Total for percentage normalization if count is provided
  const totalCount = segments.reduce((acc, s) => acc + (s.count || 0), 0);

  let accumulatedPercent = 0;

  const segmentArcs = segments.map((seg) => {
    const pct = seg.percentage !== undefined ? seg.percentage : totalCount > 0 ? ((seg.count || 0) / totalCount) * 100 : 0;
    const strokeDash = (pct / 100) * circumference;
    const strokeOffset = circumference - (accumulatedPercent / 100) * circumference;
    accumulatedPercent += pct;

    return {
      ...seg,
      pct,
      strokeDash,
      strokeOffset
    };
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
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

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 my-auto py-2">
        {/* Donut SVG */}
        <div className="relative w-44 h-44 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
            {/* Background ring */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="#F1F5F9"
              strokeWidth="20"
              fill="transparent"
            />
            {/* Segment arcs */}
            {segmentArcs.map((arc, index) => (
              <circle
                key={index}
                cx="80"
                cy="80"
                r={radius}
                stroke={arc.color}
                strokeWidth="20"
                fill="transparent"
                strokeDasharray={`${arc.strokeDash} ${circumference}`}
                strokeDashoffset={-((accumulatedPercent - (arc.pct || 0)) / 100) * circumference}
                strokeLinecap="butt"
                className="transition-all duration-300"
              />
            ))}
          </svg>

          {/* Center text badge */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-xl font-extrabold text-slate-900 tracking-tight font-mono tabular-nums leading-none">
              {centerValue}
            </span>
            <span className="text-[11px] font-medium text-slate-500 mt-1">
              {centerLabel}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="w-full sm:w-auto flex-1 flex flex-col gap-2.5">
          {segments.map((seg, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs gap-3">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: seg.color }}
                />
                <span className="text-slate-600 font-medium">{seg.name}</span>
              </div>
              <span className="font-mono tabular-nums font-semibold text-slate-900">
                {showLegendPercentages && seg.percentage !== undefined
                  ? `${seg.percentage}%`
                  : seg.count !== undefined
                  ? seg.count.toLocaleString()
                  : ''}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
