import { expect, test } from "@playwright/test";
import { getTestTranslations } from "tests/util/translationsUtil";

test.describe("Kopfzeile (rendered for all pages)", () => {
  const { labels } = getTestTranslations();
  test("should render Kopfzeile on every page", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".kern-kopfzeile__flagge")).toBeVisible();
    await expect(page.getByText(labels.KOPFZEILE_LABEL)).toBeVisible();
  });
});
