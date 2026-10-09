import { test, expect, type Page } from "@playwright/test";

async function openMobileMenu(page: Page) {
  const menuButton = page.getByTestId("mobile-menu-button");
  const menu = page.getByTestId("mobile-menu");

  await expect(menuButton).toBeVisible();
  await menuButton.click();

  if (!(await menu.isVisible())) {
    await menuButton.click();
  }

  await expect(menu).toBeVisible();
}

test.describe("Navigation", () => {
  test("should navigate to all main pages", async ({ page }) => {
    await page.goto("/");
    
    // Verify home page loads
    await expect(page).toHaveTitle(/WDS IT/);

    // Check if mobile viewport
    const viewport = page.viewportSize();
    const isMobile = viewport && viewport.width < 1024;

    // Navigate to About
    if (isMobile) await page.getByTestId("mobile-menu-button").click();
    await page.getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL("/about");

    // Navigate to the course, then enroll
    if (isMobile) {
      await page.getByTestId("mobile-menu-button").click();
      await page.getByTestId("mobile-nav").getByRole("link", { name: "Course" }).click();
    } else {
      await page.getByTestId("desktop-nav").getByRole("link", { name: "Course" }).click();
    }
    await expect(page).toHaveURL("/course");

    if (isMobile) {
      await page.getByTestId("mobile-menu-button").click();
      await page.getByTestId("mobile-nav").getByRole("link", { name: "Enroll" }).click();
    } else {
      await page.getByTestId("desktop-nav").getByRole("link", { name: "Enroll" }).click();
    }
    await expect(page).toHaveURL("/enroll");

    // Navigate back to Home via logo
    await page.getByTestId("logo-link").click();
    await expect(page).toHaveURL("/");
    
    // Verify header and footer present
    await expect(page.getByTestId("header")).toBeVisible();
    await expect(page.getByTestId("footer")).toBeVisible();
  });

  test("mobile menu should work correctly", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    await expect(page.getByTestId("mobile-menu")).not.toBeVisible();
    await openMobileMenu(page);

    await page.getByTestId("mobile-nav").getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL("/about");
    await expect(page.getByTestId("mobile-menu")).not.toBeVisible();
  });
});
