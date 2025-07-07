import { expect, test } from "@playwright/test";

test.describe("Homepage", () => {
  test("has title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle("Kommunikationsplattform | Justiz-Services");
  });

  test("shows headline and introduction text", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("text=Kommunikationsplattform")).toBeVisible();
    await expect(
      page.locator(
        "text=Willkommen auf der Pilotplattform für den digitalen Austausch zwischen Gerichten und Verfahrensbeteiligten.",
      ),
    ).toBeVisible();
  });

  test('login option "Anmeldung Anwaltschaft" is redirecting to beA-Portal', async ({
    page,
  }) => {
    await page.goto("/");

    const linkToTest = page.getByRole("link", {
      name: "Anmeldung Anwaltschaft",
    });

    // expected URL partial after clicking the beA-Portal login link
    const expectedUrl =
      /schulung\.bea-brak\.de\/auth\/realms\/brak\/protocol\/openid-connect\/auth/;

    // click link and wait for the URL change
    await Promise.all([page.waitForURL(expectedUrl), linkToTest.click()]);

    // assert that the current URL matches the expected URL
    await expect(page).toHaveURL(expectedUrl);

    // further assertions on the redirected page
    await expect(page.locator("h1")).toHaveText("Anmeldung");
  });
});
