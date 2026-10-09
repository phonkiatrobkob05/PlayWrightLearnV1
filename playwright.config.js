// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

const ENV = process.env.ENV || 'dev';
dotenv.config({ path: path.resolve(__dirname, 'env', `.env.${ENV}`), quiet: true });

export default defineConfig({
  testDir: './tests/e-Memo/DHL',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],

  use: {
    baseURL: process.env.DHL_URL,
    screenshot: 'on',
    video: 'on',
    trace: 'retain-on-failure',
    launchOptions: {
    slowMo: 500,
  },
  },

  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.js/,
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/standard-user.json',
      },
      dependencies: ['setup'],
    },
  ],
});