const { test, expect } = require('@playwright/test');

test('build-inLocator', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/v1/');

  const username = page.getByPlaceholder('Username').fill('standard_user');
  const password = page.getByPlaceholder('Password').fill('secret_sauce');

  await username;
  await password;
  await page.click('id=login-button');
  const name = await page.locator('//div[text()="Products"]');
  expect(await page.getByText(name)).toBeVisible();
});
