import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'gold' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] select-none shadow-xs group';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5 min-h-[34px] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
    md: 'text-sm px-4.5 py-2.5 gap-2 min-h-[42px] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
    lg: 'text-base px-6 py-3.5 gap-2.5 min-h-[48px] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]'
  };

  const variantStyles = {
    primary:
      'bg-[#064E3B] hover:bg-[#0B5D44] text-white hover:shadow-md hover:shadow-emerald-950/40 border border-emerald-600/40 active:bg-[#043E30]',
    gold:
      'bg-gradient-to-r from-[#DFB741] via-[#F3E5AB] to-[#D4AF37] hover:from-[#F3E5AB] hover:to-[#DFB741] text-[#022C22] font-bold shadow-sm hover:shadow-md hover:shadow-amber-500/25 border border-amber-300/60 active:opacity-95',
    secondary:
      'bg-[#043E30] hover:bg-[#064E3B] text-emerald-100 border border-emerald-700/50 hover:border-emerald-500 hover:shadow-md active:bg-[#022C22]',
    outline:
      'border border-[#D4AF37] text-[#F3E5AB] hover:bg-[#D4AF37]/15 hover:text-white hover:border-[#F3E5AB] active:bg-[#D4AF37]/25',
    ghost:
      'text-emerald-200 hover:text-white hover:bg-emerald-900/30 active:bg-emerald-900/50',
    danger:
      'bg-rose-600 hover:bg-rose-500 text-white hover:shadow-md hover:shadow-rose-950/40 border border-rose-500 active:bg-rose-700'
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
      ) : (
        icon && iconPosition === 'left' && (
          <span className="shrink-0 transition-transform duration-200 group-hover:scale-105">
            {icon}
          </span>
        )
      )}
      <span>{children}</span>
      {!isLoading && icon && iconPosition === 'right' && (
        <span className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">
          {icon}
        </span>
      )}
    </button>
  );
};
