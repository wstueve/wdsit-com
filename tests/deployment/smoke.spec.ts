import { test, expect } from "@playwright/test";

/**
 * Deployment smoke tests
 * These tests should run against the production/staging deployment
 */

test.describe("Deployment Smoke Tests", () => {
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

    const viewport = page.viewportSize();
    const isMobile = viewport && viewport.width < 1024;
    const logoSelector = isMobile ? 'img[alt="WDS IT Logo"].lg\\:hidden' : 'img[alt="WDS IT Logo"]:not(.lg\\:hidden)';
    await expect(page.locator(logoSelector)).toBeVisible();

    const favicon = await page.locator('link[rel="icon"]').getAttribute("href");
    expect(favicon).toBeTruthy();
  });

  test("navigation should work", async ({ page }) => {
    await page.goto("/");

    const viewport = page.viewportSize();
    const isMobile = viewport && viewport.width < 1024;
    if (isMobile) await page.getByTestId("mobile-menu-button").click();

    await page.getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL(/\/about/);
  });

  test("page load performance should be acceptable", async ({ page }) => {
    const startTime = Date.now();
    await page.goto("/");
    const loadTime = Date.now() - startTime;

    expect(loadTime).toBeLessThan(5000);
  });

  test("should not have console errors or failed requests", async ({ page }) => {
    const consoleErrors: string[] = [];
    const failedRequests: string[] = [];
    
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    page.on("requestfailed", (request) => {
      failedRequests.push(request.url());
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    expect(consoleErrors.length).toBe(0);
    expect(failedRequests.length).toBe(0);
  });
});
