export interface IconProps {
  size?: number;
  className?: string;
  'aria-hidden'?: boolean;
}

export const defaultIconProps: Required<Pick<IconProps, 'size' | 'aria-hidden'>> = {
  size: 20,
  'aria-hidden': true,
};
