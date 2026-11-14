import { expect, test } from "@playwright/test";
import { HomePage } from "./pageObjects/homePage";
import {
  GerichtAuswahlPage,
  VerfahrenDokumentePage,
} from "./pageObjects/verfahrenCreationPages";
import { VerfahrenDetailsPage } from "./pageObjects/verfahrenDetailsPage";
import { expectNoA11yViolations } from "./utils/a11y";
import { logInAsTestUser } from "./utils/login";

test.describe("Verfahren deletion", () => {
  test("I can delete a Verfahren whose Klage hasn't been submitted yet", async ({
    page,
  }) => {
    await logInAsTestUser(page);

    const homePage = new HomePage(page);
    await homePage.startVerfahrenCreationFlow();

    const gerichtAuswahl = new GerichtAuswahlPage(page);
    await gerichtAuswahl.expectToBeHere();
    await gerichtAuswahl.selectEmpfaengergericht("Amtsgericht Bremen");
    await gerichtAuswahl.startKomplaKlageeinreichung();

    // The first upload creates the Verfahren
    const dokumenteStep = new VerfahrenDokumentePage(page);
    await dokumenteStep.expectToBeHere();
    await dokumenteStep.upload("ANHANG", "beweismittel1.pdf");
    await dokumenteStep.expectDokumentToHaveBeenUploaded(
      "ANHANG",
      "beweismittel1.pdf",
    );
    const verfahrenId = dokumenteStep.verfahrenId;
    if (!verfahrenId) {
      throw new Error("The upload should have created a Verfahren");
    }

    const detailsPage = new VerfahrenDetailsPage(page, verfahrenId);
    await page.goto(`/verfahren/${verfahrenId}`);
    await detailsPage.expectToBeHere();

    const deleteDialog = await detailsPage.overview.openDeleteDialog();
    await deleteDialog.expectToBeVisible();
    await expectNoA11yViolations(page);
    await deleteDialog.confirm();

    // I should be back on the Verfahren overview, without the deleted one
    await homePage.expectToBeHere();
    await expect(
      homePage.verfahrenTable.locator(`a[href="/verfahren/${verfahrenId}"]`),
    ).toHaveCount(0);
  });
});
