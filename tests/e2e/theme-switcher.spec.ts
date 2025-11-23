import { test, expect, type Page } from '@playwright/test';

test.describe('Theme Switcher', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test.describe('Desktop Theme Switcher', () => {
    test('should display all four theme buttons on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await page.goto('/');

      const desktop = page.getByTestId('desktop-theme-toggle');
      await expect(desktop).toBeVisible();

      // Check all four theme buttons are present
      await expect(page.getByTestId('desktop-theme-toggle-light')).toBeVisible();
      await expect(page.getByTestId('desktop-theme-toggle-dark')).toBeVisible();
      await expect(page.getByTestId('desktop-theme-toggle-high-contrast')).toBeVisible();
      await expect(page.getByTestId('desktop-theme-toggle-auto')).toBeVisible();
    });

    test('should show tooltips on hover', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await page.goto('/');

      const lightButton = page.getByTestId('desktop-theme-toggle-light');
      await lightButton.hover();

      // Wait for tooltip to appear (200ms delay)
      await page.waitForTimeout(250);
      await expect(page.getByRole('tooltip', { name: /light theme/i })).toBeVisible();
    });

    test('should switch to light theme when light button is clicked', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await page.goto('/');

      await page.getByTestId('desktop-theme-toggle-light').click();

      const html = page.locator('html');
      await expect(html).toHaveAttribute('data-theme', 'light');

      // Check localStorage
      const stored = await page.evaluate(() => localStorage.getItem('theme'));
      expect(stored).toBe('light');
    });

    test('should switch to dark theme when dark button is clicked', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await page.goto('/');

      await page.getByTestId('desktop-theme-toggle-dark').click();

      const html = page.locator('html');
      await expect(html).toHaveAttribute('data-theme', 'dark');

      const stored = await page.evaluate(() => localStorage.getItem('theme'));
      expect(stored).toBe('dark');
    });

    test('should switch to high-contrast theme when high-contrast button is clicked', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await page.goto('/');

      await page.getByTestId('desktop-theme-toggle-high-contrast').click();

      const html = page.locator('html');
      await expect(html).toHaveAttribute('data-theme', 'high-contrast');

      const stored = await page.evaluate(() => localStorage.getItem('theme'));
      expect(stored).toBe('high-contrast');
    });

    test('should switch to auto theme and clear localStorage', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await page.goto('/');

      // First set a theme
      await page.getByTestId('desktop-theme-toggle-light').click();
      let stored = await page.evaluate(() => localStorage.getItem('theme'));
      expect(stored).toBe('light');

      // Then switch to auto
      await page.getByTestId('desktop-theme-toggle-auto').click();

      const html = page.locator('html');
      const theme = await html.getAttribute('data-theme');
      expect(['light', 'dark']).toContain(theme); // Should be system preference

      stored = await page.evaluate(() => localStorage.getItem('theme'));
      expect(stored).toBeNull();
    });

    test('should show active state on current theme button', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await page.goto('/');

      await page.getByTestId('desktop-theme-toggle-dark').click();

      const darkButton = page.getByTestId('desktop-theme-toggle-dark');
      await expect(darkButton).toHaveAttribute('aria-pressed', 'true');
    });
  });

  test.describe('Mobile Theme Switcher', () => {
    test('should display mobile theme switcher in hamburger menu', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');

      // Desktop switcher should not be visible
      await expect(page.getByTestId('desktop-theme-toggle')).not.toBeVisible();

      // Open hamburger menu
      await page.getByTestId('mobile-menu-button').click();

      // Mobile theme switcher should be visible
      const mobileSwitcher = page.getByTestId('mobile-theme-toggle');
      await expect(mobileSwitcher).toBeVisible();
    });

    test('should show current theme with icon and label', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');

      await page.getByTestId('mobile-menu-button').click();

      const toggle = page.getByTestId('mobile-theme-toggle-toggle');
      await expect(toggle).toBeVisible();
      await expect(toggle).toContainText(/auto|light|dark|high contrast/i);
    });

    test('should expand to show all theme options when clicked', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');

      await page.getByTestId('mobile-menu-button').click();
      await page.getByTestId('mobile-theme-toggle-toggle').click();

      // Check all options are visible
      await expect(page.getByTestId('mobile-theme-toggle-light')).toBeVisible();
      await expect(page.getByTestId('mobile-theme-toggle-dark')).toBeVisible();
      await expect(page.getByTestId('mobile-theme-toggle-high-contrast')).toBeVisible();
      await expect(page.getByTestId('mobile-theme-toggle-auto')).toBeVisible();
    });

    test('should stay open after selecting a theme', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');

      await page.getByTestId('mobile-menu-button').click();
      await page.getByTestId('mobile-theme-toggle-toggle').click();

      // Select a theme
      await page.getByTestId('mobile-theme-toggle-dark').click();

      // Menu should still be open
      await expect(page.getByTestId('mobile-theme-toggle-menu')).toBeVisible();
    });

    test('should switch themes on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');

      await page.getByTestId('mobile-menu-button').click();
      await page.getByTestId('mobile-theme-toggle-toggle').click();
      await page.getByTestId('mobile-theme-toggle-light').click();

      const html = page.locator('html');
      await expect(html).toHaveAttribute('data-theme', 'light');

      const stored = await page.evaluate(() => localStorage.getItem('theme'));
      expect(stored).toBe('light');
    });

    test('should show icon and label for each option', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');

      await page.getByTestId('mobile-menu-button').click();
      await page.getByTestId('mobile-theme-toggle-toggle').click();

      // Each button should have text label
      await expect(page.getByTestId('mobile-theme-toggle-light')).toContainText('Light');
      await expect(page.getByTestId('mobile-theme-toggle-dark')).toContainText('Dark');
      await expect(page.getByTestId('mobile-theme-toggle-high-contrast')).toContainText('High Contrast');
      await expect(page.getByTestId('mobile-theme-toggle-auto')).toContainText('Auto');
    });
  });

  test.describe('Theme Persistence', () => {
    test('should persist theme across page reloads', async ({ page }) => {
      await page.goto('/');
      await page.setViewportSize({ width: 1280, height: 720 });

      await page.getByTestId('desktop-theme-toggle-dark').click();
      await page.reload();

      const html = page.locator('html');
      await expect(html).toHaveAttribute('data-theme', 'dark');
    });

    test('should apply stored theme before hydration (no FOUC)', async ({ page }) => {
      // Set theme in localStorage before navigation
      await page.goto('/');
      await page.evaluate(() => localStorage.setItem('theme', 'dark'));

      await page.goto('/');

      // Check theme is applied immediately
      const html = page.locator('html');
      await expect(html).toHaveAttribute('data-theme', 'dark');
    });
  });

  test.describe('System Preference Detection', () => {
    test('should follow system dark mode preference in auto mode', async ({ page }) => {
      await page.emulateMedia({ colorScheme: 'dark' });
      await page.goto('/');

      const html = page.locator('html');
      await expect(html).toHaveAttribute('data-theme', 'dark');
    });

    test('should follow system light mode preference in auto mode', async ({ page }) => {
      await page.emulateMedia({ colorScheme: 'light' });
      await page.goto('/');

      const html = page.locator('html');
      await expect(html).toHaveAttribute('data-theme', 'light');
    });

    test('should update theme when system preference changes in auto mode', async ({ page }) => {
      await page.emulateMedia({ colorScheme: 'light' });
      await page.goto('/');

      let html = page.locator('html');
      await expect(html).toHaveAttribute('data-theme', 'light');

      // Change system preference
      await page.emulateMedia({ colorScheme: 'dark' });

      // Wait for theme to update
      await page.waitForTimeout(100);
      await expect(html).toHaveAttribute('data-theme', 'dark');
    });

    test('should not change theme on system preference change if manual theme is set', async ({ page }) => {
      await page.emulateMedia({ colorScheme: 'light' });
      await page.goto('/');
      await page.setViewportSize({ width: 1280, height: 720 });

      // Set manual theme
      await page.getByTestId('desktop-theme-toggle-light').click();

      // Change system preference
      await page.emulateMedia({ colorScheme: 'dark' });

      // Wait a bit
      await page.waitForTimeout(100);

      // Theme should stay light
      const html = page.locator('html');
      await expect(html).toHaveAttribute('data-theme', 'light');
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper ARIA labels on desktop buttons', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await page.goto('/');

      const lightButton = page.getByTestId('desktop-theme-toggle-light');
      await expect(lightButton).toHaveAttribute('aria-label', 'Light');
      await expect(lightButton).toHaveAttribute('aria-pressed');
    });

    test('should have proper ARIA expanded state on mobile toggle', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');

      await page.getByTestId('mobile-menu-button').click();
      const toggle = page.getByTestId('mobile-theme-toggle-toggle');

      await expect(toggle).toHaveAttribute('aria-expanded', 'false');

      await toggle.click();
      await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    });

    test('should be keyboard navigable on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await page.goto('/');

      // Focus on the first theme button directly
      const lightButton = page.getByTestId('desktop-theme-toggle-light');
      await lightButton.focus();
      await expect(lightButton).toBeFocused();

      // Activate with Enter or Space
      await page.keyboard.press('Enter');

      const html = page.locator('html');
      await expect(html).toHaveAttribute('data-theme', 'light');
    });

    test('should meet minimum touch target size on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');

      await page.getByTestId('mobile-menu-button').click();
      await page.getByTestId('mobile-theme-toggle-toggle').click();

      const lightButton = page.getByTestId('mobile-theme-toggle-light');
      const box = await lightButton.boundingBox();

      expect(box).not.toBeNull();
      if (box) {
        expect(box.height).toBeGreaterThanOrEqual(44); // WCAG 2.1 minimum
      }
    });
  });

  test.describe('High Contrast Theme', () => {
    test('should apply bolder fonts in high contrast mode', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await page.goto('/');

      await page.getByTestId('desktop-theme-toggle-high-contrast').click();

      const body = page.locator('body');
      const fontWeight = await body.evaluate((el) => 
        window.getComputedStyle(el).fontWeight
      );

      // font-bold should be 700
      expect(parseInt(fontWeight)).toBeGreaterThanOrEqual(700);
    });

    test('should have larger base font size in high contrast mode', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await page.goto('/');

      await page.getByTestId('desktop-theme-toggle-high-contrast').click();

      const body = page.locator('body');
      const fontSize = await body.evaluate((el) => 
        window.getComputedStyle(el).fontSize
      );

      // Should be 18px (1.125rem)
      expect(fontSize).toBe('18px');
    });

    test('should have stronger borders in high contrast mode', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await page.goto('/');

      await page.getByTestId('desktop-theme-toggle-high-contrast').click();

      // Check a styled button element (like in the contact form or homepage CTA)
      await page.goto('/contact');
      await page.waitForLoadState('networkidle');
      
      const submitButton = page.locator('button[type="submit"]');
      await submitButton.waitFor({ state: 'visible' });
      
      const borderWidth = await submitButton.evaluate((el) => 
        window.getComputedStyle(el).borderWidth
      );

      // Should have 4px border
      expect(borderWidth).toBe('4px');
    });
  });
});
