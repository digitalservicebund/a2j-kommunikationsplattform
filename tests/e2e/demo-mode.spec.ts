import { expect, test } from "@playwright/test";

test.describe("Demo mode (functionality)", () => {
  test(`Can be activated using the "Testzugang" button (on staging environment)`, async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByTestId("demo-button").click();
    await expect(page.getByRole("button", { name: "Abmelden" })).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Neue Klage einreichen" }),
    ).toBeVisible();
  });
});
