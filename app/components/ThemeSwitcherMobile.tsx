import { useState } from 'react';
import { useTheme, type Theme } from '~/contexts/ThemeContext';
import { ThemeSwitcherButton } from './ThemeSwitcherButton';
import { SunIcon, MoonIcon, ContrastIcon, AutoIcon } from '~/components/ui/icons';

const themes: Theme[] = ['light', 'dark', 'high-contrast', 'auto'];

const themeLabels = {
  light: { icon: SunIcon, label: 'Light' },
  dark: { icon: MoonIcon, label: 'Dark' },
  'high-contrast': { icon: ContrastIcon, label: 'High Contrast' },
  auto: { icon: AutoIcon, label: 'Auto' },
} as const;

interface ThemeSwitcherMobileProps {
  testId?: string;
}

/**
 * Mobile theme switcher with collapsible menu
 * Shows current selection at top, expands to show all options with icon + label
 */
export function ThemeSwitcherMobile({ testId = 'theme-switcher-mobile' }: ThemeSwitcherMobileProps) {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const currentConfig = themeLabels[theme];
  const CurrentIcon = currentConfig.icon;

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    // Keep menu open for multiple selections as per requirements
  };

  return (
    <div className="w-full" data-testid={testId}>
      {/* Current selection button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
        aria-expanded={isOpen}
        aria-label="Theme selection"
        data-testid={`${testId}-toggle`}
      >
        <div className="flex items-center gap-3">
          <CurrentIcon size={20} />
          <span className="font-medium">{currentConfig.label}</span>
        </div>
        <svg
          className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Expanded options */}
      {isOpen && (
        <div className="mt-2 space-y-1" data-testid={`${testId}-menu`}>
          {themes.map((themeOption) => (
            <ThemeSwitcherButton
              key={themeOption}
              theme={themeOption}
              currentTheme={theme}
              onClick={() => handleThemeChange(themeOption)}
              showLabel={true}
              testId={`${testId}-${themeOption}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
