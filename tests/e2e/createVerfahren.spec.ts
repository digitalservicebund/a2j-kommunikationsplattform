import { expect, test } from "@playwright/test";
import { HomePage } from "./pageObjects/homePage";
import {
  GerichtAuswahlPage,
  VerfahrenBeteiligtePage,
  VerfahrenDetailsStepPage,
  VerfahrenDokumentePage,
} from "./pageObjects/verfahrenCreationPages";
import { VerfahrenDetailsPage } from "./pageObjects/verfahrenDetailsPage";
import { expectNoA11yViolations } from "./utils/a11y";
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

    // I should be redirected to the court selection
    const gerichtAuswahl = new GerichtAuswahlPage(page);
    await gerichtAuswahl.expectToBeHere();
    await expectNoA11yViolations(page);

    // Amtsgericht Bremen supports both KomPla and the Eingabesystem
    await gerichtAuswahl.selectEmpfaengergericht("Amtsgericht Bremen");
    await expect(gerichtAuswahl.komplaButton).toBeVisible();
    await expect(gerichtAuswahl.eingabesystemButton).toBeVisible();
    await gerichtAuswahl.startKomplaKlageeinreichung();

    // I should be redirected to the Dokumente step
    const dokumenteStep = new VerfahrenDokumentePage(page);
    await dokumenteStep.expectToBeHere();
    await expectNoA11yViolations(page);
    await expect(dokumenteStep.disabledNextButton).toHaveAttribute(
      "aria-disabled",
      "true",
    );

    // The first upload creates the Verfahren, regardless of its type
    await dokumenteStep.upload("ANHANG", "beweismittel1.pdf");
    await dokumenteStep.expectDokumentToHaveBeenUploaded(
      "ANHANG",
      "beweismittel1.pdf",
    );
    await expect(dokumenteStep.disabledNextButton).toHaveAttribute(
      "aria-disabled",
      "true",
    );

    // Weiter is only available once the Klageschrift has been uploaded
    await dokumenteStep.upload("SCHRIFTSTUECK", "klageschrift.pdf");
    await dokumenteStep.expectDokumentToHaveBeenUploaded(
      "SCHRIFTSTUECK",
      "klageschrift.pdf",
    );
    await dokumenteStep.expectValidierungsstatusToBeShown(
      "SCHRIFTSTUECK",
      "klageschrift.pdf",
    );
    await dokumenteStep.upload("ANHANG", "beweismittel2.pdf");
    await dokumenteStep.expectDokumentToHaveBeenUploaded(
      "ANHANG",
      "beweismittel2.pdf",
    );
    await expectNoA11yViolations(page);
    await dokumenteStep.next();

    // The Verfahrensdetails are prefilled, the court is fixed
    const detailsStep = new VerfahrenDetailsStepPage(page);
    await detailsStep.expectToBeHere();
    await expectNoA11yViolations(page);
    await expect(detailsStep.verfahrensgegenstandInput).toHaveValue(
      "Zahlungsklage",
    );
    await expect(detailsStep.empfaengergerichtSelect).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    await expect(
      detailsStep.empfaengergerichtSelect.locator("option:checked"),
    ).toHaveText("Amtsgericht Bremen");
    await detailsStep.enterRubrum("Mustermann ./. Kartal");
    await detailsStep.next();

    // I should be redirected to the Beteiligte step
    const beteiligteStep = new VerfahrenBeteiligtePage(page);
    await beteiligteStep.expectToBeHere();

    // Specify Beteiligungen
    await beteiligteStep.addKlagendePartei({
      vorname: "Erika",
      nachname: "Mustermann",
      strasse: "Heidestraße",
      hausnummer: "17",
      postleitzahl: "51147",
      ort: "Köln",
    });
    await beteiligteStep.addKlagendeParteiProzessbevollmaechtigte({
      bezeichnung: "Rechtsanwalt Dr. Kathrin Hölzer",
      kanzleiform: "Einzelanwalt",
      geschaeftszeichen: "Mustermann ./. Kartal",
      strasse: "Hauptstraße",
      hausnummer: "15",
      postleitzahl: "80123",
      ort: "München",
    });
    await beteiligteStep.addBeklagtePartei({
      vorname: "Emine",
      nachname: "Kartal",
      strasse: "Eichenring",
      hausnummer: "115",
      postleitzahl: "30270",
      ort: "Hannover",
      email: "emine.kartal@example.com",
      telefon: "0170123456",
    });

    await beteiligteStep.submit();

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
