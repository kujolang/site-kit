import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/browser',
  testMatch: '**/*.spec.mjs',
  snapshotPathTemplate: '{testDir}/{testFilePath}-snapshots/{arg}{ext}',
  globalSetup: './tests/browser/global-setup.mjs',
  fullyParallel: true,
  forbidOnly: true,
  retries: 0,
  timeout: 60_000,
  reporter: [
    ['line'],
    ['html', { outputFolder: 'artifacts/browser/playwright-report', open: 'never' }],
    ['json', { outputFile: 'artifacts/browser/playwright-report.json' }],
  ],
  outputDir: 'artifacts/browser/test-results',
  use: {
    baseURL: 'http://127.0.0.1:4173',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'node tests/browser/server.mjs',
    url: 'http://127.0.0.1:4173/health',
    reuseExistingServer: false,
    timeout: 30_000,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
