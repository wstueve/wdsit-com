import { type ReactNode } from 'react';
import type { BaseComponentProps } from './types';

export interface CardProps extends BaseComponentProps {
  children: ReactNode;
  variant?: 'default' | 'bordered' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
}

/**
 * Card component for containing related content
 * 
 * @example
 * <Card variant="elevated" padding="lg">
 *   <h3>Card Title</h3>
 *   <p>Card content goes here</p>
 * </Card>
 */
export function Card({
  children,
  variant = 'default',
  padding = 'md',
  hoverable = false,
  className = '',
  'data-testid': testId,
}: CardProps) {
  const baseStyles = 'rounded-xl';
  
  const variantStyles = {
    default: 'bg-white dark:bg-gray-900',
    bordered: 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800',
    elevated: 'bg-white dark:bg-gray-900 shadow-md',
  };
  
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  
  const hoverStyles = hoverable 
    ? 'transition-shadow duration-200 hover:shadow-lg' 
    : '';
  
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${hoverStyles} ${className}`.trim();
  
  return (
    <div className={combinedClassName} data-testid={testId}>
      {children}
    </div>
  );
}
