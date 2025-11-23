import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("should navigate to all main pages from home", async ({ page }) => {
    await page.goto("/");
    
    // Verify home page loads
    await expect(page).toHaveTitle(/WDS IT/);
    await expect(page.getByRole("heading", { name: /Enterprise Shopify Solutions/i })).toBeVisible();

    // Navigate to About
    await page.getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL("/about");
    await expect(page.getByRole("heading", { name: /About WDS IT/i })).toBeVisible();

    // Navigate to Contact
    await page.getByRole("link", { name: "Contact" }).click();
    await expect(page).toHaveURL("/contact");
    await expect(page.getByRole("heading", { name: /Contact Us/i })).toBeVisible();

    // Navigate back to Home
    await page.getByRole("link", { name: "Home" }).click();
    await expect(page).toHaveURL("/");
  });

  test("should navigate to legal pages from footer", async ({ page }) => {
    await page.goto("/");

    // Navigate to Privacy Policy
    await page.getByRole("contentinfo").getByRole("link", { name: "Privacy Policy" }).click();
    await expect(page).toHaveURL("/privacy");
    await expect(page.getByRole("heading", { name: /Privacy Policy/i })).toBeVisible();

    // Navigate to Terms of Service
    await page.goto("/");
    await page.getByRole("contentinfo").getByRole("link", { name: "Terms of Service" }).click();
    await expect(page).toHaveURL("/terms");
    await expect(page.getByRole("heading", { name: /Terms of Service/i })).toBeVisible();
  });

  test("should navigate using logo link", async ({ page }) => {
    await page.goto("/about");
    
    // Click logo to go home
    await page.getByTestId("logo-link").click();
    await expect(page).toHaveURL("/");
  });

  test("mobile menu should work correctly", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Mobile menu should be hidden initially
    await expect(page.getByTestId("mobile-menu")).not.toBeVisible();

    // Open mobile menu
    await page.getByTestId("mobile-menu-button").click();
    await expect(page.getByTestId("mobile-menu")).toBeVisible();

    // Navigate using mobile menu
    await page.getByTestId("mobile-nav").getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL("/about");

    // Mobile menu should close after navigation
    await expect(page.getByTestId("mobile-menu")).not.toBeVisible();
  });

  test("all pages should have header and footer", async ({ page }) => {
    const pages = ["/", "/about", "/contact", "/privacy", "/terms"];

    for (const url of pages) {
      await page.goto(url);
      await expect(page.getByTestId("header")).toBeVisible();
      await expect(page.getByTestId("footer")).toBeVisible();
    }
  });
});
