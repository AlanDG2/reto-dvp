const { test } = require('@playwright/test');
const { CartPage } = require('../../page/CartPage');
const { SearchPage } = require('../../page/SearchPage');


const product = 'Samsung Galaxy Tab 10.1';
test.describe('Update Quantity of Samsung Galaxy Tab 10.1 in Cart Tests', () => {
  test('should update the quantity of Samsung Galaxy Tab 10.1 in the cart', async ({ page }) => {
    const searchPage = new SearchPage(page);
    const cartPage = new CartPage(page);
    await searchPage.visit();
    await searchPage.searchProduct(product);
    await searchPage.addToCart(product);
    await searchPage.verifyProductInCart(product);
    await cartPage.visit();
    await cartPage.updateQuantity(product, 2);
    await cartPage.verifyCartTotal('2 item(s) - $483.98');
  });
});
