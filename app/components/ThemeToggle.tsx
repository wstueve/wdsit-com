import { ThemeSwitcherDesktop } from './ThemeSwitcherDesktop';
import { ThemeSwitcherMobile } from './ThemeSwitcherMobile';

interface ThemeToggleProps {
  variant?: 'desktop' | 'mobile';
  testId?: string;
}

/**
 * Theme toggle component that renders desktop or mobile variant
 * 
 * Desktop: Horizontal row of square icon buttons with tooltips
 * Mobile: Collapsible menu with icon + label, shows under hamburger menu
 */
export function ThemeToggle({ variant = 'desktop', testId }: ThemeToggleProps) {
  if (variant === 'mobile') {
    return <ThemeSwitcherMobile testId={testId} />;
  }
  
  return <ThemeSwitcherDesktop testId={testId} />;
}
