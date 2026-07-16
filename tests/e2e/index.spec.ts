import { expect, test } from "@playwright/test";
import { getTestTranslations } from "tests/utils/translationsUtil";
import { LoginError } from "~/routes/action.login-user";
import { LogoutType } from "~/routes/action.logout-user";
import { expectNoA11yViolations } from "./a11y";

test.describe("Homepage (_index route)", () => {
  const { routes, buttons, alerts, errorMessages } = getTestTranslations();
  test("has title, shows headline and introduction text", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle("Kommunikationsplattform | Justiz-Services");
    await expect(page.locator("text=Kommunikationsplattform")).toBeVisible();
    await expect(
      page.locator(`text=${routes.login.introduction}`),
    ).toBeVisible();
    await expectNoA11yViolations(page);
  });

  test('redirects to beA-Portal when using the "Anmeldung Anwaltschaft" login option', async ({
    page,
  }) => {
    // triple timeout, see: https://playwright.dev/docs/api/class-test#test-slow
    test.slow();
    await page.goto("/");
    await page.waitForURL("**/login");
    await page
      .getByRole("button", {
        name: buttons.LOGIN_BUTTON_BEA,
      })
      .click();
    await page.waitForURL((url) => url.toString().includes("schulung"));

    // expected URL partial after clicking the beA-Portal login link
    const expectedUrl = /schulung\.bea-brak\.de\/bea/;

    await expect(page).toHaveURL(expectedUrl);
    await expect(page.locator("h1")).toHaveText("Anmeldung");
  });

  test(`shows success alert box for status=logged-out URL param (will be shown after using the logout button)`, async ({
    page,
  }) => {
    await page.goto(`/login?status=${LogoutType.ByUser}`);
    await expect(page.getByRole("alert")).toContainText(
      alerts.LOGOUT_BY_USER_MESSAGE,
    );
  });

  test(`shows warning alert box for status=auto-logged-out URL param (will be shown after 60 min. of inactivity to our logged in users)`, async ({
    page,
  }) => {
    await page.goto(`/login?status=${LogoutType.Automatic}`);
    await expect(page.getByRole("alert")).toContainText(
      alerts.LOGOUT_AUTOMATIC_TITLE,
    );
  });

  test(`shows danger alert box for status=bea-login-error URL param (will be shown on any beA-portal login error)`, async ({
    page,
  }) => {
    await page.goto(`/login?status=${LoginError.BeA}`);
    await expect(page.getByRole("alert")).toContainText(
      errorMessages.LOGIN_ERROR_MESSAGE,
    );
  });

  test(`shows danger alert box for status=kompla-idp-login-error URL param (will be shown on any KomPla IdP login error)`, async ({
    page,
  }) => {
    await page.goto(`/login?status=${LoginError.KomplaIdp}`);
    await expect(page.getByRole("alert")).toContainText(
      alerts.LOGIN_ERROR_KOMPLA_IDP_MESSAGE,
    );
  });

  test('redirects to Keycloak login page when using the KomPla IdP login option ("KomPla-IdP-Login")', async ({
    page,
  }) => {
    // triple timeout, see: https://playwright.dev/docs/api/class-test#test-slow
    test.slow();
    await page.goto("/login");
    await page
      .getByRole("button", { name: buttons.LOGIN_BUTTON_KOMPLA_IDP_LABEL })
      .click();
    await page.waitForURL((url) =>
      url.toString().includes("openid-connect/auth"),
    );

    // expected URL partial after clicking the kompla-idp-login button — this
    // is Keycloak's own hosted login page, we never render username/password
    // fields ourselves
    const expectedUrl =
      /auth\.kompla-justiz\.sinc\.de\/realms\/kompla-dev\/protocol\/openid-connect\/auth/;

    await expect(page).toHaveURL(expectedUrl);
  });
});
