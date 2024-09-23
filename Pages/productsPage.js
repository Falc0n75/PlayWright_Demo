export class ProductsPage {
    /**
    * @param {import('@playwright/test').Page} page
    */
    constructor(page) {
        this.page = page;
        this.header = page.locator('.header_secondary_container');
        this.productList = page.locator('.inventory_list');
        this.products = page.locator('.inventory_item');
        this.productName = page.locator('[data-test="inventory-item-name"]');
        this.productPrice = page.locator('[data-test="inventory-item-price"]');
        this.cartIcon = page.locator('.shopping_cart_link');
        this.addToCartButtons = page.locator('.btn_inventory');  // Locator for all add-to-cart buttons
    }

    // Navigate to the inventory page
    async navigate() {
        await this.page.goto('https://www.saucedemo.com/inventory.html');
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForLoadState('domcontentloaded');
    }

    // Get the total count of products listed on the page
    async getProductCount() {
        return await this.products.count();
    }

    // Get the name of a product by index
    async getProductName(index) {
        return await this.productName.nth(index).textContent();
    }

    // Get the price of a product by index
    async getProductPrice(index) {
        const priceText = await this.productPrice.nth(index).textContent();
        const price = parseFloat(priceText.replace('$', '').trim());
        console.log(`Price for product ${index + 1}: ${price}`);
        return price;
    }

    // Get the product with the highest price
    async getHighestPrice() {
        const count = await this.getProductCount();
        let highestPrice = 0;
        let highestPriceProduct = '';

        for (let i = 0; i < count; i++) {
            const price = await this.getProductPrice(i);
            const productName = await this.getProductName(i);

            if (price > highestPrice) {
                highestPrice = price;
                highestPriceProduct = productName;
            }
        }

        console.log(`Highest Price: ${highestPrice}, Product: ${highestPriceProduct}`);
        return { name: highestPriceProduct, price: highestPrice };
    }

    // Add a product to the cart by index
    async addProductToCart(index) {
        await this.addToCartButtons.nth(index).click();
    }

    // Navigate to the cart
    async goToCart() {
        await this.cartIcon.click();
    }
}
