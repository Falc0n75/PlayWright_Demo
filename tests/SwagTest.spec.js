// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/loginPage';
import { ProductsPage } from '../Pages/productsPage';

test.describe('Login Page', () => {
  let loginPage;
  let productPage;

  // Initialize loginPage and productPage before each test
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
    productPage = new ProductsPage(page);
  });

  // Test to verify the login page loads correctly
  test('Login Page Loaded and Login', async ({ page }) => {
    await expect(loginPage.page).toHaveURL('https://www.saucedemo.com');
    await expect(loginPage.page).toHaveTitle('Swag Labs');
    await expect(loginPage.usernameField).toBeVisible();
    await expect(loginPage.passwordField).toBeVisible();

    await loginPage.login();  // Perform login action
  });

  // Test to find the item with the highest price
  test('Find the item with highest price', async ({ page }) => {
    await loginPage.login();
    await productPage.navigate();

    const highestPriceProduct = await productPage.getHighestPrice();
    expect(highestPriceProduct.price).toBe(49.99);  // Validate the highest price
  });

  // Test to sort products by price (low to high) and verify sorting
  test('Sort products by price (low to high)', async ({ page }) => {
    await loginPage.login();
    await productPage.navigate();
  
    // Select the 'Price (low to high)' option from the dropdown
    await page.selectOption('[data-test="product-sort-container"]', 'lohi');
  
    // Get all prices after sorting
    const productCount = await productPage.getProductCount();
    let prices = [];
    for (let i = 0; i < productCount; i++) {
      prices.push(await productPage.getProductPrice(i));
    }
  
    // Verify the prices are sorted in ascending order
    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);
  });

  // Test to add a product to the cart and verify cart count
  test('Add a product to the cart and verify cart count', async ({ page }) => {
    await loginPage.login();
    await productPage.navigate();
  
    // Add the first product to the cart
    await productPage.addProductToCart(0);
  
    // Verify the cart icon shows 1 item
    const cartCount = await page.locator('.shopping_cart_badge').textContent();
    expect(cartCount).toBe('1');
  });

  // Test to verify social media links in the footer
  test('Verify social media links in footer', async ({ page }) => {
    await loginPage.login();
    await productPage.navigate();
  
    // Verify Twitter link
    const twitterLink = await page.locator('[data-test="social-twitter"]').getAttribute('href');
    expect(twitterLink).toBe('https://twitter.com/saucelabs');
  
    // Verify Facebook link
    const facebookLink = await page.locator('[data-test="social-facebook"]').getAttribute('href');
    expect(facebookLink).toBe('https://www.facebook.com/saucelabs');
  
    // Verify LinkedIn link
    const linkedInLink = await page.locator('[data-test="social-linkedin"]').getAttribute('href');
    expect(linkedInLink).toBe('https://www.linkedin.com/company/sauce-labs/');
  });

  // Test to add and remove a product from the cart
  test('Add and remove a product from the cart', async ({ page }) => {
    await loginPage.login();
    await productPage.navigate();
  
    // Add the first product to the cart
    await productPage.addProductToCart(0);
  
    // Verify the cart icon shows 1 item
    let cartCount = await page.locator('.shopping_cart_badge').textContent();
    expect(cartCount).toBe('1');
  
    // Remove the first product from the cart
    await page.click('[data-test="remove-sauce-labs-backpack"]'); // Assuming this is the remove button's data-test attribute
  
    // Verify the cart icon shows no items
    const isCartEmpty = await page.locator('.shopping_cart_badge').count();
    expect(isCartEmpty).toBe(0);
  });

  // Test to verify product descriptions on the page
  test('Verify product descriptions', async ({ page }) => {
    await loginPage.login();
    await productPage.navigate();
  
    const descriptions = [
      "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.",
      "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.",
      "Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.",
      "It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.",
      "Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.",
      "This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton."
    ];
  
    const productCount = await productPage.getProductCount();
    for (let i = 0; i < productCount; i++) {
      const description = await page.locator('[data-test="inventory-item-desc"]').nth(i).textContent();
      expect(description).toBe(descriptions[i]);  // Verify each product description matches the expected text
    }
  });
});
