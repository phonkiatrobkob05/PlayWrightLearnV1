const { test: setup, expect } = require('@playwright/test');

const authFile = 'playwright/.auth/standard-user.json';

setup('login as standard_user', async ({ page }) => {
  await page.goto('/');
  await page.getByPlaceholder('Username/Email').fill(process.env.DHL_USER);
  await page.getByPlaceholder('Password').fill(process.env.DHL_PASS);
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).not.toHaveURL(/login/);

  await page.context().storageState({ path: authFile });
});