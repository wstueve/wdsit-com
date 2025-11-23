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

  test("contact page should not have accessibility violations", async ({ page }) => {
    await page.goto("/contact");
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("keyboard navigation should work", async ({ page }) => {
    await page.goto("/");
    
    let attempts = 0;
    let tagName = "BODY";
    
    while (tagName === "BODY" && attempts < 3) {
      await page.keyboard.press("Tab");
      const focusedElement = await page.evaluateHandle(() => document.activeElement);
      tagName = await focusedElement.evaluate(el => el?.tagName || "BODY");
      attempts++;
    }
    
    expect(["A", "BUTTON", "SELECT", "INPUT", "TEXTAREA"]).toContain(tagName);
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
  });

  test("form inputs should have labels", async ({ page }) => {
    await page.goto("/contact");
    
    await expect(page.getByLabel("Name *")).toBeVisible();
    await expect(page.getByLabel("Email *")).toBeVisible();
    await expect(page.getByLabel("Subject *")).toBeVisible();
    await expect(page.getByLabel("Message *")).toBeVisible();
  });
});
