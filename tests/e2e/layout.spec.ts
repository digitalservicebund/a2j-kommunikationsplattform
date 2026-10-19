import { expect, test } from "@playwright/test";
import { getTestTranslations } from "~tests/utils/translationsUtil";
import { SiteFooter, SiteHeader } from "./pageObjects/base";

const t = getTestTranslations();

const expectedFooterLinks = [
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

test.describe("Site layout (all pages)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("I can see the Kopfzeile (Dachmarke)", async ({ page }) => {
    const header = new SiteHeader(page);
    await expect(header.dachmarkeKopfzeile).toBeVisible();
  });

  for (const { label, url, pageHeading } of expectedFooterLinks) {
    test(`I can see and follow footer link "${label}"`, async ({ page }) => {
      const footer = new SiteFooter(page);
      const link = footer.locator.getByRole("link", { name: label });
      await expect(link).toBeVisible();

      await link.click();
      await expect(page).toHaveURL(url);

      const heading = page.getByRole("heading", { name: pageHeading });
      await expect(heading).toBeVisible();
    });
  }
});
