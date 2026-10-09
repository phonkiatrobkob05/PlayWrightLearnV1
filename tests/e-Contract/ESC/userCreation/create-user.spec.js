const { test, expect } = require('@playwright/test');

test.describe('User Creation', { tag: '@user-creation' }, () => {
  test('TC-USER-001 Create User สำเร็จ', { tag: '@smoke' }, async ({ page }) => {
    const role = ['Contract Management', 'Admin', 'Auditor'];
    const id = Date.now();
    const user = {
      email: `testuser${id}@example.com`,
      username: `TestUsername${id}`,
      nickname: `TestUserNickname${id}`,
      firstName: `TestFirstName${id}`,
      lastName: `TestLastName${id}`,
      jobPosition: `TestJobPosition${id}`,
      role: role[0],
    };
    await page.goto('/users');
    await expect(page).toHaveURL(/users/);

    await page.getByRole('button', { name: 'Create' }).click();
    await expect(page).toHaveURL(/users\/create-user/);
    await page.getByPlaceholder('Email').fill(user.email);
    await page.getByPlaceholder('Password').fill('TestPassword123!');
    await page.getByPlaceholder('Username').fill(user.username);
    await page.getByPlaceholder('Nickname').fill(user.nickname);
    await page.getByPlaceholder('First name').fill(user.firstName);
    await page.getByPlaceholder('Last name').fill(user.lastName);
    await page.getByPlaceholder('Job position').fill(user.jobPosition);
    await page.locator('.ng-input > input').click();
    await page.getByRole('option', { name: user.role, exact: true }).click();
    await page.getByRole('checkbox', { name: 'Grant “Viewer” access to this' }).check();
    await page.locator('div').filter({ hasText: /^Select$/ }).nth(3).click();
    await page.locator('tree-node').filter({ hasText: 'All departments' }).getByRole('checkbox').check();
    await page.getByText('Personal Information Upload').click();
    await page.getByRole('button', { name: 'Confirm' }).click();
    await expect(page).not.toHaveURL(/create-user/);

    await page.goto('/users');
    await expect(page).toHaveURL(/users/);
    await expect(page.getByText(user.email)).toBeVisible();
  });
});

