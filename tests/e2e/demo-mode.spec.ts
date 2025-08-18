import { expect, test } from "@playwright/test";

test.describe("Demo mode (functionality)", () => {
  test(`Can be activated using the "Testzugang" button (on staging environment)`, async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByTestId("demoBtn").click();
    await expect(
      page.getByRole("heading", { name: "Verfahren" }),
    ).toBeVisible();
  });
});
