const { test, expect } = require('@playwright/test');


test('TC-CHECKOUT-001 ซื้อสินค้า 1 ชิ้นสำเร็จ', async ({ page }) => {
  await page.getByRole('combobox').selectOption({ label: 'Price (low to high)' });

  const backpack = page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack' });
  await backpack.getByRole('button', { name: 'Add to cart' }).click();

  await expect(backpack.getByRole('button', { name: 'Remove' })).toBeVisible();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  await page.locator('.shopping_cart_link').click();
  await expect(page.getByText('Your Cart')).toBeVisible();
  await page.getByRole('button', { name: 'Checkout' }).click();

  await page.getByPlaceholder('First Name').fill('Non');
  await page.getByPlaceholder('Last Name').fill('QA');
  await page.getByPlaceholder('Zip/Postal Code').fill('10520');
  await page.getByRole('button', { name: 'Continue' }).click();

  await expect(page.getByText('Checkout: Overview')).toBeVisible();
  await page.getByRole('button', { name: 'Finish' }).click();

  await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
});