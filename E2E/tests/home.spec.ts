import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://predeploy.students-cda-js-2.wilders.dev/portal');
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Pimp My Product/);
});
