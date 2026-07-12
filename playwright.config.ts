import { defineConfig, devices } from "@playwright/test";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
// Check if we are executing a remote canary/smoke deployment test pass
const isDeploymentTest = !!process.env.PLAYWRIGHT_TEST_BASE_URL;

export default defineConfig({
  testDir: "./tests",
  
  /* Run tests in files in parallel internally, EXCEPT during canary runs */
  fullyParallel: !isDeploymentTest,
  
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  
  /* FIXED: Retry on CI OR during smoke deployments to absorb cold-start 429s */
  retries: process.env.CI || isDeploymentTest ? 2 : 0,
  
  /* FIXED: Use exactly 1 worker for deployment smoke tests to prevent container flooding */
  workers: process.env.CI || isDeploymentTest ? 1 : undefined,
  
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI ? [["html"], ["list"], ["github"]] : [["html"], ["list"]],
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || "http://localhost:5173",
    
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    
    /* Screenshot on failure */
    screenshot: "only-on-failure",
    
    /* FIXED: Increase navigation timeouts to give Cloud Run time to initialize */
    navigationTimeout: 15000, // 15 seconds
    actionTimeout: 10000,     // 10 seconds
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    /* Test against mobile viewports. */
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 13"] },
    },
    /* Test against tablet viewports */
    {
      name: "iPad",
      use: { ...devices["iPad Pro"] },
    },
  ],

  /* Run your local dev server before starting the tests */
  // FIXED: Completely bypass spawning a local webserver if we are testing a deployed URL
  webServer: isDeploymentTest ? undefined : {
    command: "npm run dev",
    url: "http://localhost:5173",
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
