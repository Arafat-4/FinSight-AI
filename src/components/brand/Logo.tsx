import React from 'react';
import { useRouter } from '../../context/RouterContext';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  theme?: 'dark' | 'light' | 'emerald';
  className?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showText = true,
  theme = 'light',
  className = '',
  onClick
}) => {
  const { navigateTo } = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) {
      onClick();
    } else {
      navigateTo('/');
    }
  };

  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className={`inline-flex items-center gap-2.5 transition-transform duration-200 hover:scale-[1.02] text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-1 -m-1 ${className}`}
      title="FinSight AI — Return to Home"
      aria-label="FinSight AI Home"
    >
      {/* Precision Vector SVG Logo matching Reference Image 1 */}
      <div className={`relative shrink-0 ${iconSizes[size]} flex items-center justify-center`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          <defs>
            {/* Emerald Gradient */}
            <linearGradient id="emeraldGrad" x1="10" y1="10" x2="80" y2="90" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0B5D44" />
              <stop offset="50%" stopColor="#064E3B" />
              <stop offset="100%" stopColor="#022C22" />
            </linearGradient>

            {/* Gold Gradient */}
            <linearGradient id="goldGrad" x1="20" y1="90" x2="90" y2="20" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#B38728" />
              <stop offset="35%" stopColor="#FBF5B7" />
              <stop offset="60%" stopColor="#DAA520" />
              <stop offset="100%" stopColor="#AA771C" />
            </linearGradient>

            {/* Soft Shadow */}
            <filter id="subtleDrop" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* 3 Rising Bar Charts in background */}
          <rect x="42" y="44" width="9" height="38" rx="3.5" fill="url(#emeraldGrad)" />
          <rect x="54" y="32" width="9.5" height="50" rx="3.5" fill="url(#emeraldGrad)" />
          <rect x="66" y="24" width="9.5" height="58" rx="3.5" fill="url(#emeraldGrad)" />

          {/* ₹ Rupee Symbol Foreground */}
          {/* Top horizontal bar */}
          <path
            d="M 22 20 L 68 20 C 70.2 20 72 21.8 72 24 C 72 26.2 70.2 28 68 28 L 22 28 C 19.8 28 18 26.2 18 24 C 18 21.8 19.8 20 22 20 Z"
            fill="url(#emeraldGrad)"
          />
          {/* Second horizontal bar */}
          <path
            d="M 22 34 L 56 34 C 58.2 34 60 35.8 60 38 C 60 40.2 58.2 42 56 42 L 22 42 C 19.8 42 18 40.2 18 38 C 18 35.8 19.8 34 22 34 Z"
            fill="url(#emeraldGrad)"
          />
          {/* Rupee Loop and Diagonal Leg */}
          <path
            d="M 22 20 L 44 20 C 56 20 62 27 62 36 C 62 44 55 49 44 50 L 59 78 C 60 80 58.5 82 56 82 L 46 82 C 44 82 42.5 81 41.5 79 L 29 52 L 22 52 C 20 52 19 50.5 19 49 L 19 43 C 19 41.5 20 40 22 40 L 39 40 C 46 40 49 37 49 33 C 49 29 45 28 39 28 L 22 28 Z"
            fill="url(#emeraldGrad)"
            filter="url(#subtleDrop)"
          />

          {/* Ascending Golden Arrow Swoosh curving around the base */}
          <path
            d="M 18 52 C 16 66 24 82 48 83 C 65 83 78 71 85 45 L 82 47 L 88 28 L 96 42 L 91 43 C 86 64 72 88 47 88 C 21 88 11 70 12 52 Z"
            fill="url(#goldGrad)"
            filter="url(#subtleDrop)"
          />
          {/* Arrowhead tip */}
          <polygon points="88,24 96,40 82,34" fill="url(#goldGrad)" />
        </svg>
      </div>

      {showText && (
        <div className="flex items-baseline tracking-tight font-extrabold select-none">
          <span
            className={`${textSizes[size]} font-bold transition-colors ${
              theme === 'dark'
                ? 'text-white'
                : theme === 'emerald'
                ? 'text-emerald-50'
                : 'text-[#064E3B]'
            }`}
          >
            FinSight
          </span>
          <span
            className={`${textSizes[size]} font-extrabold ml-1 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#B8860B] bg-clip-text text-transparent`}
          >
            AI
          </span>
        </div>
      )}
    </button>
  );
};
