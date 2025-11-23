import { test, expect } from "@playwright/test";

test.describe("Responsive Design", () => {
  const viewports = [
    { name: "Mobile", width: 375, height: 667 },
    { name: "Tablet", width: 768, height: 1024 },
    { name: "Desktop", width: 1280, height: 720 },
    { name: "Large Desktop", width: 1920, height: 1080 },
  ];

  viewports.forEach(({ name, width, height }) => {
    test(`should display correctly on ${name} (${width}x${height})`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto("/");

      // Header should be visible
      await expect(page.getByTestId("header")).toBeVisible();

      // Logo should be visible
      await expect(page.getByTestId("logo-link")).toBeVisible();

      // Content should be visible
      await expect(page.getByTestId("main-content")).toBeVisible();

      // Footer should be visible
      await expect(page.getByTestId("footer")).toBeVisible();
    });
  });

  test("mobile menu appears only on mobile/tablet", async ({ page }) => {
    // Mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    await expect(page.getByTestId("mobile-menu-button")).toBeVisible();
    await expect(page.getByTestId("desktop-nav")).not.toBeVisible();

    // Tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.getByTestId("mobile-menu-button")).toBeVisible();

    // Desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 });
    await expect(page.getByTestId("mobile-menu-button")).not.toBeVisible();
    await expect(page.getByTestId("desktop-nav")).toBeVisible();
  });

  test("contact form should be usable on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/contact");

    // Form should be visible
    const nameInput = page.getByLabel("Name *");
    const emailInput = page.getByLabel("Email *");
    const subjectInput = page.getByLabel("Subject *");
    const messageInput = page.getByLabel("Message *");

    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(subjectInput).toBeVisible();
    await expect(messageInput).toBeVisible();

    // Should be able to fill form
    await nameInput.fill("John Doe");
    await emailInput.fill("john@example.com");
    await subjectInput.fill("Test Subject");
    await messageInput.fill("Test message");

    // Submit button should be visible and enabled
    const submitButton = page.getByRole("button", { name: /send message/i });
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toBeEnabled();
  });

  test("responsive images should load appropriate sizes", async ({ page }) => {
    // Mobile viewport - should use smaller logo
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    
    const mobileLogo = page.locator('img[src="/wds-it_287x84.png"]');
    await expect(mobileLogo).toBeVisible();

    // Desktop viewport - should use larger logo
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/");
    
    const desktopLogo = page.locator('img[src="/wds-it_450x132.png"]');
    await expect(desktopLogo).toBeVisible();
  });

  test("content should be readable at all viewport sizes", async ({ page }) => {
    for (const { name, width, height } of viewports) {
      await page.setViewportSize({ width, height });
      await page.goto("/about");

      // Headings should be visible
      const heading = page.getByRole("heading", { name: /About WDS IT/i });
      await expect(heading).toBeVisible();

      // Text content should be visible
      const content = page.getByText(/bringing enterprise-scale expertise/i);
      await expect(content).toBeVisible();
    }
  });

  test("landscape orientation should work on mobile", async ({ page }) => {
    // Portrait
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    await expect(page.getByTestId("header")).toBeVisible();

    // Landscape
    await page.setViewportSize({ width: 667, height: 375 });
    await expect(page.getByTestId("header")).toBeVisible();
    await expect(page.getByTestId("footer")).toBeVisible();
  });
});
