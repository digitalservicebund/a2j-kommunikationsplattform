import { defineConfig, devices } from "@playwright/test";
import e2eTestConfig from "./tests/e2e/utils/e2eTestConfig.ts";

const { baseURL, basicAuth } = e2eTestConfig();
const isRunningInCI = !!process.env.CI;

/**
 * See https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "tests/e2e/",
  fullyParallel: true,
  forbidOnly: isRunningInCI,
  retries: isRunningInCI ? 2 : 0,
  workers: 1,

  reporter: [
    [
      "html",
      {
        outputFolder: "./playwright-report",
      },
    ],
  ],

  expect: {
    // Increase default expect timeout because the backend API can take a
    // while for some operations in the staging environment
    timeout: 10_000,
  },

  use: {
    baseURL,

    // Emulate German locale, which is the most likely user setting
    locale: "de-DE",

    // HTTP Basic Authentication credentials needed for staging
    httpCredentials: {
      username: basicAuth.username,
      password: basicAuth.password,
    },

    // Collect trace when for a failed test's first run.
    // See https://playwright.dev/docs/trace-viewer
    trace: "retain-on-first-failure",

    // Fix for: Refused to send form data to 'https://kompla.dev.tech.digitalservice.dev/action/login-user' because
    // it violates the following Content Security Policy directive: "form-action 'self'".
    bypassCSP: true,
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  // Automatically start the development server with the tests, except when
  // it is already running or the tests are run in the CI/CD pipeline.
  webServer: isRunningInCI
    ? undefined
    : {
        command: "npm run dev:op",
        url: "http://localhost:3000",
        reuseExistingServer: true,
      },
});
