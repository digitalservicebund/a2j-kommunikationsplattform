import { expect, test } from "@playwright/test";

const navigationLinksList = [
  { label: "Verfahren" },
  { label: "Mitteilungen" },
  { label: "Kalender" },
  { label: "Profil" },
];

test.describe("Verfahrensübersicht", () => {
  test("shows logo", async ({ page }) => {
    await page.goto("/verfahrensuebersicht");
    await expect(page.locator("text=Kommunikationsplattform")).toBeVisible();
  });
  test("shows all navigation links", async ({ page }) => {
    await page.goto("/verfahrensuebersicht");
    for (const link of navigationLinksList) {
      await expect(page.getByRole("link", { name: link.label })).toBeVisible();
    }
  });

  test("shows user profile cell", async ({ page }) => {
    await page.goto("/verfahrensuebersicht");
    await expect(page.locator("text=Kim Neumann")).toBeVisible();
  });
});
