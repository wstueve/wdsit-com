import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Theme = 'light' | 'dark' | 'high-contrast' | 'auto';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark' | 'high-contrast';
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * ThemeProvider component that manages theme state and system preference detection
 * 
 * Handles:
 * - Theme state management
 * - System preference detection via matchMedia
 * - localStorage persistence
 * - Applying theme to document root
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>('auto');
  const [systemPreference, setSystemPreference] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  // Detect system preference
  useEffect(() => {
    setMounted(true);
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateSystemPreference = (e: MediaQueryList | MediaQueryListEvent) => {
      setSystemPreference(e.matches ? 'dark' : 'light');
    };
    
    // Set initial value
    updateSystemPreference(mediaQuery);
    
    // Listen for changes
    mediaQuery.addEventListener('change', updateSystemPreference);
    
    return () => mediaQuery.removeEventListener('change', updateSystemPreference);
  }, []);

  // Load theme from localStorage on mount
  useEffect(() => {
    if (!mounted) return;
    
    const stored = localStorage.getItem('theme');
    if (stored && (stored === 'light' || stored === 'dark' || stored === 'high-contrast' || stored === 'auto')) {
      setThemeState(stored as Theme);
    }
  }, [mounted]);

  // Calculate resolved theme
  const resolvedTheme: 'light' | 'dark' | 'high-contrast' = 
    theme === 'high-contrast' ? 'high-contrast' :
    theme === 'auto' ? systemPreference :
    theme;

  // Apply theme to document
  useEffect(() => {
    if (!mounted) return;
    
    const root = document.documentElement;
    root.setAttribute('data-theme', resolvedTheme);
  }, [resolvedTheme, mounted]);

  // Set theme and persist to localStorage
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    
    if (newTheme === 'auto') {
      localStorage.removeItem('theme');
    } else {
      localStorage.setItem('theme', newTheme);
    }
  };

  const value: ThemeContextValue = {
    theme,
    setTheme,
    resolvedTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to access theme context
 * 
 * @example
 * const { theme, setTheme, resolvedTheme } = useTheme();
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}
