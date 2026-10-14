import { expect, test } from "@playwright/test";
import { getTestTranslations } from "~tests/utils/translationsUtil";
import { HomePage } from "./pageObjects/homePage";
import {
  BeALoginPage,
  KomPlaIdpLoginPage,
  LoginPage,
} from "./pageObjects/loginPage";
import { expectNoA11yViolations } from "./utils/a11y";
import e2eTestConfig from "./utils/e2eTestConfig";
import { logInAsTestUser } from "./utils/login";

test.describe("Login", () => {
  const t = getTestTranslations();

  test("I am redirected to login page if not logged in", async ({ page }) => {
    await page.goto("/");
    const loginPage = new LoginPage(page);
    await loginPage.expectToBeHere();
  });

  test("I am redirected to the BRAK IdP when choosing beA login", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.visit();
    await loginPage.startBeALogin();

    const beaLoginPage = new BeALoginPage(page);
    await beaLoginPage.expectToBeHere();
  });

  test("I can log in via KomPla IdP", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.visit();
    await loginPage.startKomPlaIdpLogin();

    const komPlaIdpLoginPage = new KomPlaIdpLoginPage(page);
    await komPlaIdpLoginPage.expectToBeHere();

    const { testUser } = e2eTestConfig();
    await komPlaIdpLoginPage.enterUsername(testUser.komPlaIdpUsername);
    await komPlaIdpLoginPage.enterPassword(testUser.komPlaIdpPassword);
    await komPlaIdpLoginPage.submit();

    const homePage = new HomePage(page);
    await homePage.expectToBeHere();
    await homePage.siteHeader.expectDisplayedUserName(testUser.name);
  });

  test("I see a success notice on the login page after I log out", async ({
    page,
  }) => {
    await logInAsTestUser(page);

    const homePage = new HomePage(page);
    await homePage.expectToBeHere();
    await homePage.siteHeader.logOut();

    const loginPage = new LoginPage(page);
    await loginPage.expectToBeHere();
    await expect(loginPage.alert).toContainText(
      t.alerts.LOGOUT_BY_USER_MESSAGE,
    );
  });

  test("Login page passess all accessibility checks", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.visit();
    await expectNoA11yViolations(page);
  });
});
