const { test, expect } = require('@playwright/test');

const descriptions = [
  'Test-PC-001',
  'Test-PC-002',
  'Test-PC-003',
];

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

for (const description of descriptions) {
  test(`TC-DHL-SMALLASSETCREATION-001 สร้าง Small Asset สำเร็จ (${description})`, async ({ page }) => {
    const currentValue = randomInt(10000, 50000);
    const quantity = randomInt(1, 4);

    test.info().annotations.push({
      type: 'test data',
      description: `Description: ${description}, Current value: ${currentValue}, Quantity: ${quantity}`,
    });

    await page.goto('/small-equipment');
    await page.getByRole('button', { name: 'Add Assets' }).click();
    await page.getByText('Create New Asset').click();

    await page.locator('ng-select[name="departments"]').click();
    await page.getByRole('option', { name: 'Dept1', exact: true }).click();

    await page.locator('.col').filter({ has: page.getByText('Location', { exact: true }) }).locator('ng-select').click();
    await page.getByRole('option', { name: '001 Codium', exact: true }).click();

    await page.locator('.col').filter({ has: page.getByText('Class', { exact: true }) }).locator('ng-select').click();
    await page.getByRole('option', { name: 'A0001 Codium', exact: true }).click();

    await page.getByRole('textbox', { name: 'Asset Description' }).fill(description);

    await page.getByRole('textbox', { name: 'Current value' }).click();
    await page.getByRole('textbox', { name: 'Current value' }).pressSequentially(`${currentValue}00`, { delay: 50 });
    await expect(page.getByRole('textbox', { name: 'Current value' })).toHaveValue(
      currentValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    );

    await page.getByRole('textbox', { name: 'Quantity' }).fill(String(quantity));

    await page.getByRole('button', { name: 'Save' }).click();

    await expect(page.getByText(description, { exact: true })).toBeVisible();
  });
}