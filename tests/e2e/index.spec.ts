import { expect, test } from "@playwright/test";
import { LoginError } from "~/routes/action.login-user";
import { LogoutType } from "~/routes/action.logout-user";

test.describe("Homepage (_index route)", () => {
  test("has title, shows headline and introduction text", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle("Kommunikationsplattform | Justiz-Services");
    await expect(page.locator("text=Kommunikationsplattform")).toBeVisible();
    await expect(
      page.locator(
        "text=Willkommen auf der Pilotplattform für den digitalen Austausch zwischen Gerichten und Verfahrensbeteiligten.",
      ),
    ).toBeVisible();
  });

  test('redirects to beA-Portal when using the "Anmeldung Anwaltschaft" login option', async ({
    page,
  }) => {
    // triple timeout, see: https://playwright.dev/docs/api/class-test#test-slow
    test.slow();
    await page.goto("/");
    await page
      .getByRole("button", {
        name: "Anmeldung Anwaltschaft",
      })
      .click();
    await page.waitForURL((url) => url.toString().includes("schulung"));

    // expected URL partial after clicking the beA-Portal login link
    const expectedUrl =
      /schulung\.bea-brak\.de\/auth\/realms\/brak\/protocol\/openid-connect\/auth/;

    await expect(page).toHaveURL(expectedUrl);
    await expect(page.locator("h1")).toHaveText("Anmeldung");
  });

  test(`shows success alert box for status=logged-out URL param (will be shown after using the logout button)`, async ({
    page,
  }) => {
    await page.goto(`/login?status=${LogoutType.ByUser}`);
    await expect(page.getByRole("alert")).toContainText(
      "Erfolgreich abgemeldet",
    );
  });

  test(`shows warning alert box for status=auto-logged-out URL param (will be shown after 60 min. of inactivity to our logged in users)`, async ({
    page,
  }) => {
    await page.goto(`/login?status=${LogoutType.Automatic}`);
    await expect(page.getByRole("alert")).toContainText(
      "Automatisch abgemeldet",
    );
  });

  test(`shows danger alert box for status=bea-login-error URL param (will be shown on any beA-portal login error)`, async ({
    page,
  }) => {
    await page.goto(`/login?status=${LoginError.BeA}`);
    await expect(page.getByRole("alert")).toContainText(
      "Fehler bei der Anmeldung",
    );
  });
});
