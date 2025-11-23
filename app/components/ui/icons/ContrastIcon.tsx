import type { IconProps } from './types';
import { defaultIconProps } from './types';

/**
 * Contrast icon representing high-contrast theme
 */
export function ContrastIcon({ 
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
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2v20" />
      <path d="M12 2a10 10 0 0 1 0 20" fill="currentColor" />
    </svg>
  );
}
