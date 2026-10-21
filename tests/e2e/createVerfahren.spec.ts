import { expect, test } from "@playwright/test";
import { HomePage } from "./pageObjects/homePage";
import {
  VerfahrenCreationStep2Page,
  VerfahrenCreationStep1Page,
} from "./pageObjects/verfahrenCreationPages";
import { VerfahrenDetailsPage } from "./pageObjects/verfahrenDetailsPage";
import { logInAsTestUser } from "./utils/login";

test.describe("Verfahren creation", () => {
  test.afterEach(async ({ page }) => {
    await page.screenshot({ path: "tmp/screenshot.png", fullPage: true });
  });

  test("I can create a Verfahren and submit the Klageeinreichung", async ({
    page,
  }) => {
    // Document upload, submission and virus checking can take a while,
    // so increase the timeout to avoid intermittent test failures.
    test.slow();

    await logInAsTestUser(page);

    // Start Verfahren creation flow
    const homePage = new HomePage(page);
    await homePage.startVerfahrenCreationFlow();

    // I should be redirected to the first Verfahren creation step
    const step1 = new VerfahrenCreationStep1Page(page);
    await step1.expectToBeHere();

    // Upload Klageschrift
    await step1.selectKlageschriftFile("klageschrift.pdf");

    // Enter initial Verfahren details and submit
    await step1.enterVerfahrensgegenstand("Zahlungsklage");
    await step1.selectEmpfaengergericht("Amtsgericht Bremen");
    await step1.submit();

    // I should be redirected to the second step
    const step2 = new VerfahrenCreationStep2Page(page);
    await step2.expectToBeHere();

    // Specify Beteiligungen
    await step2.addKlagendePartei({
      vorname: "Erika",
      nachname: "Mustermann",
      strasse: "Heidestraße",
      hausnummer: "17",
      postleitzahl: "51147",
      ort: "Köln",
    });
    await step2.addKlagendeParteiProzessbevollmaechtigte({
      bezeichnung: "Rechtsanwalt Dr. Kathrin Hölzer",
      kanzleiform: "Einzelanwalt",
      strasse: "Hauptstraße",
      hausnummer: "15",
      postleitzahl: "80123",
      ort: "München",
    });
    await step2.addBeklagtePartei({
      vorname: "Emine",
      nachname: "Kartal",
      strasse: "Eichenring",
      hausnummer: "115",
      postleitzahl: "30270",
      ort: "Hannover",
      email: "emine.kartal@example.com",
      telefon: "0170123456",
    });

    // Enter last Verfahren details
    await step2.enterRubrum("Mustermann ./. Kartal");
    await step2.enterGeschaeftszeichenProzessbevollmaechigte(
      "Mustermann ./. Kartal",
    );

    // Upload Anlagen and submit
    await step2.uploadAnhang("beweismittel1.pdf");
    await step2.expectAnhangToHaveBeenUploaded("beweismittel1.pdf");
    await step2.uploadAnhang("beweismittel2.pdf");
    await step2.expectAnhangToHaveBeenUploaded("beweismittel2.pdf");
    await step2.submit();

    // I should be redirected to the details page
    const detailsPage = new VerfahrenDetailsPage(page);
    await detailsPage.expectToBeHere();

    // I should see the data I entered in the overview section
    await detailsPage.overview.expectToBeVisible();
    for (const text of [
      // Klagende Partei
      "Erika Mustermann",
      "Heidestraße 17, 51147 Köln",
      // Klagende Partei - Prozessbevollmächtigte
      "Rechtsanwalt Dr. Kathrin Hölzer",
      "Hauptstraße 15, 80123 München",
      // Beklagte Partei
      "Emine Kartal",
      "Eichenring 115, 30270 Hannover",
      "0170123456",
    ]) {
      await expect(detailsPage.overview.locator).toContainText(text);
    }

    // I should see the files I uploaded
    const draftKlageeinreichung = detailsPage.timeline.draftKlageeinreichung;
    await draftKlageeinreichung.expectToBeVisible();
    await draftKlageeinreichung.expectDocumentToBeListed("klageschrift.pdf");
    await draftKlageeinreichung.expectDocumentToBeListed("beweismittel1.pdf");
    await draftKlageeinreichung.expectDocumentToBeListed("beweismittel2.pdf");

    // Submit the Klageeinreichung
    await draftKlageeinreichung.expectDisplayedStatus("ready");
    await draftKlageeinreichung.submit();

    // I should see that the Klageeinreichung was submitted and is pending
    // processing by the Gericht
    await detailsPage.timeline
      .entryByTitle("Klageeinreichung")
      .expectDisplayedStatus("beantragt");
  });
});
