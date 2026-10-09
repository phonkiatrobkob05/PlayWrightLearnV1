const { test, expect } = require('@playwright/test');

test.describe('Checkout', { tag: '@checkout' }, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('username').fill('standard_user');
    await page.getByTestId('password').fill('secret_sauce');
    await page.getByTestId('login-button').click();

    const backpack = page.getByTestId('inventory-item').filter({ hasText: 'Sauce Labs Backpack' });
    await backpack.getByRole('button', { name: 'Add to cart' }).click();
    await page.getByTestId('shopping-cart-link').click();
    await page.getByRole('button', { name: 'Checkout' }).click();
  });

  test.describe('Positive', () => {
    test('TC-CHECKOUT-001 ซื้อสินค้า 1 ชิ้นสำเร็จ', { tag: '@smoke' }, async ({ page }) => {
      await test.step('กรอกข้อมูลผู้ซื้อ', async () => {
        await page.getByPlaceholder('First Name').fill('Non');
        await page.getByPlaceholder('Last Name').fill('QA');
        await page.getByPlaceholder('Zip/Postal Code').fill('10520');
        await page.getByRole('button', { name: 'Continue' }).click();
      });

      await test.step('ตรวจยอดเงินในหน้า Overview', async () => {
        await expect.soft(page.getByTestId('subtotal-label')).toHaveText('Item total: $29.99');
        await expect.soft(page.getByTestId('tax-label')).toHaveText('Tax: $2.40');
        await expect.soft(page.getByTestId('total-label')).toHaveText('Total: $32.39');
      });

      await test.step('ยืนยันคำสั่งซื้อ', async () => {
        await page.getByRole('button', { name: 'Finish' }).click();
        await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
      });
    });
  });

  test.describe('Negative', { tag: '@regression' }, () => {
    test('TC-CHECKOUT-002 ไม่กรอก First Name', async ({ page }) => {
      await page.getByPlaceholder('Last Name').fill('QA');
      await page.getByPlaceholder('Zip/Postal Code').fill('10520');
      await page.getByRole('button', { name: 'Continue' }).click();

      await expect(page.getByTestId('error')).toContainText('First Name is required');
    });

    test('TC-CHECKOUT-003 ไม่กรอก Zip/Postal Code', async ({ page }) => {
      await page.getByPlaceholder('First Name').fill('Non');
      await page.getByPlaceholder('Last Name').fill('QA');
      await page.getByRole('button', { name: 'Continue' }).click();

      await expect(page.getByTestId('error')).toContainText('Postal Code is required');
    });
  });
});