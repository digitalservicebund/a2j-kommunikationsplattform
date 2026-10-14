import { expect, test } from "@playwright/test";
import { HomePage } from "./pageObjects/homePage";
import { expectNoA11yViolations } from "./utils/a11y";
import { logInAsTestUser } from "./utils/login";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await logInAsTestUser(page);
  });

  test("I can see the Kopfzeile (Dachmarke)", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.visit();
    await expect(homePage.siteHeader.dachmarkeKopfzeile).toBeVisible();
  });

  test("I can see a table listing my Verfahren", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.visit();
    await expect(homePage.verfahrenTable).toBeVisible();
  });

  test("Homepage passes all accessibility checks", async ({ page }) => {
    await new HomePage(page).visit();
    await expectNoA11yViolations(page);
  });
});
