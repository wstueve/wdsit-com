import type { IconProps } from './types';
import { defaultIconProps } from './types';

/**
 * Auto icon representing automatic/system theme preference
 */
export function AutoIcon({ 
  size = defaultIconProps.size, 
  className = '',
  'aria-hidden': ariaHidden = defaultIconProps['aria-hidden'],
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={ariaHidden}
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M2 9h20" />
      <circle cx="7" cy="6" r="0.5" fill="currentColor" />
      <circle cx="10" cy="6" r="0.5" fill="currentColor" />
    </svg>
  );
}
