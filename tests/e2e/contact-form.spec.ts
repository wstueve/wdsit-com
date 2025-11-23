import { test, expect } from "@playwright/test";

test.describe("Contact Form", () => {
  test("should display all form fields", async ({ page }) => {
    await page.goto("/contact");

    await expect(page.getByLabel("Name *")).toBeVisible();
    await expect(page.getByLabel("Email *")).toBeVisible();
    await expect(page.getByLabel("Subject *")).toBeVisible();
    await expect(page.getByLabel("Message *")).toBeVisible();
    await expect(page.getByRole("button", { name: /send message/i })).toBeVisible();
  });

  test("should require all fields", async ({ page }) => {
    await page.goto("/contact");

    // Try to submit empty form
    await page.getByRole("button", { name: /send message/i }).click();

    // Browser validation should prevent submission
    const nameInput = page.getByLabel("Name *");
    const isValid = await nameInput.evaluate((el: HTMLInputElement) => el.validity.valid);
    expect(isValid).toBe(false);
  });

  test("should validate email format", async ({ page }) => {
    await page.goto("/contact");

    const emailInput = page.getByLabel("Email *");
    
    // Try invalid email
    await emailInput.fill("invalid-email");
    const isValid = await emailInput.evaluate((el: HTMLInputElement) => el.validity.valid);
    expect(isValid).toBe(false);

    // Try valid email
    await emailInput.fill("valid@example.com");
    const isValidNow = await emailInput.evaluate((el: HTMLInputElement) => el.validity.valid);
    expect(isValidNow).toBe(true);
  });

  test("should fill out and submit form", async ({ page }) => {
    await page.goto("/contact");

    // Fill out form
    await page.getByLabel("Name *").fill("John Doe");
    await page.getByLabel("Email *").fill("john.doe@example.com");
    await page.getByLabel("Subject *").fill("Test Inquiry");
    await page.getByLabel("Message *").fill("This is a test message about Shopify integration.");

    // Submit form
    await page.getByRole("button", { name: /send message/i }).click();

    // Wait for submission to complete (adjust based on implementation)
    await page.waitForTimeout(1500);

    // Should show success message
    await expect(page.getByText(/thank you for your message/i)).toBeVisible();
  });

  test("should disable submit button while submitting", async ({ page }) => {
    await page.goto("/contact");

    // Fill out form
    await page.getByLabel("Name *").fill("John Doe");
    await page.getByLabel("Email *").fill("john.doe@example.com");
    await page.getByLabel("Subject *").fill("Test");
    await page.getByLabel("Message *").fill("Test message");

    // Click submit
    const submitButton = page.getByRole("button", { name: /send message/i });
    await submitButton.click();

    // The button should show "Sending..." text while submitting (which also means it's disabled)
    await expect(page.getByRole("button", { name: /sending/i })).toBeVisible({ timeout: 2000 });
    
    // Verify it's actually disabled while showing "Sending..."
    const sendingButton = page.getByRole("button", { name: /sending/i });
    await expect(sendingButton).toBeDisabled();
  });

  test("should clear form after successful submission", async ({ page }) => {
    await page.goto("/contact");

    // Fill and submit form
    await page.getByLabel("Name *").fill("John Doe");
    await page.getByLabel("Email *").fill("john@example.com");
    await page.getByLabel("Subject *").fill("Test");
    await page.getByLabel("Message *").fill("Test message");
    
    await page.getByRole("button", { name: /send message/i }).click();
    await page.waitForTimeout(1500);

    // Form fields should be cleared
    await expect(page.getByLabel("Name *")).toHaveValue("");
    await expect(page.getByLabel("Email *")).toHaveValue("");
    await expect(page.getByLabel("Subject *")).toHaveValue("");
    await expect(page.getByLabel("Message *")).toHaveValue("");
  });

  test("should work on mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/contact");

    // Form should be usable
    await page.getByLabel("Name *").fill("Jane Smith");
    await page.getByLabel("Email *").fill("jane@example.com");
    await page.getByLabel("Subject *").fill("Mobile Test");
    await page.getByLabel("Message *").fill("Testing from mobile device");

    const submitButton = page.getByRole("button", { name: /send message/i });
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toBeEnabled();
  });

  test("contact information should be displayed", async ({ page }) => {
    await page.goto("/contact");

    const mainContent = page.getByTestId("main-content");

    // Email address
    await expect(mainContent.getByRole("link", { name: "support@wds-it.com" })).toBeVisible();

    // Location
    await expect(mainContent.getByText("Olathe, Kansas")).toBeVisible();

    // Business hours
    await expect(mainContent.getByText(/monday - friday/i)).toBeVisible();
  });

  test("email links should work", async ({ page }) => {
    await page.goto("/contact");

    const mainContent = page.getByTestId("main-content");
    const emailLink = mainContent.getByRole("link", { name: "support@wds-it.com" });
    await expect(emailLink).toHaveAttribute("href", "mailto:support@wds-it.com");
  });
});
