import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';
import { SignAndLogin } from '../pages/signUp';
import { Purchase } from '../pages/Purchase';
import { faker } from '@faker-js/faker';

let page;
test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  const sign = new SignAndLogin(page);
  const login = new LoginPage(page);
  const username = faker.internet.userName();
  const password = process.env.PASSWORD;
  //signUp
  await login.goToPage(page);
  await sign.SignUp(username, password);

  //Login
  await login.loginPage(username, password);
  const validateUser = await login.checkLogIn(username);
  expect(validateUser).toBe(true);
});

test('test', async () => {
  //HomePage
  const home = new HomePage(page);
  await home.addProductToCart('Nexus 6');
  await home.gotoCart(page);

  //cart
  const cart = new CartPage(page);
  await cart.checkProductInCart('Nexus 6');

  //purchaseOrder
  const purchase = new Purchase(page);
  const orderDetails = {
    name: 'Emmanuel Soriano',
    country: 'Rep Dom',
    city: 'Pantoja',
    creditCard: '1234567890123456',
    month: '02',
    year: '2024',
  };

  await purchase.placeOrder(orderDetails);
  const confirmedPurchase = await page.locator(
    '//h2[text()="Thank you for your purchase!"]'
  );
  expect(confirmedPurchase).toBeTruthy();
  await purchase.confirmed();
});
