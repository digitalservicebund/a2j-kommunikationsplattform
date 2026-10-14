import { defineConfig, devices } from "@playwright/test";
import e2eTestConfig from "./tests/e2e/utils/e2eTestConfig.ts";

const { baseURL, basicAuth } = e2eTestConfig();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "tests/e2e/",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests. */
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    [
      "html",
      {
        outputFolder: "./playwright-report",
      },
    ],
  ] /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */,
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 5 * 1000,
    /* Base URL to use in actions like `await page.goto("/")`. */
    baseURL,
    /* See https://playwright.dev/docs/test-use-options#network-options.
    Fix for: Refused to send form data to 'https://kompla.dev.tech.digitalservice.dev/action/login-user' because
    it violates the following Content Security Policy directive: "form-action 'self'". */
    bypassCSP: true,
    /* Credentials for HTTP authentication. See https://playwright.dev/docs/api/class-testoptions#test-options-http-credentials */
    httpCredentials: {
      username: basicAuth.username,
      password: basicAuth.password,
    },
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    /* Emulate German locale, which is the most likely user setting */
    locale: "de-DE",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },
    //
    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: "Mobile Chrome",
    //   use: { ...devices["Pixel 5"] },
    // },
    // {
    //   name: "Mobile Safari",
    //   use: { ...devices["iPhone 12"] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: "Microsoft Edge",
    //   use: { ...devices["Desktop Edge"], channel: "msedge" },
    // },
    // {
    //   name: "Google Chrome",
    //   use: { ...devices["Desktop Chrome"], channel: "chrome" },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: "npm start", // "npm run dev:op"
  //   url: "http://localhost:3000",
  //   reuseExistingServer: !process.env.CI,
  // },
});
