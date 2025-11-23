import { type ReactNode } from 'react';
import type { BaseComponentProps, ColorScheme, Size } from './types';

export interface BadgeProps extends BaseComponentProps {
  children: ReactNode;
  variant?: ColorScheme;
  size?: Extract<Size, 'xs' | 'sm' | 'md'>;
  rounded?: boolean;
}

/**
 * Badge component for labels, tags, and status indicators
 * 
 * @example
 * <Badge variant="success">Active</Badge>
 * <Badge variant="error" size="sm">Error</Badge>
 */
export function Badge({
  children,
  variant = 'primary',
  size = 'sm',
  rounded = false,
  className = '',
  'data-testid': testId,
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium';
  
  const sizeStyles = {
    xs: 'px-2 py-0.5 text-xs',
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  };
  
  const variantStyles = {
    primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300',
    gray: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
    success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    error: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  };
  
  const roundedStyle = rounded ? 'rounded-full' : 'rounded-md';
  
  const combinedClassName = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${roundedStyle} ${className}`.trim();
  
  return (
    <span className={combinedClassName} data-testid={testId}>
      {children}
    </span>
  );
}
