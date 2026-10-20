import { test } from "@playwright/test";
import { DokumentDateiPage } from "./pageObjects/dokumentDateiPage";
import { LoginPage } from "./pageObjects/loginPage";

test.describe("Dokument Datei resource route", () => {
  test("redirects to login and back to the Dokument when not logged in", async ({
    page,
  }) => {
    const dateiPath =
      "/verfahren/11111111-1111-1111-1111-111111111111/einreichungen/22222222-2222-2222-2222-222222222222/dokumente/33333333-3333-3333-3333-333333333333/datei?disposition=attachment";

    await new DokumentDateiPage(page, {
      verfahrenId: "11111111-1111-1111-1111-111111111111",
      einreichungId: "22222222-2222-2222-2222-222222222222",
      dokumentId: "33333333-3333-3333-3333-333333333333",
    }).visit();
    const loginPage = new LoginPage(page);
    await loginPage.expectToBeHere();
    await loginPage.expectWillRedirectTo(dateiPath);
  });
});
