import { expect, test } from "@playwright/test";
import { getTestTranslations } from "tests/utils/translationsUtil";

test.describe("Kopfzeile (rendered for all pages)", () => {
  const { shared } = getTestTranslations();
  test("should render Kopfzeile on every page", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".kern-kopfzeile__flagge")).toBeVisible();
    await expect(page.getByText(shared.KOPFZEILE_LABEL)).toBeVisible();
  });
});
