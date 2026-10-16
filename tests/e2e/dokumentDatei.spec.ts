import { expect, test } from "@playwright/test";

test.describe("Dokument Datei resource route", () => {
  test("redirects to login and back to the Dokument when not logged in", async ({
    page,
  }) => {
    const dateiPath =
      "/verfahren/11111111-1111-1111-1111-111111111111/einreichungen/22222222-2222-2222-2222-222222222222/dokumente/33333333-3333-3333-3333-333333333333/datei?disposition=attachment";

    await page.goto(dateiPath);
    await page.waitForURL(new URLPattern({ pathname: "/login" }));

    expect(new URL(page.url()).searchParams.get("next")).toBe(dateiPath);
  });
});
