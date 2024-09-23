// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/loginPage';
import { ProductsPage } from '../Pages/productsPage';

test.describe('Login Page', () => {
  let loginPage;
  let productPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
    productPage = new ProductsPage(page);
  });


  test('Login Page Loaded and Login', async () => {
    await expect(loginPage.page).toHaveURL('https://www.saucedemo.com');
    await expect(loginPage.page).toHaveTitle('Swag Labs');
    await expect(loginPage.usernameField).toBeVisible();
    await expect(loginPage.passwordField).toBeVisible();

    await loginPage.login();
  });

  test('Find the item with highest price', async () => {
    await loginPage.login();
    await productPage.navigate();
  });

  test('Add Items to Cart', async () => {
    await loginPage.login();
  });



});
