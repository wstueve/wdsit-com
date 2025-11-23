import { type ReactNode } from 'react';
import type { BaseComponentProps } from './types';

export interface StackProps extends BaseComponentProps {
  children: ReactNode;
  direction?: 'horizontal' | 'vertical';
  spacing?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
}

/**
 * Flexible layout component for arranging children in rows or columns
 * 
 * @example
 * <Stack direction="horizontal" spacing={4} align="center">
 *   <Button>First</Button>
 *   <Button>Second</Button>
 * </Stack>
 */
export function Stack({
  children,
  direction = 'vertical',
  spacing = 4,
  align = 'stretch',
  justify = 'start',
  wrap = false,
  className = '',
  'data-testid': testId,
}: StackProps) {
  const directionClass = direction === 'horizontal' ? 'flex-row' : 'flex-col';
  
  // Map spacing to actual Tailwind classes for proper tree-shaking
  const spacingClasses = {
    0: 'gap-0',
    1: 'gap-1',
    2: 'gap-2',
    3: 'gap-3',
    4: 'gap-4',
    5: 'gap-5',
    6: 'gap-6',
    8: 'gap-8',
    10: 'gap-10',
    12: 'gap-12',
  };
  
  const spacingClass = spacingClasses[spacing];
  
  const alignClass = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  }[align];
  
  const justifyClass = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  }[justify];
  
  const wrapClass = wrap ? 'flex-wrap' : 'flex-nowrap';
  
  const combinedClassName = `flex ${directionClass} ${spacingClass} ${alignClass} ${justifyClass} ${wrapClass} ${className}`.trim();
  
  return (
    <div className={combinedClassName} data-testid={testId}>
      {children}
    </div>
  );
}
