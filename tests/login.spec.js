import { test, expect } from '@playwright/test';

test('testsss', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html', {
    waitUntil: 'domcontentloaded',
  });
  //   sign up
  await page.getByRole('link', { name: 'Sign up' }).click();
  await page.getByLabel('Username:').fill('user1');
  await page.getByLabel('Password:').fill('password1');
  await page.getByRole('button', { name: 'Sign up' }).click();

  //   log in

  await page.getByRole('link', { name: 'Log in' }).click();
  await page.getByLabel('Username:').fill('user1');
  await page.getByLabel('Password:').fill('password1');
  await page.getByRole('button', { name: 'Log in' }).click();
});
