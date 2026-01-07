import { expect, test } from "@playwright/test";
import { getTestTranslations } from "tests/util/translationsUtil";

const { contentLinkLabels, routes } = getTestTranslations();

const links = [
  {
    label: contentLinkLabels.DATENSCHUTZ_LINK_LABEL,
    url: "/datenschutz",
    h1: routes.DATENSCHUTZ_TITLE,
  },
  {
    label: contentLinkLabels.WEITERE_INFORMATIONEN_LINK_LABEL,
    url: "/weitere-informationen",
    h1: routes.WEITERE_INFORMATIONEN_TITLE,
  },
  {
    label: contentLinkLabels.BARRIEREFREIHEIT_LINK_LABEL,
    url: "/barrierefreiheit",
    h1: routes.BARRIEREFREIHEIT_TITLE,
  },
  {
    label: contentLinkLabels.HILFE_UND_KONTAKT_LINK_LABEL,
    url: "/hilfe-und-kontakt",
    h1: routes.HILFE_UND_KONTAKT_TITLE,
  },
  {
    label: contentLinkLabels.OPEN_SOURCE_CODE_LINK_LABEL,
    url: "/open-source",
    h1: routes.OPEN_SOURCE_CODE_TITLE,
  },
  {
    label: contentLinkLabels.IMPRESSUM_LINK_LABEL,
    url: "/impressum",
    h1: routes.IMPRESSUM_TITLE,
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
    for (const { label, url, h1 } of links) {
      await page.getByRole("link", { name: label }).click();
      await expect(page).toHaveURL(url);
      await expect(page.getByRole("heading", { name: h1 })).toBeVisible();
    }
  });
});
