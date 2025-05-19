import { expect, test } from "@playwright/test";

test.describe("Justiz Backend API basic tests", () => {
  test("API is reachable for environment", async ({ page }) => {
    await page.goto("/e2e-test");
    await expect(page.locator("text=API is reachable")).toBeVisible();
  });
});
