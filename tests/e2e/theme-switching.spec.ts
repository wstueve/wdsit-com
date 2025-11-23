import { test, expect } from "@playwright/test";

test.describe("Theme Switching", () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
  });

  test("should have theme toggle visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("theme-toggle")).toBeVisible();
  });

  test("should switch to dark theme", async ({ page }) => {
    await page.goto("/");

    // Select dark theme
    await page.getByLabel("Theme selection").selectOption("dark");

    // Check that dark theme is applied
    const html = page.locator("html");
    await expect(html).toHaveAttribute("data-theme", "dark");

    // Verify localStorage
    const theme = await page.evaluate(() => localStorage.getItem("theme"));
    expect(theme).toBe("dark");
  });

  test("should switch to light theme", async ({ page }) => {
    await page.goto("/");

    // Select light theme
    await page.getByLabel("Theme selection").selectOption("light");

    // Check that light theme is applied
    const html = page.locator("html");
    await expect(html).toHaveAttribute("data-theme", "light");

    // Verify localStorage
    const theme = await page.evaluate(() => localStorage.getItem("theme"));
    expect(theme).toBe("light");
  });

  test("should switch to high-contrast theme", async ({ page }) => {
    await page.goto("/");

    // Select high-contrast theme
    await page.getByLabel("Theme selection").selectOption("high-contrast");

    // Check that high-contrast theme is applied
    const html = page.locator("html");
    await expect(html).toHaveAttribute("data-theme", "high-contrast");

    // Verify localStorage
    const theme = await page.evaluate(() => localStorage.getItem("theme"));
    expect(theme).toBe("high-contrast");
  });

  test("should persist theme across page navigation", async ({ page }) => {
    await page.goto("/");

    // Set dark theme
    await page.getByLabel("Theme selection").selectOption("dark");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

    // Navigate to another page
    await page.goto("/about");

    // Theme should persist
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  });

  test("should reset to system preference with auto", async ({ page }) => {
    await page.goto("/");

    // Set dark theme first
    await page.getByLabel("Theme selection").selectOption("dark");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

    // Switch to auto
    await page.getByLabel("Theme selection").selectOption("auto");

    // data-theme attribute should be removed
    const html = page.locator("html");
    const hasDataTheme = await html.evaluate((el) => el.hasAttribute("data-theme"));
    expect(hasDataTheme).toBe(false);

    // localStorage should be cleared
    const theme = await page.evaluate(() => localStorage.getItem("theme"));
    expect(theme).toBeNull();
  });

  test("theme toggle should be accessible on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Theme toggle should be visible on mobile
    await expect(page.getByTestId("theme-toggle")).toBeVisible();

    // Should be able to change theme
    await page.getByLabel("Theme selection").selectOption("dark");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  });

  test("theme select should have all options", async ({ page }) => {
    await page.goto("/");

    const select = page.getByLabel("Theme selection");
    
    // Check all options are present
    const options = await select.locator("option").allTextContents();
    expect(options).toContain("Auto");
    expect(options).toContain("Light");
    expect(options).toContain("Dark");
    expect(options).toContain("High Contrast");
  });
});
