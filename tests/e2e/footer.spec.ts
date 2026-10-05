import { expect, test } from "@playwright/test";
import { getTestTranslations } from "tests/utils/translationsUtil";

const t = getTestTranslations();

const links = [
  {
    label: t.layout.footer.links.dataProtection,
    url: "/datenschutz",
    pageHeading: t.routes.DATENSCHUTZ_TITLE,
  },
  {
    label: t.layout.footer.links.moreInfo,
    url: "/weitere-informationen",
    pageHeading: t.routes.WEITERE_INFORMATIONEN_TITLE,
  },
  {
    label: t.layout.footer.links.accessibility,
    url: "/barrierefreiheit",
    pageHeading: t.routes.BARRIEREFREIHEIT_TITLE,
  },
  {
    label: t.layout.footer.links.help,
    url: "/hilfe-und-kontakt",
    pageHeading: t.routes.HILFE_UND_KONTAKT_TITLE,
  },
  {
    label: t.layout.footer.links.openSource,
    url: "/open-source",
    pageHeading: t.routes.OPEN_SOURCE_CODE_TITLE,
  },
  {
    label: t.layout.footer.links.impressum,
    url: "/impressum",
    pageHeading: t.routes.IMPRESSUM_TITLE,
  },
];

test.describe("Footer (rendered for alle pages)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should redirect users to the correct page when they click on a link", async ({
    page,
  }) => {
    await page.goto("/");
    for (const { label, url, pageHeading } of links) {
      await page.getByRole("link", { name: label }).click();
      await expect(page).toHaveURL(url);
      await expect(
        page.getByRole("heading", { name: pageHeading }),
      ).toBeVisible();
    }
  });
});
