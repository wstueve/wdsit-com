import { useTheme, type Theme } from '~/contexts/ThemeContext';
import { ThemeSwitcherButton } from './ThemeSwitcherButton';
import { Stack } from '~/components/ui/Stack';

const themes: Theme[] = ['light', 'dark', 'high-contrast', 'auto'];

interface ThemeSwitcherDesktopProps {
  testId?: string;
}

/**
 * Desktop theme switcher with horizontal square icon buttons and tooltips
 */
export function ThemeSwitcherDesktop({ testId = 'theme-switcher-desktop' }: ThemeSwitcherDesktopProps) {
  const { theme, setTheme } = useTheme();

  return (
    <Stack 
      direction="horizontal" 
      spacing={2} 
      align="center"
      data-testid={testId}
    >
      {themes.map((themeOption) => (
        <ThemeSwitcherButton
          key={themeOption}
          theme={themeOption}
          currentTheme={theme}
          onClick={() => setTheme(themeOption)}
          showTooltip={true}
          testId={`${testId}-${themeOption}`}
        />
      ))}
    </Stack>
  );
}
