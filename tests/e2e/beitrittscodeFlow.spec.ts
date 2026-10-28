import { test } from "@playwright/test";
import {
  BeitrittscodeConfirmationPage,
  BeitrittscodePage,
} from "./pageObjects/beitrittscodePage";
import { HomePage } from "./pageObjects/homePage";
import { VerfahrenDetailsPage } from "./pageObjects/verfahrenDetailsPage";
import { logInAsTestUser } from "./utils/login";

test.describe("Joining a Verfahren (Beitrittscode / Lift)", () => {
  const dummyValidCode = "K7M4-9PXQ-2WRT";
  const dummyInvalidCode = "3XQ7-TB2M-9KVH";

  const verfahrenDetailsForDummyValidCode = {
    verfahrenId: "01a1118d-8bbd-7a6d-b5b0-3f5611c01565",
    kurzrubrum: "Schwanenburg-Weiß ./. Weiß",
    gericht: "Amtsgericht Bremen",
    aktenzeichenGericht: "43 C 6134/26",
    klagendePartei: "Helene-Marie Augusta Schwanenburg-Weiß",
    beklagtePartei: "Kathrin Weiß",
  };

  test("I can join a Verfahren bei entering a valid, unused Beitrittscode", async ({
    page,
  }) => {
    const code = dummyValidCode;

    await logInAsTestUser(page);

    const homePage = new HomePage(page);
    await homePage.startBeitrittscodeFlow();

    const beitrittscodePage = new BeitrittscodePage(page);
    await beitrittscodePage.expectToBeHere();
    await beitrittscodePage.enterBeitrittscode(code);
    await beitrittscodePage.submit();

    const confirmationPage = new BeitrittscodeConfirmationPage(page, code);
    await confirmationPage.expectToBeHere();

    const {
      kurzrubrum,
      gericht,
      aktenzeichenGericht,
      klagendePartei,
      beklagtePartei,
    } = verfahrenDetailsForDummyValidCode;
    await confirmationPage.expectRubrum(kurzrubrum);
    await confirmationPage.expectGericht(gericht);
    await confirmationPage.expectAktenzeichenGericht(aktenzeichenGericht);
    await confirmationPage.expectKlagendePartei(klagendePartei);
    await confirmationPage.expectBeklagtePartei(beklagtePartei);
    await confirmationPage.confirm();

    const { verfahrenId } = verfahrenDetailsForDummyValidCode;
    const detailsPage = new VerfahrenDetailsPage(page, verfahrenId);
    await detailsPage.expectToBeHere();

    // TODO: Uncomment once the API gets a real lift code implementation
    // await detailsPage.overview.expectToBeVisible();
    // await expect(detailsPage.overview.locator).toContainText(kurzrubrum);
    // await expect(detailsPage.overview.locator).toContainText(gericht);
    // await expect(detailsPage.overview.locator).toContainText(
    //   aktenzeichenGericht,
    // );
    // await expect(detailsPage.overview.locator).toContainText(klagendePartei);
    // await expect(detailsPage.overview.locator).toContainText(beklagtePartei);
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
  });
});
