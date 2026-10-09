// Import test and expect from Playwright test library
const { test, expect } = require('@playwright/test');

// Actual Test Case
test('Create User', async ({ page }) => {
  await page.getByPlaceholder('Username').fill(process.env.TEST_USER);
  await page.getByPlaceholder('Password').fill(process.env.TEST_PASS);
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/inventory/);
});