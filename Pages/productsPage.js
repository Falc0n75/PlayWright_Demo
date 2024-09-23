import {  } from 'dotenv/config';

exports.ProductsPage = class ProductsPage {

    /**
    * @param {import {  } from "plawright/test";} page
    * @param {import {  } from 'dotenv/config';}
    * @param {import { env } from 'node:process';}
    */

constructor(page){
    this.page = page;
    this.header = page.locator('Swag Labs');

    this.productList = page.locator('.inventory.list')
    this.product = page.locator('.inventory.item')
    this.productName = page.locator('.inventory_item_name');
    this.productPrice = page.locator('.inventory_item_price');
    this.cartIcon = page.locator('.shopping_cart_link')
    this.addToCarts = page.locator('.btn_inventory')
}

async navigate(){
    await this.page.goto('https://www.saucedemo.com/inventory.html');
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForLoadState('domcontentloaded');
}

async getHeaderText(){
    return await this.header.textContent();
}

async getProductName(index){
    return await this.productName.nth(index).textContent();    
}

async getProductPrice(index){
    let price = await this.productPrice.nth(index).textContent();
    return price.trim('$', '').toDouble();
}

async addProductToCart(index){
    await this.addToCartButtons.nth(index).click();
}

async goToCart(){
    await this.cartIcon.click();    
}


};


