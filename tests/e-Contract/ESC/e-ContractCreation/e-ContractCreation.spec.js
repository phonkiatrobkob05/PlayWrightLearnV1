const { test, expect } = require('@playwright/test');

const id = Date.now();
const contract = {
    subject: `TestContract-${id}`,
    ownerName: `ContractOwner-${id}`,
    partyName: `ContractParty-${id}`,
}

test('TC-ECONTRACT-CREATION-001 Login สำเร็จ', async ({ page }) => {
    await page.goto('/contract');
    await expect(page).toHaveURL(/contract/);

    await page.getByRole('button', { name: 'Create' }).click();
    await expect(page).toHaveURL(/create/);

    await page.locator('a').filter({ hasText: 'e-Contract' }).click();
    await page.getByRole('button', { name: 'Create' }).click();
    await page.getByRole('textbox', { name: 'Subject' }).fill(contract.subject);
    await page.getByRole('textbox', { name: 'Owner Name' }).fill(contract.ownerName);
    await page.getByRole('textbox', { name: 'Party Name' }).fill(contract.partyName);
    await page.getByRole('textbox', { name: 'Select' }).first().click();
    await page.getByRole('gridcell', { name: 'Thursday, October 1,' }).getByText('1', { exact: true }).click();
    await page.getByRole('textbox', { name: 'Select' }).nth(1).click();
    await page.getByRole('gridcell', { name: 'Saturday, October 10,' }).click();
    await page.getByRole('checkbox', { name: 'Not Set Reminder' }).check();

    await page.locator('div').filter({ hasText: /^Select Approver$/ }).nth(3).click();
    await page.locator('.std-skin.opened-search-icon.ng-select-typeahead > .ng-select-container > .ng-value-container > .ng-input > input').fill('Phonkiat Robkob');
    await page.getByRole('option', { name: 'Phonkiat Robkob (Non) Tester' }).click();
    await page.locator('.ngx-file-drop__content').first().click();
    await page.locator('input[type="file"]').first().setInputFiles('D:\\PlayWrightLearn\\tests\\test-data\\TestDocuments3Page.pdf');
    await page.getByRole('img', { name: 'Signature' }).click();

    const canvas = page.locator('canvas');
    await canvas.scrollIntoViewIfNeeded();
    const box = await canvas.boundingBox();

    await page.mouse.move(box.x + 300, box.y + 400, { steps: 10 });
    await page.mouse.click(box.x + 300, box.y + 400);
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByRole('button', { name: 'Publish' }).click();
    await page.getByRole('button', { name: 'Confirm' }).click();
});