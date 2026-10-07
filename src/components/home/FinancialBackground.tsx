import React from 'react';

interface FinancialBackgroundProps {
  className?: string;
  isFixed?: boolean;
}

export const FinancialBackground: React.FC<FinancialBackgroundProps> = ({
  className = '',
  isFixed = false
}) => {
  return (
    <div
      className={`${isFixed ? 'fixed' : 'absolute'} inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* Dynamic Ambient Green & Gold Radial Lighting */}
      <div className="absolute -top-32 left-1/4 w-[800px] h-[800px] bg-[#064E3B]/25 rounded-full blur-[140px]" />
      <div className="absolute top-[22%] -right-32 w-[700px] h-[700px] bg-[#D4AF37]/14 rounded-full blur-[150px]" />
      <div className="absolute top-[48%] -left-32 w-[750px] h-[750px] bg-[#0B5D44]/22 rounded-full blur-[160px]" />
      <div className="absolute top-[72%] right-1/4 w-[850px] h-[850px] bg-[#D4AF37]/12 rounded-full blur-[160px]" />
      <div className="absolute bottom-10 left-1/3 w-[900px] h-[900px] bg-[#064E3B]/20 rounded-full blur-[170px]" />

      {/* High-Resolution Vector Financial Canvas (Pure Emerald Green & Gold) */}
      <svg
        className="w-full h-full opacity-40"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1600 2800"
        preserveAspectRatio="xMidYMin slice"
      >
        <defs>
          {/* Emerald & Gold Coordinate Grid */}
          <pattern id="finGridEmeraldGold" width="90" height="90" patternUnits="userSpaceOnUse">
            <path
              d="M 90 0 L 0 0 0 90"
              fill="none"
              stroke="#10B981"
              strokeWidth="0.4"
              strokeOpacity="0.22"
            />
            <circle cx="90" cy="0" r="1.5" fill="#D4AF37" fillOpacity="0.4" />
            <circle cx="0" cy="90" r="1" fill="#10B981" fillOpacity="0.3" />
          </pattern>

          {/* Gradients */}
          <linearGradient id="emeraldBarGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#064E3B" stopOpacity="0.75" />
          </linearGradient>

          <linearGradient id="goldBarGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F3E5AB" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Global Coordinate Grid */}
        <rect width="100%" height="100%" fill="url(#finGridEmeraldGold)" />

        {/* ================= CLUSTER 1: HERO & TOP MARKET DATA (Y: 0 - 600) ================= */}
        {/* Top Financial Ticker Stream */}
        <g fontFamily="monospace" fontSize="12" fontWeight="700" fill="#D4AF37" fillOpacity="0.5">
          <text x="60" y="45">NIFTY 50 25,120.50 ▲ +0.94%</text>
          <text x="360" y="45">S&P 500 5,845.20 ▲ +0.78%</text>
          <text x="660" y="45">NASDAQ 18,290.40 ▲ +1.42%</text>
          <text x="1000" y="45">HDFC ₹1,682.40 ▲ +1.15%</text>
          <text x="1300" y="45">INFY ₹1,942.10 ▲ +1.35%</text>
        </g>

        {/* Candlestick Group 1 (Left - Bullish Emerald & Gold Pullback) */}
        <g stroke="#10B981" strokeWidth="1.2">
          {/* Candle 1 */}
          <line x1="70" y1="110" x2="70" y2="230" stroke="#10B981" strokeOpacity="0.8" />
          <rect x="63" y="130" width="14" height="65" rx="2" fill="url(#emeraldBarGrad)" />

          {/* Candle 2 */}
          <line x1="110" y1="80" x2="110" y2="260" stroke="#10B981" strokeOpacity="0.8" />
          <rect x="103" y="105" width="14" height="95" rx="2" fill="url(#emeraldBarGrad)" />

          {/* Candle 3 - Gold Pullback */}
          <line x1="150" y1="120" x2="150" y2="280" stroke="#D4AF37" strokeOpacity="0.8" />
          <rect x="143" y="145" width="14" height="60" rx="2" fill="url(#goldBarGrad)" />

          {/* Candle 4 */}
          <line x1="190" y1="70" x2="190" y2="240" stroke="#10B981" strokeOpacity="0.8" />
          <rect x="183" y="85" width="14" height="105" rx="2" fill="url(#emeraldBarGrad)" />

          {/* Candle 5 */}
          <line x1="230" y1="50" x2="230" y2="190" stroke="#10B981" strokeOpacity="0.8" />
          <rect x="223" y="65" width="14" height="75" rx="2" fill="url(#emeraldBarGrad)" />
        </g>

        {/* Candlestick Group 2 (Right - Ascent) */}
        <g stroke="#D4AF37" strokeWidth="1.2">
          <line x1="1370" y1="130" x2="1370" y2="290" stroke="#10B981" strokeOpacity="0.8" />
          <rect x="1363" y="155" width="14" height="90" rx="2" fill="url(#emeraldBarGrad)" />

          <line x1="1410" y1="100" x2="1410" y2="260" stroke="#D4AF37" strokeOpacity="0.8" />
          <rect x="1403" y="125" width="14" height="75" rx="2" fill="url(#goldBarGrad)" />

          <line x1="1450" y1="75" x2="1450" y2="235" stroke="#10B981" strokeOpacity="0.8" />
          <rect x="1443" y="90" width="14" height="105" rx="2" fill="url(#emeraldBarGrad)" />

          <line x1="1490" y1="55" x2="1490" y2="205" stroke="#D4AF37" strokeOpacity="0.8" />
          <rect x="1483" y="70" width="14" height="85" rx="2" fill="url(#goldBarGrad)" />
        </g>

        {/* Currency Watermarks - Rupee, Dollar, Euro, Pound, Percent */}
        <text x="60" y="380" fontSize="110" fontFamily="monospace" fontWeight="bold" fill="#D4AF37" fillOpacity="0.16">
          ₹
        </text>
        <text x="1410" y="380" fontSize="100" fontFamily="monospace" fontWeight="bold" fill="#10B981" fillOpacity="0.14">
          $
        </text>
        <text x="320" y="270" fontSize="68" fontFamily="monospace" fontWeight="bold" fill="#D4AF37" fillOpacity="0.11">
          %
        </text>
        <text x="1180" y="250" fontSize="74" fontFamily="monospace" fontWeight="bold" fill="#F3E5AB" fillOpacity="0.1">
          €
        </text>

        {/* Dynamic Curved Trend Lines in Hero */}
        <path
          d="M -50 430 Q 240 280, 540 390 T 1100 320 T 1650 250"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="2.2"
          strokeDasharray="9 7"
          strokeOpacity="0.55"
        />
        <path
          d="M -50 510 Q 380 580, 800 440 T 1440 500 T 1650 420"
          fill="none"
          stroke="#10B981"
          strokeWidth="2"
          strokeDasharray="7 9"
          strokeOpacity="0.45"
        />

        {/* ================= CLUSTER 2: MID-PAGE PIPELINE & NODES (Y: 600 - 1500) ================= */}
        {/* Network Nodes with Data Flow Lines (Emerald & Gold) */}
        <g stroke="#10B981" strokeWidth="1.2" strokeOpacity="0.38">
          <line x1="200" y1="780" x2="380" y2="880" />
          <line x1="380" y1="880" x2="560" y2="810" />
          <line x1="560" y1="810" x2="740" y2="920" />
          <line x1="740" y1="920" x2="940" y2="840" />
          <line x1="940" y1="840" x2="1140" y2="930" />
          <line x1="1140" y1="930" x2="1340" y2="850" />
          <line x1="1340" y1="850" x2="1500" y2="940" />

          {/* Node Rings */}
          <circle cx="200" cy="780" r="6" fill="#022C22" stroke="#D4AF37" strokeWidth="2.5" />
          <circle cx="380" cy="880" r="7" fill="#10B981" fillOpacity="0.8" />
          <circle cx="560" cy="810" r="6" fill="#022C22" stroke="#10B981" strokeWidth="2.5" />
          <circle cx="740" cy="920" r="8" fill="#D4AF37" fillOpacity="0.85" />
          <circle cx="940" cy="840" r="6" fill="#022C22" stroke="#D4AF37" strokeWidth="2.5" />
          <circle cx="1140" cy="930" r="8" fill="#10B981" fillOpacity="0.8" />
          <circle cx="1340" cy="850" r="6" fill="#022C22" stroke="#10B981" strokeWidth="2.5" />
          <circle cx="1500" cy="940" r="7" fill="#D4AF37" fillOpacity="0.85" />
        </g>

        {/* Currency Glyphs Mid-Page */}
        <text x="100" y="1120" fontSize="130" fontFamily="monospace" fontWeight="bold" fill="#10B981" fillOpacity="0.12">
          $
        </text>
        <text x="1360" y="1180" fontSize="140" fontFamily="monospace" fontWeight="bold" fill="#D4AF37" fillOpacity="0.14">
          ₹
        </text>
        <text x="260" y="1320" fontSize="84" fontFamily="monospace" fontWeight="bold" fill="#D4AF37" fillOpacity="0.1">
          %
        </text>
        <text x="1220" y="1360" fontSize="96" fontFamily="monospace" fontWeight="bold" fill="#10B981" fillOpacity="0.1">
          €
        </text>

        {/* Ticker Stream Mid-Page */}
        <g fontFamily="monospace" fontSize="12" fontWeight="700" fill="#F3E5AB" fillOpacity="0.45">
          <text x="90" y="1220">FINSIGHT CORE PIPELINE // HIGH VELOCITY RECONCILIATION</text>
          <text x="640" y="1220">AAPL $234.80 ▲ +2.10%</text>
          <text x="980" y="1220">HDFC ₹1,682.40 ▲ +1.15%</text>
          <text x="1320" y="1220">VOL: 30,000 TXNS</text>
        </g>

        {/* Mid-Page Candlesticks */}
        <g stroke="#10B981" strokeWidth="1.2">
          <line x1="80" y1="1400" x2="80" y2="1530" stroke="#10B981" strokeOpacity="0.8" />
          <rect x="73" y="1425" width="14" height="75" rx="2" fill="url(#emeraldBarGrad)" />

          <line x1="120" y1="1370" x2="120" y2="1550" stroke="#10B981" strokeOpacity="0.8" />
          <rect x="113" y="1395" width="14" height="100" rx="2" fill="url(#emeraldBarGrad)" />

          <line x1="160" y1="1420" x2="160" y2="1570" stroke="#D4AF37" strokeOpacity="0.8" />
          <rect x="153" y="1445" width="14" height="70" rx="2" fill="url(#goldBarGrad)" />
        </g>

        {/* ================= CLUSTER 3: LOWER SECTIONS (Y: 1600 - 2800) ================= */}
        {/* Stepped Analytical Bars in Lower Right */}
        <g fill="url(#emeraldBarGrad)">
          <rect x="1320" y="1720" width="18" height="60" rx="3" />
          <rect x="1348" y="1680" width="18" height="100" rx="3" fill="url(#emeraldBarGrad)" />
          <rect x="1376" y="1640" width="18" height="140" rx="3" fill="url(#goldBarGrad)" />
          <rect x="1404" y="1590" width="18" height="190" rx="3" fill="url(#emeraldBarGrad)" />
          <rect x="1432" y="1540" width="18" height="240" rx="3" fill="url(#goldBarGrad)" />
        </g>

        {/* Lower Wave Flow */}
        <path
          d="M -50 1880 Q 320 1720, 700 1860 T 1300 1790 T 1650 1720"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="2.2"
          strokeDasharray="10 8"
          strokeOpacity="0.5"
        />
        <path
          d="M -50 2050 Q 440 2160, 920 2020 T 1480 2090 T 1650 1980"
          fill="none"
          stroke="#10B981"
          strokeWidth="1.8"
          strokeOpacity="0.4"
        />

        {/* Lower Large Watermarks */}
        <text x="120" y="2100" fontSize="160" fontFamily="monospace" fontWeight="bold" fill="#D4AF37" fillOpacity="0.14">
          ₹
        </text>
        <text x="1340" y="2280" fontSize="170" fontFamily="monospace" fontWeight="bold" fill="#10B981" fillOpacity="0.12">
          $
        </text>
        <text x="740" y="2440" fontSize="120" fontFamily="monospace" fontWeight="bold" fill="#F3E5AB" fillOpacity="0.1">
          %
        </text>

        {/* Bottom FinTech Ticker Stream */}
        <g fontFamily="monospace" fontSize="13" fontWeight="700" fill="#10B981" fillOpacity="0.5">
          <text x="100" y="2580">FINSIGHT AI FINANCIAL PLATFORM // ENTERPRISE GREEN & GOLD FOUNDATION</text>
          <text x="960" y="2580">INTELLIGENCE SCORE: 99.8% // STATUS: ACTIVE</text>
        </g>
      </svg>
    </div>
  );
};
