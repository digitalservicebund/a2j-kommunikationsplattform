import { expect, test } from "@playwright/test";
import { HomePage } from "./pageObjects/homePage";
import {
  VerfahrenNeuPage,
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
    const verfahrenNeu = new VerfahrenNeuPage(page);
    await verfahrenNeu.expectToBeHere();
    await expectNoA11yViolations(page);

    // One of my authorized SAFE-IDs is preselected for the new Verfahren
    await expect(verfahrenNeu.safeIdSelect).not.toHaveValue("");
    const safeId = await verfahrenNeu.safeIdSelect.inputValue();

    // Temporary test setup: the placeholder ZOV list includes Amtsgericht
    // Bremen, so both options show. Bremen is not part of the KomPla pilot.
    await verfahrenNeu.selectEmpfaengergericht("Amtsgericht Bremen");
    await expect(verfahrenNeu.komplaButton).toBeVisible();
    await expect(verfahrenNeu.eingabesystemButton).toBeVisible();
    await verfahrenNeu.startKomplaKlageeinreichung();

    // I should be redirected to the Dokumente step
    const dokumenteStep = new VerfahrenDokumentePage(page);
    await dokumenteStep.expectToBeHere();
    await dokumenteStep.expectSelectedSafeId(safeId);
    await expectNoA11yViolations(page);

    // I should not be able to move to the next step yet
    await expect(dokumenteStep.disabledNextButton).toHaveAttribute(
      "aria-disabled",
      "true",
    );

    // I can upload an attachment (but should not be able to continue yet)
    await dokumenteStep.upload("ANHANG", "beweismittel1.pdf");
    await dokumenteStep.expectDokumentToHaveBeenUploaded(
      "ANHANG",
      "beweismittel1.pdf",
    );
    await expect(dokumenteStep.disabledNextButton).toHaveAttribute(
      "aria-disabled",
      "true",
    );

    // I can continue to the next step once I uploaded the Klageschrift
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
    await expectNoA11yViolations(page);

    // Specify Beteiligungen
    await beteiligteStep.fillFirstKlagendePartei({
      vorname: "Erika",
      nachname: "Mustermann",
      strasse: "Heidestraße",
      hausnummer: "17",
      postleitzahl: "51147",
      ort: "Köln",
    });
    await beteiligteStep.fillFirstKlagendeParteiProzessbevollmaechtigte({
      bezeichnung: "Rechtsanwalt Dr. Kathrin Hölzer",
      kanzleiform: "Einzelanwalt",
      geschaeftszeichen: "Mustermann ./. Kartal",
      strasse: "Hauptstraße",
      hausnummer: "15",
      postleitzahl: "80123",
      ort: "München",
    });
    await beteiligteStep.addSecondKlagendePartei({
      vorname: "Max",
      nachname: "Mustermann",
      strasse: "Heidestraße",
      hausnummer: "17",
      postleitzahl: "51147",
      ort: "Köln",
    });
    await beteiligteStep.selectProzessbevollmaechtigteForKlagendePartei({
      parteiNumber: 2,
      prozessbevollmaechtigteNumber: 1,
    });
    await beteiligteStep.fillFirstBeklagtePartei({
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

    // Start a Weitere Einreichung and delete its draft again
    const weitereEinreichung = detailsPage.timeline.weitereEinreichung;
    await weitereEinreichung.selectArt("Schriftsatz");
    await expect(weitereEinreichung.artSelect).toHaveValue("Schriftsatz");

    const deleteDialog = await weitereEinreichung.openDeleteDialog();
    await deleteDialog.expectToBeVisible();
    await expectNoA11yViolations(page);
    await deleteDialog.confirm();

    // The Art can be picked again for a new draft
    await expect(weitereEinreichung.artSelect).toHaveValue("");
    await expect(weitereEinreichung.artSelect).not.toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });
});
