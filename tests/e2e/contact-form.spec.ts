import { test, expect } from "@playwright/test";

test.describe("Enrollment", () => {
  test("old contact url should open enroll", async ({ page }) => {
    await page.goto("/contact");
    await expect(page).toHaveURL("/enroll");
    await expect(page.getByRole("heading", { name: "Enroll" })).toBeVisible();
  });

  test("should keep payment closed until Stripe is configured", async ({ page }) => {
    await page.goto("/enroll");

    await expect(page.getByLabel("Name *")).toBeVisible();
    await expect(page.getByLabel("Email *")).toBeVisible();
    await expect(page.getByLabel("Role *")).toBeVisible();
    await expect(page.getByLabel("The task you most want help with *")).toBeVisible();

    await page.getByRole("button", { name: /pay \$997/i }).click();
    const nameInput = page.getByLabel("Name *");
    const isValid = await nameInput.evaluate((el: HTMLInputElement) => el.validity.valid);
    expect(isValid).toBe(false);

    await page.getByLabel("Name *").fill("John Doe");
    await page.getByLabel("Email *").fill("john.doe@example.com");
    await page.getByLabel("Role *").fill("Office manager");
    await page.getByLabel("The task you most want help with *").fill("Weekly status emails.");

    await page.getByRole("button", { name: /pay \$997/i }).click();

    await expect(page.getByRole("alert")).toContainText(/your card has not been charged/i);
    await expect(page.getByText(/payment of/i)).toHaveCount(0);
  });

  test("session block should price 2 to 5 sessions", async ({ page }) => {
    await page.goto("/enroll?offer=sessions");

    await expect(page.getByRole("radio", { name: /private sessions only/i })).toBeChecked();
    await expect(page.getByRole("button", { name: /pay \$750/i })).toBeVisible();

    await page.getByRole("radio", { name: /5 sessions/i }).check();
    await expect(page.getByRole("button", { name: /pay \$1,875/i })).toBeVisible();
  });

  test("company training request should not pretend it was sent", async ({ page }) => {
    await page.goto("/companies");

    await expect(page.getByRole("heading", { name: "Case studies" })).toBeVisible();
    await expect(page.getByText("A regulated utility")).toBeVisible();
    await expect(page.getByText("$15,000").first()).toBeVisible();
    await expect(page.getByText("$30,000").first()).toBeVisible();

    await page.getByLabel("Company *").fill("Northwind");
    await page.getByLabel("Name *").fill("Ada Lopez");
    await page.getByLabel("Email *").fill("ada@example.com");
    await page.getByLabel("Role *").fill("Operations lead");
    await page.getByLabel("How many people *").fill("18");
    await page.getByRole("button", { name: /request \$30,000 program/i }).click();

    await expect(page.getByRole("status")).toContainText(/nothing was sent/i);
  });

  test("contact information should be displayed", async ({ page }) => {
    await page.goto("/enroll");

    const mainContent = page.getByTestId("main-content");
    await expect(mainContent.getByRole("link", { name: "support@wds-it.com" })).toBeVisible();
    await expect(mainContent.getByText("Olathe, Kansas")).toBeVisible();
  });
});