test.describe('User Creation - Required fields', { tag: '@user-creation' }, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/users');
    await page.getByRole('button', { name: 'Create' }).click();
    await expect(page).toHaveURL(/users\/create-user/);
  });

  test('TC-USER-002 เว้นว่าง Email', async ({ page }) => {
    const id = Date.now();
    await page.getByPlaceholder('Password').fill('TestPassword123!');
    await page.getByPlaceholder('Username').fill(`TestUsername${id}`);
    await page.getByPlaceholder('Nickname').fill(`TestUserNickname${id}`);
    await page.getByPlaceholder('First name').fill(`TestFirstName${id}`);
    await page.getByPlaceholder('Last name').fill(`TestLastName${id}`);
    await page.getByPlaceholder('Job position').fill(`TestJobPosition${id}`);
    await page.locator('.ng-input > input').click();
    await page.getByRole('option', { name: 'Contract Management', exact: true }).click();
    await page.getByRole('checkbox', { name: 'Grant “Viewer” access to this' }).check();
    await page.locator('div').filter({ hasText: /^Select$/ }).nth(3).click();
    await page.locator('tree-node').filter({ hasText: 'All departments' }).getByRole('checkbox').check();
    await page.getByText('Personal Information Upload').click();
    await page.getByRole('button', { name: 'Confirm' }).click();

    await expect(page.getByText('Email is required')).toBeVisible();
    await expect(page).toHaveURL(/create-user/);
  });

  test('TC-USER-003 เว้นว่าง Password', async ({ page }) => {
    const id = Date.now();
    await page.getByPlaceholder('Email').fill(`testuser${id}@example.com`);
    await page.getByPlaceholder('Username').fill(`TestUsername${id}`);
    await page.getByPlaceholder('Nickname').fill(`TestUserNickname${id}`);
    await page.getByPlaceholder('First name').fill(`TestFirstName${id}`);
    await page.getByPlaceholder('Last name').fill(`TestLastName${id}`);
    await page.getByPlaceholder('Job position').fill(`TestJobPosition${id}`);
    await page.locator('.ng-input > input').click();
    await page.getByRole('option', { name: 'Contract Management', exact: true }).click();
    await page.getByRole('checkbox', { name: 'Grant “Viewer” access to this' }).check();
    await page.locator('div').filter({ hasText: /^Select$/ }).nth(3).click();
    await page.locator('tree-node').filter({ hasText: 'All departments' }).getByRole('checkbox').check();
    await page.getByText('Personal Information Upload').click();
    await page.getByRole('button', { name: 'Confirm' }).click();

    await expect(page.getByText('Password is required')).toBeVisible();
    await expect(page).toHaveURL(/create-user/);
  });

  test('TC-USER-004 เว้นว่าง Username', async ({ page }) => {
    const id = Date.now();
    await page.getByPlaceholder('Email').fill(`testuser${id}@example.com`);
    await page.getByPlaceholder('Password').fill('TestPassword123!');
    await page.getByPlaceholder('Nickname').fill(`TestUserNickname${id}`);
    await page.getByPlaceholder('First name').fill(`TestFirstName${id}`);
    await page.getByPlaceholder('Last name').fill(`TestLastName${id}`);
    await page.getByPlaceholder('Job position').fill(`TestJobPosition${id}`);
    await page.locator('.ng-input > input').click();
    await page.getByRole('option', { name: 'Contract Management', exact: true }).click();
    await page.getByRole('checkbox', { name: 'Grant “Viewer” access to this' }).check();
    await page.locator('div').filter({ hasText: /^Select$/ }).nth(3).click();
    await page.locator('tree-node').filter({ hasText: 'All departments' }).getByRole('checkbox').check();
    await page.getByText('Personal Information Upload').click();
    await page.getByRole('button', { name: 'Confirm' }).click();

    await expect(page.getByText('Username is required')).toBeVisible();
    await expect(page).toHaveURL(/create-user/);
  });

  test('TC-USER-005 เว้นว่าง First name', async ({ page }) => {
    const id = Date.now();
    await page.getByPlaceholder('Email').fill(`testuser${id}@example.com`);
    await page.getByPlaceholder('Password').fill('TestPassword123!');
    await page.getByPlaceholder('Username').fill(`TestUsername${id}`);
    await page.getByPlaceholder('Nickname').fill(`TestUserNickname${id}`);
    await page.getByPlaceholder('Last name').fill(`TestLastName${id}`);
    await page.getByPlaceholder('Job position').fill(`TestJobPosition${id}`);
    await page.locator('.ng-input > input').click();
    await page.getByRole('option', { name: 'Contract Management', exact: true }).click();
    await page.getByRole('checkbox', { name: 'Grant “Viewer” access to this' }).check();
    await page.locator('div').filter({ hasText: /^Select$/ }).nth(3).click();
    await page.locator('tree-node').filter({ hasText: 'All departments' }).getByRole('checkbox').check();
    await page.getByText('Personal Information Upload').click();
    await page.getByRole('button', { name: 'Confirm' }).click();

    await expect(page.getByText('First name is required')).toBeVisible();
    await expect(page).toHaveURL(/create-user/);
  });

  test('TC-USER-006 เว้นว่าง Last name', async ({ page }) => {
    const id = Date.now();
    await page.getByPlaceholder('Email').fill(`testuser${id}@example.com`);
    await page.getByPlaceholder('Password').fill('TestPassword123!');
    await page.getByPlaceholder('Username').fill(`TestUsername${id}`);
    await page.getByPlaceholder('Nickname').fill(`TestUserNickname${id}`);
    await page.getByPlaceholder('First name').fill(`TestFirstName${id}`);
    await page.getByPlaceholder('Job position').fill(`TestJobPosition${id}`);
    await page.locator('.ng-input > input').click();
    await page.getByRole('option', { name: 'Contract Management', exact: true }).click();
    await page.getByRole('checkbox', { name: 'Grant “Viewer” access to this' }).check();
    await page.locator('div').filter({ hasText: /^Select$/ }).nth(3).click();
    await page.locator('tree-node').filter({ hasText: 'All departments' }).getByRole('checkbox').check();
    await page.getByText('Personal Information Upload').click();
    await page.getByRole('button', { name: 'Confirm' }).click();

    await expect(page.getByText('Last name is required')).toBeVisible();
    await expect(page).toHaveURL(/create-user/);
  });

  test('TC-USER-007 เว้นว่าง Job position', async ({ page }) => {
    const id = Date.now();
    await page.getByPlaceholder('Email').fill(`testuser${id}@example.com`);
    await page.getByPlaceholder('Password').fill('TestPassword123!');
    await page.getByPlaceholder('Username').fill(`TestUsername${id}`);
    await page.getByPlaceholder('Nickname').fill(`TestUserNickname${id}`);
    await page.getByPlaceholder('First name').fill(`TestFirstName${id}`);
    await page.getByPlaceholder('Last name').fill(`TestLastName${id}`);
    await page.locator('.ng-input > input').click();
    await page.getByRole('option', { name: 'Contract Management', exact: true }).click();
    await page.getByRole('checkbox', { name: 'Grant “Viewer” access to this' }).check();
    await page.locator('div').filter({ hasText: /^Select$/ }).nth(3).click();
    await page.locator('tree-node').filter({ hasText: 'All departments' }).getByRole('checkbox').check();
    await page.getByText('Personal Information Upload').click();
    await page.getByRole('button', { name: 'Confirm' }).click();

    await expect(page.getByText('Job position is required')).toBeVisible();
    await expect(page).toHaveURL(/create-user/);
  });

  test('TC-USER-008 ไม่เลือก Role', async ({ page }) => {
    const id = Date.now();
    await page.getByPlaceholder('Email').fill(`testuser${id}@example.com`);
    await page.getByPlaceholder('Password').fill('TestPassword123!');
    await page.getByPlaceholder('Username').fill(`TestUsername${id}`);
    await page.getByPlaceholder('Nickname').fill(`TestUserNickname${id}`);
    await page.getByPlaceholder('First name').fill(`TestFirstName${id}`);
    await page.getByPlaceholder('Last name').fill(`TestLastName${id}`);
    await page.getByPlaceholder('Job position').fill(`TestJobPosition${id}`);
    await page.locator('app-department-bubble-tree-dropdown').getByText('Select', { exact: true }).click();
    await page.locator('tree-node').filter({ hasText: 'All departments' }).getByRole('checkbox').check();
    await page.getByText('Personal Information Upload').click();
    await page.getByRole('button', { name: 'Confirm' }).click();

    await expect(page.getByText('Role is required')).toBeVisible();
    await expect(page).toHaveURL(/create-user/);
  });

  test('TC-USER-009 ไม่เลือก Department', async ({ page }) => {
    const id = Date.now();
    await page.getByPlaceholder('Email').fill(`testuser${id}@example.com`);
    await page.getByPlaceholder('Password').fill('TestPassword123!');
    await page.getByPlaceholder('Username').fill(`TestUsername${id}`);
    await page.getByPlaceholder('Nickname').fill(`TestUserNickname${id}`);
    await page.getByPlaceholder('First name').fill(`TestFirstName${id}`);
    await page.getByPlaceholder('Last name').fill(`TestLastName${id}`);
    await page.getByPlaceholder('Job position').fill(`TestJobPosition${id}`);
    await page.locator('.ng-input > input').click();
    await page.getByRole('option', { name: 'Contract Management', exact: true }).click();
    await page.getByRole('checkbox', { name: 'Grant “Viewer” access to this' }).check();
    await page.getByRole('button', { name: 'Confirm' }).click();

    await expect(page.getByText('Department is required')).toBeVisible();
    await expect(page).toHaveURL(/create-user/);
  });
});