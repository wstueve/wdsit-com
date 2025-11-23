/**
 * Shared type definitions for the UI component library
 */

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';

export type ColorScheme = 'primary' | 'gray' | 'success' | 'warning' | 'error' | 'info';

export interface BaseComponentProps {
  className?: string;
  'data-testid'?: string;
}

export interface InteractiveComponentProps extends BaseComponentProps {
  disabled?: boolean;
  'aria-label'?: string;
  'aria-describedby'?: string;
}
