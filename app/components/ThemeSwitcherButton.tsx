import { IconButton } from '~/components/ui/IconButton';
import { Tooltip } from '~/components/ui/Tooltip';
import { SunIcon, MoonIcon, ContrastIcon, AutoIcon } from '~/components/ui/icons';
import type { Theme } from '~/contexts/ThemeContext';

interface ThemeSwitcherButtonProps {
  theme: Theme;
  currentTheme: Theme;
  onClick: () => void;
  showTooltip?: boolean;
  showLabel?: boolean;
  testId?: string;
}

const themeConfig = {
  light: {
    icon: SunIcon,
    label: 'Light',
    tooltip: 'Switch to light theme',
  },
  dark: {
    icon: MoonIcon,
    label: 'Dark',
    tooltip: 'Switch to dark theme',
  },
  'high-contrast': {
    icon: ContrastIcon,
    label: 'High Contrast',
    tooltip: 'Switch to high contrast theme',
  },
  auto: {
    icon: AutoIcon,
    label: 'Auto',
    tooltip: 'Follow system theme',
  },
} as const;

/**
 * Individual theme switcher button with icon, optional tooltip, and optional label
 */
export function ThemeSwitcherButton({
  theme,
  currentTheme,
  onClick,
  showTooltip = false,
  showLabel = false,
  testId,
}: ThemeSwitcherButtonProps) {
  const config = themeConfig[theme];
  const Icon = config.icon;
  const isActive = theme === currentTheme;

  const button = (
    <IconButton
      onClick={onClick}
      active={isActive}
      aria-label={config.label}
      aria-pressed={isActive}
      data-testid={testId}
      size="md"
    >
      <Icon size={20} />
    </IconButton>
  );

  if (showLabel) {
    return (
      <button
        onClick={onClick}
        className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors text-left ${
          isActive
            ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
        }`}
        aria-label={config.label}
        aria-pressed={isActive}
        data-testid={testId}
      >
        <Icon size={20} />
        <span className="font-medium">{config.label}</span>
      </button>
    );
  }

  if (showTooltip) {
    return (
      <Tooltip content={config.tooltip} position="bottom">
        {button}
      </Tooltip>
    );
  }

  return button;
}
