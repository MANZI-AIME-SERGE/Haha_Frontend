import { forwardRef } from 'react';

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  icon,
  onClick,
  type = 'button',
  ...props
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:shadow-soft-lg hover:scale-[1.02] active:scale-[0.98] focus:ring-primary-500',
    accent: 'bg-gradient-to-r from-accent-500 to-accent-600 text-white hover:shadow-soft-lg hover:scale-[1.02] active:scale-[0.98] focus:ring-accent-500',
    success: 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-soft-lg hover:scale-[1.02] active:scale-[0.98] focus:ring-green-500',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-soft-lg hover:scale-[1.02] active:scale-[0.98] focus:ring-red-500',
    warning: 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover:shadow-soft-lg hover:scale-[1.02] active:scale-[0.98] focus:ring-yellow-500',
    outline: 'border-2 border-primary-500 text-primary-600 hover:bg-primary-50 focus:ring-primary-500 active:scale-[0.98]',
    'outline-accent': 'border-2 border-accent-500 text-accent-600 hover:bg-accent-50 focus:ring-accent-500 active:scale-[0.98]',
    ghost: 'text-gray-600 hover:bg-gray-100 focus:ring-gray-500',
    link: 'text-primary-600 hover:text-primary-700 hover:underline focus:ring-primary-500',
  };

  const sizes = {
    xs: 'px-2.5 py-1.5 text-xs gap-1',
    sm: 'px-3 py-2 text-sm gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2',
    xl: 'px-8 py-4 text-lg gap-2',
    icon: 'p-2',
  };

  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          {children}
        </>
      ) : (
        <>
          {icon && <span className={children ? '' : ''}>{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
