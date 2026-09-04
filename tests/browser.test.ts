import { test } from '@playwright/test';

test('open site for manual testing', async ({ page }) => {
  const url = process.env.TEST_URL || 'http://localhost:3000';
  const headless = process.env.TEST_HEADLESS === '1';

  await page.goto(url);

  if (headless) {
    // No window for a human to close in headless mode — just confirm the
    // page settled, then move on to the next browser.
    await page.waitForLoadState('networkidle').catch(() => {});
    return;
  }

  console.log('\n  Window open — close it when you\'re done to move to the next browser.\n');

  // No Inspector, no pause button to hunt for — closing the window is the signal.
  await page.waitForEvent('close', { timeout: 0 }).catch(() => {});
});