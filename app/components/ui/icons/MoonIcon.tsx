import type { IconProps } from './types';
import { defaultIconProps } from './types';

/**
 * Moon icon representing dark theme
 */
export function MoonIcon({ 
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
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}
