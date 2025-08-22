import { expect, test } from "@playwright/test";

test.describe("Kopfzeile (rendered for all pages)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should render Kopfzeile on every page", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".kern-kopfzeile__flagge")).toBeVisible();
    await expect(
      page.getByText("Offizielle Website – Bundesrepublik Deutschland"),
    ).toBeVisible();
  });
});
