const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByTestId('username').fill('standard_user');
  await page.getByTestId('password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Products')).toBeVisible();
});

test('TC-CHECKOUT-003 ซื้อสินค้า 2 ชิ้นสำเร็จ เปลี่ยน locator', async ({ page }) => {
  await page.getByRole('combobox').selectOption({ label: 'Price (low to high)' });

  const backpack = page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack' });
  await backpack.getByRole('button', { name: 'Add to cart' }).click();
  await page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Bike Light' }).getByRole('button', { name: 'Add to cart' }).click();

  await expect(backpack.getByRole('button', { name: 'Remove' })).toBeVisible();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

  await page.locator('.shopping_cart_link').click();
  await expect(page.getByText('Your Cart')).toBeVisible();

  await expect(page.locator('.cart_item').filter({ hasText: 'Sauce Labs Backpack' })).toBeVisible();
  await expect(page.locator('.cart_item').filter({ hasText: 'Sauce Labs Bike Light' })).toBeVisible();

  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByPlaceholder('First Name').fill('Non');
  await page.getByPlaceholder('Last Name').fill('QA');
  await page.getByPlaceholder('Zip/Postal Code').fill('10520');
  await page.getByRole('button', { name: 'Continue' }).click();

  await expect(page.getByText('Checkout: Overview')).toBeVisible();
  // await expect.soft(page.getByText('Item total: $29.99')).toBeVisible();
  // await expect.soft(page.getByText('Tax: $2.40')).toBeVisible();
  // await expect.soft(page.getByText('Total: $32.39')).toBeVisible();

  await expect.soft(page.getByTestId('subtotal-label')).toHaveText('Item total: $39.98');
  await expect.soft(page.getByTestId('tax-label')).toHaveText('Tax: $3.20');
  await expect.soft(page.getByTestId('total-label')).toHaveText('Total: $43.18');
  await page.getByRole('button', { name: 'Finish' }).click();

  await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
});