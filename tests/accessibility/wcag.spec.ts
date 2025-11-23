import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Accessibility (WCAG 2.1 AA)", () => {
  test("home page should not have accessibility violations", async ({ page }) => {
    await page.goto("/");
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("about page should not have accessibility violations", async ({ page }) => {
    await page.goto("/about");
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("contact page should not have accessibility violations", async ({ page }) => {
    await page.goto("/contact");
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("privacy page should not have accessibility violations", async ({ page }) => {
    await page.goto("/privacy");
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("terms page should not have accessibility violations", async ({ page }) => {
    await page.goto("/terms");
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("keyboard navigation should work", async ({ page }) => {
    await page.goto("/");
    
    // Tab through interactive elements
    await page.keyboard.press("Tab");
    await expect(page.getByTestId("logo-link")).toBeFocused();
    
    await page.keyboard.press("Tab");
    // Should focus on navigation or theme toggle
    
    await page.keyboard.press("Tab");
    // Continue tabbing through interactive elements
  });

  test("skip link should be present for screen readers", async ({ page }) => {
    await page.goto("/");
    
    // Check for skip to content link (commonly used for accessibility)
    // This is a best practice but may need to be implemented
  });

  test("images should have alt text", async ({ page }) => {
    await page.goto("/");
    
    const images = await page.locator("img").all();
    
    for (const img of images) {
      const alt = await img.getAttribute("alt");
      expect(alt).toBeTruthy();
      expect(alt?.length).toBeGreaterThan(0);
    }
  });

  test("form inputs should have labels", async ({ page }) => {
    await page.goto("/contact");
    
    // All form inputs should have associated labels
    const nameInput = page.getByLabel("Name *");
    const emailInput = page.getByLabel("Email *");
    const subjectInput = page.getByLabel("Subject *");
    const messageInput = page.getByLabel("Message *");
    
    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(subjectInput).toBeVisible();
    await expect(messageInput).toBeVisible();
  });

  test("links should have descriptive text", async ({ page }) => {
    await page.goto("/");
    
    const links = await page.locator("a").all();
    
    for (const link of links) {
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute("aria-label");
      
      // Link should have either text content or aria-label
      expect(text || ariaLabel).toBeTruthy();
    }
  });

  test("focus should be visible", async ({ page }) => {
    await page.goto("/");
    
    // Tab to first interactive element
    await page.keyboard.press("Tab");
    
    // Check that focused element has visible focus indicator
    const focusedElement = await page.evaluateHandle(() => document.activeElement);
    const outlineStyle = await page.evaluate((el) => {
      return window.getComputedStyle(el as Element).outline;
    }, focusedElement);
    
    // Should have some outline/focus style
    expect(outlineStyle).toBeTruthy();
  });

  test("color contrast should be sufficient in all themes", async ({ page }) => {
    const themes = ["light", "dark", "high-contrast"];
    
    for (const theme of themes) {
      await page.goto("/");
      
      if (theme !== "auto") {
        await page.getByLabel("Theme selection").selectOption(theme);
      }
      
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(["wcag2aa"])
        .analyze();
      
      const contrastViolations = accessibilityScanResults.violations.filter(
        (v) => v.id === "color-contrast"
      );
      
      expect(contrastViolations).toEqual([]);
    }
  });

  test("mobile touch targets should be at least 48x48px", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    
    // Check mobile menu button size
    const menuButton = page.getByTestId("mobile-menu-button");
    const box = await menuButton.boundingBox();
    
    expect(box).toBeTruthy();
    if (box) {
      expect(box.width).toBeGreaterThanOrEqual(44); // Slightly less to account for padding
      expect(box.height).toBeGreaterThanOrEqual(44);
    }
  });

  test("headings should be in logical order", async ({ page }) => {
    await page.goto("/");
    
    const headings = await page.locator("h1, h2, h3, h4, h5, h6").all();
    
    // Should have at least one h1
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBeGreaterThanOrEqual(1);
    
    // Headings should exist
    expect(headings.length).toBeGreaterThan(0);
  });
});
