import { Page } from "@playwright/test";
import { KomPlaIdpLoginPage, LoginPage } from "../pageObjects/loginPage";
import e2eTestConfig from "./e2eTestConfig";

export async function logInAsTestUser(page: Page) {
  const { baseURL, testUser } = e2eTestConfig();

  const loginPage = new LoginPage(page);
  await loginPage.visit();
  await loginPage.startKomPlaIdpLogin();

  const komPlaIdpLoginPage = new KomPlaIdpLoginPage(page);
  await komPlaIdpLoginPage.enterUsername(testUser.komPlaIdpUsername);
  await komPlaIdpLoginPage.enterPassword(testUser.komPlaIdpPassword);
  await komPlaIdpLoginPage.submit();

  await page.waitForURL((url) => url.href.startsWith(baseURL));
}
