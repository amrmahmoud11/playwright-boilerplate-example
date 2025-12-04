/**
 * @fileoverview
 * Configuration file for Playwright test runner. This configuration script sets up the environment,
 * specifies test directory paths, manages test execution behavior, defines reporting mechanisms, 
 * and configures various Playwright settings such as screenshots, video capture, and action timeouts.
 * Environment variables are read from a .env file to ensure sensitive configurations are managed securely.
 * This setup is designed to support different testing scenarios across multiple browsers and conditions,
 * including mobile and desktop views, and to handle specific needs on continuous integration servers.
 * It includes configurations for conditional test retries, screenshot behaviors, and custom report generation.
 */

import { defineConfig, devices } from '@playwright/test';
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') })
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './src/tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html']],
  // Output directory for videos and screenshots
  outputDir: './test-results/', // Ensure this directory exists or will be created
  // Global timeout
  timeout: 120000,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    // Set viewport to 1920x1080
    viewport: { width: 1920, height: 1080 },
    // Enable screenshots for failed tests
    screenshot: 'only-on-failure', // You can also use 'on' for all tests
    // Enable video recording for each test
    video: 'retain-on-failure', // You can also use 'on' to record all tests
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',
    /* Maximum timeout for individual interaction, in milliseconds */
    actionTimeout: 5 * 1000,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },
  // 10s required for stable screenshots
  // 15s required for demo, as chatbot is sometimes slow on webkit
  expect: {
    timeout: 15000,
  },
  /* Configure projects for all the supported countries, we can add browser specific projects
  if a browser is required to be supported by the product like AU-chromium, AU-firefox */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },

  ]
  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});