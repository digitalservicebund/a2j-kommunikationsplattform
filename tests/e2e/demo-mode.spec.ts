import { expect, test } from "@playwright/test";
import { getTestTranslations } from "~/util/testUtils";

test.describe("Demo mode (functionality)", () => {
  const { buttons } = getTestTranslations();
  test(`Can be activated using the "Testzugang" button (on staging environment)`, async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByTestId("demo-button").click();
    await expect(
      page.getByRole("button", { name: buttons.ABMELDEN_BUTTON }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Neue Klage einreichen" }),
    ).toBeVisible();
  });
});
