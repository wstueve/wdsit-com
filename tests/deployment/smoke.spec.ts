import { test, expect } from "@playwright/test";

/**
 * Deployment smoke tests
 * These tests should run against the production/staging deployment
 * Set PLAYWRIGHT_TEST_BASE_URL environment variable to the deployment URL
 */

test.describe("Deployment Smoke Tests", () => {
  test("production site should be accessible", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);
  });

  test("all main pages should load successfully", async ({ page }) => {
    const pages = [
      { url: "/", title: /WDS IT/ },
      { url: "/about", title: /About WDS IT/ },
      { url: "/contact", title: /Contact/ },
      { url: "/privacy", title: /Privacy Policy/ },
      { url: "/terms", title: /Terms of Service/ },
    ];

    for (const { url, title } of pages) {
      const response = await page.goto(url);
      expect(response?.status()).toBe(200);
      await expect(page).toHaveTitle(title);
    }
  });

  test("static assets should load", async ({ page }) => {
    await page.goto("/");

    // Logo images should load - select the visible one based on viewport
    const viewport = page.viewportSize();
    const isMobile = viewport && viewport.width < 1024;
    const logoSelector = isMobile ? 'img[alt="WDS IT Logo"].lg\\:hidden' : 'img[alt="WDS IT Logo"]:not(.lg\\:hidden)';
    const logo = page.locator(logoSelector);
    await expect(logo).toBeVisible();

    // Favicon should be present
    const favicon = await page.locator('link[rel="icon"]').getAttribute("href");
    expect(favicon).toBeTruthy();
  });

  test("navigation should work", async ({ page }) => {
    await page.goto("/");

    // Open mobile menu if on mobile viewport
    const viewport = page.viewportSize();
    const isMobile = viewport && viewport.width < 1024;
    if (isMobile) {
      await page.getByTestId("mobile-menu-button").click();
    }

    // Click About link
    await page.getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL(/\/about/);

    // Re-open mobile menu if needed (page navigated, menu closed automatically)
    if (isMobile) {
      await page.getByTestId("mobile-menu-button").click();
    }

    // Click Home link - use exact match to avoid logo link
    await page.getByRole("link", { name: "Home", exact: true }).click();
    await expect(page).toHaveURL(/\/$/);
  });

  test("theme switcher should work", async ({ page }) => {
    await page.goto("/");

    // Use viewport-aware selector
    const viewport = page.viewportSize();
    const isMobile = viewport && viewport.width < 1024;
    const testId = isMobile ? "mobile-theme-toggle" : "desktop-theme-toggle";
    const themeSelect = page.getByTestId(testId).getByLabel("Theme selection");
    await expect(themeSelect).toBeVisible();

    // Switch to dark theme
    await themeSelect.selectOption("dark");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  });

  test("mobile menu should work", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    const menuButton = page.getByTestId("mobile-menu-button");
    await expect(menuButton).toBeVisible();

    await menuButton.click();
    await expect(page.getByTestId("mobile-menu")).toBeVisible();
  });

  test("forms should be functional", async ({ page }) => {
    await page.goto("/contact");

    // Form should be present
    await expect(page.getByLabel("Name *")).toBeVisible();
    await expect(page.getByLabel("Email *")).toBeVisible();
    await expect(page.getByRole("button", { name: /send message/i })).toBeVisible();
  });

  test("footer links should work", async ({ page }) => {
    await page.goto("/");

    // Privacy Policy link
    await page.getByRole("contentinfo").getByRole("link", { name: "Privacy Policy" }).click();
    await expect(page).toHaveURL(/\/privacy/);

    // Go back and test Terms
    await page.goto("/");
    await page.getByRole("contentinfo").getByRole("link", { name: "Terms of Service" }).click();
    await expect(page).toHaveURL(/\/terms/);
  });

  test("page load performance should be acceptable", async ({ page }) => {
    const startTime = Date.now();
    await page.goto("/");
    const loadTime = Date.now() - startTime;

    // Page should load in under 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test("contact information should be correct", async ({ page }) => {
    await page.goto("/contact");

    const mainContent = page.getByTestId("main-content");

    // Verify business contact details
    await expect(mainContent.getByText("support@wds-it.com")).toBeVisible();
    await expect(mainContent.getByText("Olathe, Kansas")).toBeVisible();
  });

  test("meta tags should be present", async ({ page }) => {
    await page.goto("/");

    // Check for essential meta tags
    const viewport = await page.locator('meta[name="viewport"]').getAttribute("content");
    expect(viewport).toContain("width=device-width");

    const description = await page.locator('meta[name="description"]').getAttribute("content");
    expect(description).toBeTruthy();
  });

  test("should not have console errors", async ({ page }) => {
    const consoleErrors: string[] = [];
    
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Should have no console errors
    expect(consoleErrors.length).toBe(0);
  });

  test("should not have failed network requests", async ({ page }) => {
    const failedRequests: string[] = [];

    page.on("requestfailed", (request) => {
      failedRequests.push(request.url());
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Should have no failed requests
    expect(failedRequests.length).toBe(0);
  });
});
