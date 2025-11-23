import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "high-contrast" | "auto";

interface ThemeToggleProps {
  testId?: string;
}

export function ThemeToggle({ testId = "theme-toggle" }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>("auto");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored) {
      setTheme(stored);
      applyTheme(stored);
    } else {
      // If no stored theme, apply auto which respects system preference
      applyTheme("auto");
    }

    // Listen for system theme changes when in auto mode
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "auto") {
        applyTheme("auto");
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  function applyTheme(newTheme: Theme) {
    const root = document.documentElement;
    
    if (newTheme === "auto") {
      // Set theme based on system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.setAttribute("data-theme", prefersDark ? "dark" : "light");
      localStorage.removeItem("theme");
    } else {
      root.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    }
  }

  function handleThemeChange(newTheme: Theme) {
    setTheme(newTheme);
    applyTheme(newTheme);
  }

  // Render skeleton before hydration to prevent test failures
  const selectElement = (
    <select
      id={`theme-select-${testId}`}
      value={mounted ? theme : "auto"}
      onChange={mounted ? (e) => handleThemeChange(e.target.value as Theme) : undefined}
      disabled={!mounted}
      className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-600 dark:focus:ring-primary-400 min-h-[48px]"
      aria-label="Theme selection"
      data-hydrated={mounted ? "true" : "false"}
    >
      <option value="auto">Auto</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="high-contrast">High Contrast</option>
    </select>
  );

  return (
    <div className="flex items-center gap-2" data-testid={testId}>
      <label htmlFor={`theme-select-${testId}`} className="sr-only">
        Select theme
      </label>
      {selectElement}
    </div>
  );
}
