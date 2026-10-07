import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  variant?: 'default' | 'surface' | 'dark' | 'glass';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverable = false,
  variant = 'default'
}) => {
  const variantStyles = {
    default: 'bg-white rounded-2xl border border-slate-200/90 shadow-xs text-slate-900',
    surface: 'bg-[#FBF9F5] rounded-2xl border border-slate-300/80 shadow-xs text-slate-900',
    dark: 'bg-[#393E46] rounded-2xl border border-slate-600/80 shadow-md text-[#EEEEEE]',
    glass: 'bg-[#393E46]/85 backdrop-blur-md rounded-2xl border border-slate-600/70 shadow-lg text-[#EEEEEE]'
  };

  return (
    <div
      onClick={onClick}
      className={`${variantStyles[variant]} p-5 transition-all duration-200 ${
        hoverable || onClick
          ? 'hover:border-[#00ADB5] hover:shadow-md hover:-translate-y-0.5 cursor-pointer'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
