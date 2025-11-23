import { test, expect } from "@playwright/test";

test.describe("Contact Form", () => {
  test("should validate and submit form successfully", async ({ page }) => {
    await page.goto("/contact");

    // Verify form fields visible
    await expect(page.getByLabel("Name *")).toBeVisible();
    await expect(page.getByLabel("Email *")).toBeVisible();
    await expect(page.getByLabel("Subject *")).toBeVisible();
    await expect(page.getByLabel("Message *")).toBeVisible();

    // Test validation - empty form should fail
    await page.getByRole("button", { name: /send message/i }).click();
    const nameInput = page.getByLabel("Name *");
    const isValid = await nameInput.evaluate((el: HTMLInputElement) => el.validity.valid);
    expect(isValid).toBe(false);

    // Fill and submit form
    await page.getByLabel("Name *").fill("John Doe");
    await page.getByLabel("Email *").fill("john.doe@example.com");
    await page.getByLabel("Subject *").fill("Test Inquiry");
    await page.getByLabel("Message *").fill("This is a test message.");

    await page.getByRole("button", { name: /send message/i }).click();
    await page.waitForTimeout(1500);

    // Verify success
    await expect(page.getByText(/thank you for your message/i)).toBeVisible();
    await expect(page.getByLabel("Name *")).toHaveValue("");
  });

  test("contact information should be displayed", async ({ page }) => {
    await page.goto("/contact");

    const mainContent = page.getByTestId("main-content");
    await expect(mainContent.getByRole("link", { name: "support@wds-it.com" })).toBeVisible();
    await expect(mainContent.getByText("Olathe, Kansas")).toBeVisible();
  });
});
