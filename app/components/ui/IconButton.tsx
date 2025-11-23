import { forwardRef, type ButtonHTMLAttributes } from 'react';
import type { Size, InteractiveComponentProps } from './types';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, InteractiveComponentProps {
  size?: Size;
  active?: boolean;
  square?: boolean;
}

/**
 * Icon-only button component optimized for square icons
 * 
 * @example
 * <IconButton aria-label="Close" size="md">
 *   <XIcon />
 * </IconButton>
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      size = 'md',
      active = false,
      square = true,
      className = '',
      disabled = false,
      children,
      type = 'button',
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles = 'inline-flex items-center justify-center rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    // Size variants (square by default for icons)
    const sizeStyles = square ? {
      xs: 'w-8 h-8 p-1',
      sm: 'w-9 h-9 p-1.5',
      md: 'w-10 h-10 p-2',
      lg: 'w-12 h-12 p-2.5',
      xl: 'w-14 h-14 p-3',
    } : {
      xs: 'px-2 py-1.5 min-h-[32px]',
      sm: 'px-2.5 py-2 min-h-[36px]',
      md: 'px-3 py-2.5 min-h-[44px]',
      lg: 'px-4 py-3 min-h-[48px]',
      xl: 'px-5 py-4 min-h-[56px]',
    };
    
    // Active and hover states
    const stateStyles = active
      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800';
    
    const focusStyles = 'focus:ring-primary-600 dark:focus:ring-primary-400';
    
    const combinedClassName = `${baseStyles} ${sizeStyles[size]} ${stateStyles} ${focusStyles} ${className}`.trim();
    
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={combinedClassName}
        {...props}
      >
        {children}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
