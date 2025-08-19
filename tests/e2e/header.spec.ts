import { expect, test } from "@playwright/test";

test.describe("Header (rendered for all pages)", () => {
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

  test("should have correct class names for narrow layout", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.locator(".kopfzeile-no-vertical-padding")).toBeVisible();
  });

  test("should have correct class names for default layout", async ({
    page,
  }) => {
    await page.goto("/prototype/verfahren");
    await page.goto("/prototype/verfahren");
    await expect(
      page.locator(".kopfzeile-no-vertical-padding"),
    ).not.toBeVisible();
  });
});
