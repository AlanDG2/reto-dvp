const { test } = require('@playwright/test');
const { CartPage } = require('../../page/CartPage');
const { LaptopsPage } = require('../../page/LaptopsPage');


const productName = 'MacBook Pro';
test.describe('Remove MacBook Pro from Cart Tests', () => {
  test('should verify the cart is empty after removing MacBook Pro', async ({ page }) => {
    const productPage = new LaptopsPage(page);
    const cartPage = new CartPage(page);
    await productPage.visit();
    await productPage.addToCart(productName);
    await productPage.verifyProductInCart(productName);
    await cartPage.visit();
    await cartPage.removeProduct();
    await cartPage.verifyEmptyCart();
  });
});
