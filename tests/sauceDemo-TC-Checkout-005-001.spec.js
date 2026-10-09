const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('TC-LOGIN-004 Login ด้วย performance_glitch_user สำเร็จแม้ระบบตอบช้า', async ({ page }) => {
  await page.getByTestId('username').fill('performance_glitch_user');
  await page.getByTestId('password').fill('secret_sauce');
  await page.getByTestId('login-button').click();

  await expect(page, 'user ที่ระบบตอบช้าต้องเข้าหน้า inventory ได้ภายใน 10 วินาที')
    .toHaveURL(/inventory/, { timeout: 10_000 });
  await expect(page.getByTestId('title')).toHaveText('Products');
});