import { expect, test } from "@playwright/test";

const links = [
  {
    label: "Datenschutz",
    url: "/datenschutz",
    h1: "Datenschutzerklärung zur Webseite",
  },
  {
    label: "Weitere Informationen",
    url: "/weitere-informationen",
    h1: "Weitere Informationen",
  },
  {
    label: "Barrierefreiheit",
    url: "/barrierefreiheit",
    h1: "Erklärung zur Barrierefreiheit",
  },
  {
    label: "Hilfe und Kontakt",
    url: "/hilfe-und-kontakt",
    h1: "Hilfe und Kontakt",
  },
  { label: "Open Source Code", url: "/open-source", h1: "Open Source Code" },
  { label: "Impressum", url: "/impressum", h1: "Impressum" },
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
      await expect(page.locator("h1")).toHaveText(h1);
    }
  });
});
