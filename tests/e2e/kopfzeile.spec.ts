import { expect, test } from "@playwright/test";

test.describe("Kopfzeile (rendered for all pages)", () => {
  test("should render Kopfzeile on every page", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".kern-kopfzeile__flagge")).toBeVisible();
    await expect(
      page.getByText("Eine offizielle Website der Bundesrepublik Deutschland"),
    ).toBeVisible();
  });
});
