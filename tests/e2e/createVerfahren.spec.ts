// import { test, expect } from "@playwright/test";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// test.describe("Verfahren page tests", () => {
//   test("should create a new Verfahren", async ({ page }) => {
//     // Go to /verfahren page
//     await page.goto("/verfahren");

//     // Count the number of Verfahren items before submission
//     const verfahrenCountBefore = await page.$$eval(
//       '[data-testid="verfahren-item"]',
//       (elements) => elements.length,
//     );

//     // Click on the "Neue Klage einreichen" button
//     await page.click('[data-testid="create-verfahren-button"]');

//     // Attach the xjustiz file to the form
//     const xjustizFilePath = path.resolve(
//       __dirname,
//       "./files/sample_xjustiz_nachricht_3_6.xml",
//     );
//     await page.setInputFiles('input[name="xjustiz"]', xjustizFilePath);

//     // Click on the "Klage einreichen" button to submit
//     await page.click('[data-testid="submit-verfahren-button"]');

//     // Wait for the page to reload or update after submission
//     await page.waitForLoadState("networkidle");

//     // Reload the page to ensure the new Verfahren is displayed
//     await page.reload();

//     const verfahrenCountAfter = await page.$$eval(
//       '[data-testid="verfahren-item"]',
//       (elements) => elements.length,
//     );

//     // Ensure that the amount of `verfahren` is now one more
//     expect(verfahrenCountAfter).toBe(verfahrenCountBefore + 1);
//   });
// });
