import { defineConfig, devices } from '@playwright/test';

// Device presets bundle a fixed viewport + deviceScaleFactor together.
// We want the real, resizable window instead, so strip both before reapplying.
function desktop(deviceName) {
  const { viewport, deviceScaleFactor, ...rest } = devices[deviceName];
  return rest;
}

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  reporter: 'list',
  timeout: 0, // no timeout — these tests wait for you to close the window
  use: {
    trace: 'off',
  },
  projects: [
    { name: 'chromium', use: { ...desktop('Desktop Chrome'), viewport: null } },
    { name: 'firefox', use: { ...desktop('Desktop Firefox'), viewport: null } },
    { name: 'webkit', use: { ...desktop('Desktop Safari'), viewport: null } },
  ],
});
