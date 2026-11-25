import { expect, test } from "@playwright/test";
import {
  BeitrittscodeConfirmationPage,
  BeitrittscodePage,
} from "./pageObjects/beitrittscodePage";
import { HomePage } from "./pageObjects/homePage";
import { VerfahrenDetailsPage } from "./pageObjects/verfahrenDetailsPage";
import { expectNoA11yViolations } from "./utils/a11y";
import { logInAsTestUser } from "./utils/login";

test.describe("Joining a Verfahren (Beitrittscode / Lift)", () => {
  const dummyValidCode = "K7M4-9PXQ-2WRT";
  const dummyInvalidCode = "3XQ7-TB2M-9KVH";

  test("I can join a Verfahren bei entering a valid, unused Beitrittscode", async ({
    page,
  }) => {
    const code = dummyValidCode;

    await logInAsTestUser(page);

    const homePage = new HomePage(page);
    await homePage.startBeitrittscodeFlow();

    const beitrittscodePage = new BeitrittscodePage(page);
    await beitrittscodePage.expectToBeHere();
    await expectNoA11yViolations(page);
    await beitrittscodePage.enterBeitrittscode(code);
    await beitrittscodePage.submit();

    const confirmationPage = new BeitrittscodeConfirmationPage(page, code);
    await confirmationPage.expectToBeHere();
    await expectNoA11yViolations(page);
    await confirmationPage.expectKurzrubrumDisplayed();
    await confirmationPage.expectGerichtDisplayed();
    await confirmationPage.expectAktenzeichenGerichtDisplayed();
    await confirmationPage.expectKlagendeParteiDisplayed();
    await confirmationPage.expectBeklagteParteiDisplayed();

    await expect(confirmationPage.safeIdSelect).not.toHaveValue("");
    await confirmationPage.confirm();

    const detailsPage = new VerfahrenDetailsPage(page);
    await detailsPage.expectToBeHere();
    await detailsPage.overview.expectToBeVisible();
  });

  test("I get a helpful feedback if the code is invalid", async ({ page }) => {
    const code = dummyInvalidCode;

    await logInAsTestUser(page);

    const homePage = new HomePage(page);
    await homePage.startBeitrittscodeFlow();

    const beitrittscodePage = new BeitrittscodePage(page);
    await beitrittscodePage.expectToBeHere();
    await beitrittscodePage.enterBeitrittscode(code);
    await beitrittscodePage.submit();

    await beitrittscodePage.expectInvalidCodeFeedback();
    await expectNoA11yViolations(page);
  });
});
